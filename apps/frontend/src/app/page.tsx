import { Navigation } from '@/components/shared/navigation';
import { Hero } from '@/components/sections/hero';
import { TrustImpact } from '@/components/sections/trust-impact';
import { ProblemOpportunity } from '@/components/sections/problem-opportunity';
import { ProgramRoadmap } from '@/components/sections/program-roadmap';
import { StudentShowcase } from '@/components/sections/student-showcase';
import { Mentorship } from '@/components/sections/mentorship';
import { AITools } from '@/components/sections/ai-tools';
import { SuccessStories } from '@/components/sections/success-stories';
import { Pricing } from '@/components/sections/pricing';
import { FAQ } from '@/components/sections/faq';
import { CTA } from '@/components/sections/cta';
import { Footer } from '@/components/shared/footer';

export const metadata = {
  title: 'Tactyqal Labs — Empower Your Kid To Build The Next App That Impacts Millions',
  description: '8-week youth builder accelerator with 1:1 founder mentoring. Go from idea to launched full-stack software application without prior coding experience.',
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-[#FF5E14]/30 selection:text-[#FF5E14]">
      {/* Section 1: Premium Navigation */}
      <Navigation />

      <main className="flex-1">
        {/* Section 2: Hero Experience with Interactive App Studio Simulator */}
        <Hero />

        {/* Section 3: Verified Trust & Impact Indicators */}
        <TrustImpact />

        {/* Section 4: Problem and Opportunity (Classroom Gap vs Tactyqal Advantage) */}
        <ProblemOpportunity />

        {/* Section 5: The 8-Week Program Interactive Roadmap */}
        <ProgramRoadmap />

        {/* Section 6: What Students Build (Student Project Showcase) */}
        <StudentShowcase />

        {/* Section 7: Mentorship Experience Walkthrough */}
        <Mentorship />

        {/* Section 8: AI Tools and Resources Ecosystem */}
        <AITools />

        {/* Section 9: Success Stories & Social Proof */}
        <SuccessStories />

        {/* Section 10: Pricing & Transparent Cohort Inclusions */}
        <Pricing />

        {/* Section 11: Accessible Accordion FAQ */}
        <FAQ />

        {/* Section 12: High-Conversion Closing Call to Action */}
        <CTA />
      </main>

      {/* Section 13: Complete Brand Footer with Verified Contacts */}
      <Footer />
    </div>
  );
}