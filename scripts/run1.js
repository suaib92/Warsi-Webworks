const fs = require('fs');
const path = require('path');
const { updatePost } = require('./update-post');

const contentPath = path.join(__dirname, 'content1.html');
const content = fs.readFileSync(contentPath, 'utf8');

updatePost('what-is-local-seo-how-it-works', '\n' + content + '\n');
