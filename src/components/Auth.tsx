import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, Lock, Loader2, ArrowLeft, ShieldCheck, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Auth({ onLogin, onBack }: { onLogin: () => void, onBack: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Form States
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  // Compute password strength on change
  useEffect(() => {
    let strength = 0;
    const p = formData.password;
    if (p.length >= 8) strength += 25;
    if (/[A-Z]/.test(p)) strength += 25;
    if (/[0-9]/.test(p)) strength += 25;
    if (/[^A-Za-z0-9]/.test(p)) strength += 25;
    setPasswordStrength(strength);
  }, [formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const simulateHash = (str: string) => {
    let hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash.toString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (isLogin) {
      // Handle Login
      const storedData = localStorage.getItem('optiLinkUser');
      if (!storedData) {
        setErrorMsg('No account found. Please register.');
        setIsLoading(false);
        return;
      }
      const user = JSON.parse(storedData);
      const passHash = simulateHash(formData.password);
      
      if (user.email === formData.email && user.passwordHash === passHash) {
        onLogin();
      } else {
        setErrorMsg('Invalid email or password.');
      }
    } else {
      // Handle Registration
      if (formData.password !== formData.confirmPassword) {
        setErrorMsg('Passwords do not match.');
        setIsLoading(false);
        return;
      }
      if (passwordStrength < 50) {
        setErrorMsg('Please choose a stronger password.');
        setIsLoading(false);
        return;
      }

      const passHash = simulateHash(formData.password);
      
      const newUser = {
        fullName: formData.fullName,
        email: formData.email,
        username: formData.username,
        passwordHash: passHash,
        memberSince: new Date().toISOString()
      };
      
      localStorage.setItem('optiLinkUser', JSON.stringify(newUser));
      onLogin();
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-opti-white flex selection:bg-opti-green selection:text-opti-black">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex w-1/2 bg-opti-black p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-opti-green/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-opti-green/20 rounded-full blur-[100px]" />
        
        <div className="relative z-10">
          <button onClick={onBack} className="text-white/50 hover:text-white flex items-center gap-2 text-sm font-bold transition-colors mb-12">
            <ArrowLeft size={16} /> Back to website
          </button>
          <div className="text-white font-black text-2xl tracking-tight">Opti-Link</div>
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl font-black text-white tracking-tighter leading-[1.1] mb-6">
            Your Growth<br />Dashboard,<br /><span className="text-opti-green italic">centralised.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-md leading-relaxed">
            Track Performance. Scale Faster. Data-driven results and real revenue at your fingertips.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-sm text-white/40 font-bold">
          <span>© 2026 Opti-Link Media Group</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Client Portal</span>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 md:p-16 relative">
        <button onClick={onBack} className="lg:hidden absolute top-8 left-8 text-opti-gray hover:text-opti-black flex items-center gap-2 text-sm font-bold transition-colors">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="max-w-md w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-10 text-center lg:text-left">
                <h2 className="text-3xl font-black text-opti-black tracking-tight mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-opti-gray text-sm font-medium">
                  {isLogin 
                    ? 'Enter your credentials to access your portal.' 
                    : 'Set up your client portal to track performance.'}
                </p>
              </div>

              {errorMsg && (
                <div className="mb-6 p-3 bg-opti-red/10 border border-opti-red/20 rounded-lg flex items-center gap-2 text-opti-red text-sm font-medium animate-in fade-in slide-in-from-top-2">
                  <AlertCircle size={16} />
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    className="space-y-6"
                  >
                    <div className="relative group">
                      <label className="opti-label">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-0 top-1/2 -translate-y-1/2 text-opti-gray group-focus-within:text-opti-black transition-colors" size={18} />
                        <input
                          type="text" name="fullName" required value={formData.fullName} onChange={handleChange}
                          className="opti-input pl-8" placeholder="John Doe"
                        />
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="opti-label">Username</label>
                      <div className="relative">
                        <User className="absolute left-0 top-1/2 -translate-y-1/2 text-opti-gray group-focus-within:text-opti-black transition-colors" size={18} />
                        <input
                          type="text" name="username" required value={formData.username} onChange={handleChange}
                          className="opti-input pl-8" placeholder="johndoe123"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="relative group">
                  <label className="opti-label">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-opti-gray group-focus-within:text-opti-black transition-colors" size={18} />
                    <input
                      type="email" name="email" required value={formData.email} onChange={handleChange}
                      className="opti-input pl-8" placeholder="name@company.com"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label className="opti-label">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-opti-gray group-focus-within:text-opti-black transition-colors" size={18} />
                    <input
                      type="password" name="password" required value={formData.password} onChange={handleChange}
                      className="opti-input pl-8" placeholder="••••••••"
                    />
                  </div>
                  {!isLogin && formData.password.length > 0 && (
                    <div className="mt-2">
                      <div className="h-1.5 w-full bg-opti-lightgray rounded-full overflow-hidden flex">
                        <motion.div 
                          className="h-full bg-opti-green transition-all"
                          initial={{ width: 0 }}
                          animate={{ width: `${passwordStrength}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-opti-gray mt-1 text-right font-medium">
                        {passwordStrength < 50 ? 'Weak' : passwordStrength < 75 ? 'Good' : 'Strong'}
                      </div>
                    </div>
                  )}
                </div>

                {!isLogin && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <div className="relative group">
                      <label className="opti-label">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-opti-gray group-focus-within:text-opti-black transition-colors" size={18} />
                        <input
                          type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange}
                          className="opti-input pl-8" placeholder="••••••••"
                        />
                        {formData.confirmPassword.length > 0 && formData.password === formData.confirmPassword && (
                          <CheckCircle2 className="absolute right-2 top-1/2 -translate-y-1/2 text-opti-success" size={18} />
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="opti-button w-full mt-8"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : (isLogin ? 'Sign In' : 'Create Account')}
                  {!isLoading && <ArrowRight size={18} className="ml-2" />}
                </button>
              </form>

              <div className="mt-8 text-center">
                <button 
                  onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); setFormData({ fullName: '', email: '', username: '', password: '', confirmPassword: '' }) }}
                  className="text-sm font-semibold text-opti-gray hover:text-opti-black transition-colors"
                >
                  {isLogin ? "Don't have an account? Register" : "Already have an account? Sign In"}
                </button>
              </div>
              
              <div className="mt-12 flex items-center justify-center gap-2 text-[10px] text-opti-gray font-mono font-bold uppercase tracking-wider">
                <ShieldCheck size={14} className="text-opti-green" />
                <span>End-to-End Encrypted • Secure Portal</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

