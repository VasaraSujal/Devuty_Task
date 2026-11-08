'use client';

import * as React from 'react';
import { 
  Users, 
  Rocket, 
  Calendar, 
  Award, 
  ShieldCheck, 
  CheckCircle2
} from 'lucide-react';

const impactStats = [
  {
    number: '100+',
    label: 'High Schoolers Mentored',
    description: 'Students aged 13–18 who went from zero product experience to shipping functional software.',
    icon: Users,
    highlight: 'text-white',
  },
  {
    number: '50+',
    label: 'Live Apps Launched',
    description: 'Real applications with active users, database connections, and custom domains in production.',
    icon: Rocket,
    highlight: 'text-[#FF5E14]',
  },
  {
    number: '15',
    label: 'Seats Per Cohort',
    description: 'Strictly limited enrollment so every student gets guaranteed weekly 1-on-1 private founder time.',
    icon: Calendar,
    highlight: 'text-white',
  },
  {
    number: '8 Weeks',
    label: 'Curriculum Sprint',
    description: 'A focused, step-by-step sprint from initial problem discovery to public launch day.',
    icon: Award,
    highlight: 'text-[#FF5E14]',
  },
];

export function TrustImpact() {
  return (
    <section className="py-16 lg:py-20 bg-[#0B0C0E] border-b border-white/10 text-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs border border-[#FF5E14]/40 bg-[#FF5E14]/5 text-[#FF5E14] text-xs font-mono uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF5E14]" />
            PROOF-OF-WORK VERIFIED METRICS
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
            Built On Real Execution, Not Passive Certificates
          </h2>
          
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            We measure our success by what students actually build, launch, and ship. 
            No multiple-choice tests or theoretical lectures — just real-world software.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-md bg-[#121216] border border-white/10 hover:border-[#FF5E14]/50 hover:-translate-y-1 hover:shadow-[0_12px_28px_-6px_rgba(255,94,20,0.2)] transition-all duration-300 text-left group cursor-default"
            >
              <div className="h-10 w-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-[#FF5E14] group-hover:border-[#FF5E14]/40 group-hover:scale-110 transition-all duration-300 mb-4">
                <stat.icon className="h-5 w-5" />
              </div>

              <div className={`text-3xl sm:text-4xl font-heading font-extrabold ${stat.highlight} tracking-tight mb-1 transition-transform duration-300 group-hover:translate-x-0.5`}>
                {stat.number}
              </div>

              <div className="text-sm font-heading font-bold text-white mb-2 group-hover:text-zinc-100">
                {stat.label}
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badges Row */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs text-zinc-400">
          <span className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="h-4 w-4 text-[#FF5E14] shrink-0" />
            <span>Guaranteed 1:1 Weekly Private Mentor Access</span>
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="h-4 w-4 text-[#FF5E14] shrink-0" />
            <span>Full-Stack App Deployed to Custom Domain</span>
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="h-4 w-4 text-[#FF5E14] shrink-0" />
            <span>Proof-of-Work Portfolio for Top College Applications</span>
          </span>
        </div>

      </div>
    </section>
  );
}
