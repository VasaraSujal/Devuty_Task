'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const roadmapStages = [
  {
    stage: 1,
    title: 'Ideation & Market Research',
    description: 'Discover problems worth solving. Learn to validate ideas, research markets, and define a unique value proposition.',
    duration: 'Week 1-2',
    color: 'primary',
    features: ['Problem identification', 'Market sizing', 'Competitor analysis', 'User interviews'],
  },
  {
    stage: 2,
    title: 'Design & Prototyping',
    description: 'Transform ideas into tangible designs. Create wireframes, user flows, and interactive prototypes using no-code tools.',
    duration: 'Week 3-4',
    color: 'accent',
    features: ['User journey mapping', 'Wireframing', 'UI design systems', 'Clickable prototypes'],
  },
  {
    stage: 3,
    title: 'Development & Testing',
    description: 'Build the actual app using no-code platforms. Implement features, integrate databases, and test thoroughly.',
    duration: 'Week 5-6',
    color: 'primary',
    features: ['No-code development', 'Database design', 'API integrations', 'User testing'],
  },
  {
    stage: 4,
    title: 'Launch & Marketing',
    description: 'Deploy to app stores and the web. Create launch strategy, marketing materials, and start acquiring real users.',
    duration: 'Week 7-8',
    color: 'accent',
    features: ['App store deployment', 'Landing page creation', 'Launch strategy', 'Growth tactics'],
  },
];

export function Services() {
  return (
    <section
      id="about"
      className="py-20 lg:py-28 bg-muted/30"
      aria-labelledby="roadmap-heading"
    >
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <Badge variant="secondary" className="mb-4">
            The 8-Week Roadmap
          </Badge>
          <h2
            id="roadmap-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6"
          >
            From Idea to{' '}
            <span className="text-primary">Launch in 8 Weeks</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A structured curriculum guiding students through every stage of building a real application.
            Each week includes 1:1 mentor sessions, hands-on building, and milestone checkpoints.
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" aria-hidden="true" />

          <div className="space-y-12 lg:space-y-16">
            {roadmapStages.map((stage, index) => (
              <div
                key={stage.title}
                className={cn(
                  'relative animate-fade-in-up',
                  index % 2 === 0 ? 'lg:pr-20 lg:text-right' : 'lg:pl-20 lg:w-1/2 lg:ml-auto'
                )}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Stage badge */}
                <div className={cn(
                  'absolute lg:left-auto lg:right-0 lg:-translate-x-1/2 lg:top-4',
                  index % 2 === 0 ? 'right-1/2 -translate-x-1/2 mb-4 lg:mb-0' : 'left-1/2 -translate-x-1/2 mb-4 lg:mb-0'
                )}>
                  <Badge variant={stage.color === 'primary' ? 'primary' : 'accent'} size="md">
                    Stage {stage.stage}
                  </Badge>
                </div>

                {/* Card */}
                <Card variant="hover" className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <CardTitle className="text-xl">{stage.title}</CardTitle>
                      <Badge variant="outline" size="sm">{stage.duration}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <CardDescription className="mb-4">{stage.description}</CardDescription>
                    <ul className="space-y-2" role="list">
                      {stage.features.map((feature, featureIndex) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: `${(index * 150) + (featureIndex * 50) + 200}ms` }}>
                          <svg className="h-4 w-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Circle on timeline */}
                <div className={cn(
                  'absolute w-4 h-4 rounded-full border-4 bg-background z-10',
                  index % 2 === 0 ? 'lg:right-[calc(50% - 10px)]' : 'lg:left-[calc(50% - 10px)]',
                  stage.color === 'primary' ? 'border-primary' : 'border-accent'
                )} aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee CTA */}
        <div className="mt-16 lg:mt-20 text-center">
          <Card variant="padded" className="max-w-2xl mx-auto border-primary/50 bg-primary/5">
            <CardContent className="pt-6">
              <div className="text-center">
                <svg className="h-10 w-10 mx-auto text-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Results Guaranteed or Money Back
                </h3>
                <p className="text-muted-foreground mb-6">
                  We&apos;re confident in our program. If your teen doesn&apos;t build and launch a functional
                  app within the 8-week program, we&apos;ll refund your enrollment fee.
                </p>
                <Button size="lg" variant="primary" asChild>
                  <Link href="#contact">
                    Enroll with Confidence
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