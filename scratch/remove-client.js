const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/components/sections');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove "use client" directives
  content = content.replace(/['"]use client['"];?\n?/g, '');
  
  // Remove react imports since we stripped the hooks
  content = content.replace(/import\s+\{?[^}]*\}?\s+from\s+['"]react['"];?\n?/g, '');
  
  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Force removed use client and react imports');
