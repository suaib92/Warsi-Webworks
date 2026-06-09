const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/components/sections');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('framer-motion')) continue;
  
  console.log(`Processing ${file}...`);
  
  // Remove framer-motion import
  content = content.replace(/import\s+\{[^}]*motion[^}]*\}\s+from\s+["']framer-motion["'];?\n?/g, '');
  
  // Replace <motion.div> with <div>
  content = content.replace(/<motion\.([a-zA-Z0-9]+)/g, '<$1');
  content = content.replace(/<\/motion\.([a-zA-Z0-9]+)>/g, '</$1>');
  
  // Remove framer-motion props
  content = content.replace(/\s+(initial|whileInView|viewport|transition|animate|whileHover|whileTap)=\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/g, '');
  content = content.replace(/\s+(initial|whileInView|viewport|transition|animate|whileHover|whileTap)="[^"]*"/g, '');

  // Handle special style={{ x }} from Process.tsx
  content = content.replace(/style=\{\{\s*x\s*\}\}/g, '');
  
  // Remove "use client"; if there are no other client hooks used
  if (!content.includes('useState') && !content.includes('useEffect') && !content.includes('useRef')) {
    content = content.replace(/['"]use client['"];?\n?/g, '');
  }

  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Done');
