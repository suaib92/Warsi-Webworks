const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/components/sections');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // The regex left trailing `}}}` after a tag name or attribute.
  // Example: <p}}}
  // Example: <div}}}}
  // Example: className="..."}}}
  // Example: key={index}}}}}
  
  // Let's just remove any sequence of `}}}` that is immediately preceded by a tag name, or immediately precedes a >
  content = content.replace(/(<[a-zA-Z0-9]+)\}\}+\s/g, '$1 ');
  content = content.replace(/(<[a-zA-Z0-9]+)\}\}+>/g, '$1>');
  content = content.replace(/className="([^"]*)"\}\}+/g, 'className="$1"');
  content = content.replace(/key=\{([^}]+)\}\}\}+/g, 'key={$1}');
  content = content.replace(/\]\)\}\}\}/g, '])');
  
  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Fixed syntax errors');
