import { ReactElement } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Prismic from '@prismicio/client';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): ReactElement {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  const calculateReadingTime = (content: string): number => {
    const words = content.split(' ').length;
    return Math.ceil(words / 200);
  };

  let readingTime = 0;

  const newContent = post.data.content.map(content => {
    readingTime += calculateReadingTime(content.heading);
    readingTime += calculateReadingTime(content.body[0].text);

    return {
      heading: content.heading,
      body: RichText.asHtml(content.body),
    };
  });

  return (
    <>
      <main className={commonStyles.container}>
        <div className={styles.wrapper}>
          {post.data.banner.url && (
            <div className={styles.banner}>
              <img src={post.data.banner.url} alt="banner" />
            </div>
          )}
          <article className={styles.article}>
            <h1 className={styles.title}>{post.data.title}</h1>
            <section className={styles.info}>
              <div>
                <FiCalendar />
                <span>
                  {format(
                    new Date(post.first_publication_date),
                    'dd MMM yyyy',
                    { locale: ptBR }
                  )}
                </span>
              </div>
              <div>
                <FiUser />
                <span>{post.data.author}</span>
              </div>
              {/* <div>
                <FiClock />
                <span>{readingTime} min</span>
              </div> */}
            </section>
            {newContent.map(content => (
              <div className={styles.post} key={content.heading}>
                <h1>{content.heading}</h1>
                <div
                  className={styles.content}
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: content.body,
                  }}
                />
              </div>
            ))}
          </article>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 2,
    }
  );

  const paths = posts.results.map(post => {
    return {
      params: {
        slug: post.uid,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const prismic = getPrismicClient();
  const response = await prismic.getByUID(
    'posts',
    String(context.params.slug),
    {}
  );

  const post = {
    first_publication_date: response.first_publication_date,
    uid: response.uid,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: {
        url: response.data.banner.url || null,
      },
      author: response.data.author,
      content: response.data.content,
    },
  };

  return {
    props: {
      post,
    },
  };
};
