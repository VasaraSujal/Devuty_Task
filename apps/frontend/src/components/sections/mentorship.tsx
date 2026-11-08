'use client';

import * as React from 'react';
import { 
  Video, 
  MessageSquare, 
  FileCheck, 
  CheckCircle2, 
  ArrowRight, 
  HeartHandshake
} from 'lucide-react';
import Link from 'next/link';

const mentorPillars = [
  {
    step: '01',
    title: 'Weekly 1:1 Video Strategy Sessions',
    description: 'Every week, the student meets privately with their assigned founder/mentor. We review working software, tear down roadblocks, debug database logic, and assign the next sprint.',
    icon: Video,
    highlight: '60-min weekly private video call',
  },
  {
    step: '02',
    title: 'Daily Async Feedback & Unblocking',
    description: 'Students never wait days when stuck on a bug or UI question. Mentors provide continuous asynchronous Loom video teardowns and chat unblocking throughout the week.',
    icon: MessageSquare,
    highlight: 'Continuous feedback loop via Slack / WhatsApp',
  },
  {
    step: '03',
    title: 'Strategic College Portfolio Narrative',
    description: 'Mentors help students articulate what they built into a compelling personal narrative. We translate real technical deliverables into standout essays, competitions, and portfolio links.',
    icon: FileCheck,
    highlight: 'Admissions & competition portfolio brief',
  },
];

export function Mentorship() {
  return (
    <section className="py-20 lg:py-28 bg-[#0B0C0E] border-b border-white/10 text-white" id="mentorship">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs border border-[#FF5E14]/40 bg-[#FF5E14]/5 text-[#FF5E14] text-xs font-mono uppercase tracking-widest">
            <HeartHandshake className="w-3.5 h-3.5 text-[#FF5E14]" />
            1-ON-1 GUIDANCE MODEL
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
            Private 1:1 Mentoring, <span className="text-[#FF5E14]">Not Group Lectures</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Every teenager thinks differently, builds differently, and moves at their own pace. 
            We match each student with an experienced founder who stays by their side from day 1 to launch day.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid gap-8 lg:grid-cols-3 items-stretch">
          {mentorPillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.step}
                className="p-8 rounded-md bg-[#121217] border border-white/10 hover:border-[#FF5E14]/50 hover:-translate-y-1 hover:shadow-[0_14px_28px_-6px_rgba(255,94,20,0.2)] transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-mono font-bold text-[#FF5E14]">
                      {pillar.step}
                    </span>
                    <div className="h-10 w-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-[#FF5E14] transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-white">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 text-xs font-semibold text-[#FF5E14] flex items-center gap-2 font-mono">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>{pillar.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why 15 Students Banner */}
        <div className="mt-14 p-8 sm:p-9 rounded-md bg-[#121217] border border-white/10">
          <div className="grid lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#FF5E14]">
                Quality Over Quantity
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                Strictly Capped at 15 Students Per Monthly Cohort
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
                Mass online bootcamps put 100 students in a Zoom webinar and call it mentorship. 
                Tactyqal Labs is intentionally boutique. We restrict each cohort to just 15 learners so mentors have the bandwidth to deeply understand your child&apos;s product and goals.
              </p>
            </div>

            <div className="lg:col-span-4 text-center lg:text-right">
              <Link href="#pricing">
                <button className="h-11 px-6 rounded-md bg-[#FF5E14] hover:bg-[#E0500D] text-white font-semibold text-sm shadow-sm flex items-center justify-center gap-2 mx-auto lg:ml-auto">
                  <span>Reserve a Cohort Seat</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
