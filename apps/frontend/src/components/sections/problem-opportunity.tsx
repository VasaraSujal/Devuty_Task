'use client';

import * as React from 'react';
import { 
  XCircle, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';

export function ProblemOpportunity() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#070709] text-white border-b border-white/10 overflow-hidden" id="why">
      {/* Background Radial Glow Accent */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,94,20,0.07),transparent_70%)] pointer-events-none" 
        aria-hidden="true"
      />
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs border border-white/20 bg-white/5 text-zinc-300 text-xs font-mono uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5 text-[#FF5E14]" />
            THE HIGH SCHOOL LEARNING GAP
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
            Why Standard Coding Classes Leave Students <span className="text-[#FF5E14]">Behind</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Standard classes teach abstract syntax drills, but rarely teach how to build something real users value. 
            Here is how Tactyqal Labs changes the equation for young builders.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Card 1: Standard Coding Classes */}
          <div className="p-8 rounded-md border border-white/10 bg-[#101013] flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-xs">
                  Standard School Classes
                </span>
                <span className="text-xs text-zinc-400 font-medium">Theory First</span>
              </div>

              <h3 className="text-xl font-heading font-bold text-white">
                Memorizing Syntax Without Ever Launching
              </h3>

              <p className="text-sm text-zinc-400 leading-relaxed">
                Most high school programming curricula focus on abstract loops, textbook exercises, and syntax tests. 
                Students spend hours fixing semicolons, but never experience what it feels like to ship a live app or talk to real users.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-zinc-300">
                    <strong className="text-white">Terminal-Only Projects:</strong> Toy programs that never leave the laptop screen or solve a real problem.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-zinc-300">
                    <strong className="text-white">1:30 Teacher Ratios:</strong> Large group sessions where students get stuck and lose motivation.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-zinc-300">
                    <strong className="text-white">Generic Certificates:</strong> Course completion badges that fail to stand out on competitive university applications.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-white/10 text-xs text-rose-400 font-mono">
              End Result: Low student agency and no tangible proof-of-work.
            </div>
          </div>

          {/* Card 2: The Tactyqal Labs Method */}
          <div className="p-8 rounded-md border-2 border-[#FF5E14] bg-[#121217] shadow-xl hover:shadow-[0_0_40px_rgba(255,94,20,0.25)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6 relative">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/30 px-2.5 py-1 rounded-xs">
                  The Tactyqal Method
                </span>
                <span className="text-xs text-[#FF5E14] font-semibold">100% Practical</span>
              </div>

              <h3 className="text-xl font-heading font-bold text-white">
                1-on-1 Mentorship to Launch a Real Product
              </h3>

              <p className="text-sm text-zinc-300 leading-relaxed">
                By leveraging modern visual development tools (FlutterFlow, Bubble, Supabase), 
                students skip weeks of boilerplate syntax and jump straight into solving real problems, 
                designing intuitive interfaces, and launching to real users.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#FF5E14] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-zinc-300">
                    <strong className="text-white">Private 1:1 Mentorship:</strong> Paired with an experienced founder/engineer every single week to build, critique, and launch.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#FF5E14] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-zinc-300">
                    <strong className="text-white">Live Production App:</strong> A functioning web or mobile application with user auth, relational databases, and a custom URL.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#FF5E14] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-zinc-300">
                    <strong className="text-white">Proof-of-Work Distinction:</strong> Concrete evidence of leadership and technical capability that brings college essays to life.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#FF5E14] font-medium">
                End Result: Real software, real users, and genuine founder confidence.
              </span>

              <Link href="#program" className="text-xs font-bold text-white hover:text-[#FF5E14] flex items-center gap-1 transition-colors">
                <span>View Syllabus</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
