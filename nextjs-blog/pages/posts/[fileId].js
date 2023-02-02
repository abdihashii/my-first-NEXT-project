import React from 'react';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

const Post = ({ postData }) => {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.fileId}
      <br />
      {postData.date}
    </Layout>
  );
};

// Returns a list of possible values for file id
export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

// Fetches necessary data for the blog post using params.fileId
export async function getStaticProps({ params }) {
  const postData = JSON.parse(JSON.stringify(getPostData(params.fileId)));

  return {
    props: {
      postData,
    },
  };
}

export default Post;
