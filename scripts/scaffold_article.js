const fs = require('fs');
const path = require('path');

const roadmapPath = path.join(__dirname, 'content_roadmap.json');
const targetFile = path.join(__dirname, '../src/data/blog.ts');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Usage: node scaffold_article.js <slug>');
  console.log('Available slugs from roadmap:');
  const roadmap = require(roadmapPath);
  roadmap.forEach(r => console.log(`  - ${r.slug}`));
  process.exit(1);
}

const targetSlug = args[0];
const roadmap = require(roadmapPath);
const articleData = roadmap.find(r => r.slug === targetSlug);

if (!articleData) {
  console.error(`Error: Slug "${targetSlug}" not found in content_roadmap.json`);
  process.exit(1);
}

// Generate the boilerplate object
const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
const newBlog = {
  slug: articleData.slug,
  title: articleData.title,
  excerpt: articleData.excerpt,
  category: articleData.category,
  date: today,
  author: { name: "Suaib Warsi", role: "Lead Engineer" },
  tableOfContents: [
    { id: "introduction", title: "Introduction", level: 2 },
    { id: "core-concepts", title: "Core Concepts", level: 2 },
    { id: "implementation", title: "Implementation Details", level: 2 },
    { id: "conclusion", title: "Conclusion", level: 2 }
  ],
  faqs: [
    { question: "What is the main takeaway?", answer: "This is a placeholder answer. Update it with real content." },
    { question: "How much does it cost?", answer: "This is a placeholder answer. Update it with real content." }
  ],
  content: `
    <h2 id="introduction">Introduction</h2>
    <p>This is a placeholder for the introduction of ${articleData.title}. The SEO strategy demands 1,500+ words of high-quality, expert-written content here.</p>
    
    <h2 id="core-concepts">Core Concepts</h2>
    <p>Explain the core concepts clearly. Use formatting like <strong>bold text</strong> and bullet points.</p>
    <ul>
      <li>Concept 1</li>
      <li>Concept 2</li>
    </ul>

    <h2 id="implementation">Implementation Details</h2>
    <p>Provide technical or strategic depth that demonstrates E-E-A-T.</p>

    <h2 id="conclusion">Conclusion</h2>
    <p>Summarize the article and provide a clear Call to Action. <a href="/#contact">Contact Warsi WebWorks</a> for more details.</p>
  `
};

let content = fs.readFileSync(targetFile, 'utf8');

const endOfArrayMatch = content.match(/];\s*export function getPostBySlug/);
if (endOfArrayMatch) {
  // Check if it already exists
  if (content.includes(`slug: "${targetSlug}"`) || content.includes(`slug: '${targetSlug}'`)) {
    console.error(`Error: Blog post with slug "${targetSlug}" already exists in src/data/blog.ts!`);
    process.exit(1);
  }

  const newBlogString = JSON.stringify(newBlog, null, 2);
  
  // Insert before the closing bracket of the array
  const updatedContent = content.replace(
    /];\s*export function getPostBySlug/, 
    `,\n  ${newBlogString}\n];\n\nexport function getPostBySlug`
  );
  
  fs.writeFileSync(targetFile, updatedContent);
  console.log(`Successfully scaffolded "${articleData.title}" into src/data/blog.ts!`);
} else {
  console.error('Could not parse src/data/blog.ts correctly');
}
