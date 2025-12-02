"use client";

import Link from "next/link";
import { Crown, FileText } from "lucide-react";

export default function TermsPage() {
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
            <FileText className="h-4 w-4 text-[#D9AE43]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D9AE43] font-oswald">
              Legal
            </span>
          </div>
          <h1 className="font-oswald text-4xl md:text-5xl font-black uppercase mb-8">
            Terms of <span className="text-[#D9AE43]">Service</span>
          </h1>
          
          <div className="prose prose-invert max-w-none font-inter">
            <p className="text-gray-400 mb-6">
              Last updated: December 2025
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4 font-oswald">1. Services</h2>
            <p className="text-gray-400 mb-4">
              GettUpp Ent ("we," "us," "our") provides professional nightlife photography and content 
              creation services to venues and businesses in the Minneapolis metro area.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4 font-oswald">2. Pilot Program</h2>
            <p className="text-gray-400 mb-4">
              The Pilot Night package is a one-time $345 service that includes one (1) on-site shoot 
              (3-4 hours), thirty (30) edited photos, and delivery within 72 hours. This is not a 
              subscription and carries no ongoing commitment.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4 font-oswald">3. Retainer Subscriptions</h2>
            <p className="text-gray-400 mb-4">
              Monthly retainer packages (T1, T2, T3) are billed monthly. After an initial 3-month 
              commitment period, subscriptions may be cancelled with 30 days written notice.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4 font-oswald">4. Reshoot Guarantee</h2>
            <p className="text-gray-400 mb-4">
              If you are unsatisfied with the quality of photos delivered, we will reshoot at no 
              additional cost. Reshoot requests must be made within 7 days of delivery.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4 font-oswald">5. Image Rights</h2>
            <p className="text-gray-400 mb-4">
              Upon payment, clients receive full commercial usage rights to all delivered photos for 
              their venue's marketing purposes. GettUpp Ent retains the right to use images in our 
              portfolio and marketing materials unless otherwise agreed in writing.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4 font-oswald">6. Payment Terms</h2>
            <p className="text-gray-400 mb-4">
              Payment is due at time of booking for Pilot packages. Retainer subscriptions are billed 
              on the 1st of each month. A 2% discount is available for ACH payments. Late payments 
              may result in service suspension.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4 font-oswald">7. Cancellation</h2>
            <p className="text-gray-400 mb-4">
              Shoots may be rescheduled with 48 hours notice at no charge. Cancellations with less 
              than 24 hours notice may incur a 50% fee.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4 font-oswald">8. Limitation of Liability</h2>
            <p className="text-gray-400 mb-4">
              GettUpp Ent's liability is limited to the amount paid for services. We are not 
              responsible for indirect, incidental, or consequential damages.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4 font-oswald">9. Contact</h2>
            <p className="text-gray-400 mb-4">
              Questions about these terms? Contact us at shoot@gettupp.com
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
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
