'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Plus, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminSidebar } from './sidebar';
import { useAuth } from '@/lib/auth/context';

export function AdminHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const getPageTitle = () => {
    if (pathname === '/admin') return 'Dashboard Overview';
    if (pathname === '/admin/posts') return 'Blog Posts';
    if (pathname === '/admin/posts/new') return 'Draft New Article';
    if (pathname.includes('/edit')) return 'Edit Article';
    if (pathname === '/admin/categories') return 'Category Architecture';
    if (pathname === '/admin/tags') return 'Tag Management';
    return 'Admin Workspace';
  };

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-[#070709]/95 backdrop-blur-md px-4 lg:px-8 z-30 text-white">
        
        {/* Left: Mobile trigger & Page Title */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden h-9 w-9 text-white hover:bg-white/10"
            onClick={() => setMobileOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div>
            <h1 className="text-base sm:text-lg font-heading font-bold text-white tracking-tight leading-tight">
              {getPageTitle()}
            </h1>
            <p className="text-xs text-zinc-400 font-mono hidden sm:block">
              Tactyqal Labs Editorial &amp; Cohort CMS
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Database Live</span>
          </div>

          <Link href="/admin/posts/new">
            <Button size="sm" className="h-9 gap-1.5 bg-[#FF5E14] hover:bg-[#E0500D] text-white rounded-md shadow-sm shadow-[#FF5E14]/25 font-semibold text-xs">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Post</span>
            </Button>
          </Link>

          <Link href="/" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="h-9 gap-1.5 rounded-md border-white/20 text-white hover:bg-white/10 text-xs">
              <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
              <span className="hidden md:inline">View Site</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)} 
          />
          
          {/* Drawer Content */}
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-[#0B0C0E] border-r border-white/10 shadow-2xl flex flex-col z-50 animate-slide-right">
            <div className="absolute top-4 right-4 z-10">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMobileOpen(false)}
                className="text-zinc-400 hover:text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <AdminSidebar onCloseMobile={() => setMobileOpen(false)} className="w-full border-r-0" />
          </div>
        </div>
      )}
    </>
  );
}