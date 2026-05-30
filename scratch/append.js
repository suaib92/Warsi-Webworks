const fs = require('fs');
const path = require('path');

const newBlogs = JSON.parse(fs.readFileSync(path.join(__dirname, 'new_blogs.json'), 'utf8'));
const targetFile = path.join(__dirname, '../src/data/blog.ts');

let content = fs.readFileSync(targetFile, 'utf8');

const endOfArrayMatch = content.match(/];\s*export function getPostBySlug/);
if (endOfArrayMatch) {
  const newBlogsString = newBlogs.map(blog => JSON.stringify(blog, null, 2)).join(',\n  ');
  
  const updatedContent = content.replace(
    /];\s*export function getPostBySlug/, 
    `,\n  ${newBlogsString}\n];\n\nexport function getPostBySlug`
  );
  
  fs.writeFileSync(targetFile, updatedContent);
  console.log('Successfully added 7 massive pillar posts to src/data/blog.ts');
} else {
  console.error('Could not parse src/data/blog.ts correctly');
}
