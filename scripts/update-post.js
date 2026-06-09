const fs = require('fs');
const path = require('path');

function updatePost(slug, newContentRaw) {
  const filePath = path.join(__dirname, '../src/data/blog.ts');
  let content = fs.readFileSync(filePath, 'utf8');

  // Find the slug index
  const slugIndex = content.indexOf(`"slug": "${slug}"`);
  if (slugIndex === -1) {
    console.error(`Slug ${slug} not found`);
    return;
  }

  // Find the "content": " start after the slug
  // The regex matches "content": " followed by any character that is either not a quote/backslash OR is an escaped character, ending with a quote.
  const regex = /"content"\s*:\s*"(?:[^"\\]|\\.)*"/g;
  
  // Set the regex lastIndex to the slugIndex so we only search after the slug
  regex.lastIndex = slugIndex;
  
  const match = regex.exec(content);
  if (!match) {
    console.error(`Content block for ${slug} not found after slugIndex`);
    return;
  }

  const start = match.index;
  const end = start + match[0].length;

  const before = content.substring(0, start);
  const after = content.substring(end);
  
  // We need to properly JSON encode the new content so it has \n and escaped quotes
  const escapedNewContent = JSON.stringify(newContentRaw);

  const newFileContent = before + `"content": ${escapedNewContent}` + after;
  fs.writeFileSync(filePath, newFileContent);
  console.log(`Successfully updated content for ${slug}`);
}

module.exports = { updatePost };
