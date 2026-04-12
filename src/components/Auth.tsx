import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Lock, Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Auth({ onLogin, onBack }: { onLogin: () => void, onBack: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-cream flex selection:bg-accent selection:text-ink">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex w-1/2 bg-ink p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-green/20 rounded-full blur-[100px]" />
        
        <div className="relative z-10">
          <button onClick={onBack} className="text-white/50 hover:text-white flex items-center gap-2 text-sm font-bold transition-colors mb-12">
            <ArrowLeft size={16} /> Back to website
          </button>
          <div className="text-white font-black text-2xl tracking-tight">Opti-Link</div>
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl font-black text-white tracking-tighter leading-[1.1] mb-6">
            Your digital<br />growth engine,<br /><span className="text-accent italic">centralised.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-md leading-relaxed">
            Access your live pipeline, track revenue recovery, and manage your automated marketing campaigns in one place.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-sm text-white/40 font-bold">
          <span>© 2026 Opti-Link Media Group</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Client Portal</span>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 md:p-16 lg:p-24 relative text-center">
        <button onClick={onBack} className="lg:hidden absolute top-8 left-8 text-gray hover:text-ink flex items-center gap-2 text-sm font-bold transition-colors">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="max-w-md w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-10">
              <h2 className="text-3xl font-black text-ink tracking-tight mb-2">
                {isLogin ? 'Welcome back' : 'Create your account'}
              </h2>
              <p className="text-gray text-sm">
                {isLogin ? 'Enter your details to access your dashboard.' : 'Set up your client portal to track your growth.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              {!isLogin && (
                <div>
                  <label className="block font-mono text-[10px] font-bold text-ink uppercase tracking-wider mb-2">Full Name</label>
                  <input required type="text" className="w-full p-4 bg-white border-2 border-bdr rounded-lg text-sm outline-none focus:border-green transition-all" placeholder="John Doe" />
                </div>
              )}
              <div>
                <label className="block font-mono text-[10px] font-bold text-ink uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-lt" />
                  <input required type="email" className="w-full p-4 pl-12 bg-white border-2 border-bdr rounded-lg text-sm outline-none focus:border-green transition-all" placeholder="name@company.com" />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block font-mono text-[10px] font-bold text-ink uppercase tracking-wider">Password</label>
                  {isLogin && <a href="#" className="text-xs font-bold text-green hover:underline">Forgot?</a>}
                </div>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-lt" />
                  <input required type="password" className="w-full p-4 pl-12 bg-white border-2 border-bdr rounded-lg text-sm outline-none focus:border-green transition-all" placeholder="••••••••" />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-ink text-white py-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-green disabled:opacity-70 transition-all mt-4 shadow-xl shadow-ink/10"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : (isLogin ? 'Sign In' : 'Create Account')}
                {!isLoading && <ArrowRight size={18} />}
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray font-mono font-bold uppercase tracking-wider">
                <ShieldCheck size={14} className="text-green" />
                <span>End-to-End Encrypted • SOC 2 Type II Compliant</span>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => setIsLogin(!isLogin)} className="font-bold text-ink hover:text-green transition-colors">
                  {isLogin ? 'Create one' : 'Sign in'}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
