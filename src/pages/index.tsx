import { ReactElement } from 'react';
import { FiCalendar, FiUser } from 'react-icons/fi';
import Header from '../components/Header';
// import { GetStaticProps } from 'next';

// import { getPrismicClient } from '../services/prismic';

// import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

// interface Post {
//   uid?: string;
//   first_publication_date: string | null;
//   data: {
//     title: string;
//     subtitle: string;
//     author: string;
//   };
// }

// interface PostPagination {
//   next_page: string;
//   results: Post[];
// }

// interface HomeProps {
//   postsPagination: PostPagination;
// }

export default function Home(): ReactElement {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <div className={styles.content}>
          <article className={styles.post}>
            <h1 className={styles.title}>
              Lorem ipsum dolor sit amet consectetur
            </h1>
            <h2 className={styles.subtitle}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui rerum
              esse nemo cupiditate debitis alias
            </h2>
            <div className={styles.info}>
              <div>
                <FiCalendar />
                <span>15 Mar 2021</span>
              </div>
              <div>
                <FiUser />
                <span>Joseph Oliveira</span>
              </div>
            </div>
          </article>
          <article className={styles.post}>
            <h1 className={styles.title}>
              Lorem ipsum dolor sit amet consectetur
            </h1>
            <h2 className={styles.subtitle}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui rerum
              esse nemo cupiditate debitis alias
            </h2>
            <div className={styles.info}>
              <div>
                <FiCalendar />
                <span>15 Mar 2021</span>
              </div>
              <div>
                <FiUser />
                <span>Joseph Oliveira</span>
              </div>
            </div>
          </article>
        </div>
      </main>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
