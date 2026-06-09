const http = require('http');

const links = [
  '/',
  '/about',
  '/blog',
  '/blog/category/business',
  '/blog/category/engineering',
  '/blog/category/marketing',
  '/contact',
  '/ecommerce-for-manufacturers',
  '/portfolio',
  '/privacy-policy',
  '/services',
  '/services/ecommerce-development-moradabad',
  '/services/mobile-app-development-moradabad',
  '/services/nextjs-development-moradabad',
  '/services/react-development-moradabad',
  '/services/seo-services-moradabad',
  '/services/website-development-moradabad',
  '/terms',
  '/tools',
  '/tools/business-name-generator',
  '/tools/qr-code-generator',
  '/tools/salary-calculator',
  '/tools/website-cost-calculator',
  '/website-development-for-manufacturers'
];

async function checkLinks() {
  const brokenLinks = [];
  for (const link of links) {
    await new Promise(resolve => {
      http.get('http://localhost:3000' + link, (res) => {
        if (res.statusCode === 404) {
          brokenLinks.push({ link, status: res.statusCode });
        }
        res.resume(); // consume response data to free up memory
        resolve();
      }).on('error', (e) => {
        brokenLinks.push({ link, error: e.message });
        resolve();
      });
    });
  }

  if (brokenLinks.length === 0) {
    console.log('No broken links found!');
  } else {
    console.log('Broken links:');
    brokenLinks.forEach(b => console.log(b));
  }
}

checkLinks();
