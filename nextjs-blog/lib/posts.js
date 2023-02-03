import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Returns the current working directory (cwd) and the posts dir in it
const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get files names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove the ".md" from file name to get id
    const fileId = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the metadata with the file id
    return {
      fileId,
      matterResult,
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) return 1;
    else return -1;
  });
}

// Returns an array of objects that looks like:
// {
//   params: {
//     fileId: 'ssg-ssr'
//   }
// }
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        fileId: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(fileId) {
  const fullPath = path.join(postsDirectory, `${fileId}.md`);
  const fileContents = fs.readFileSync(fullPath);

  // use gray-matter to poarse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // combine the data with the file id
  return {
    fileId,
    contentHtml,
    ...matterResult.data,
  };
}
