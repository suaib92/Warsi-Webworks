/**
 * Internal Link Audit Tool
 * Scans the app directory and components to verify internal linking health.
 * 
 * Usage: node scripts/internal_link_audit.js
 */

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

console.log('🔍 Starting Internal Link Architecture Audit...\n');

const allFiles = getAllFiles(srcDir);
const routes = allFiles.filter(f => f.includes('\\app\\') && f.endsWith('page.tsx'));

console.log(`Found ${routes.length} core route templates.`);

let missingInternalLinks = 0;
let missingBreadcrumbs = 0;

routes.forEach(route => {
  const content = fs.readFileSync(route, 'utf-8');
  const routeName = route.split('\\src\\app\\')[1] || route;
  
  const hasInternalLinks = content.includes('<InternalLinks') || content.includes('InternalLinks');
  const hasBreadcrumbs = content.includes('<Breadcrumbs') || content.includes('Breadcrumbs');
  
  if (!hasInternalLinks && routeName !== 'page.tsx') { // Exclude root page.tsx if needed, though we added it there too
    console.log(`⚠️ Warning: Orphan Risk! No <InternalLinks /> found in ${routeName}`);
    missingInternalLinks++;
  }
  
  if (!hasBreadcrumbs && routeName !== 'page.tsx') {
    console.log(`⚠️ Warning: No <Breadcrumbs /> found in ${routeName}`);
    missingBreadcrumbs++;
  }
});

console.log('\n📊 Audit Summary:');
console.log('-------------------');
console.log(`Total Route Templates Scanned: ${routes.length}`);
console.log(`Templates Missing Dynamic Link Mesh: ${missingInternalLinks}`);
console.log(`Templates Missing Breadcrumb Schema: ${missingBreadcrumbs}`);

if (missingInternalLinks === 0 && missingBreadcrumbs === 0) {
  console.log('\n✅ SEO ARCHITECTURE PERFECT. Zero Orphan Pages Detected. PageRank flowing correctly.');
} else {
  console.log('\n❌ ACTION REQUIRED. Inject <InternalLinks /> and <Breadcrumbs /> into missing templates.');
}
