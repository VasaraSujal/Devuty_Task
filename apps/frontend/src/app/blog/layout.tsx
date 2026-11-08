import { Navigation } from '@/components/shared/navigation';
import { Footer } from '@/components/shared/footer';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
      <main className="flex-1 pt-[var(--nav-height)]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
