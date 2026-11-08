'use client';

import * as React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

const cohortInclusions = [
  '8 Weekly 1:1 private mentor video sessions (60 min each)',
  'Structured 4-sprint accelerator curriculum (Ideation to Launch)',
  'Modern visual development & relational database setup',
  'Third-party API integrations (AI, notifications, payments)',
  'Custom domain deployment & mobile web optimization',
  'Collegiate admissions portfolio brief & founder essay story',
  'Tactyqal Labs Certificate of Completion',
  'Lifetime access to founder community & alumni network',
];

export function Pricing() {
  return (
    <section className="py-20 lg:py-28 bg-[#070709] text-white border-b border-white/10" id="pricing">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs border border-[#FF5E14]/40 bg-[#FF5E14]/5 text-[#FF5E14] text-xs font-mono uppercase tracking-widest">
            TRANSPARENT COHORT PRICING
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-white">
            Simple, Transparent Cohort <span className="text-[#FF5E14]">Pricing</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            One all-inclusive investment covering 8 weeks of intensive 1-on-1 mentorship, 
            full technical guidance, and launching a live product.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-3xl mx-auto relative">
          {/* Ambient Spotlight Behind Card */}
          <div 
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-[#FF5E14]/15 blur-[100px] rounded-full pointer-events-none" 
            aria-hidden="true"
          />

          <div className="rounded-md border-2 border-[#FF5E14] bg-[#121217] shadow-2xl p-8 sm:p-12 relative z-10">
            
            {/* Top Pill */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/10">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#FF5E14] bg-[#FF5E14]/15 border border-[#FF5E14]/30 px-3 py-1 rounded-xs inline-block mb-2">
                  Flagship 8-Week Program
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                  Youth Builder Accelerator
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Ages 13–18 &bull; Private 1:1 Mentoring &bull; Idea to Live Application
                </p>
              </div>

              <div className="sm:text-right shrink-0">
                <div className="flex items-baseline sm:justify-end gap-1">
                  <span className="text-4xl sm:text-5xl font-heading font-extrabold text-white">
                    ₹16,000
                  </span>
                  <span className="text-sm text-zinc-400 font-medium">
                    / cohort
                  </span>
                </div>
                <span className="text-xs text-[#FF5E14] font-mono block mt-1">
                  All-inclusive &bull; No hidden fees
                </span>
              </div>
            </div>

            {/* Inclusions checklist */}
            <div className="py-8 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Everything Included in Your Cohort:
              </h4>

              <div className="grid sm:grid-cols-2 gap-3.5 pt-1">
                {cohortInclusions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#FF5E14] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-zinc-300 font-medium leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantee and Cap Banner */}
            <div className="p-4 rounded-md bg-[#16161D] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#FF5E14] shrink-0" />
                <span><strong className="text-white">Results Guaranteed:</strong> Full refund if your teen does not launch a working app.</span>
              </div>
              <div className="font-semibold text-[#FF5E14] font-mono shrink-0">
                15 Seats Max Per Cohort
              </div>
            </div>

            {/* CTA Buttons matching Devuty's buttons */}
            <div className="pt-8 flex flex-col sm:flex-row items-center gap-4">
              <a 
                href="tel:+919804772106"
                className="w-full sm:flex-1"
              >
                <button 
                  className="w-full h-12 text-sm font-semibold rounded-md bg-[#FF5E14] hover:bg-[#E0500D] hover:scale-[1.02] active:scale-[0.98] text-white shadow-lg shadow-[#FF5E14]/30 hover:shadow-[#FF5E14]/50 flex items-center justify-center gap-2 transition-all group"
                >
                  <span>Enroll in Cohort (₹16,000)</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </a>

              <a 
                href="mailto:tactyqal.labs@gmail.com?subject=Tactyqal%20Labs%20Consultation"
                className="w-full sm:w-auto"
              >
                <button 
                  className="w-full sm:w-auto h-12 px-6 text-sm font-medium rounded-md border border-white/80 hover:bg-white/10 text-white transition-all flex items-center justify-center"
                >
                  Schedule a Consultation
                </button>
              </a>
            </div>

            {/* Contact strip note */}
            <div className="pt-5 text-center text-xs text-zinc-400">
              Questions before enrolling? Speak directly with our admissions team at{' '}
              <a href="tel:+919804772106" className="text-[#FF5E14] font-semibold hover:underline">
                +91-98047-72106
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
