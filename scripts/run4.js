const fs = require('fs');
const path = require('path');
const { updatePost } = require('./update-post');

const contentPath = path.join(__dirname, 'content4.html');
const content = fs.readFileSync(contentPath, 'utf8');

updatePost('best-website-development-company-moradabad', '\n' + content + '\n');
