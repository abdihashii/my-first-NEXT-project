import Head from 'next/head';
import Date from '../../components/date';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

const Post = ({ postData }) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      {postData.title}
      <br />
      {postData.fileId}
      <br />
      <Date dateString={postData.date} />
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
};

// Returns a list of possible values for file id
export async function getStaticPaths() {
  const paths = JSON.parse(JSON.stringify(getAllPostIds()));

  return {
    paths,
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
