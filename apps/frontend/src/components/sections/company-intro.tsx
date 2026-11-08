'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const whyUs = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: '1:1 Personalized Mentoring',
    description: 'Every student gets a dedicated mentor who guides them through the entire journey - from ideation to launch. No group sessions, no pre-recorded content.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Full-Stack App with No-Code',
    description: 'Students build real, functional applications using modern no-code tools and platforms. No prior coding experience required.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'University Admissions Success',
    description: 'Our alumni have gained acceptance to top universities in the US, UK, including Ivy League institutions. Apps become portfolio differentiators.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Results Guaranteed',
    description: 'We stand by our program. If your teen doesn&apos;t build and launch a functional app within the program duration, we offer a money-back guarantee.',
  },
];

export function CompanyIntro() {
  return (
    <section
      id="why"
      className="py-20 lg:py-28 bg-background"
      aria-labelledby="why-heading"
    >
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <Badge variant="secondary" className="mb-4">
            Why Tactyqal Labs
          </Badge>
          <h2
            id="why-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6"
          >
            More Than Code —{' '}
            <span className="text-primary">A Launchpad for Life</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We don&apos;t just teach teens to build apps. We guide them through the complete entrepreneurial
            journey — from finding a problem worth solving to launching a real product that makes an impact.
            The skills, confidence, and portfolio they build open doors to top universities and beyond.
          </p>
        </div>

        {/* Why Us Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((item, index) => (
            <Card
              key={item.title}
              variant="hover"
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className={cn(
                  'inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 transition-colors group-hover:bg-primary group-hover:text-primary-foreground'
                )}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}