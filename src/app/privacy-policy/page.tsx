import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Warsi WebWorks",
};

export default function PrivacyPolicy() {
  return (
    <main className="pt-32 pb-20 bg-base min-h-screen">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-text-primary tracking-tighter mb-8">Privacy Policy</h1>
        <p className="text-text-muted mb-12">Last updated: May 2026</p>

        <div className="space-y-8 text-text-body text-lg leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Information We Collect</h2>
            <p>When you fill out our contact form, we collect your name, email address, phone number, and project details. This information is used solely to respond to your inquiry.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">How We Use Your Information</h2>
            <p>We use the information you provide to communicate with you about your project, send relevant proposals, and improve our services. We do not sell or share your personal data with third parties.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Data Retention</h2>
            <p>We retain your inquiry data for up to 12 months after the last communication. You may request deletion at any time by emailing suaib8211@gmail.com.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at suaib8211@gmail.com.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Contact</h2>
            <p>For privacy-related inquiries, reach out to:</p>
            <p className="mt-2">Warsi WebWorks, Moradabad, UP, India<br />Email: suaib8211@gmail.com</p>
          </section>
        </div>
      </div>
    </main>
  );
}
