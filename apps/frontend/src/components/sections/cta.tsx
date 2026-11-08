'use client';

import * as React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  ShieldCheck, 
  Mail, 
  Phone,
  Rocket
} from 'lucide-react';

export function CTA() {
  return (
    <section className="py-20 lg:py-28 bg-[#070709] text-white border-b border-white/10" id="enroll">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Callout Card */}
        <div className="rounded-md bg-[#121217] border border-white/10 p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          
          {/* Urgency Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xs bg-[#FF5E14]/10 text-[#FF5E14] text-xs font-mono uppercase tracking-widest border border-[#FF5E14]/30">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5E14] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5E14]" />
            </span>
            <span>NEXT COHORT CAPPED AT 15 SEATS &bull; APPLICATIONS REVIEWED WEEKLY</span>
          </div>

          {/* Closing Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight max-w-3xl mx-auto">
            Give Your Teen The Real-World Advantage Of Building A Real Product
          </h2>

          {/* Subhead */}
          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            In 8 weeks, they will go from an idea on paper to a live, functioning app with active users. 
            Supported by weekly 1-on-1 founder mentorship and a 100% money-back guarantee.
          </p>

          {/* Dual Action Buttons matching Devuty's exact styling */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link href="/#pricing" className="w-full sm:w-auto">
              <button 
                className="w-full sm:w-auto h-12 px-8 text-sm font-semibold rounded-md bg-[#FF5E14] hover:bg-[#E0500D] hover:scale-[1.02] active:scale-[0.98] text-white shadow-lg shadow-[#FF5E14]/30 hover:shadow-[#FF5E14]/50 flex items-center justify-center gap-2 transition-all group"
              >
                <Rocket className="h-4 w-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                <span>Enroll in Next Cohort (₹16,000)</span>
              </button>
            </Link>

            <a 
              href="tel:+919804772106"
              className="w-full sm:w-auto"
            >
              <button 
                className="w-full sm:w-auto h-12 px-6 text-sm font-medium rounded-md border border-white/80 bg-transparent hover:bg-white/10 hover:border-white hover:scale-[1.02] active:scale-[0.98] text-white flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="h-4 w-4" />
                <span>Call Admissions: +91-98047-72106</span>
              </button>
            </a>
          </div>

          {/* Verified Contact Strip */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-xs text-zinc-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-[#FF5E14]" />
              <span>tactyqal.labs@gmail.com</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-[#FF5E14]" />
              <span>+91-98047-72106</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-[#FF5E14]" />
              <span>Mon–Sat, 9 AM–7 PM IST</span>
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
