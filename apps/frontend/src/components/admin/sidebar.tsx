'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Tag,
  FolderOpen,
  LogOut,
  ExternalLink,
  PlusCircle,
  Cpu,
  User,
  Shield,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/context';

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    name: 'All Posts',
    href: '/admin/posts',
    icon: FileText,
    exact: true,
  },
  {
    name: 'Create Post',
    href: '/admin/posts/new',
    icon: PlusCircle,
    exact: false,
  },
  {
    name: 'Categories',
    href: '/admin/categories',
    icon: FolderOpen,
    exact: false,
  },
  {
    name: 'Tags',
    href: '/admin/tags',
    icon: Tag,
    exact: false,
  },
];

interface AdminSidebarProps {
  onCloseMobile?: () => void;
  className?: string;
}

export function AdminSidebar({ onCloseMobile, className }: AdminSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    if (confirm('Are you sure you want to log out of Tactyqal CMS?')) {
      await logout();
    }
  };

  return (
    <aside 
      className={cn(
        "w-64 flex flex-col h-full bg-[#0B0C0E] border-r border-white/10 text-white select-none",
        className
      )}
    >
      {/* Brand Header */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-3 group"
          onClick={onCloseMobile}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#FF5E14] text-black font-extrabold shadow-md shadow-[#FF5E14]/25 group-hover:scale-105 transition-transform">
            <Cpu className="h-5 w-5 text-black" />
          </div>
          <div>
            <span className="font-heading font-bold text-base tracking-tight text-white block">
              Tactyqal CMS
            </span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#FF5E14] block -mt-0.5">
              Admin Workspace
            </span>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <div>
          <p className="px-3 text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
            Content Management
          </p>
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = item.exact 
                ? pathname === item.href 
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3.5 py-2.5 text-sm font-medium transition-all group relative',
                    isActive
                      ? 'bg-[#FF5E14] text-white shadow-md shadow-[#FF5E14]/25'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  <item.icon className={cn(
                    'h-4 w-4 shrink-0 transition-colors',
                    isActive ? 'text-white' : 'text-zinc-400 group-hover:text-white'
                  )} />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* External Link */}
        <div>
          <p className="px-3 text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
            Public Website
          </p>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-md px-3.5 py-2.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-3">
              <ExternalLink className="h-4 w-4 text-zinc-400" />
              <span>Live Website</span>
            </span>
            <span className="text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-400 px-1.5 py-0.5 rounded">
              ↗
            </span>
          </Link>
          <Link
            href="/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-md px-3.5 py-2.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors mt-1"
          >
            <span className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-zinc-400" />
              <span>Public Blog</span>
            </span>
            <span className="text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-400 px-1.5 py-0.5 rounded">
              ↗
            </span>
          </Link>
        </div>
      </div>

      {/* User Footer Profile & Logout */}
      <div className="p-4 border-t border-white/10 bg-[#070709]">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-md bg-[#FF5E14]/15 border border-[#FF5E14]/40 flex items-center justify-center text-[#FF5E14] font-bold text-sm shrink-0 font-mono">
              {user?.name ? user.name[0].toUpperCase() : 'A'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">
                {user?.name || 'Administrator'}
              </div>
              <div className="text-[11px] text-zinc-400 truncate flex items-center gap-1 font-mono">
                <Shield className="h-2.5 w-2.5 text-[#FF5E14]" />
                <span>{user?.role || 'ADMIN'}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 rounded-md py-2 px-3 text-xs font-mono text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/20 transition-all"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}