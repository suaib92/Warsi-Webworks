const fs = require('fs');
const path = require('path');

const blogFilePath = path.join(__dirname, '../src/data/blog.ts');
const postsDir = path.join(__dirname, '../src/data/posts');

if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

let content = fs.readFileSync(blogFilePath, 'utf8');

// Strip out export interface and export const to make it valid JS
let cleanJS = content.replace(/export interface BlogPost \{[\s\S]*?\}/, '');
cleanJS = cleanJS.replace('export const blogPosts: BlogPost[] =', 'module.exports =');

const tempFile = path.join(__dirname, 'temp-blog2.js');
fs.writeFileSync(tempFile, cleanJS);

// Actually we need to make sure there are no type annotations in the objects, but there shouldn't be any.
const posts = require('./temp-blog2.js');

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
  
  const importName = slug.replace(/-([a-z0-9])/gi, (g) => g[1].toUpperCase()).replace(/-/g, '') + 'Content';
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
fs.unlinkSync(tempFile);
console.log('Successfully refactored blog posts.');
