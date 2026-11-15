import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Tactyqal Labs — Youth Entrepreneurship & App Building Studio',
  description: 'Empower Your Kid To Build The Next App That Impacts Millions, in 8 Weeks. 1:1 Mentoring, Idea to Full-Stack App, No-code Learning.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} scroll-smooth overflow-x-hidden max-w-full`} suppressHydrationWarning>
      <body className="min-h-screen bg-[#070709] text-foreground antialiased selection:bg-[#FF5E14]/30 selection:text-[#FF5E14] font-sans relative overflow-x-hidden max-w-full">
        {/* Global Cyber Blueprint Grid Pattern */}
        <div 
          className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none select-none z-0" 
          aria-hidden="true"
        />

        {/* Global Top Ambient Glow Flare */}
        <div 
          className="fixed -top-48 left-1/2 -translate-x-1/2 w-[600px] sm:w-[950px] h-[450px] bg-[#FF5E14]/10 blur-[150px] rounded-full pointer-events-none select-none z-0" 
          aria-hidden="true"
        />

        <div className="relative z-10 flex min-h-screen flex-col overflow-x-hidden max-w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
