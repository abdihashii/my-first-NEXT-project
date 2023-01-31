import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>Create Next App</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>
          Hello, I'm <strong>Abdirahman</strong>. I'm a software engineer.
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={(utilStyles.headingMd, utilStyles.padding1px)}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(
            ({
              fileId,
              matterResult: {
                data: { title, date },
              },
            }) => {
              return (
                <li key={fileId} className={utilStyles.listItem}>
                  {title}
                  <br />
                  {fileId}
                  <br />
                  {date}
                </li>
              );
            },
          )}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = JSON.parse(JSON.stringify(getSortedPostsData()));

  return {
    props: {
      allPostsData,
    },
  };
}
