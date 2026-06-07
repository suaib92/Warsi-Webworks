const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '../src/app/tools');
const toolFolders = fs.readdirSync(toolsDir).filter(f => fs.statSync(path.join(toolsDir, f)).isDirectory());

toolFolders.forEach(tool => {
  const pagePath = path.join(toolsDir, tool, 'page.tsx');
  if (!fs.existsSync(pagePath)) return;
  
  let content = fs.readFileSync(pagePath, 'utf-8');
  
  if (!content.includes('import Breadcrumbs from')) {
    content = content.replace(
      'import { Metadata } from \'next\';',
      'import { Metadata } from \'next\';\nimport Breadcrumbs from "@/components/seo/Breadcrumbs";\nimport InternalLinks from "@/components/seo/InternalLinks";'
    );
    
    // Fallback if the first replace failed
    if (!content.includes('import Breadcrumbs from')) {
      content = 'import Breadcrumbs from "@/components/seo/Breadcrumbs";\nimport InternalLinks from "@/components/seo/InternalLinks";\n' + content;
    }

    fs.writeFileSync(pagePath, content);
    console.log(`Injected imports into ${tool}`);
  }
});
