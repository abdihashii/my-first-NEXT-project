import Head from 'next/head';
import Date from '../../components/date';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

const Post = ({ postData }) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
};

// Returns a list of possible values for file id
export async function getStaticPaths() {
  const paths = JSON.parse(JSON.stringify(getAllPostIds()));

  return {
    paths,
    // if false, any paths not returned by getStaticPaths will result in 404
    fallback: false,
  };
}

// Fetches necessary data for the blog post using params.fileId
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.fileId);

  return {
    props: {
      postData,
    },
  };
}

export default Post;
