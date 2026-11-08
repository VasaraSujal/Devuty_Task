'use client';

import * as React from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  Mail, 
  Phone, 
  Clock, 
  ArrowUpRight, 
  Shield 
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050507] border-t border-white/10 text-zinc-400 py-16 lg:py-20" role="contentinfo" id="contact">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Brand & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2.5 group"
              aria-label="Tactyqal Labs Home"
            >
              <div className="h-8 w-8 rounded-md bg-[#FF5E14] flex items-center justify-center text-black font-extrabold shadow-sm group-hover:scale-105 transition-transform">
                <ChevronRight className="h-5 w-5 stroke-[3] text-black" />
              </div>
              <div>
                <span className="font-heading font-bold text-xl text-white tracking-tight block leading-none">
                  Tactyqal Labs
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF5E14] block mt-0.5">
                  Proof-of-Work Studio
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              Empowering youth builders aged 13–18 to transform ideas into launched software applications in 8 weeks with personalized 1:1 founder mentorship.
            </p>

            {/* Verified Contact Details */}
            <div className="space-y-2.5 pt-1 text-xs font-mono">
              <a 
                href="mailto:tactyqal.labs@gmail.com"
                className="flex items-center gap-2 text-zinc-300 hover:text-[#FF5E14] transition-colors"
              >
                <Mail className="h-4 w-4 text-[#FF5E14] shrink-0" />
                <span>tactyqal.labs@gmail.com</span>
              </a>

              <a 
                href="tel:+919804772106"
                className="flex items-center gap-2 text-zinc-300 hover:text-[#FF5E14] transition-colors"
              >
                <Phone className="h-4 w-4 text-[#FF5E14] shrink-0" />
                <span>+91-98047-72106</span>
              </a>

              <div className="flex items-center gap-2 text-zinc-400">
                <Clock className="h-4 w-4 text-[#FF5E14] shrink-0" />
                <span>Monday–Saturday, 9:00 AM – 7:00 PM IST</span>
              </div>
            </div>
          </div>

          {/* Navigation Column 1: Program */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              The Accelerator
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/#program" className="text-zinc-400 hover:text-white transition-colors">
                  8-Week Roadmap
                </Link>
              </li>
              <li>
                <Link href="/#outcomes" className="text-zinc-400 hover:text-white transition-colors">
                  Student Outcomes
                </Link>
              </li>
              <li>
                <Link href="/#mentorship" className="text-zinc-400 hover:text-white transition-colors">
                  1:1 Mentorship
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-zinc-400 hover:text-white transition-colors">
                  Pricing (₹16,000)
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-zinc-400 hover:text-white transition-colors">
                  Parent FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2: Ecosystem */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Founder Tools
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/#tools" className="text-zinc-400 hover:text-white transition-colors">
                  Startup Idea Generator
                </Link>
              </li>
              <li>
                <Link href="/#tools" className="text-zinc-400 hover:text-white transition-colors">
                  Pitch Deck Analyzer
                </Link>
              </li>
              <li>
                <Link href="/#tools" className="text-zinc-400 hover:text-white transition-colors">
                  Fundability Assessment
                </Link>
              </li>
              <li>
                <Link href="/#tools" className="text-zinc-400 hover:text-white transition-colors">
                  Cofounder Fit Test
                </Link>
              </li>
              <li>
                <Link href="/#tools" className="text-zinc-400 hover:text-white transition-colors">
                  Problem-Solution Fit
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 3: Publications & Portal */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Publications &amp; Staff
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/blog" className="text-zinc-400 hover:text-white transition-colors font-medium flex items-center gap-1">
                  <span>Editorial Insights</span>
                  <ArrowUpRight className="h-3 w-3 text-[#FF5E14]" />
                </Link>
              </li>
              <li>
                <Link href="/blog?category=product-strategy" className="text-zinc-400 hover:text-white transition-colors">
                  Product Strategy
                </Link>
              </li>
              <li>
                <Link href="/blog?category=engineering" className="text-zinc-400 hover:text-white transition-colors">
                  No-Code Engineering
                </Link>
              </li>
              <li>
                <Link href="/blog?category=startup-growth" className="text-zinc-400 hover:text-white transition-colors">
                  College Admissions
                </Link>
              </li>
              <li className="pt-2">
                <Link 
                  href="/admin/login" 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-[#16161D] border border-white/10 text-zinc-300 hover:text-white text-[11px] font-mono transition-colors"
                >
                  <Shield className="h-3 w-3 text-[#FF5E14]" />
                  <span>Admin CMS Login</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Guarantee */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div>
            &copy; {currentYear} Tactyqal Labs. All rights reserved.
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <span>Idea to Full-Stack App in 8 Weeks</span>
            <span>&bull;</span>
            <span>15 Openings Monthly</span>
            <span>&bull;</span>
            <span>1:1 Mentored Learning</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
