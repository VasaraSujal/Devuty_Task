'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const programs = [
  {
    title: '8-Week App Building Program',
    description: 'Our flagship program where teens go from idea to launched app in 8 weeks with 1:1 mentoring.',
    target: 'Ages 13-18',
    duration: '8 Weeks',
    commitment: '2-3 hrs/week + mentor sessions',
    price: '₹16,000',
    features: [
      '1:1 weekly mentor sessions (8 total)',
      'Structured 8-week curriculum',
      'No-code tool mastery (Bubble, Adalo, etc.)',
      'Database & API fundamentals',
      'App store deployment guidance',
      'Portfolio-ready project',
      'University application support',
      'Certificate of completion',
    ],
    outcomes: [
      'Launched mobile/web app',
      'Technical portfolio piece',
      'Problem-solving skills',
      'Entrepreneurial mindset',
    ],
    cta: 'Enroll Now',
    variant: 'primary',
    popular: true,
  },
  {
    title: 'Startup Idea Generator Tool',
    description: 'Free tool to help teens discover problems worth solving and validate their app ideas before committing.',
    target: 'All aspiring builders',
    duration: 'Self-paced',
    commitment: '15-30 minutes',
    price: 'Free',
    features: [
      'AI-powered idea generation',
      'Market validation framework',
      'Problem-solution fit analysis',
      'Competitor landscape view',
      'Exportable idea brief',
    ],
    outcomes: [
      'Validated app concept',
      'Market research starter',
      'Clear next steps',
    ],
    cta: 'Try Free Tool',
    variant: 'outline',
    popular: false,
  },
  {
    title: 'Pitch Deck Analyzer',
    description: 'Upload your pitch deck and get AI-powered feedback on clarity, storytelling, and investor readiness.',
    target: 'Teens preparing for competitions/college apps',
    duration: 'Instant',
    commitment: '5 minutes',
    price: 'Free',
    features: [
      'Slide-by-slide analysis',
      'Storytelling score',
      'Clarity & structure feedback',
      'Investor readiness checklist',
      'Improvement suggestions',
    ],
    outcomes: [
      'Stronger pitch deck',
      'Better presentation skills',
      'Competition ready',
    ],
    cta: 'Analyze Deck',
    variant: 'ghost',
    popular: false,
  },
];

const tools = [
  { name: 'Startup Idea Generator', href: '/tools/idea-generator', description: 'Discover & validate app ideas' },
  { name: 'Fundability Assessment', href: '/tools/fundability', description: 'Evaluate funding readiness' },
  { name: 'Team Evaluation Tool', href: '/tools/team-eval', description: 'Assess cofounder compatibility' },
  { name: 'Pitch Deck Analyzer', href: '/tools/pitch-deck', description: 'AI-powered deck feedback' },
  { name: 'Top 10 Traits for Success', href: '/tools/success-traits', description: 'Founder trait assessment' },
  { name: 'Cofounder Compatibility Test', href: '/tools/cofounder-fit', description: 'Partner matching insights' },
  { name: 'Problem-Solution Fit', href: '/tools/problem-solution', description: 'Validate your value prop' },
  { name: 'Landing Page Assessment', href: '/tools/landing-page', description: 'Optimize conversion rates' },
];

export function Programs() {
  return (
    <section
      id="program"
      className="py-20 lg:py-28 bg-background"
      aria-labelledby="program-heading"
    >
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <Badge variant="secondary" className="mb-4">
            Programs & Tools
          </Badge>
          <h2
            id="program-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6"
          >
            Everything Your Teen Needs to <span className="text-primary">Build & Launch</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From our flagship 8-week mentored program to free AI-powered tools for idea validation
            and pitch refinement. Choose what fits your journey.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid gap-6 lg:grid-cols-3 max-w-6xl mx-auto mb-20">
          {programs.map((program, index) => (
            <Card
              key={program.title}
              variant={program.popular ? 'hover' : 'default'}
              className={cn(
                'relative flex flex-col h-full animate-fade-in-up',
                program.popular && 'border-primary/50 shadow-lg'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {program.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="primary" size="sm">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div />
                  <Badge variant="outline" size="sm">
                    {program.duration}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{program.title}</CardTitle>
                <CardDescription className="mt-2">{program.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col pb-6">
                {/* Target & Commitment */}
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="font-medium text-foreground">Target:</span> {program.target}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium text-foreground">Commitment:</span> {program.commitment}
                  </div>
                  <div className="flex items-center gap-2 text-primary font-semibold text-lg">
                    <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{program.price}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6 flex-1">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    What&apos;s Included
                  </h4>
                  <ul className="space-y-2" role="list">
                    {program.features.map((feature, featureIndex) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: `${(index * 100) + (featureIndex * 50) + 200}ms` }}>
                        <svg className="h-4 w-4 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcomes */}
                <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Expected Outcomes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {program.outcomes.map((outcome, outcomeIndex) => (
                      <Badge key={outcome} variant="secondary" size="sm" className="animate-fade-in-up" style={{ animationDelay: `${(index * 100) + (outcomeIndex * 50) + 300}ms` }}>
                        {outcome}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Button
                  variant={program.variant as 'primary' | 'outline' | 'ghost'}
                  className="w-full"
                  asChild
                >
                  <Link href="#contact">
                    <span className="flex items-center justify-center gap-2">
                      {program.cta}
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Free Tools Section */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-3">
              Free AI-Powered Tools
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Instant feedback on ideas, pitches, and strategies. No signup required.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool, index) => (
              <Card
                key={tool.name}
                variant="hover"
                className="group animate-fade-in-up text-center p-6"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h4 className="font-semibold text-foreground mb-1">{tool.name}</h4>
                <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                <Link
                  href={tool.href}
                  className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
                >
                  Try it free
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Stories Teaser */}
        <div className="text-center">
          <Card variant="padded" className="max-w-3xl mx-auto">
            <CardContent className="pt-6">
              <div className="text-center">
                <svg className="h-12 w-12 mx-auto text-primary/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  See What Our Students Have Built
                </h3>
                <p className="text-muted-foreground mb-6">
                  From agriculture apps helping farmers to vegan marketplace platforms.
                  Real apps. Real impact. Built by teens.
                </p>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#success">
                    View Success Stories
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}