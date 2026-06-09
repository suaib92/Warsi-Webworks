const fs = require('fs');
const path = require('path');
const { updatePost } = require('./update-post');

const contentPath = path.join(__dirname, 'content2.html');
const content = fs.readFileSync(contentPath, 'utf8');

updatePost('technical-seo-explained', '\n' + content + '\n');
