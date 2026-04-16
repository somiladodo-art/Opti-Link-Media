import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Check, 
  ChevronDown, 
  MapPin, 
  ShoppingCart, 
  Store, 
  Briefcase, 
  Utensils, 
  Ban, 
  Smartphone, 
  Globe, 
  Settings, 
  Megaphone, 
  BarChart3, 
  MessageSquare, 
  Leaf, 
  Rocket, 
  Trophy, 
  TrendingDown, 
  Banknote, 
  Repeat, 
  Timer, 
  TrendingUp, 
  Diamond, 
  Star, 
  Lock, 
  Target, 
  HelpCircle, 
  Hourglass, 
  ClipboardCheck, 
  Loader2,
  ShieldCheck,
  PenTool
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import Chatbot from './components/Chatbot';
import { Character3D } from './components/Character3D';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import SolutionPage from './components/SolutionPage';
import { SphereLogo3D } from './components/SphereLogo3D';
import Blog from './components/Blog';

// --- Components ---

const Logo = ({ className, dark = false }: { className?: string, dark?: boolean }) => {
  const color = dark ? "white" : "#000000";
  const bgColor = dark ? "#000000" : "white";
  
  return (
    <svg className={cn("w-10 h-10", className)} viewBox="0 0 200 200">
      {/* Background and Outer Border */}
      <circle cx="100" cy="100" r="98" fill={bgColor} />
      <circle cx="100" cy="100" r="90" fill="none" stroke={color} strokeWidth="3" />
      
      {/* Globe with Detailed Grid */}
      <g stroke={color} strokeWidth="1.2" fill="none">
        <circle cx="100" cy="100" r="54" strokeWidth="2" />
        {/* Longitude lines */}
        <ellipse cx="100" cy="100" rx="18" ry="54" />
        <ellipse cx="100" cy="100" rx="36" ry="54" />
        <line x1="100" y1="46" x2="100" y2="154" />
        {/* Latitude lines */}
        <ellipse cx="100" cy="100" rx="54" ry="14" />
        <ellipse cx="100" cy="100" rx="54" ry="28" />
        <ellipse cx="100" cy="100" rx="54" ry="42" />
      </g>
      
      {/* Orbital Ring */}
      <ellipse 
        cx="100" 
        cy="100" 
        rx="84" 
        ry="24" 
        fill="none" 
        stroke={color} 
        strokeWidth="3" 
        transform="rotate(-25 100 100)" 
      />
      
      {/* Sparkle Stars */}
      <g fill={color}>
        {/* Top Star */}
        <path transform="translate(162, 78) scale(1.2)" d="M 0,-10 Q 1,-1 10,0 Q 1,1 0,10 Q -1,1 -10,0 Q -1,-1 0,-10 Z" />
        {/* Bottom Star */}
        <path transform="translate(174, 102) scale(0.8)" d="M 0,-10 Q 1,-1 10,0 Q 1,1 0,10 Q -1,1 -10,0 Q -1,-1 0,-10 Z" />
      </g>
      
      {/* Circular Text */}
      <defs>
        <path id="logoTopPath" d="M 32,100 A 68,68 0 0,1 168,100" />
        <path id="logoBottomPath" d="M 32,100 A 68,68 0 0,0 168,100" />
      </defs>
      
      <text fill={color} fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="23" letterSpacing="1">
        <textPath href="#logoTopPath" startOffset="50%" textAnchor="middle">OPTI-LINK</textPath>
      </text>
      
      <text fill={color} fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="18" letterSpacing="1">
        <textPath href="#logoBottomPath" startOffset="50%" textAnchor="middle" dominantBaseline="hanging">MEDIA - GROUP</textPath>
      </text>
    </svg>
  );
};

const Section = ({ children, className, id, dark = false, alt = false }: { children: React.ReactNode, className?: string, id?: string, dark?: boolean, alt?: boolean }) => (
  <section id={id} className={cn(
    "py-24 md:py-32 px-6",
    dark ? "bg-ink2 text-white" : alt ? "bg-white" : "bg-cream",
    className
  )}>
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="max-w-7xl mx-auto"
    >
      {children}
    </motion.div>
  </section>
);

const Eyebrow = ({ children, centered = false }: { children: React.ReactNode, centered?: boolean }) => (
  <div className={cn(
    "flex items-center gap-3 mb-4",
    centered ? "justify-center" : ""
  )}>
    {!centered && <div className="w-5 h-[1.5px] bg-ink rounded-full" />}
    <span className="font-mono text-[10px] font-bold text-ink bg-green px-2 py-1 uppercase tracking-[0.3em]">
      {children}
    </span>
  </div>
);

const Heading = ({ children, className, centered = false }: { children: React.ReactNode, className?: string, centered?: boolean }) => (
  <h2 className={cn(
    "text-4xl md:text-5xl lg:text-6xl font-black text-ink tracking-tight leading-[1.1] mb-6",
    centered ? "text-center" : "",
    className
  )}>
    {children}
  </h2>
);

const Subheading = ({ children, className, centered = false }: { children: React.ReactNode, className?: string, centered?: boolean }) => (
  <p className={cn(
    "text-lg md:text-xl text-gray max-w-2xl leading-relaxed",
    centered ? "text-center mx-auto" : "",
    className
  )}>
    {children}
  </p>
);

