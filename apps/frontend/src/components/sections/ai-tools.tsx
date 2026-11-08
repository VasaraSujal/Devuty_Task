'use client';

import * as React from 'react';
import { 
  Lightbulb, 
  TrendingUp, 
  FileText, 
  HeartHandshake, 
  Target, 
  Layout, 
  ArrowRight,
  Wrench
} from 'lucide-react';
import Link from 'next/link';

interface ToolItem {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: any;
  howItWorks: string;
}

const toolSuite: ToolItem[] = [
  {
    id: 'idea-generator',
    name: 'Startup Idea Generator',
    category: 'Discovery Tool',
    description: 'Helps students uncover high-value problems in agriculture, health, education, and sustainability tailored to their genuine personal interests.',
    icon: Lightbulb,
    howItWorks: 'Synthesizes teenage interests with real-world industry pain points to uncover viable app niches.',
  },
  {
    id: 'fundability',
    name: 'Fundability Assessment',
    category: 'Venture Evaluation',
    description: 'Evaluates project viability, target market size, and customer willingness to pay before students write a single workflow.',
    icon: TrendingUp,
    howItWorks: 'Assesses problem severity, user audience, and competitive moat of the student concept.',
  },
  {
    id: 'pitch-deck',
    name: 'Pitch Deck Analyzer',
    category: 'Storytelling',
    description: 'Scores slide storytelling, problem clarity, metrics presentation, and admissions essay readiness.',
    icon: FileText,
    howItWorks: 'Analyzes presentation briefs against winning university portfolio and competition criteria.',
  },
  {
    id: 'cofounder-fit',
    name: 'Cofounder Compatibility',
    category: 'Team Alignment',
    description: 'Evaluates working style, vision alignment, and commitment levels for students collaborating on a build.',
    icon: HeartHandshake,
    howItWorks: 'Aligns expectations around weekly time commitment, decision rights, and technical roles.',
  },
  {
    id: 'problem-solution',
    name: 'Problem-Solution Fit',
    category: 'Validation Protocol',
    description: 'A structured checklist ensuring the app solution directly alleviates the user pain points discovered in interviews.',
    icon: Target,
    howItWorks: 'Verifies whether each proposed software feature directly maps to a verified customer friction point.',
  },
  {
    id: 'landing-page',
    name: 'Landing Page Analyzer',
    category: 'Launch Optimization',
    description: 'Reviews student app landing pages for headline clarity, mobile responsiveness, and call-to-action effectiveness.',
    icon: Layout,
    howItWorks: 'Evaluates copy, visual hierarchy, and trust factors to maximize early adopter sign-ups.',
  },
];

export function AITools() {
  return (
    <section className="py-20 lg:py-28 bg-[#070709] text-white border-b border-white/10" id="tools">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs border border-[#FF5E14]/40 bg-[#FF5E14]/5 text-[#FF5E14] text-xs font-mono uppercase tracking-widest">
            <Wrench className="w-3.5 h-3.5 text-[#FF5E14]" />
            FOUNDER TOOLING SUITE
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
            Founder Tools Built Into the <span className="text-[#FF5E14]">Curriculum</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Students learn to use proprietary validation frameworks to stress-test their ideas, 
            evaluate market readiness, and refine their presentation decks.
          </p>
        </div>

        {/* 6 Tools Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {toolSuite.map((tool) => {
            const Icon = tool.icon;

            return (
              <div
                key={tool.id}
                className="p-6 rounded-md border border-white/10 bg-[#111116] hover:border-[#FF5E14]/60 hover:-translate-y-1 hover:shadow-[0_14px_28px_-6px_rgba(255,94,20,0.2)] transition-all duration-300 flex flex-col justify-between space-y-4 group cursor-default"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[#FF5E14] group-hover:scale-110 group-hover:bg-[#FF5E14]/10 transition-all duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-xs">
                      {tool.category}
                    </span>
                  </div>

                  <h3 className="text-base font-heading font-bold text-white group-hover:text-[#FF5E14] transition-colors">
                    {tool.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 text-xs text-zinc-400 flex items-center justify-between font-mono">
                  <span>Included in Cohort</span>
                  <Link href="#pricing" className="text-[#FF5E14] font-semibold hover:underline flex items-center gap-1">
                    <span>Learn More</span>
                    <ArrowRight className="h-3 w-3" />
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
