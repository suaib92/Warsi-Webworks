const fs = require('fs');
const path = require('path');
const { updatePost } = require('./update-post');

const contentPath = path.join(__dirname, 'content3.html');
const content = fs.readFileSync(contentPath, 'utf8');

updatePost('seo-checklist-for-new-websites', '\n' + content + '\n');
