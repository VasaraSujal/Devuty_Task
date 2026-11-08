'use client';

import * as React from 'react';
import Link from 'next/link';
import { 
  Lightbulb, 
  Palette, 
  Code, 
  Rocket, 
  CheckCircle2, 
  ArrowRight, 
  Target,
  Compass
} from 'lucide-react';

interface Stage {
  number: number;
  weeks: string;
  title: string;
  shortDesc: string;
  focus: string;
  icon: any;
  deliverables: string[];
  mentorRole: string;
  studentMilestone: string;
}

const stages: Stage[] = [
  {
    number: 1,
    weeks: 'Weeks 1 & 2',
    title: 'Ideation & Problem Discovery',
    shortDesc: 'Discover problems worth solving. Validate hypotheses with real people before building.',
    focus: 'Problem Discovery, Market Sizing, Customer Interviews',
    icon: Lightbulb,
    deliverables: [
      'Problem-Solution Fit Framework canvas',
      'Target User Persona & Empathy Map',
      'Competitor Landscape Breakdown',
      'Initial 10 Customer Discovery Interviews',
    ],
    mentorRole: '1:1 critique of startup ideas, challenging assumptions, and refining a narrow, solvable initial scope.',
    studentMilestone: 'A crystal-clear, validated product brief outlining an urgent real-world problem.',
  },
  {
    number: 2,
    weeks: 'Weeks 3 & 4',
    title: 'UX/UI Wireframing & Prototyping',
    shortDesc: 'Translate validated customer needs into intuitive visual flows and clickable prototypes.',
    focus: 'User Journey Mapping, Wireframes, Interactive Prototyping',
    icon: Palette,
    deliverables: [
      'End-to-End User Journey Flows',
      'Mobile & Desktop Wireframe Architecture',
      'Figma Component Library & Style System',
      'Clickable Interactive Prototype for User Testing',
    ],
    mentorRole: 'Design architecture review, visual hierarchy guidance, and user experience stress-testing.',
    studentMilestone: 'A fully interactive, clickable prototype tested with at least 5 target users.',
  },
  {
    number: 3,
    weeks: 'Weeks 5 & 6',
    title: 'Visual Development & Database Architecture',
    shortDesc: 'Build the full-stack engine using modern visual tools (Bubble, FlutterFlow, Supabase).',
    focus: 'Relational Database Schema, Visual Workflows, API Integrations',
    icon: Code,
    deliverables: [
      'Relational PostgreSQL / Supabase Schema modeling',
      'Secure User Sign Up, Login, and Session Auth',
      'Core dynamic workflows and database queries',
      'Third-party API hooks (Stripe payments, AI, or notifications)',
    ],
    mentorRole: 'Pair-building sessions, database normalization review, and debugging logic workflows.',
    studentMilestone: 'A fully functional software application where users can create accounts and execute data flows.',
  },
  {
    number: 4,
    weeks: 'Weeks 7 & 8',
    title: 'Deployment, Launch & First Users',
    shortDesc: 'Connect custom domains, optimize performance, acquire initial users, and prepare founder pitch deck.',
    focus: 'Production Deployment, Launch Strategy, College Portfolio',
    icon: Rocket,
    deliverables: [
      'Custom Domain Connection (e.g. yourbrand.com)',
      'High-Conversion Landing Page & Product Brief',
      'Alumni Demo Day Presentation Pitch Deck',
      'Verified College Application Portfolio Summary',
    ],
    mentorRole: 'Launch checklist audit, pitch deck storytelling critique, and collegiate portfolio curation.',
    studentMilestone: 'A live, publicly accessible product with real active users and an authentic founder narrative.',
  },
];

export function ProgramRoadmap() {
  const [selectedStage, setSelectedStage] = React.useState<Stage>(stages[0]);

  return (
    <section className="py-20 lg:py-28 bg-[#0B0C0E] border-b border-white/10 text-white" id="program">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs border border-[#FF5E14]/40 bg-[#FF5E14]/5 text-[#FF5E14] text-xs font-mono uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5 text-[#FF5E14]" />
            THE 8-WEEK SPRINT CURRICULUM
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
            From Blank Canvas to Live App in <span className="text-[#FF5E14]">4 Focused Sprints</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Every week combines self-paced building with dedicated 1-on-1 mentor guidance. 
            Click each sprint below to explore what students accomplish.
          </p>
        </div>

        {/* Stage Timeline Navigation Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
          {stages.map((stg) => {
            const isSelected = selectedStage.number === stg.number;
            const Icon = stg.icon;

            return (
              <button
                key={stg.number}
                onClick={() => setSelectedStage(stg)}
                className={`p-4 sm:p-5 rounded-md border text-left transition-all ${
                  isSelected
                    ? 'bg-[#15151B] border-[#FF5E14] shadow-lg shadow-[#FF5E14]/15 ring-1 ring-[#FF5E14]'
                    : 'bg-[#101014] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`h-9 w-9 rounded-md flex items-center justify-center ${
                    isSelected ? 'bg-[#FF5E14] text-black font-bold' : 'bg-white/5 text-zinc-300'
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded-xs ${
                    isSelected ? 'bg-[#FF5E14]/20 text-[#FF5E14]' : 'bg-white/5 text-zinc-400'
                  }`}>
                    {stg.weeks}
                  </span>
                </div>

                <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Sprint {stg.number}
                </div>
                <div className="text-sm sm:text-base font-heading font-bold text-white mt-0.5 truncate">
                  {stg.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Deep-Dive Card */}
        <div key={selectedStage.number} className="rounded-md border border-white/10 bg-[#121217] p-6 sm:p-9 shadow-xl animate-fade-in">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Stage Overview & Focus (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-1 rounded-xs bg-[#FF5E14]/15 text-[#FF5E14] border border-[#FF5E14]/30">
                  {selectedStage.weeks}
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  Sprint {selectedStage.number} of 4
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                {selectedStage.title}
              </h3>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {selectedStage.shortDesc}
              </p>

              {/* Milestone Checkpoint Box */}
              <div className="p-4 rounded-md bg-[#16161D] border border-white/10 space-y-1.5">
                <div className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                  <Target className="h-4 w-4 text-[#FF5E14]" />
                  Sprint Checkpoint Milestone:
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 font-medium">
                  {selectedStage.studentMilestone}
                </p>
              </div>

              {/* 1:1 Mentor Role Box */}
              <div className="p-4 rounded-md bg-[#FF5E14]/10 border border-[#FF5E14]/30 space-y-1.5">
                <div className="text-xs font-bold text-[#FF5E14] font-mono uppercase tracking-wider">
                  1-on-1 Mentor Guidance During This Sprint:
                </div>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                  {selectedStage.mentorRole}
                </p>
              </div>
            </div>

            {/* Right Column: Weekly Deliverables Checklist (6 cols) */}
            <div className="lg:col-span-6 space-y-5 bg-[#0D0D10] p-6 sm:p-7 rounded-md border border-white/10">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                  Sprint Deliverables
                </span>
                <span className="text-xs text-zinc-400">
                  Completed with Mentor
                </span>
              </div>

              <div className="space-y-3.5">
                {selectedStage.deliverables.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[#FF5E14] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-zinc-200 font-medium leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                <span>Time commitment: 3–5 hrs/week</span>
                <Link href="#pricing" className="text-[#FF5E14] font-bold hover:underline flex items-center gap-1">
                  <span>Enroll in Cohort</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
