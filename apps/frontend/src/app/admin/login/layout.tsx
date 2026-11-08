import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login — Tactyqal Labs CMS',
  description: 'Sign in to access the content management system',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      {children}
    </div>
  );
}