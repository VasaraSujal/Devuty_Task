'use client';

import * as React from 'react';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  Smartphone,
  ShoppingBag,
  BookOpen,
  Award
} from 'lucide-react';

interface Project {
  title: string;
  badge: string;
  domain: string;
  student: string;
  ageGrade: string;
  problem: string;
  solution: string;
  impactMetric: string;
  techStack: string[];
  icon: any;
}

const projects: Project[] = [
  {
    title: 'KrishiDrishti',
    badge: 'AgriTech AI',
    domain: 'krishidrishti.app',
    student: 'Aarav Sharma',
    ageGrade: 'Age 16, Grade 11',
    problem: 'Local farmers were losing up to 30% of paddy yields due to late-stage blight detection and expensive agricultural consultants.',
    solution: 'A lightweight mobile web app allowing farmers to photograph affected leaves and receive instant diagnosis and organic treatment remedies.',
    impactMetric: '1,200+ farm scans analyzed across 4 rural districts',
    techStack: ['FlutterFlow', 'Vision Classifier API', 'Supabase'],
    icon: Smartphone,
  },
  {
    title: 'Elenor Vegan Handbags',
    badge: 'Sustainable E-Commerce',
    domain: 'elenorhandbags.com',
    student: 'Riya Kapoor',
    ageGrade: 'Age 17, Grade 12',
    problem: 'Independent plant-based leather artisans struggled to reach conscious urban buyers without high platform fees.',
    solution: 'A multi-vendor marketplace with vendor dashboards, secure payment processing, and artisan storytelling profiles.',
    impactMetric: '12 artisan brands onboarded; full MVP live in 8 weeks',
    techStack: ['Bubble Visual Engine', 'Stripe Connect', 'PostgreSQL'],
    icon: ShoppingBag,
  },
  {
    title: 'One Last Chapter',
    badge: 'Literary Community',
    domain: 'onelastchapter.club',
    student: 'Siddharth Mehta',
    ageGrade: 'Age 15, Grade 10',
    problem: 'Passionate teen readers had shelves of finished books with no easy peer-to-peer neighborhood exchange platform.',
    solution: 'A relational platform where members list their bookshelf, search for rare editions by local radius, and arrange safe book swaps.',
    impactMetric: '200+ active beta readers onboarded in first month',
    techStack: ['Relational Database', 'User Auth', 'Dynamic Feeds'],
    icon: BookOpen,
  },
];

export function StudentShowcase() {
  return (
    <section className="py-20 lg:py-28 bg-[#070709] text-white border-b border-white/10" id="outcomes">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs border border-[#FF5E14]/40 bg-[#FF5E14]/5 text-[#FF5E14] text-xs font-mono uppercase tracking-widest">
            <Award className="w-3.5 h-3.5 text-[#FF5E14]" />
            PROOF-OF-WORK STUDENT DELIVERABLES
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
            What Our Students <span className="text-[#FF5E14]">Actually Build</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            These are not toy homework exercises or template clones. Our students identify genuine community problems, 
            interview real people, and launch functional software products.
          </p>
        </div>

        {/* 3 Project Cards Grid */}
        <div className="grid gap-8 lg:grid-cols-3 items-stretch">
          {projects.map((proj) => {
            const Icon = proj.icon;

            return (
              <div
                key={proj.title}
                className="rounded-md border border-white/10 bg-[#111116] hover:border-[#FF5E14]/60 hover:-translate-y-1.5 hover:shadow-[0_20px_35px_-10px_rgba(255,94,20,0.22)] transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-lg"
              >
                {/* Card Header Bar */}
                <div className="bg-[#16161D] border-b border-white/10 p-5 flex items-center justify-between group-hover:border-white/20 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-md bg-[#FF5E14] text-black font-bold flex items-center justify-center group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(255,94,20,0.4)] transition-all duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="font-heading font-bold text-base block text-white leading-none">
                        {proj.title}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-400 block mt-0.5">
                        {proj.domain}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-xs bg-[#FF5E14]/15 text-[#FF5E14] border border-[#FF5E14]/30">
                    {proj.badge}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4 flex-1">
                  {/* Student Tag */}
                  <div className="text-xs text-zinc-400 font-mono pb-1 border-b border-white/10 flex items-center justify-between">
                    <span>Founder: <strong className="text-white">{proj.student}</strong></span>
                    <span>{proj.ageGrade}</span>
                  </div>

                  {/* Problem & Solution */}
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-0.5">
                        The Problem
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {proj.problem}
                      </p>
                    </div>

                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-0.5">
                        What Was Built
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {proj.solution}
                      </p>
                    </div>
                  </div>

                  {/* Verified Impact Box */}
                  <div className="p-3.5 rounded-md bg-[#FF5E14]/10 border border-[#FF5E14]/30 text-xs">
                    <span className="font-bold text-[#FF5E14] block mb-0.5 font-mono">
                      Verified Result:
                    </span>
                    <span className="text-zinc-200 font-medium">
                      {proj.impactMetric}
                    </span>
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-xs font-mono text-zinc-400">
                      Tools used:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.techStack.map((tech) => (
                        <span 
                          key={tech} 
                          className="text-[11px] font-mono px-2 py-0.5 rounded-xs bg-white/5 border border-white/10 text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 bg-[#16161D] border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Built in 8-week cohort</span>
                  <Link 
                    href="#pricing"
                    className="text-xs font-bold text-[#FF5E14] hover:underline flex items-center gap-1"
                  >
                    <span>Enroll Next Cohort</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
