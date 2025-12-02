"use client";

import Link from "next/link";
import { Crown, Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0B0B0D]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-tighter font-oswald">
            <Crown className="h-6 w-6 text-[#D9AE43]" />
            GETTUPP<span className="text-[#D9AE43]">ENT</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D9AE43]/30 bg-[#D9AE43]/5 mb-6">
            <Shield className="h-4 w-4 text-[#D9AE43]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D9AE43] font-oswald">
              Legal
            </span>
          </div>
          <h1 className="font-oswald text-4xl md:text-5xl font-black uppercase mb-8">
            Privacy <span className="text-[#D9AE43]">Policy</span>
          </h1>
          
          <div className="prose prose-invert max-w-none font-inter">
            <p className="text-gray-400 mb-6">
              Last updated: December 2025
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4 font-oswald">1. Information We Collect</h2>
            <p className="text-gray-400 mb-4">
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-gray-400 mb-4 space-y-2">
              <li>Contact information (name, email, phone number)</li>
              <li>Business information (venue name, address)</li>
              <li>Payment information (processed securely via Stripe)</li>
              <li>Communications with us</li>
            </ul>

            <h2 className="text-xl font-bold text-white mt-8 mb-4 font-oswald">2. How We Use Your Information</h2>
            <p className="text-gray-400 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-400 mb-4 space-y-2">
              <li>Provide and deliver our photography services</li>
              <li>Process payments and send invoices</li>
              <li>Send service-related communications</li>
              <li>Respond to your inquiries</li>
              <li>Improve our services</li>
            </ul>

            <h2 className="text-xl font-bold text-white mt-8 mb-4 font-oswald">3. Information Sharing</h2>
            <p className="text-gray-400 mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share 
              information only with:
            </p>
            <ul className="list-disc list-inside text-gray-400 mb-4 space-y-2">
              <li>Payment processors (Stripe) for secure transaction handling</li>
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by law</li>
            </ul>

            <h2 className="text-xl font-bold text-white mt-8 mb-4 font-oswald">4. Photo & Content Rights</h2>
            <p className="text-gray-400 mb-4">
              Photos taken at your venue may include images of patrons in public areas. By booking our 
              services, you confirm you have necessary permissions for photography at your venue. We 
              may use photos in our portfolio unless you request otherwise.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4 font-oswald">5. Data Security</h2>
            <p className="text-gray-400 mb-4">
              We implement appropriate security measures to protect your personal information. Payment 
              information is encrypted and processed through Stripe's PCI-compliant systems.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4 font-oswald">6. Cookies & Analytics</h2>
            <p className="text-gray-400 mb-4">
              Our website uses cookies and analytics tools to improve user experience and understand 
              how visitors interact with our site. You can control cookie settings through your browser.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4 font-oswald">7. Your Rights</h2>
            <p className="text-gray-400 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-400 mb-4 space-y-2">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
            </ul>

            <h2 className="text-xl font-bold text-white mt-8 mb-4 font-oswald">8. Contact Us</h2>
            <p className="text-gray-400 mb-4">
              For privacy-related inquiries, contact us at:
            </p>
            <p className="text-gray-400 mb-4">
              Email: shoot@gettupp.com<br />
              GettUpp Ent<br />
              Minneapolis, MN
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4 font-oswald">9. Changes to This Policy</h2>
            <p className="text-gray-400 mb-4">
              We may update this privacy policy from time to time. We will notify you of any changes 
              by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs uppercase tracking-widest font-inter">
            © 2025 GettUpp Ent. Minneapolis, MN
          </p>
          <div className="flex gap-6 text-sm text-gray-500 font-inter">
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
