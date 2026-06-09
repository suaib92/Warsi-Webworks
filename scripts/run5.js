const fs = require('fs');
const path = require('path');
const { updatePost } = require('./update-post');

const contentPath = path.join(__dirname, 'content5.html');
const content = fs.readFileSync(contentPath, 'utf8');

updatePost('website-development-timeline', '\n' + content + '\n');
