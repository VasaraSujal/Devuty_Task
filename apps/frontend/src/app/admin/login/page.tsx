'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Loader2, 
  ShieldCheck, 
  AlertCircle,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { apiClient } from '@/lib/api/client';
import { useAuth } from '@/lib/auth/context';

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [email, setEmail] = useState('admin@tactyqal.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  // Check backend health on mount
  useEffect(() => {
    let isMounted = true;
    apiClient.health()
      .then(() => {
        if (isMounted) setApiStatus('online');
      })
      .catch(() => {
        if (isMounted) setApiStatus('offline');
      });
    return () => { isMounted = false; };
  }, []);

  // If already logged in, redirect to admin dashboard
  useEffect(() => {
    if (user) {
      router.push('/admin');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await login(email, password);
      // login method in context checks current user and pushes to /admin
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.message && err.message.toLowerCase().includes('fetch')) {
        setError('Cannot connect to Express backend API (http://localhost:5000). Please verify backend is running.');
      } else {
        setError(err.message || 'Invalid email or password. Please check your credentials.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#070709] p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans text-white">
      {/* Background ambient radial flares matching homepage */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[400px] bg-[#FF5E14]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] bg-[#FF7A00]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Cyber blueprint grid */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_40%,transparent_90%)] pointer-events-none" 
      />

      {/* Subtle Stationary Background Concentric Dial */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <svg className="w-[850px] h-[850px]" viewBox="0 0 850 850" fill="none">
          <circle cx="425" cy="425" r="410" stroke="#FF5E14" strokeWidth="1" strokeDasharray="6 10" />
          <circle cx="425" cy="425" r="320" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
          <circle cx="425" cy="425" r="220" stroke="#FF5E14" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="425" y1="20" x2="425" y2="830" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
          <line x1="20" y1="425" x2="830" y2="425" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
        </svg>
      </div>

      {/* Outer Telemetry Coordinate Anchors */}
      <div className="absolute top-6 left-6 font-mono text-[10px] text-zinc-600 select-none hidden md:block">
        AUTH_GATEWAY // PORT_443
      </div>
      <div className="absolute top-6 right-6 font-mono text-[10px] text-zinc-600 select-none hidden md:block">
        CIPHER // AES_256_GCM
      </div>
      <div className="absolute bottom-6 left-6 font-mono text-[10px] text-zinc-600 select-none hidden md:block">
        SYS_STATUS // ACTIVE
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[10px] text-zinc-600 select-none hidden md:block">
        LATENCY // &lt;15MS
      </div>

      <div className="w-full max-w-5xl grid lg:grid-cols-12 bg-[#111116] border border-white/10 rounded-md shadow-2xl overflow-hidden relative z-10">
        {/* Card Corner Crosshairs */}
        <div className="absolute top-2 left-2 font-mono text-[10px] text-zinc-600 select-none z-20">+</div>
        <div className="absolute top-2 right-2 font-mono text-[10px] text-zinc-600 select-none z-20">+</div>
        <div className="absolute bottom-2 left-2 font-mono text-[10px] text-zinc-600 select-none z-20">+</div>
        <div className="absolute bottom-2 right-2 font-mono text-[10px] text-zinc-600 select-none z-20">+</div>
        
        {/* Left Column — Brand & Vision */}
        <div className="lg:col-span-5 p-8 sm:p-12 bg-[#14141A] border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            {/* Logo matching Devuty [>] style */}
            <Link 
              href="/" 
              className="inline-flex items-center gap-3 text-white transition-colors group mb-10"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#FF5E14] text-black font-extrabold shadow-md shadow-[#FF5E14]/25 group-hover:scale-105 transition-transform">
                <Cpu className="h-5 w-5 text-black" />
              </div>
              <div>
                <span className="font-heading font-bold text-xl tracking-tight text-white block">Tactyqal Labs</span>
                <span className="text-[10px] tracking-wider uppercase font-mono font-semibold text-[#FF5E14] block -mt-0.5">Content Management System</span>
              </div>
            </Link>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs text-[11px] font-mono uppercase bg-[#FF5E14]/10 border border-[#FF5E14]/30 text-[#FF5E14]">
                <Sparkles className="w-3.5 h-3.5" />
                Administrative Control Panel
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight leading-snug">
                Manage insights, stories, &amp; youth cohort milestones.
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Publish articles, manage educational categories, review student project stories, and maintain the Tactyqal public blog with real-time editorial tools.
              </p>
            </div>
          </div>

          {/* Bottom Trust Badge */}
          <div className="pt-8 mt-8 border-t border-white/10 relative z-10 space-y-3 font-mono text-xs">
            <div className="flex items-center gap-3 text-zinc-400">
              <ShieldCheck className="h-4 w-4 text-[#FF5E14] shrink-0" />
              <span>HTTP-Only Session Cookies &amp; CSRF Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-400">API Connection:</span>
              {apiStatus === 'checking' && (
                <span className="inline-flex items-center gap-1.5 text-amber-400 font-medium">
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                  Checking backend...
                </span>
              )}
              {apiStatus === 'online' && (
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Express API Online (:5000)
                </span>
              )}
              {apiStatus === 'offline' && (
                <span className="inline-flex items-center gap-1.5 text-rose-400 font-medium">
                  <AlertCircle className="h-3.5 w-3.5" />
                  Backend Offline (Start port 5000)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column — Authentication Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-[#111116]">
          <div className="max-w-md w-full mx-auto space-y-6">
            
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
                Sign in to CMS
              </h1>
              <p className="text-zinc-400 text-sm mt-1.5">
                Enter your administrative credentials to continue.
              </p>
            </div>

            {/* Error banner */}
            {error && (
              <div className="p-4 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-start gap-3 animate-fade-in">
                <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="leading-snug">{error}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider">
                  Admin Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@tactyqal.com"
                    required
                    autoComplete="email"
                    className="pl-10 h-11 bg-[#16161D] border-white/10 text-white placeholder:text-zinc-600 focus:border-[#FF5E14] focus:ring-1 focus:ring-[#FF5E14] rounded-md"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider">
                    Password
                  </Label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    className="pl-10 pr-10 h-11 bg-[#16161D] border-white/10 text-white placeholder:text-zinc-600 focus:border-[#FF5E14] focus:ring-1 focus:ring-[#FF5E14] rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Demo credentials hint pill */}
              <div className="p-3 rounded-md bg-[#16161D] border border-white/10 text-xs text-zinc-400 flex items-center justify-between font-mono">
                <span>Default Seed: <code className="text-[#FF5E14] font-mono">admin@tactyqal.com</code></span>
                <span>Pass: <code className="text-[#FF5E14] font-mono">admin123</code></span>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-[#FF5E14] hover:bg-[#E0500D] text-white font-semibold shadow-lg shadow-[#FF5E14]/25 rounded-md transition-all"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Authenticating Session...
                  </span>
                ) : (
                  <span>Sign In to Dashboard</span>
                )}
              </Button>
            </form>

            <div className="pt-2 text-center">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#FF5E14] transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Return to Tactyqal Labs Public Homepage
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}