'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth/context';

interface ProtectedLayoutProps {
  children: React.ReactNode;
  allowedRoles?: ('ADMIN' | 'AUTHOR')[];
}

export function ProtectedLayout({
  children,
  allowedRoles = ['ADMIN', 'AUTHOR']
}: ProtectedLayoutProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-950 text-slate-100">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
          <p className="text-sm font-medium text-slate-400">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-xl font-bold text-destructive">Access Restricted</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Your account ({user.email}) does not have permission to access this area.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}