const RevenueCalculator = () => {
  const [visitors, setVisitors] = useState(1000);
  const [conversion, setConversion] = useState(1.5);
  const [aov, setAov] = useState(500);

  const currentRevenue = visitors * (conversion / 100) * aov;
  const optiLinkConversion = Math.min(conversion + 2.5, 10);
  const potentialRevenue = visitors * (optiLinkConversion / 100) * aov;
  const lostRevenue = potentialRevenue - currentRevenue;

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-bdr-d relative overflow-hidden my-20">
      <div className="absolute top-0 right-0 w-64 h-64 bg-green/10 rounded-full blur-[80px] opacity-50 pointer-events-none" />
      
      <div className="grid lg:grid-cols-2 gap-12 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2.5 bg-green border border-green rounded-full px-3 py-1 mb-4">
            <BarChart3 size={12} className="text-ink" />
            <span className="text-[0.65rem] font-bold text-ink uppercase tracking-wider">Free ROI Tool</span>
          </div>
          <h3 className="text-3xl font-black text-ink tracking-tight mb-2">Revenue Leakage Calculator</h3>
          <p className="text-sm text-gray mb-8">See exactly how much money you're leaving on the table by not having an automated sales pipeline.</p>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-ink uppercase tracking-wider">Monthly Visitors / Leads</label>
                <span className="text-sm font-bold text-green">{visitors.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="100" max="10000" step="100" 
                value={visitors} onChange={(e) => setVisitors(Number(e.target.value))}
                className="w-full h-2 bg-cream3 rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: '#c8f060' }}
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-ink uppercase tracking-wider">Current Conversion Rate</label>
                <span className="text-sm font-bold text-green">{conversion}%</span>
              </div>
              <input 
                type="range" min="0.1" max="5" step="0.1" 
                value={conversion} onChange={(e) => setConversion(Number(e.target.value))}
                className="w-full h-2 bg-cream3 rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: '#c8f060' }}
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-ink uppercase tracking-wider">Average Order Value (R)</label>
                <span className="text-sm font-bold text-green">R {aov.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="100" max="5000" step="50" 
                value={aov} onChange={(e) => setAov(Number(e.target.value))}
                className="w-full h-2 bg-cream3 rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: '#c8f060' }}
              />
            </div>
          </div>
        </div>

        <div className="bg-ink rounded-2xl p-8 text-white flex flex-col justify-center shadow-inner relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green/20 rounded-full blur-[40px]" />
          <div className="relative z-10">
            <div className="mb-6">
              <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1">Current Monthly Revenue</div>
              <div className="text-2xl font-bold">R {Math.round(currentRevenue).toLocaleString()}</div>
            </div>
            
            <div className="mb-6">
              <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1">Potential With Opti-Link</div>
              <div className="text-2xl font-bold text-green">R {Math.round(potentialRevenue).toLocaleString()}</div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1">Money Left On The Table</div>
              <div className="text-4xl md:text-5xl font-black text-white tracking-tighter">R {Math.round(lostRevenue).toLocaleString()}<span className="text-lg font-bold text-white/50">/mo</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'dashboard' | 'freelancers' | 'creators' | 'influencers' | 'careers' | 'academy' | 'blog'>('landing');
  const [scrolled, setScrolled] = useState(false);
  const [surveyStep, setSurveyStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, { val: string, score: number }>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnswer = (q: number, val: string, score: number) => {
    setAnswers(prev => ({ ...prev, [q]: { val, score } }));
  };

  const nextStep = () => {
    if (surveyStep === 6) {
      const score = Object.values(answers).reduce((acc, curr) => acc + curr.score, 0);
      setTotalScore(score);
      setSurveyStep(7); // Squeeze page
    } else {
      setSurveyStep(prev => prev + 1);
    }
  };

  const prevStep = () => setSurveyStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const getPhaseInfo = () => {
    if (totalScore <= 5) return {
      phase: 'Phase 1 — Foundation',
      title: 'Your digital engine is ready to build.',
      sub: "You're leaving serious revenue on the table without an automated system. We can build your entire digital engine from scratch and have it live in 7 days — at zero upfront cost on our pilot model."
    };
    if (totalScore <= 8) return {
      phase: 'Phase 2 — Automation',
      title: 'You have presence — now you need automation.',
      sub: "You're generating traction but leads are slipping through. A WhatsApp pipeline and CRM will immediately recover lost revenue and convert more enquiries into paying customers."
    };
    if (totalScore <= 11) return {
      phase: 'Phase 3 — Visibility & Traffic',
      title: 'Your system is solid. Time to flood it with leads.',
      sub: "Your digital foundation is working well. The next lever is consistent traffic — targeted social media and paid ad campaigns will fill your pipeline with qualified leads at scale."
    };
    return {
      phase: 'Phase 4–5 — Scale & Dominate',
      title: "You're ready to dominate your market.",
      sub: "You have revenue and systems in place. The opportunity now is full-stack optimisation — advanced automation, multi-channel campaigns, and data-driven decisions that compound your growth monthly."
    };
  };

  if (currentView === 'auth') {
    return <Auth onLogin={() => setCurrentView('dashboard')} onBack={() => setCurrentView('landing')} />;
  }

  if (currentView === 'dashboard') {
    return <Dashboard onLogout={() => setCurrentView('landing')} />;
  }

  if (currentView === 'blog') {
    return <Blog onBack={() => setCurrentView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-cream selection:bg-green selection:text-ink">
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-[200] transition-all duration-300 px-6",
        scrolled ? "bg-cream/95 backdrop-blur-xl border-b border-bdr py-4" : "py-8"
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setCurrentView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <Logo className="w-12 h-12" />
            <div className="leading-none">
              <strong className="block text-xl font-black tracking-tight text-ink">Opti-Link</strong>
              <span className="block text-[0.7rem] font-bold text-gray-lt uppercase tracking-[0.2em]">Media Group</span>
            </div>
          </div>
          
            <ul className="hidden md:flex items-center gap-12">
              {[
                { name: 'Features', id: 'features' },
                { name: 'Solutions', id: 'services', dropdown: ['Freelancers', 'Creators', 'Influencers', 'Careers', 'Academy'] },
                { name: 'Pricing', id: 'pricing' },
                { name: 'Results', id: 'results' },
                { name: 'Blog', id: 'blog', isView: true }
              ].map((item) => (
                <li key={item.name} className="relative group">
                  <a 
                    href={`#${item.id}`} 
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.isView) {
                        setCurrentView(item.id as any);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else if (currentView !== 'landing') {
                        setCurrentView('landing');
                        setTimeout(() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }), 100);
                      } else {
                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-base font-bold text-gray hover:text-ink transition-colors flex items-center gap-1"
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown size={16} className="text-gray-lt" />}
                  </a>
                  {item.dropdown && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-bdr-d rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all overflow-hidden">
                      {item.dropdown.map(sub => (
                        <a 
                          key={sub} 
                          href={`#${sub.toLowerCase()}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentView(sub.toLowerCase() as any);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="block px-5 py-3 text-sm font-bold text-gray hover:text-ink hover:bg-cream transition-colors border-b border-cream last:border-0"
                        >
                          {sub}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentView('auth')}
              className="hidden md:block text-base font-bold text-ink px-5 py-2.5 hover:bg-cream rounded-lg transition-colors"
            >
              Client Login
            </button>
            <button 
              onClick={() => {
                if (currentView !== 'landing') {
                  setCurrentView('landing');
                  setTimeout(() => document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' }), 100);
                } else {
                  document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-ink text-white text-base font-bold px-7 py-3.5 rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-ink/10"
            >
              Get started
            </button>
          </div>
        </div>
      </nav>

      {currentView === 'landing' ? (
        <>
          {/* Hero Section */}
          <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 min-h-[90vh] flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,240,96,0.1)_0%,transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center w-full"
          >
            <div className="mb-8">
              <SphereLogo3D className="w-32 h-32 md:w-40 md:h-40" />
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[120px] font-black text-ink tracking-tighter leading-[0.9] uppercase mb-4">
              DIGITAL<br />
              <span className="bg-green text-ink px-6 py-2 mt-2 inline-block">MARKETING</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray font-medium tracking-tight mb-12 max-w-3xl">
              Thank you for joining this digital marketing workshop where we explore effective strategies and tools innovate collaborate optimize learn.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16 w-full max-w-4xl justify-between items-center">
              <div className="bg-green text-ink font-bold px-6 py-3 text-lg">
                Presented by Opti-Link
              </div>
              <button 
                onClick={() => document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-green text-ink px-8 py-3 font-bold text-lg hover:bg-green-h transition-all"
              >
                Getting Started
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section */}
      <div className="border-y border-bdr bg-white/50 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center font-mono text-[10px] font-bold text-gray uppercase tracking-[0.3em] mb-8">Trusted by enterprise scaling teams across 14 countries</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-40 grayscale">
            <div className="font-black text-2xl tracking-tighter">NEXUS<span className="font-light">GLOBAL</span></div>
            <div className="font-black text-2xl tracking-widest">AURA</div>
            <div className="font-black text-2xl tracking-tighter">VERTEX<span className="text-green">.</span></div>
            <div className="font-black text-2xl tracking-tight">QUANTUM</div>
            <div className="font-black text-2xl tracking-widest">ELEVATE</div>
          </div>
        </div>
      </div>

      {/* Logo Strip Section */}
      <section className="bg-white py-24 px-6 overflow-hidden border-b border-bdr">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-20 items-center">
          <div>
            <Logo className="w-36 h-36 mb-8" />
            <div className="font-mono text-[10px] font-bold text-gray uppercase tracking-[0.3em] mb-3">[About us]</div>
            <p className="text-xl text-ink leading-relaxed max-w-xs font-medium">
              We are a premier global digitisation and growth partner. We don't sell software — we <strong className="bg-green text-ink px-1">operate your entire digital engine</strong> so you can focus on what you do best.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: '150+', lbl: 'Stores digitised globally', change: 'Growing every month', icon: <TrendingUp size={14} /> },
              { num: '14d', lbl: 'Average time to first results, guaranteed', change: 'Or no service fee', icon: <Rocket size={14} /> },
              { num: 'R0', lbl: 'Upfront cost on our pilot model', change: 'Zero risk to start', icon: <Check size={14} /> },
              { num: '3.2×', lbl: 'Average client ROI within 12 months', change: 'Outcome-focused only', icon: <TrendingUp size={14} /> },
              { num: 'R42k', lbl: 'Average monthly revenue recovered per client', change: 'From automation alone', icon: <Banknote size={14} /> },
              { num: '5', lbl: 'Pilot slots available per month — act fast', change: '2 spots remaining', icon: <Hourglass size={14} /> }
            ].map((stat, i) => (
              <div key={i} className="bg-cream2 p-8 border border-bdr">
                <div className="flex items-center gap-2 text-green mb-4">
                  {stat.icon}
                  <span className="text-xs font-bold uppercase tracking-wider text-ink">{stat.change}</span>
                </div>
                <div className="text-4xl font-black text-ink tracking-tighter mb-2">{stat.num}</div>
                <div className="text-sm font-semibold text-gray">{stat.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Bar */}
      <div className="bg-white border-y border-bdr py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          {[
            { icon: <Target className="text-ink" />, title: 'No-Pay-Unless Model', desc: 'Zero upfront on our pilot option. Our costs are subsidized by software partners — you see results first, every time.' },
            { icon: <Rocket className="text-ink" />, title: 'Live in 7 Days or We Walk', desc: 'If your digital system isn\'t fully functional within 7 days, no service fees are charged. Hard deadline, every client.' },
            { icon: <TrendingUp className="text-ink" />, title: 'Revenue-Focused Only', desc: 'We don\'t report on vanity metrics. We track leads, conversions, and revenue attributed directly to your digital system.' }
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-green border border-ink/10 flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="text-base font-bold text-ink mb-1 tracking-tight">{item.title}</h4>
                <p className="text-sm text-gray leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <Section id="services" alt>
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <Eyebrow>What we do</Eyebrow>
            <h2 className="text-5xl md:text-7xl font-black text-ink tracking-tighter leading-none uppercase mb-6">
              EVERYTHING YOUR<br />
              <span className="bg-green text-ink px-4 py-1 mt-2 inline-block">BUSINESS NEEDS</span>
            </h2>
          </div>
          <div>
            <Subheading>From setting up your online shop to automatic follow-ups — we build and run the entire system for growing businesses worldwide.</Subheading>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <HelpCircle />, title: 'Free Consultation (Pilot)', desc: 'A 45–60 minute business audit to diagnose pain points and create a customised growth roadmap.', tags: ['Audit', 'Roadmap'] },
            { icon: <ShoppingCart />, title: 'Implementation Package', desc: 'Full setup of your online store, hosting, domain, CRM, and automation tools.', tags: ['Shopify', 'CRM', 'Automation'] },
            { icon: <TrendingUp />, title: 'Monthly Retainer', desc: 'Ongoing marketing operations, ad management, content creation, and automation upgrades.', tags: ['Ads', 'Content', 'Growth'] }
          ].map((svc, i) => (
            <div key={i} className="bg-white p-10 rounded-2xl border border-bdr-d shadow-sm hover:shadow-xl transition-all group">
              <div className="w-16 h-16 rounded-xl bg-green border border-ink/10 flex items-center justify-center text-ink mb-8 group-hover:scale-110 transition-transform">
                {svc.icon}
              </div>
              <h3 className="text-xl font-black text-ink mb-4 tracking-tight">{svc.title}</h3>
              <p className="text-sm text-gray leading-relaxed mb-8">{svc.desc}</p>
              <div className="flex flex-wrap gap-2">
                {svc.tags.map(tag => (
                  <span key={tag} className="font-mono text-[10px] font-bold bg-cream border border-bdr-d rounded-md px-3 py-1.5 text-gray uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Process Section */}
      <Section id="features">
        <Eyebrow centered>The process</Eyebrow>
        <h2 className="text-5xl md:text-7xl font-black text-ink tracking-tighter leading-none uppercase mb-4 text-center">
          LIVE AND SELLING<br />
          <span className="bg-green text-ink px-4 py-1 mt-2 inline-block">IN 14 DAYS</span>
        </h2>
        <Subheading centered className="mb-20">A simple 5-step plan that takes your business from "just a shop" to a digital machine — starting from wherever you are today.</Subheading>
        
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-bdr-d hidden md:block -translate-y-1/2" />
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { phase: '01', title: 'Audit & Strategy', desc: 'Deep dive into your current metrics and bottlenecks.', icon: <Target /> },
              { phase: '02', title: 'Infrastructure Build', desc: 'Setting up CRM, tracking, and automation tools.', icon: <Settings /> },
              { phase: '03', title: 'Asset Creation', desc: 'Landing pages, ad creatives, and email sequences.', icon: <PenTool /> },
              { phase: '04', title: 'Traffic Generation', desc: 'Launching targeted ad campaigns and SEO.', icon: <Rocket /> },
              { phase: '05', title: 'Launch & Optimisation', desc: 'Weekly reporting, KPI measurement, and retainer proposals.', icon: <Trophy /> }
            ].map((step, i) => (
              <div key={i} className="relative z-10 text-center">
                <div className="w-16 h-16 bg-green flex items-center justify-center mx-auto mb-6 text-ink shadow-sm">
                  <span className="font-black text-2xl">{step.phase}</span>
                </div>
                <h4 className="text-sm font-bold text-ink mb-2 tracking-tight">{step.title}</h4>
                <p className="text-xs text-gray leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 bg-cream2 border border-bdr p-12 md:p-16 grid lg:grid-cols-[1fr_auto] gap-12 items-center relative overflow-hidden">
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-ink tracking-tight mb-4 leading-tight">
              The free pilot model —<br />how it actually works.
            </h3>
            <p className="text-gray text-lg leading-relaxed max-w-2xl">
              Looking to scale without the upfront risk? We build your entire digital engine at <strong className="bg-green text-ink px-1">zero upfront cost</strong>. We set up the core software tools your business needs to grow. Our costs are subsidized through strategic software partnerships, meaning you get a full setup delivered in 7 days, guaranteed, with zero risk.
            </p>
          </div>
          <button 
            onClick={() => document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-green text-ink px-10 py-5 font-black text-lg hover:bg-green-h transition-all whitespace-nowrap"
          >
            Start free pilot
            <ArrowRight size={20} className="inline ml-3" />
          </button>
        </div>

        <RevenueCalculator />
      </Section>

      {/* Pricing Section */}
      <Section id="pricing" alt>
        <Eyebrow centered>Pricing</Eyebrow>
        <h2 className="text-5xl md:text-7xl font-black text-ink tracking-tighter leading-none uppercase mb-4 text-center">
          SIMPLE, HONEST<br />
          <span className="bg-green text-ink px-4 py-1 mt-2 inline-block">PRICING</span>
        </h2>
        <Subheading centered className="mb-16">Monthly retainers, 3-month minimum. Paid setup or free pilot — no hidden fees, no surprises.</Subheading>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              name: 'Entry', 
              price: 'R3,500', 
              note: 'Once-off setup from R15,000 · or choose the free pilot',
              feats: ['CRM setup & management', 'WhatsApp sales pipeline', '12–20 social posts per month', 'Basic Shopify / website ops', 'Monthly snapshot report']
            },
            { 
              name: 'Growth', 
              price: 'R5,500', 
              popular: true,
              note: 'Once-off setup from R25,000 · or choose the free pilot',
              feats: ['Everything in Entry', 'Multi-product Shopify store', 'Automation workflows', 'Meta ads management', 'Advanced reporting & dashboard', 'Bi-weekly strategy call', 'Priority support']
            },
            { 
              name: 'Enterprise', 
              price: 'Custom', 
              note: 'Tailored for established SMMEs with complex, multi-channel needs',
              feats: ['Everything in Growth', 'Dedicated account manager', 'Multi-channel paid campaigns', 'Custom CRM integrations', 'Weekly reporting & SLA']
            }
          ].map((plan, i) => (
            <div key={i} className={cn(
              "relative p-10 rounded-3xl border transition-all duration-300",
              plan.popular 
                ? "bg-ink border-ink scale-105 shadow-2xl shadow-ink/20 z-10" 
                : "bg-cream border-bdr hover:border-bdr-d"
            )}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green text-ink text-[0.65rem] font-black px-5 py-1.5 uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}
              <div className={cn("text-[0.65rem] font-black uppercase tracking-[0.25em] mb-4", plan.popular ? "text-white/30" : "text-gray-lt")}>
                {plan.name}
              </div>
              <div className={cn("text-5xl font-black tracking-tighter mb-2", plan.popular ? "text-white" : "text-ink")}>
                {plan.price}<span className={cn("text-sm font-normal tracking-normal", plan.popular ? "text-white/30" : "text-gray-lt")}>/mo</span>
              </div>
              <p className={cn("text-[0.75rem] leading-relaxed mb-8", plan.popular ? "text-white/30" : "text-gray-lt")}>
                {plan.note}
              </p>
              <div className={cn("h-px w-full mb-8", plan.popular ? "bg-white/10" : "bg-bdr")} />
              <ul className="space-y-4 mb-10">
                {plan.feats.map(feat => (
                  <li key={feat} className={cn("flex items-start gap-3 text-sm font-bold", plan.popular ? "text-white/70" : "text-ink3")}>
                    <Check size={16} className={cn("mt-0.5 flex-shrink-0", plan.popular ? "text-green" : "text-ink")} />
                    {feat}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' })}
                className={cn(
                "w-full py-4 font-bold text-sm transition-all active:scale-95",
                plan.popular 
                  ? "bg-green text-ink hover:bg-green-h" 
                  : "bg-transparent border-2 border-bdr-d text-ink hover:bg-ink hover:text-white hover:border-ink"
              )}>
                Get started
              </button>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section id="results">
        <Eyebrow centered>Client results</Eyebrow>
        <h2 className="text-5xl md:text-7xl font-black text-ink tracking-tighter leading-none uppercase mb-4 text-center">
          SMMES GROWING<br />
          <span className="bg-green text-ink px-4 py-1 mt-2 inline-block">WITH OPTI-LINK</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {[
            { name: 'Thandi Mokoena', role: 'Owner, Thandi\'s Boutique — Johannesburg', quote: "Within 10 days my Shopify store was live, WhatsApp automation was running, and I recovered three abandoned carts in the first week alone. I didn't pay a cent upfront.", color: '#1f4d32' },
            { name: 'Kagiso Dlamini', role: 'Co-founder, Kasi Fresh Foods — Durban', quote: "Month two we saw a 40% increase in repeat orders after Opti-Link built our CRM and WhatsApp pipeline. The retainer pays for itself every single month without question.", color: '#1e3a8a' },
            { name: 'Nandi Pieterse', role: 'Director, NP Design Studio — Cape Town', quote: "They built a lead funnel and automated my quote follow-ups. I booked R80,000 in new contracts in 30 days. As a service business I didn't think this model applied to me.", color: '#6d28d9' }
          ].map((testi, i) => (
            <div key={i} className="bg-cream border border-bdr rounded-3xl p-10 flex flex-col gap-8">
              <div className="flex gap-1 text-ink">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-lg text-gray italic leading-relaxed flex-1">"{testi.quote}"</p>
              <div className="pt-8 border-t border-bdr flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-xs tracking-widest" style={{ backgroundColor: testi.color }}>
                  {testi.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-sm font-bold text-ink tracking-tight">{testi.name}</div>
                  <div className="text-[0.7rem] text-gray-lt font-bold">{testi.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Why Us Section */}
      <Section id="why-us" className="bg-white">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-green/20 rounded-full blur-3xl" />
            <img 
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1000" 
              alt="Team collaboration" 
              className="rounded-[2.5rem] shadow-2xl relative z-10 border border-bdr"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 bg-green text-ink p-8 shadow-2xl z-20 max-w-[240px]">
              <div className="text-3xl font-black mb-2">100%</div>
              <p className="text-xs font-bold uppercase tracking-widest leading-relaxed">Focus on your business growth, not just tech.</p>
            </div>
          </div>
          <div>
            <Eyebrow>Why choose us</Eyebrow>
            <h2 className="text-5xl md:text-7xl font-black text-ink tracking-tighter leading-none uppercase mb-6">
              WE DON'T JUST BUILD WEBSITES.<br />
              <span className="bg-green text-ink px-4 py-1 mt-2 inline-block">WE BUILD BUSINESSES.</span>
            </h2>
            <div className="space-y-8 mt-10">
              {[
                { title: 'We speak your language', desc: 'No technical jargon. We talk about customers, sales, and profit — the things that actually matter to your business.' },
                { title: 'Results in 14 days', desc: 'We don\'t take months to deliver. Our systems are built to start working for you in two weeks or less.' },
                { title: 'Zero risk to start', desc: 'With our free pilot model, you can see the system working before you commit to a long-term partnership.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-10 h-10 bg-green text-ink flex items-center justify-center flex-shrink-0 font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-ink mb-2 tracking-tight">{item.title}</h4>
                    <p className="text-sm text-gray leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Survey Funnel Section */}
      <Section id="survey" className="bg-cream2">
        <div className="text-center mb-16">
          <Eyebrow centered>Free Business Audit</Eyebrow>
          <h2 className="text-5xl md:text-7xl font-black text-ink tracking-tighter leading-none uppercase mb-4 text-center">
            FIND OUT EXACTLY WHERE YOUR<br />
            <span className="bg-green text-ink px-4 py-1 mt-2 inline-block">BUSINESS IS LOSING MONEY</span>
          </h2>
          <Subheading centered>Answer 6 simple questions. We'll show you how to find more customers and grow your profit — free, with no strings attached.</Subheading>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-bdr rounded-[2rem] overflow-hidden shadow-2xl shadow-ink/5">
            <AnimatePresence mode="wait">
              {surveyStep <= 6 ? (
                <motion.div
                  key="survey"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="p-8 pb-0">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[0.65rem] font-bold text-gray-lt uppercase tracking-widest">Business Health Check</span>
                      <span className="text-[0.65rem] font-bold text-ink bg-green px-2 py-1 rounded uppercase tracking-widest">Step {surveyStep} of 6</span>
                    </div>
                    <div className="h-1 w-full bg-cream2 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-green"
                        animate={{ width: `${(surveyStep / 6) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-12">
                    {surveyStep === 1 && (
                      <div className="space-y-10">
                        <div>
                          <h3 className="text-3xl font-black text-ink tracking-tight mb-3">What type of business do you run?</h3>
                          <p className="text-base text-gray">This helps us tailor your personalised quick-win plan.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          {[
                            { val: 'ecom', title: 'Ecommerce / Online Store', sub: 'I sell products online or want to start', icon: <ShoppingCart /> },
                            { val: 'retail', title: 'Retail / Physical Store', sub: 'Brick & mortar, want to go online', icon: <Store /> },
                            { val: 'services', title: 'Services / Consulting', sub: 'I sell expertise, skills, or my time', icon: <Briefcase /> },
                            { val: 'food', title: 'Food, Health & Beauty', sub: 'Restaurant, salon, wellness, FMCG', icon: <Utensils /> }
                          ].map(opt => (
                            <button
                              key={opt.val}
                              onClick={() => handleAnswer(1, opt.val, 1)}
                              className={cn(
                                "flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all group",
                                answers[1]?.val === opt.val ? "bg-green/10 border-green" : "bg-cream border-cream3 hover:border-green/30 hover:bg-green/5"
                              )}
                            >
                              <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all",
                                answers[1]?.val === opt.val ? "bg-green text-ink" : "bg-white border border-bdr-d text-ink group-hover:scale-110"
                              )}>
                                {opt.icon}
                              </div>
                              <div>
                                <strong className="block text-sm font-bold text-ink tracking-tight">{opt.title}</strong>
                                <span className="block text-[0.7rem] text-gray leading-tight mt-0.5">{opt.sub}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {surveyStep === 2 && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-2xl font-black text-ink tracking-tight mb-2">How do people find you online right now?</h3>
                          <p className="text-sm text-gray-lt">Be honest — this helps us find the best way to help you.</p>
                        </div>
                        <div className="space-y-3">
                          {[
                            { val: 'none', title: 'They don\'t', sub: 'No website, no Facebook page, nothing yet', score: 0, icon: <Ban /> },
                            { val: 'social', title: 'Mostly Facebook or Instagram', sub: 'I have pages but no website or online store', score: 1, icon: <Smartphone /> },
                            { val: 'website', title: 'I have a website or store', sub: 'But it doesn\'t bring in many new customers', score: 2, icon: <Globe /> },
                            { val: 'partial', title: 'I have a system running', sub: 'But I know it could be doing much better', score: 3, icon: <Settings /> }
                          ].map(opt => (
                            <button
                              key={opt.val}
                              onClick={() => handleAnswer(2, opt.val, opt.score)}
                              className={cn(
                                "flex items-center gap-4 p-5 rounded-2xl border-2 w-full text-left transition-all group",
                                answers[2]?.val === opt.val ? "bg-green/10 border-green" : "bg-cream border-cream3 hover:border-green/30 hover:bg-green/5"
                              )}
                            >
                              <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all",
                                answers[2]?.val === opt.val ? "bg-green text-ink" : "bg-white border border-bdr-d text-ink group-hover:scale-110"
                              )}>
                                {opt.icon}
                              </div>
                              <div>
                                <strong className="block text-sm font-bold text-ink tracking-tight">{opt.title}</strong>
                                <span className="block text-[0.7rem] text-gray leading-tight mt-0.5">{opt.sub}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {surveyStep > 2 && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-2xl font-black text-ink tracking-tight mb-2">
                            {surveyStep === 3 ? "If you could wave a magic wand and fix one part of your sales process, what would it be?" :
                             surveyStep === 4 ? "How much money does the business make monthly?" :
                             surveyStep === 5 ? "What is the biggest opportunity you're currently missing out on?" :
                             "How would you like to start?"}
                          </h3>
                          <p className="text-sm text-gray-lt">
                            {surveyStep === 3 ? "Pick the one that costs you the most money or time." :
                             surveyStep === 4 ? "This helps us recommend the right growth plan for you." :
                             surveyStep === 5 ? "Select the one thing you need most." :
                             "There's no wrong answer — we'll make it work for you."}
                          </p>
                        </div>
                        <div className={cn("grid gap-3", surveyStep === 4 || surveyStep === 6 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2")}>
                          {(
                            surveyStep === 3 ? [
                              { val: 'leads', title: 'Getting more qualified leads', sub: 'I need a steady stream of new customers', score: 2, icon: <TrendingDown /> },
                              { val: 'convert', title: 'Converting more leads into sales', sub: 'I have enquiries but they don\'t buy', score: 2, icon: <Banknote /> },
                              { val: 'repeat', title: 'Getting customers to buy again', sub: 'I need to turn one-time buyers into loyal fans', score: 2, icon: <Repeat /> },
                              { val: 'time', title: 'Saving time on admin and follow-ups', sub: 'I\'m too busy running the business to market it', score: 2, icon: <Timer /> }
                            ] : surveyStep === 4 ? [
                              { val: '0-10k', title: 'R0 – R10,000 per month', sub: 'Pre-revenue or just getting started', score: 0, icon: <Leaf /> },
                              { val: '10-50k', title: 'R10,000 – R50,000 per month', sub: 'Early traction, ready to scale', score: 1, icon: <TrendingUp /> },
                              { val: '50-150k', title: 'R50,000 – R150,000 per month', sub: 'Growing fast, need systems to keep up', score: 2, icon: <Rocket /> },
                              { val: '150k+', title: 'R150,000+ per month', sub: 'Established — want to optimise and dominate', score: 3, icon: <Diamond /> }
                            ] : surveyStep === 5 ? [
                              { val: 'store', title: 'An online store that sells 24/7', sub: 'Professional site + payment gateway', score: 1, icon: <ShoppingCart /> },
                              { val: 'pipeline', title: 'Automated WhatsApp & CRM pipeline', sub: 'Sales follow-up running 24/7', score: 1, icon: <MessageSquare /> },
                              { val: 'traffic', title: 'Targeted social media & paid ads', sub: 'More visibility and high-quality leads', score: 1, icon: <Megaphone /> },
                              { val: 'all', title: 'A full end-to-end digital growth engine', sub: 'Everything integrated for maximum results', score: 2, icon: <Trophy /> }
                            ] : [
                              { val: 'pilot', title: 'Free pilot — R0 upfront', sub: 'I activate the software tools. We see results first, then decide.', score: 2, icon: <HelpCircle /> },
                              { val: 'paid', title: 'Paid setup — fastest delivery', sub: 'I pay the once-off setup fee and we start immediately with priority build and 7-day delivery.', score: 3, icon: <Rocket /> },
                              { val: 'unsure', title: 'Not sure yet — I want advice first', sub: 'Show me the numbers and the plan on the call, then I\'ll decide with confidence.', score: 1, icon: <MessageSquare /> }
                            ]
                          ).map(opt => (
                            <button
                              key={opt.val}
                              onClick={() => handleAnswer(surveyStep, opt.val, opt.score)}
                              className={cn(
                                "flex items-center gap-4 p-5 rounded-2xl border-2 w-full text-left transition-all group",
                                answers[surveyStep]?.val === opt.val ? "bg-green/10 border-green" : "bg-cream border-cream3 hover:border-green/30 hover:bg-green/5"
                              )}
                            >
                              <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all",
                                answers[surveyStep]?.val === opt.val ? "bg-green text-ink" : "bg-white border border-bdr-d text-ink group-hover:scale-110"
                              )}>
                                {opt.icon}
                              </div>
                              <div>
                                <strong className="block text-sm font-bold text-ink tracking-tight">{opt.title}</strong>
                                <span className="block text-[0.7rem] text-gray leading-tight mt-0.5">{opt.sub}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-12 pt-8 border-t border-bdr flex justify-between items-center">
                      <button 
                        onClick={prevStep}
                        disabled={surveyStep === 1}
                        className="text-sm font-bold text-gray hover:text-ink disabled:opacity-0 transition-all"
                      >
                        Back
                      </button>
                      <button 
                        onClick={nextStep}
                        disabled={!answers[surveyStep]}
                        className="bg-ink text-white px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-green disabled:opacity-30 disabled:hover:bg-ink transition-all"
                      >
                        {surveyStep === 6 ? "See my results" : "Continue"}
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : surveyStep === 7 && !isSubmitted ? (
                <motion.div
                  key="squeeze"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-10 text-center"
                >
                  <div className="w-24 h-24 rounded-full border-2 border-green flex flex-col items-center justify-center mx-auto mb-6">
                    <span className="text-4xl font-black text-ink bg-green px-2 py-1 tracking-tighter leading-none">{totalScore}</span>
                    <span className="text-[0.5rem] font-bold text-gray-lt uppercase tracking-widest mt-1">/ 16</span>
                  </div>
                  <div className="inline-block bg-green border border-ink/20 rounded-full px-5 py-1.5 mb-6 text-[0.75rem] font-bold text-ink uppercase tracking-wider">
                    {getPhaseInfo().phase}
                  </div>
                  <h3 className="text-2xl font-black text-ink tracking-tight mb-2 leading-tight">Your Business Health Report is ready.</h3>
                  <p className="text-sm text-gray leading-relaxed max-w-md mx-auto mb-10">
                    Enter your details below to unlock your personalised growth plan and see exactly where you're losing money.
                  </p>
                  
                  <div className="bg-green border border-ink/20 rounded-xl p-4 flex items-center gap-4 text-left text-ink font-semibold text-xs mb-10">
                    <Check size={18} className="flex-shrink-0 text-ink" />
                    <span>Your report includes a 14-day growth roadmap and a free pilot offer.</span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input required className="w-full p-4 bg-cream border-2 border-cream3 rounded-xl text-sm outline-none focus:border-green transition-all" placeholder="Your full name" />
                      <input required className="w-full p-4 bg-cream border-2 border-cream3 rounded-xl text-sm outline-none focus:border-green transition-all" placeholder="Business name" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input required type="tel" className="w-full p-4 bg-cream border-2 border-cream3 rounded-xl text-sm outline-none focus:border-green transition-all" placeholder="WhatsApp number" />
                      <input required type="email" className="w-full p-4 bg-cream border-2 border-cream3 rounded-xl text-sm outline-none focus:border-green transition-all" placeholder="Email address" />
                    </div>
                    <input className="w-full p-4 bg-cream border-2 border-cream3 rounded-xl text-sm outline-none focus:border-green transition-all" placeholder="Website / Social URL (optional)" />
                    <select required className="w-full p-4 bg-cream border-2 border-cream3 rounded-xl text-sm outline-none focus:border-green transition-all appearance-none">
                      <option value="">Which package interests you most?</option>
                      <option>Entry — R3,500/mo</option>
                      <option>Growth — R5,500/mo</option>
                      <option>Enterprise — Custom</option>
                      <option>Free pilot first, then decide</option>
                    </select>
                    
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-ink text-white py-5 rounded-xl font-black text-lg flex items-center justify-center gap-3 hover:bg-green hover:-translate-y-1 transition-all shadow-2xl shadow-ink/10 disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" /> : <ClipboardCheck size={20} />}
                      Send Me My Free Audit Report
                    </button>
                  </form>
                  
                  <div className="flex items-center gap-4 my-6 text-[0.7rem] text-gray-lt font-bold uppercase tracking-widest">
                    <div className="h-px flex-1 bg-bdr" /> or <div className="h-px flex-1 bg-bdr" />
                  </div>

                  <a 
                    href="mailto:support@optilinkgroup.com"
                    className="w-full py-4 rounded-xl bg-green border-2 border-ink/20 text-ink font-bold text-sm flex items-center justify-center gap-3 hover:bg-green-h transition-all"
                  >
                    <MessageSquare size={18} />
                    Email us directly instead
                  </a>

                  <p className="mt-8 text-[0.65rem] text-gray-lt flex items-center justify-center gap-2">
                    <Lock size={12} /> Your information stays private. We only use it to prepare your audit.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-16 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-green border-2 border-ink/20 flex items-center justify-center mx-auto mb-8 text-ink">
                    <Check size={40} />
                  </div>
                  <h3 className="text-3xl font-black text-ink tracking-tight mb-4">Your audit is on its way!</h3>
                  <p className="text-gray leading-relaxed mb-12">We'll WhatsApp you within 2 hours to confirm your free 15-minute strategy call.</p>
                  
                  <div className="space-y-4 text-left max-w-sm mx-auto mb-12">
                    {[
                      'We review your business and map your top 3 revenue leaks',
                      'We WhatsApp you your personalised quick-win plan',
                      'We jump on a 15-minute call and show you exactly how to fix it',
                      'You choose: free pilot or paid setup — zero pressure, ever'
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-4 text-sm text-ink3 font-bold">
                        <div className="w-7 h-7 rounded-full bg-green border border-ink/20 flex items-center justify-center text-[0.65rem] font-black text-ink flex-shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        {step}
                      </div>
                    ))}
                  </div>

                  <a 
                    href="mailto:support@optilinkgroup.com"
                    className="bg-ink text-white px-10 py-4 rounded-xl font-bold text-base flex items-center gap-3 hover:bg-green transition-all mx-auto"
                  >
                    <MessageSquare size={20} />
                    Email us to fast-track
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-white pt-24 pb-12 px-6 border-t border-bdr">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <Logo className="w-16 h-16" />
                <div className="leading-none">
                  <strong className="block text-lg font-black text-ink tracking-tight">Opti-Link</strong>
                  <span className="block text-[0.6rem] font-bold text-gray uppercase tracking-[0.2em]">Media Group</span>
                </div>
              </div>
              <p className="text-sm text-gray leading-relaxed max-w-xs">
                Your premier global digital growth partner. We build, automate, and operate your online business so you can focus on what matters.
              </p>
            </div>

            {[
              { title: 'Services', links: ['Ecommerce Setup', 'WhatsApp Automation', 'CRM & Workflows', 'Social Media', 'Paid Ads'] },
              { title: 'Global Offices', links: ['Cape Town (HQ)', 'London', 'Dubai', 'Singapore'] },
              { title: 'Legal & Security', links: ['Trust Center', 'SOC 2 Compliance', 'GDPR Readiness', 'Privacy Policy'] }
            ].map((col, i) => (
              <div key={i}>
                <h5 className="text-[0.65rem] font-black text-gray-lt uppercase tracking-[0.3em] mb-8">{col.title}</h5>
                <ul className="space-y-4">
                  {col.links.map(link => (
                    <li key={link}>
                      <a 
                        href={link.includes('@') ? `mailto:${link}` : "#"} 
                        className="text-sm text-gray hover:text-ink transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-bdr flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-gray-lt">© 2026 Opti-Link Media Group. All rights reserved.</p>
            <div className="flex gap-8 text-xs text-gray-lt">
              <a href="#" className="hover:text-ink transition-colors flex items-center gap-1"><ShieldCheck size={12} /> SOC 2 Type II Certified</a>
              <a href="#" className="hover:text-ink transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-ink transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <Chatbot />
        </>
      ) : (
        <SolutionPage 
          type={currentView} 
          onCTA={() => {
            setCurrentView('landing');
            setTimeout(() => document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' }), 100);
          }} 
        />
      )}
    </div>
  );
}
