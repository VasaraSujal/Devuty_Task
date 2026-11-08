'use client';

import * as React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  ChevronRight,
  ShieldCheck, 
  CheckCircle2,
  ExternalLink,
  Terminal,
  Code2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section 
      id="home"
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#070709] text-white overflow-hidden border-b border-white/10"
      aria-labelledby="hero-headline"
    >
      {/* Background Layer 1: High-Tech Cyber Blueprint Grid */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_40%,transparent_90%)] pointer-events-none" 
        aria-hidden="true"
      />

      {/* Background Layer 2: HUD & Concentric Rings (Devuty Signature Motif with Dual-Rotation & Radar Sweep) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
        
        {/* Sweeping 360° Conic Radar Beam */}
        <div className="absolute w-[750px] h-[750px] sm:w-[1150px] sm:h-[1150px] rounded-full [background:conic-gradient(from_0deg,transparent_0deg,transparent_280deg,rgba(255,94,20,0.16)_360deg)] animate-radar-sweep pointer-events-none" />

        {/* Central Ambient Radiant Flare */}
        <div className="absolute w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] rounded-full bg-[#FF5E14]/15 animate-glow-pulse pointer-events-none" />

        {/* Floating Secondary Flare */}
        <div className="absolute -bottom-20 -right-20 w-[420px] h-[420px] rounded-full bg-[#FF7A00]/10 blur-[130px] animate-float-slow pointer-events-none" />

        {/* Layer 1: Outer Slow Clockwise Ring (50s) with Orbiting Satellite Beacons */}
        <svg 
          viewBox="0 0 1000 1000" 
          className="absolute w-[950px] h-[950px] sm:w-[1300px] sm:h-[1300px] animate-spin-slow text-[#FF5E14] opacity-35"
          fill="none" 
          stroke="currentColor"
        >
          {/* Outermost calibration ring */}
          <circle cx="500" cy="500" r="475" strokeWidth="1" strokeDasharray="4 8" opacity="0.35" />
          <circle cx="500" cy="500" r="440" strokeWidth="1.2" strokeDasharray="30 15" strokeOpacity="0.55" />
          
          {/* Cardinal arcs */}
          <path d="M 180 500 A 320 320 0 0 1 500 180" strokeWidth="3" stroke="#FF5E14" opacity="0.8" />
          <path d="M 820 500 A 320 320 0 0 1 500 820" strokeWidth="3" stroke="#FF5E14" opacity="0.8" />
          
          {/* Orbiting glowing data satellite beacons */}
          <circle cx="180" cy="500" r="6" fill="#FF5E14" filter="drop-shadow(0 0 8px #FF5E14)" />
          <circle cx="820" cy="500" r="6" fill="#FF5E14" filter="drop-shadow(0 0 8px #FF5E14)" />
          <circle cx="500" cy="60" r="5" fill="#FF5E14" filter="drop-shadow(0 0 8px #FF5E14)" />
          <circle cx="500" cy="940" r="5" fill="#FF5E14" filter="drop-shadow(0 0 8px #FF5E14)" />
          <circle cx="730" cy="270" r="4" fill="#FF5E14" filter="drop-shadow(0 0 6px #FF5E14)" />
          <circle cx="270" cy="730" r="4" fill="#FF5E14" filter="drop-shadow(0 0 6px #FF5E14)" />

          {/* Precision tick crosshairs */}
          <line x1="500" y1="10" x2="500" y2="990" strokeWidth="0.75" strokeDasharray="10 10" opacity="0.3" />
          <line x1="10" y1="500" x2="990" y2="500" strokeWidth="0.75" strokeDasharray="10 10" opacity="0.3" />
        </svg>

        {/* Layer 2: Inner Counter-Rotating Concentric Ring (35s) */}
        <svg 
          viewBox="0 0 1000 1000" 
          className="absolute w-[800px] h-[800px] sm:w-[1050px] sm:h-[1050px] animate-spin-reverse text-[#FF5E14] opacity-40"
          fill="none" 
          stroke="currentColor"
        >
          <circle cx="500" cy="500" r="360" strokeWidth="1.5" strokeDasharray="16 10" opacity="0.65" />
          <circle cx="500" cy="500" r="290" strokeWidth="1" strokeDasharray="6 6" opacity="0.4" />
          <circle cx="500" cy="500" r="220" strokeWidth="2" strokeDasharray="32 18" opacity="0.75" />
          <circle cx="500" cy="500" r="140" strokeWidth="1.5" opacity="0.45" />
          <circle cx="500" cy="500" r="70" strokeWidth="1" opacity="0.3" />

          {/* Accent angle calipers and target nodes */}
          <path d="M 350 500 A 150 150 0 0 0 500 650" strokeWidth="2.5" stroke="#FF5E14" opacity="0.9" />
          <path d="M 650 500 A 150 150 0 0 0 500 350" strokeWidth="2.5" stroke="#FF5E14" opacity="0.9" />
          <circle cx="500" cy="350" r="4.5" fill="#FF5E14" filter="drop-shadow(0 0 6px #FF5E14)" />
          <circle cx="500" cy="650" r="4.5" fill="#FF5E14" filter="drop-shadow(0 0 6px #FF5E14)" />
        </svg>
      </div>

      {/* Background Layer 3: High-Tech Telemetry HUD Coordinates */}
      <div className="absolute inset-0 pointer-events-none select-none z-10 hidden md:block overflow-hidden" aria-hidden="true">
        {/* Top Left Telemetry */}
        <div className="absolute top-28 left-8 lg:left-12 font-mono text-[10px] text-zinc-400 space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-zinc-400">SYS_STATUS // ACTIVE</span>
          </div>
          <div className="text-zinc-400 font-mono">LAT 28.6139° N / LON 77.2090° E</div>
        </div>

        {/* Top Right Telemetry */}
        <div className="absolute top-28 right-8 lg:right-12 font-mono text-[10px] text-zinc-400 text-right space-y-1">
          <div className="text-zinc-400">PROTOCOL // 1:1_BUILDER</div>
          <div className="text-[#FF5E14] font-semibold">COHORT_CAP // 15_SEATS</div>
        </div>

        {/* Bottom Left Frame Coordinate */}
        <div className="absolute bottom-6 left-8 lg:left-12 font-mono text-[10px] text-zinc-400">
          <span>[ BUILD_CYCLE // 8_WEEKS_SPRINT ]</span>
        </div>

        {/* Bottom Right Frame Coordinate */}
        <div className="absolute bottom-6 right-8 lg:right-12 font-mono text-[10px] text-zinc-400 text-right">
          <span>[ GUARANTEE // 100%_MONEY_BACK ]</span>
        </div>
      </div>

      {/* Subtle radial center vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#070709_82%)] pointer-events-none" />

      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-7">
        
        {/* Devuty Signature Framed Box Badge with Pulsing Live Status */}
        <div className="inline-flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#FF5E14] text-[#FF5E14] text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] rounded-xs bg-[#FF5E14]/5 shadow-[0_0_20px_rgba(255,94,20,0.25)] hover:bg-[#FF5E14]/10 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5E14] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5E14]"></span>
            </span>
            <span>PROOF-OF-WORK BUILDER ACCELERATOR</span>
          </div>
        </div>

        {/* Master Headline (Devuty Two-Tone Format) */}
        <div className="space-y-1 sm:space-y-2">
          <h1 
            id="hero-headline"
            className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white leading-[1.15] drop-shadow-sm"
          >
            Solve real problems. Build real software.
          </h1>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight text-[#FF5E14] uppercase leading-[1.15] drop-shadow-[0_0_35px_rgba(255,94,20,0.35)]">
            BUILD YOUR FIRST APP.
          </h2>
        </div>

        {/* Compelling Value Proposition Copy */}
        <p className="text-sm sm:text-base lg:text-lg text-zinc-300 max-w-3xl mx-auto leading-relaxed font-normal">
          Every teenager has ideas. At Tactyqal Labs, we pair ambitious 13–18 year olds with experienced startup founders 
          for 8 weeks of 1:1 mentorship. Walk away with a live deployed product, real active users, and a standout portfolio piece for top university admissions.
        </p>

        {/* CTAs matching Devuty's exact button styling with interactive micro-animations */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/#pricing" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto h-12 px-8 text-sm font-semibold rounded-md bg-[#FF5E14] hover:bg-[#E0500D] text-white shadow-lg shadow-[#FF5E14]/30 hover:shadow-[#FF5E14]/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group">
              <span>Enroll in Next Cohort</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          <Link href="/#outcomes" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto h-12 px-7 text-sm font-medium rounded-md border border-white/80 hover:border-white hover:bg-white/10 text-white hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <span>View Student Projects</span>
            </button>
          </Link>
        </div>

        {/* Trust Points */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-zinc-400">
          <span className="flex items-center gap-1.5 hover:text-zinc-200 transition-colors">
            <CheckCircle2 className="h-4 w-4 text-[#FF5E14]" />
            <span>1:1 Weekly Private Founder Mentorship</span>
          </span>
          <span className="flex items-center gap-1.5 hover:text-zinc-200 transition-colors">
            <CheckCircle2 className="h-4 w-4 text-[#FF5E14]" />
            <span>No Coding Experience Required</span>
          </span>
          <span className="flex items-center gap-1.5 hover:text-zinc-200 transition-colors">
            <CheckCircle2 className="h-4 w-4 text-[#FF5E14]" />
            <span>100% Launch Money-Back Guarantee</span>
          </span>
        </div>

        {/* Marquee Header & Strip with Continuous Motion Animation */}
        <div className="pt-14 border-t border-white/10 space-y-4 overflow-hidden">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">
            COMPANIES &amp; MODERN STACKS USED BY OUR BUILDERS
          </div>

          {/* Seamless Infinite Marquee Track */}
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
            <div className="flex w-max animate-marquee space-x-8 text-xs sm:text-sm font-semibold text-zinc-300 py-2">
              <span className="hover:text-white transition-colors">FlutterFlow</span>
              <span className="text-zinc-600">&bull;</span>
              <span className="hover:text-white transition-colors">Bubble.io</span>
              <span className="text-zinc-600">&bull;</span>
              <span className="hover:text-white transition-colors">Supabase</span>
              <span className="text-zinc-600">&bull;</span>
              <span className="hover:text-white transition-colors">PostgreSQL</span>
              <span className="text-zinc-600">&bull;</span>
              <span className="hover:text-white transition-colors">Stripe Connect</span>
              <span className="text-zinc-600">&bull;</span>
              <span className="hover:text-white transition-colors">Figma</span>
              <span className="text-zinc-600">&bull;</span>
              <span className="text-[#FF5E14] font-mono">Devuty Verified</span>
              <span className="text-zinc-600">&bull;</span>
              {/* Duplicated for seamless continuous loop */}
              <span className="hover:text-white transition-colors">FlutterFlow</span>
              <span className="text-zinc-600">&bull;</span>
              <span className="hover:text-white transition-colors">Bubble.io</span>
              <span className="text-zinc-600">&bull;</span>
              <span className="hover:text-white transition-colors">Supabase</span>
              <span className="text-zinc-600">&bull;</span>
              <span className="hover:text-white transition-colors">PostgreSQL</span>
              <span className="text-zinc-600">&bull;</span>
              <span className="hover:text-white transition-colors">Stripe Connect</span>
              <span className="text-zinc-600">&bull;</span>
              <span className="hover:text-white transition-colors">Figma</span>
              <span className="text-zinc-600">&bull;</span>
              <span className="text-[#FF5E14] font-mono">Devuty Verified</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
