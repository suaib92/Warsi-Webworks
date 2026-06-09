const fs = require('fs');
const path = require('path');

const blogFilePath = path.join(__dirname, '../src/data/blog.ts');
const postsDir = path.join(__dirname, '../src/data/posts');

if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

let content = fs.readFileSync(blogFilePath, 'utf8');

const arrayStart = content.indexOf('export const blogPosts: BlogPost[] = [');
if (arrayStart === -1) {
  console.error("Could not find blogPosts array");
  process.exit(1);
}

let cleanArrayStr = content.slice(content.indexOf('[', arrayStart));
cleanArrayStr = cleanArrayStr.replace(/;\s*$/, ''); // remove trailing semicolon

let posts;
try {
  posts = eval('(' + cleanArrayStr + ')');
} catch (e) {
  console.error("Failed to eval array:", e);
  process.exit(1);
}

let newBlogFile = `export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  content: string; // HTML content
  author: {
    name: string;
    role: string;
  };
  tableOfContents: { id: string; title: string; level: number }[];
  faqs?: { question: string; answer: string }[];
}

`;

let imports = '';
let updatedPostsArr = 'export const blogPosts: BlogPost[] = [\n';

posts.forEach(post => {
  const slug = post.slug;
  const contentFileName = `${slug}.ts`;
  const contentFilePath = path.join(postsDir, contentFileName);
  
  const contentToExport = `export const content = \`${post.content.replace(/`/g, '\\`').replace(/\\/g, '\\\\')}\`;\n`;
  fs.writeFileSync(contentFilePath, contentToExport);
  
  const importName = slug.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase()).replace(/-/g, '') + 'Content';
  imports += `import { content as ${importName} } from "./posts/${slug}";\n`;
  
  const postCopy = { ...post };
  delete postCopy.content;
  
  let postStr = JSON.stringify(postCopy, null, 2);
  postStr = postStr.substring(0, postStr.lastIndexOf('}')); 
  postStr += `  "content": ${importName}\n}`;
  updatedPostsArr += postStr + ',\n';
});

updatedPostsArr += '];\n';

fs.writeFileSync(blogFilePath, imports + '\n' + newBlogFile + updatedPostsArr);
console.log('Successfully refactored blog posts.');
