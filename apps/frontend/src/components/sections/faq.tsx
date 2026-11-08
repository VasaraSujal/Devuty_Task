'use client';

import * as React from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What age group is the 8-Week App Building Program designed for?',
    answer: 'The program is designed for ambitious middle and high school students aged 13 to 18. Whether your teen already tinkers with technology or simply has creative problem-solving curiosity, the curriculum adapts to their pace through weekly 1:1 mentorship.',
  },
  {
    question: 'Does my child need prior coding or engineering experience?',
    answer: 'None at all. We intentionally use modern visual development platforms, relational database architecture, and workflow engines. This eliminates the steep syntax barrier while teaching genuine software engineering and product design principles.',
  },
  {
    question: 'What is the weekly time commitment required?',
    answer: 'Students typically spend 3 to 5 hours per week on hands-on building, plus one 60-minute private 1:1 video call with their dedicated founder mentor. The schedule is flexible and designed to fit smoothly alongside regular schoolwork and exams.',
  },
  {
    question: 'What will my child have accomplished by the end of 8 weeks?',
    answer: 'Every graduate finishes with a live, publicly accessible web or mobile application with user authentication and database models, a verified portfolio write-up for college applications, a founder pitch deck, and a Certificate of Completion from Tactyqal Labs.',
  },
  {
    question: 'How does shipping an app elevate college applications?',
    answer: 'Top university admissions committees receive tens of thousands of perfect GPA transcripts. Presenting a launched application with real active users and measurable community impact provides unambiguous evidence of initiative, grit, and intellectual curiosity.',
  },
  {
    question: 'How are mentors selected and matched?',
    answer: 'Mentors are experienced software builders, product designers, and founders who possess real-world startup expertise and genuine passion for coaching young builders. We match each student based on their project domain (e.g. AgriTech, e-commerce, AI tools, or social apps).',
  },
  {
    question: 'Why is enrollment capped at 15 students per monthly cohort?',
    answer: 'We believe true educational mentorship cannot be scaled into a 100-person Zoom lecture. By strictly limiting each cohort to 15 students, our mentors have the bandwidth to deeply understand every student’s product, review their weekly builds, and provide continuous guidance.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#0B0C0E] border-b border-white/10 text-white" id="faq">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs border border-[#FF5E14]/40 bg-[#FF5E14]/5 text-[#FF5E14] text-xs font-mono uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5 text-[#FF5E14]" />
            FREQUENTLY ASKED QUESTIONS
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
            Common <span className="text-[#FF5E14]">Questions</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Everything you need to know about the Tactyqal Labs 8-week accelerator, 1:1 mentorship, and cohort structure.
          </p>
        </div>

        {/* Accessible Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={cn(
                  'rounded-md border transition-all overflow-hidden bg-[#121217]',
                  isOpen
                    ? 'border-[#FF5E14] shadow-lg shadow-[#FF5E14]/10'
                    : 'border-white/10 hover:border-white/20'
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14]"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-bold text-base sm:text-lg text-white">
                    {faq.question}
                  </span>
                  <div className={cn(
                    'h-7 w-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-200',
                    isOpen ? 'rotate-180 text-[#FF5E14] border-[#FF5E14]/40' : 'text-zinc-400'
                  )}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm text-zinc-300 leading-relaxed border-t border-white/10 pt-4 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
