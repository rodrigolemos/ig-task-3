import { useState, ReactElement } from 'react';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handlePostResult = (posts: any): Post[] => {
  return posts.map((post: Post) => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });
};

export default function Home({ postsPagination }: HomeProps): ReactElement {
  const { next_page, results } = postsPagination;
  const [posts, setPosts] = useState<Post[]>([...results]);
  const [hasNextPage, setHasNextPage] = useState<string | null>(next_page);

  const fetchNextPage = async (): Promise<void> => {
    fetch(hasNextPage)
      .then(response => response.json())
      .then(data => {
        setPosts([...posts, ...handlePostResult(data.results)]);
        setHasNextPage(data.next_page);
      });
  };

  return (
    <>
      <main className={styles.container}>
        <div className={commonStyles.content}>
          {posts.map(post => (
            <Link href={`/post/${post.uid}`} key={`post-${post.uid}`}>
              <article key={`post-${post.uid}`} className={styles.post}>
                <h1 className={styles.title}>{post.data.title}</h1>
                <h2 className={styles.subtitle}>{post.data.subtitle}</h2>
                <div className={styles.info}>
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
                </div>
              </article>
            </Link>
          ))}
          {hasNextPage && (
            <button
              type="button"
              className={styles.more}
              onClick={fetchNextPage}
            >
              Carregar mais posts
            </button>
          )}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 2,
    }
  );

  const posts: Post[] = handlePostResult(postsResponse.results);

  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results: posts,
      },
    },
    // revalidate: 3600,
  };
};
