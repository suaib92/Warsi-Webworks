const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
  // Use findstr to find hrefs
  const result = execSync('findstr /s /n /c:"href=" src\\*.tsx', {encoding: 'utf8'});
  const links = new Set();
  const lines = result.split('\n');

  for (const line of lines) {
    // Regex to capture href="/something" or href={'/something'}
    const match1 = line.match(/href=["']([^"']+)["']/);
    const match2 = line.match(/href=\{["']([^"']+)["']\}/);
    let href = match1 ? match1[1] : (match2 ? match2[1] : null);
    
    if (href) {
      // filter out external links and anchor links
      if (href.startsWith('/') && !href.startsWith('//')) {
        let basePath = href.split('#')[0].split('?')[0];
        if (basePath === '') basePath = '/';
        links.add(basePath);
      }
    }
  }

  console.log('Internal links found in codebase:');
  const sortedLinks = Array.from(links).sort();
  for (const l of sortedLinks) {
    console.log(l);
  }
} catch (e) {
  console.error(e);
}
