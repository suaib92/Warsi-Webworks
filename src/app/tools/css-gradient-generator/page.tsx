import { Metadata } from 'next';
import ToolLayout from '@/components/tools/ToolLayout';
import CssGradientGenerator from '@/components/tools/CssGradientGenerator';
import RelatedTools from '@/components/tools/RelatedTools';

export const metadata: Metadata = {
  title: 'Free CSS Gradient Generator | Linear & Radial Backgrounds',
  description: 'Design beautiful, cross-browser compatible CSS background gradients visually. Copy the precise CSS code or Tailwind classes for your next web project.',
  alternates: {
    canonical: 'https://warsi-webworks.vercel.app/tools/css-gradient-generator',
  }
};

export default function CssGradientGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "CSS Gradient Generator",
        "operatingSystem": "Any",
        "applicationCategory": "DesignApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "A visual design tool to generate linear and radial CSS gradient backgrounds."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Are CSS gradients supported on all browsers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the standard linear-gradient() and radial-gradient() syntax is fully supported across all modern browsers including Chrome, Firefox, Safari, and Edge."
            }
          },
          {
            "@type": "Question",
            "name": "How do I add a gradient to Tailwind CSS?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can copy the generated color hex codes and add them to your tailwind.config.ts, or apply the raw CSS directly via arbitrary values like bg-[linear-gradient(135deg,#8b5cf6_0%,#ec4899_100%)]."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <ToolLayout 
        title="CSS Gradient Generator" 
        description="Design beautiful background gradients for your website visually. Tweak colors, angles, and styles, then copy the cross-browser CSS code."
      >
        <CssGradientGenerator />
      </ToolLayout>

      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <RelatedTools currentTool="css-gradient" relatedToolIds={['json', 'website-cost', 'business-name']} />
      </div>

      <section className="bg-surface py-20 border-t border-border-section">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl prose prose-neutral dark:prose-invert prose-headings:text-text-primary prose-a:text-accent">
          <h2>Why Use CSS Gradients Instead of Images?</h2>
          <p>
            In the early days of web design, creating a smooth color transition required opening Photoshop, designing a graphic, and importing it as a background image. Today, CSS gradients have entirely replaced this inefficient process.
          </p>
          <p>
            Relying on CSS instead of image files is crucial for Core Web Vitals and SEO. CSS gradients load instantly because they require <strong>zero HTTP requests</strong>. Furthermore, because they are rendered mathematically by the browser's engine, they scale infinitely without ever losing quality or becoming pixelated on high-DPI (Retina) screens.
          </p>

          <h3>Types of Gradients Explained</h3>
          <p>Our free CSS Gradient Generator allows you to toggle between the two most common gradient styles used in modern UI design:</p>
          <ul>
            <li><strong>Linear Gradients:</strong> Colors transition in a straight line, dictated by an angle (e.g., from top to bottom, or diagonally at 135 degrees). These are perfect for buttons, hero overlays, and full-section backgrounds.</li>
            <li><strong>Radial Gradients:</strong> Colors transition outward from a central point in a circular or elliptical pattern. These are fantastic for creating depth, a subtle vignette, or a "spotlight" effect behind a central UI element.</li>
          </ul>

          <h3>Modern UI Gradient Trends (2026)</h3>
          <p>
            If you want your website to look like a premium SaaS product, pay attention to these current design trends:
          </p>
          <ol>
            <li><strong>The "Mesh" Effect:</strong> While standard linear gradients are great, combining multiple radial gradients in the background creates an organic, fluid "mesh" look made popular by Apple and Stripe.</li>
            <li><strong>Subtle Pastels in Dark Mode:</strong> Instead of stark black backgrounds, modern dark modes use deep purples or blues `#0A0A10` with highly saturated, glowing gradient accents `#8b5cf6` for buttons and borders.</li>
            <li><strong>Glassmorphism:</strong> Using a bright CSS gradient in the background and placing a semi-transparent, blurred white `div` (using `backdrop-filter: blur(10px)`) over it creates a stunning frosted glass effect.</li>
          </ol>

          <h3>Frequently Asked Questions</h3>
          <div className="space-y-6 mt-8">
            <div>
              <h4 className="font-bold text-lg">Are CSS gradients supported on all browsers?</h4>
              <p className="text-text-body mt-2">Yes, the standard `linear-gradient()` and `radial-gradient()` syntax is fully supported across all modern browsers (Chrome, Firefox, Safari, Edge). You no longer need vendor prefixes like `-webkit-` or `-moz-` for basic gradients.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg">How do I add the gradient to my Tailwind CSS project?</h4>
              <p className="text-text-body mt-2">Tailwind offers built-in gradient utilities like `bg-gradient-to-r from-purple-500 to-pink-500`. However, for precise angles (like 135deg), you can copy our generated hex codes and use arbitrary values: `bg-[linear-gradient(135deg,#8b5cf6_0%,#ec4899_100%)]`.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg">Can I animate CSS gradients?</h4>
              <p className="text-text-body mt-2">Directly animating the `background-image` property is generally not performant. The best way to animate a gradient is to make the background size 200% (`background-size: 200% 200%`) and use CSS keyframes to animate the `background-position` property.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
