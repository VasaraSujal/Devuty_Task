'use client';

import * as React from 'react';
import { 
  GraduationCap, 
  Award, 
  Newspaper,
  Star
} from 'lucide-react';

const alumniTestimonials = [
  {
    quote: "I never thought I could build a real app without knowing traditional syntax. The 1:1 mentorship changed everything. Having an experienced founder review my database schema and UI workflows every Saturday gave me the confidence to actually ship.",
    author: "Isha Patel",
    role: "Student Builder (Age 16)",
    outcome: "Built & Launched Community App",
    tag: "High School Founder",
  },
  {
    quote: "The project I built at Tactyqal Labs was the centerpiece of my university applications. In every single interview, the admissions officers skipped the generic questions and asked me to walk them through how I acquired my first 100 users.",
    author: "Devansh Mehta",
    role: "Alumni (Now at Top Tech Program)",
    outcome: "Admissions Distinction",
    tag: "College Applicant",
  },
];

const collegiateOutcomes = [
  {
    title: 'Top Tier & Ivy League Distinctiveness',
    description: 'Admissions committees review thousands of high-GPA transcripts. Presenting a launched, deployed app with real active users provides unambiguous proof of leadership and grit.',
    icon: GraduationCap,
  },
  {
    title: 'Youth Innovation Grants & Competitions',
    description: 'Students use their functional Tactyqal MVPs and pitch decks to enter prestigious national and international youth entrepreneurship awards and innovation hackathons.',
    icon: Award,
  },
  {
    title: 'Authentic College Essay Narratives',
    description: 'Rather than writing generic essays about classroom projects, our alumni write vivid stories about customer discovery, overcoming database bugs, and deploying software to the real world.',
    icon: Newspaper,
  },
];

export function SuccessStories() {
  return (
    <section className="py-20 lg:py-28 bg-[#0B0C0E] border-b border-white/10 text-white" id="stories">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs border border-[#FF5E14]/40 bg-[#FF5E14]/5 text-[#FF5E14] text-xs font-mono uppercase tracking-widest">
            <Star className="w-3.5 h-3.5 text-[#FF5E14] fill-[#FF5E14]" />
            PROOF-OF-WORK ALUMNI STORIES
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
            Real Stories From <span className="text-[#FF5E14]">Ambitious Teen Builders</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            See how alumni translated 8 weeks of focused 1:1 mentoring into life-changing academic and entrepreneurial opportunities.
          </p>
        </div>

        {/* 2 Featured Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 mb-16">
          {alumniTestimonials.map((item) => (
            <div
              key={item.author}
              className="p-8 rounded-md bg-[#121217] border border-white/10 hover:border-[#FF5E14]/50 hover:-translate-y-1 hover:shadow-[0_14px_28px_-6px_rgba(255,94,20,0.2)] transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#FF5E14]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#FF5E14] text-[#FF5E14]" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-xs bg-[#FF5E14]/15 text-[#FF5E14] border border-[#FF5E14]/30">
                    {item.tag}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-sm font-heading font-bold text-white">
                    {item.author}
                  </div>
                  <div className="text-xs text-zinc-400">
                    {item.role}
                  </div>
                </div>

                <span className="text-xs font-mono text-[#FF5E14] bg-[#FF5E14]/10 border border-[#FF5E14]/20 px-2.5 py-1 rounded-xs">
                  {item.outcome}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Outcome Pillars Row */}
        <div className="grid gap-6 md:grid-cols-3">
          {collegiateOutcomes.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.title}
                className="p-6 rounded-md bg-[#121217] border border-white/10 space-y-3"
              >
                <div className="h-10 w-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[#FF5E14]">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-base font-heading font-bold text-white">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
