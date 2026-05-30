import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Warsi WebWorks",
};

export default function Terms() {
  return (
    <main className="pt-32 pb-20 bg-base min-h-screen">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-text-primary tracking-tighter mb-8">Terms of Service</h1>
        <p className="text-text-muted mb-12">Last updated: May 2026</p>

        <div className="space-y-8 text-text-body text-lg leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Services</h2>
            <p>Warsi WebWorks provides website development, ecommerce solutions, mobile app development, and SEO services. All project scopes, timelines, and costs are defined in a separate project agreement.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Intellectual Property</h2>
            <p>Upon full payment, the client retains full ownership of all custom code, designs, and deliverables created specifically for their project.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Limitation of Liability</h2>
            <p>Warsi WebWorks shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Contact</h2>
            <p>For questions about these terms, contact us at hello@warsiwebworks.com.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
