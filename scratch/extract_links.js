const fs = require('fs');
const path = require('path');

function getFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, filesList);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      filesList.push(filePath);
    }
  }
  return filesList;
}

const allFiles = getFiles('./src');
const linkRegex = /href=["'](\/[^"']*)["']/g;
const links = new Set();

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    links.add(match[1]);
  }
}

console.log(Array.from(links).sort().join('\n'));
