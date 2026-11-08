'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ArrowRight, 
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'How It Works', href: '/#program' },
  { name: 'Student Projects', href: '/#outcomes' },
  { name: '1:1 Mentorship', href: '/#mentorship' },
  { name: 'Founder Tools', href: '/#tools' },
  { name: 'Pricing', href: '/#pricing' },
  { name: 'Blog', href: '/blog' },
  { name: 'FAQ', href: '/#faq' },
];

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-200 select-none bg-[#070709]/95 backdrop-blur-md border-b border-white/10 text-white',
          isScrolled ? 'py-3' : 'py-4'
        )}
        role="banner"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo with Devuty-style [>] icon */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Tactyqal Labs Homepage"
          >
            <div className="h-8 w-8 rounded-md bg-[#FF5E14] flex items-center justify-center text-black font-extrabold shadow-sm group-hover:scale-105 transition-transform">
              <ChevronRight className="h-5 w-5 stroke-[3] text-black" />
            </div>
            <div>
              <span className="font-heading font-bold text-lg sm:text-xl tracking-tight block text-white leading-none">
                Tactyqal Labs
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF5E14] block mt-0.5">
                Proof-of-Work Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isBlog = link.href === '/blog';
              const isActive = isBlog ? pathname.startsWith('/blog') : false;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors',
                    isActive
                      ? 'text-[#FF5E14] bg-[#FF5E14]/10 font-semibold'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/admin/login">
              <button 
                className="h-9 px-4 text-xs font-medium rounded-md border border-white/70 hover:border-white hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] text-white transition-all"
              >
                Admin Portal
              </button>
            </Link>

            <Link href="/#pricing">
              <button 
                className="h-9 px-4 rounded-md text-xs font-semibold bg-[#FF5E14] hover:bg-[#E0500D] hover:scale-[1.02] active:scale-[0.98] text-white shadow-sm shadow-[#FF5E14]/25 hover:shadow-[#FF5E14]/40 flex items-center gap-1.5 transition-all group"
              >
                <span>Enroll in Cohort</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-md text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Open mobile navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>

        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-[#0c0c0e] border-l border-white/10 text-white shadow-2xl flex flex-col p-6 z-50">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-md bg-[#FF5E14] flex items-center justify-center text-black">
                  <ChevronRight className="h-5 w-5 stroke-[3] text-black" />
                </div>
                <div>
                  <span className="font-heading font-bold text-base block text-white leading-none">
                    Tactyqal Labs
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF5E14] block mt-0.5">
                    Proof-of-Work Studio
                  </span>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/10"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium text-zinc-300 hover:text-white hover:bg-[#FF5E14]/10 transition-colors"
                >
                  <span>{link.name}</span>
                  <ArrowRight className="h-4 w-4 text-[#FF5E14]" />
                </Link>
              ))}
            </nav>

            {/* Drawer Footer Actions */}
            <div className="pt-5 border-t border-white/10 space-y-3">
              <Link 
                href="/#pricing" 
                onClick={() => setMobileMenuOpen(false)}
                className="block"
              >
                <button className="w-full h-11 rounded-md bg-[#FF5E14] hover:bg-[#E0500D] text-white font-semibold text-sm shadow-sm">
                  Enroll in Cohort (₹16,000)
                </button>
              </Link>

              <Link 
                href="/admin/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="block"
              >
                <button 
                  className="w-full h-10 rounded-md text-xs font-medium border border-white/40 hover:bg-white/10 text-white"
                >
                  Admin CMS Portal
                </button>
              </Link>

              <div className="pt-2 text-center text-xs text-zinc-400">
                Direct Inquiries: <a href="tel:+919804772106" className="text-[#FF5E14] font-medium hover:underline">+91-98047-72106</a>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
