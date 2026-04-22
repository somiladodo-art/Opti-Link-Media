import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Mail, Lock, Loader2, ArrowLeft, ShieldCheck, User } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { signInWithGoogle, auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

type AuthMode = 'login' | 'signup' | 'forgot';

export default function Auth({ onLogin, onBack }: { onLogin: () => void, onBack: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<AuthMode>('login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      await signInWithGoogle();
      onLogin();
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || 'Error signing in with Google.');
      setIsLoading(false);
    }
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        onLogin();
      } else if (mode === 'signup') {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const userRef = doc(db, 'users', res.user.uid);
        await setDoc(userRef, {
          fullName: fullName || res.user.displayName || 'Unknown',
          email: res.user.email || '',
          phone: '',
          businessName: '',
          website: '',
          industry: 'Retail / E-commerce',
          createdAt: new Date().toISOString()
        });
        onLogin();
      } else if (mode === 'forgot') {
        await sendPasswordResetEmail(auth, email);
        setSuccessMsg('Password reset link sent to your email.');
      }
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || 'An error occurred. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex selection:bg-green selection:text-ink overflow-auto">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex w-1/2 bg-ink p-12 flex-col justify-between relative overflow-hidden fixed top-0 bottom-0 left-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-green/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-green/20 rounded-full blur-[100px]" />
        
        <div className="relative z-10 w-full">
          <button onClick={onBack} className="text-white/50 hover:text-white flex items-center gap-2 text-sm font-bold transition-colors mb-12">
            <ArrowLeft size={16} /> Back to website
          </button>
          <div className="text-white font-black text-2xl tracking-tight">Opti-Link</div>
        </div>

        <div className="relative z-10 w-full mt-24 flex-grow">
          <h1 className="text-5xl font-black text-white tracking-tighter leading-[1.1] mb-6">
            Your digital<br />growth engine,<br /><span className="text-green italic">centralised.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-md leading-relaxed">
            Access your live pipeline, track revenue recovery, and manage your automated marketing campaigns in one place.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-sm text-white/40 font-bold pb-4">
          <span>© 2026 Opti-Link Media Group</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Client Portal</span>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 lg:ml-auto flex flex-col justify-center items-center p-8 md:p-16 lg:p-24 relative min-h-screen">
        <button onClick={onBack} className="lg:hidden absolute top-8 left-8 text-gray hover:text-ink flex items-center gap-2 text-sm font-bold transition-colors z-20">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="max-w-md w-full mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-black text-ink tracking-tight mb-2">
                {mode === 'login' && 'Client Log In'}
                {mode === 'signup' && 'Create Account'}
                {mode === 'forgot' && 'Reset Password'}
              </h2>
              <p className="text-gray text-sm font-medium">
                {mode === 'login' && 'Enter your details or use Google to sign in to your dashboard.'}
                {mode === 'signup' && 'Enter your details below to create your account.'}
                {mode === 'forgot' && 'We will send you an email with instructions to reset your password.'}
              </p>
            </div>

            {errorMsg && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-semibold mb-6 border border-red-100">
                {errorMsg}
              </div>
            )}
            
            {successMsg && (
              <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm font-semibold mb-6 border border-green-200">
                {successMsg}
              </div>
            )}

            {mode !== 'forgot' && (
              <>
                <button 
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full bg-white border-2 border-cream2 text-ink py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:border-bdr transition-all shadow-sm mb-6"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-bdr"></div>
                  <span className="text-xs font-bold text-gray uppercase tracking-wider">or</span>
                  <div className="flex-1 h-px bg-bdr"></div>
                </div>
              </>
            )}

            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wide mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray" size={18} />
                    <input 
                      type="text" 
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-cream2 border-2 border-transparent focus:border-green focus:bg-white rounded-xl py-3 pl-12 pr-4 text-ink font-medium outline-none transition-all"
                    />
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-xs font-bold text-ink uppercase tracking-wide mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray" size={18} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-cream2 border-2 border-transparent focus:border-green focus:bg-white rounded-xl py-3 pl-12 pr-4 text-ink font-medium outline-none transition-all"
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-ink uppercase tracking-wide">Password</label>
                    {mode === 'login' && (
                      <button 
                        type="button" 
                        onClick={() => setMode('forgot')}
                        className="text-xs font-bold text-gray hover:text-ink transition-colors"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray" size={18} />
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-cream2 border-2 border-transparent focus:border-green focus:bg-white rounded-xl py-3 pl-12 pr-4 text-ink font-medium outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-ink text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 hover:bg-green hover:text-ink disabled:opacity-70 transition-all shadow-xl shadow-ink/10 mt-6"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : 
                  (mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link')
                }
                {!isLoading && <ArrowRight size={18} />}
              </button>
              
            </form>

            <div className="mt-8 text-center">
              {mode === 'login' ? (
                <p className="text-sm font-medium text-gray">
                  Don't have an account?{' '}
                  <button onClick={() => setMode('signup')} className="text-ink font-bold hover:text-green transition-colors">Sign up</button>
                </p>
              ) : (
                <p className="text-sm font-medium text-gray">
                  {mode === 'signup' ? 'Already have an account?' : 'Remembered your password?'}{' '}
                  <button onClick={() => setMode('login')} className="text-ink font-bold hover:text-green transition-colors">Log in</button>
                </p>
              )}
            </div>

            <div className="mt-10 flex items-center justify-center gap-2 text-[10px] text-gray font-mono font-bold uppercase tracking-wider">
              <ShieldCheck size={14} className="text-green" />
              <span>End-to-End Encrypted • SOC 2 Type II Compliant</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
