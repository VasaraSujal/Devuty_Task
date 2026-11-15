'use client';

import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/sidebar';
import { AdminHeader } from '@/components/admin/header';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/lib/auth/context';
import { ProtectedLayout } from '@/components/admin/protected-layout';

export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return (
      <AuthProvider>
        <div className="min-h-screen text-white flex flex-col justify-center">
          {children}
          <Toaster />
        </div>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <ProtectedLayout>
        <div className="flex h-screen text-white overflow-hidden">
          <AdminSidebar className="hidden lg:flex shrink-0" />
          <div className="flex flex-col flex-1 overflow-hidden min-w-0">
            <AdminHeader />
            <main className="flex-1 overflow-y-auto min-w-0 p-4 sm:p-6 lg:p-8">
              {children}
            </main>
            <Toaster />
          </div>
        </div>
      </ProtectedLayout>
    </AuthProvider>
  );
}