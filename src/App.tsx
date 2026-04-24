import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Check, 
  ChevronDown, 
  Menu,
  X,
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
  PenTool,
  Users,
  Wallet,
  UserMinus,
  Search
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { db } from './lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
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
    dark ? "bg-ink2 text-white" : alt ? "bg-white" : "bg-opti-white",
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
    {!centered && <div className="w-5 h-[1.5px] bg-accent rounded-full" />}
    <span className="font-mono text-[10px] font-bold text-ink bg-accent px-2 py-1 uppercase tracking-[0.3em] shadow-sm">
      {children}
    </span>
  </div>
);

const Heading = ({ children, className, centered = false }: { children: React.ReactNode, className?: string, centered?: boolean }) => (
  <h2 className={cn(
    "text-4xl md:text-5xl lg:text-7xl font-black text-opti-black tracking-tight leading-tight mb-8",
    centered ? "text-center" : "",
    className
  )}>
    {children}
  </h2>
);

const Subheading = ({ children, className, centered = false }: { children: React.ReactNode, className?: string, centered?: boolean }) => (
  <p className={cn(
    "text-lg md:text-xl text-opti-gray max-w-3xl leading-relaxed",
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
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-opti-black/10 relative overflow-hidden my-20">
      <div className="absolute top-0 right-0 w-64 h-64 bg-opti-black/5 rounded-full blur-[80px] opacity-50 pointer-events-none" />
      
      <div className="grid lg:grid-cols-2 gap-12 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2.5 bg-opti-black text-opti-white border border-opti-black/20 rounded-full px-3 py-1 mb-4">
            <BarChart3 size={12} className="text-opti-black" />
            <span className="text-[0.65rem] font-bold text-opti-black uppercase tracking-wider">Free ROI Tool</span>
          </div>
          <h3 className="text-3xl font-black text-opti-black tracking-tight mb-2">Revenue Leakage Calculator</h3>
          <p className="text-sm text-opti-gray mb-8">See exactly how much money you're leaving on the table by not having an automated sales pipeline.</p>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-opti-black uppercase tracking-wider">Monthly Visitors / Leads</label>
                <span className="text-sm font-bold text-opti-black">{visitors.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="100" max="10000" step="100" 
                value={visitors} onChange={(e) => setVisitors(Number(e.target.value))}
                className="w-full cursor-pointer focus:outline-none"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-opti-black uppercase tracking-wider">Current Conversion Rate</label>
                <span className="text-sm font-bold text-opti-black">{conversion}%</span>
              </div>
              <input 
                type="range" min="0.1" max="5" step="0.1" 
                value={conversion} onChange={(e) => setConversion(Number(e.target.value))}
                className="w-full cursor-pointer focus:outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-opti-black uppercase tracking-wider">Average Order Value (R)</label>
                <span className="text-sm font-bold text-opti-black">R {aov.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="100" max="5000" step="50" 
                value={aov} onChange={(e) => setAov(Number(e.target.value))}
                className="w-full cursor-pointer focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-ink rounded-2xl p-8 text-white flex flex-col justify-center shadow-inner relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-opti-black/10 rounded-full blur-[40px]" />
          <div className="relative z-10">
            <div className="mb-6">
              <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1">Current Monthly Revenue</div>
              <div className="text-2xl font-bold">R {Math.round(currentRevenue).toLocaleString()}</div>
            </div>
            
            <div className="mb-6">
              <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1">Potential With Opti-Link</div>
              <div className="text-2xl font-bold text-accent">R {Math.round(potentialRevenue).toLocaleString()}</div>
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

const QUESTIONS = [
  {
    id: 1,
    title: "What type of business do you run?",
    sub: "This helps us tailor your personalised quick-win plan.",
    cols: 1,
    options: [
      { val: 'ecom', title: 'Ecommerce / Online Store', sub: 'I sell products online or want to start', score: 1, icon: <ShoppingCart /> },
      { val: 'retail', title: 'Retail / Physical Store', sub: 'Brick & mortar, want to go online', score: 1, icon: <Store /> },
      { val: 'services', title: 'Services / Consulting', sub: 'I sell expertise, skills, or my time', score: 1, icon: <Briefcase /> },
      { val: 'food', title: 'Food, Health & Beauty', sub: 'Restaurant, salon, wellness, FMCG', score: 1, icon: <Utensils /> }
    ]
  },
  {
    id: 2,
    title: "Primary target audience?",
    sub: "Who typically buys from you?",
    cols: 2,
    options: [
      { val: 'b2b', title: 'B2B (Business to Business)', sub: 'I sell to other businesses', score: 1, icon: <Briefcase /> },
      { val: 'b2c', title: 'B2C (Business to Consumer)', sub: 'I sell directly to end users', score: 1, icon: <Users /> },
      { val: 'both', title: 'Both B2B & B2C', sub: 'I have a mix of clients', score: 2, icon: <Globe /> },
      { val: 'unsure', title: 'Not entirely sure yet', sub: 'Still figuring out my ideal customer', score: 0, icon: <HelpCircle /> }
    ]
  },
  {
    id: 3,
    title: "How old is your business?",
    sub: "Understanding your current stage of growth.",
    cols: 2,
    options: [
      { val: 'idea', title: 'Just starting / Idea phase', sub: 'Pre-revenue or very early days', score: 0, icon: <Leaf /> },
      { val: '1-3y', title: '1-3 years old', sub: 'Finding product-market fit', score: 1, icon: <Rocket /> },
      { val: '3-5y', title: '3-5 years old', sub: 'Growing and stabilizing', score: 2, icon: <TrendingUp /> },
      { val: '5y+', title: '5+ years established', sub: 'Looking to optimize and scale', score: 3, icon: <Diamond /> }
    ]
  },
  {
    id: 4,
    title: "How much money does the business make monthly?",
    sub: "This helps us recommend the right growth plan for you.",
    cols: 1,
    options: [
      { val: '0-10k', title: 'R0 – R10,000 per month', sub: 'Pre-revenue or just getting started', score: 0, icon: <Leaf /> },
      { val: '10-50k', title: 'R10,000 – R50,000 per month', sub: 'Early traction, ready to scale', score: 1, icon: <TrendingUp /> },
      { val: '50-150k', title: 'R50,000 – R150,000 per month', sub: 'Growing fast, need systems to keep up', score: 2, icon: <Rocket /> },
      { val: '150k+', title: 'R150,000+ per month', sub: 'Established — want to optimise and dominate', score: 3, icon: <Diamond /> }
    ]
  },
  {
    id: 5,
    title: "Main source of current leads/sales?",
    sub: "Where does your revenue come from mostly today?",
    cols: 2,
    options: [
      { val: 'word', title: 'Word of Mouth / Referrals', sub: 'Organic but unpredictable', score: 1, icon: <MessageSquare /> },
      { val: 'social_organic', title: 'Organic Social Media', sub: 'Posting on Instagram, Facebook, TikTok', score: 1, icon: <Smartphone /> },
      { val: 'paid_ads', title: 'Paid Ads', sub: 'Google Ads, Meta Ads running', score: 3, icon: <Megaphone /> },
      { val: 'walk_in', title: 'Physical Walk-ins', sub: 'Foot traffic to a location', score: 1, icon: <MapPin /> }
    ]
  },
  {
    id: 6,
    title: "How do people find you online right now?",
    sub: "Be honest — this helps us find the best way to help you.",
    cols: 1,
    options: [
      { val: 'none', title: 'They don\'t', sub: 'No website, no Facebook page, nothing yet', score: 0, icon: <Ban /> },
      { val: 'social', title: 'Mostly Facebook or Instagram', sub: 'I have pages but no website or online store', score: 1, icon: <Smartphone /> },
      { val: 'website', title: 'I have a website or store', sub: 'But it doesn\'t bring in many new customers', score: 2, icon: <Globe /> },
      { val: 'partial', title: 'I have a system running', sub: 'But I know it could be doing much better', score: 3, icon: <Settings /> }
    ]
  },
  {
    id: 7,
    title: "Biggest bottleneck in growth right now?",
    sub: "What is physically stopping you from scaling your revenue?",
    cols: 2,
    options: [
      { val: 'leads', title: 'Not enough leads/traffic', sub: 'People just don\'t know we exist', score: 1, icon: <UserMinus /> },
      { val: 'sales', title: 'Low conversion to sales', sub: 'Lots of traffic, nobody buys', score: 2, icon: <Banknote /> },
      { val: 'fulfillment', title: 'Operations & Fulfillment', sub: 'We can\'t handle more customers yet', score: 3, icon: <Timer /> },
      { val: 'cash', title: 'Cashflow bottlenecks', sub: 'No capital to invest in marketing', score: 1, icon: <Wallet /> }
    ]
  },
  {
    id: 8,
    title: "If you could wave a magic wand and fix one part of your sales process, what would it be?",
    sub: "Pick the one that costs you the most money or time.",
    cols: 2,
    options: [
      { val: 'leads', title: 'Getting more qualified leads', sub: 'I need a steady stream of new customers', score: 2, icon: <TrendingDown /> },
      { val: 'convert', title: 'Converting more leads into sales', sub: 'I have enquiries but they don\'t buy', score: 2, icon: <Banknote /> },
      { val: 'repeat', title: 'Getting customers to buy again', sub: 'I need to turn one-time buyers into loyal fans', score: 2, icon: <Repeat /> },
      { val: 'time', title: 'Saving time on admin and follow-ups', sub: 'I\'m too busy running the business to market it', score: 2, icon: <Timer /> }
    ]
  },
  {
    id: 9,
    title: "What does your current sales process look like?",
    sub: "How does a lead actually turn into a paying customer?",
    cols: 1,
    options: [
      { val: 'manual', title: 'Manual WhatsApp / Phone calls', sub: 'I have to reply manually to every message', score: 1, icon: <Smartphone /> },
      { val: 'ecom_auto', title: 'Automated E-commerce', sub: 'They buy on my site without speaking to me', score: 3, icon: <ShoppingCart /> },
      { val: 'no_process', title: 'No structured process', sub: 'It varies every time', score: 0, icon: <HelpCircle /> },
      { val: 'physical', title: 'Physical store only', sub: 'They have to walk in to buy', score: 1, icon: <Store /> }
    ]
  },
  {
    id: 10,
    title: "What is your monthly marketing budget?",
    sub: "This helps us identify what tools and strategies we can realistically deploy.",
    cols: 2,
    options: [
      { val: '0', title: 'Bootstrapping (Zero)', sub: 'I need organic strategies first', score: 0, icon: <Leaf /> },
      { val: 'under_5k', title: 'Under R5,000 /mo', sub: 'Starting some base campaigns', score: 1, icon: <Banknote /> },
      { val: '5k_20k', title: 'R5k – R20k /mo', sub: 'Ready to scale proven ads', score: 2, icon: <TrendingUp /> },
      { val: '20k_plus', title: 'R20,000+ /mo', sub: 'Aggressive growth phase', score: 3, icon: <Rocket /> }
    ]
  },
  {
    id: 11,
    title: "What is the biggest opportunity you're currently missing out on?",
    sub: "Select the one thing you need most.",
    cols: 2,
    options: [
      { val: 'store', title: 'An online store that sells 24/7', sub: 'Professional site + payment gateway', score: 1, icon: <ShoppingCart /> },
      { val: 'pipeline', title: 'Automated WhatsApp & CRM pipeline', sub: 'Sales follow-up running 24/7', score: 1, icon: <MessageSquare /> },
      { val: 'traffic', title: 'Targeted social media & paid ads', sub: 'More visibility and high-quality leads', score: 1, icon: <Megaphone /> },
      { val: 'all', title: 'A full end-to-end digital growth engine', sub: 'Everything integrated for maximum results', score: 2, icon: <Trophy /> }
    ]
  },
  {
    id: 12,
    title: "How comfortable are you with digital tools and tech?",
    sub: "We will tailor the implementation accordingly.",
    cols: 2,
    options: [
      { val: 'hate_tech', title: 'I hate tech', sub: 'I just want you to do it for me', score: 1, icon: <Ban /> },
      { val: 'basic', title: 'I can manage the basics', sub: 'I know how to post and reply', score: 1, icon: <Smartphone /> },
      { val: 'love_tools', title: 'I love tools and automation', sub: 'I enjoy tweaking the systems', score: 2, icon: <Settings /> },
      { val: 'team', title: 'I have a team for this', sub: 'I manage the people who do it', score: 3, icon: <Users /> }
    ]
  },
  {
    id: 13,
    title: "What is your top goal for the next 6 months?",
    sub: "What does success look like for you soon?",
    cols: 2,
    options: [
      { val: 'double', title: 'Double my revenue', sub: 'Aggressive scaling in mind', score: 2, icon: <TrendingUp /> },
      { val: 'save_time', title: 'Save 10+ hours a week', sub: 'I need to step back from the daily grind', score: 2, icon: <Timer /> },
      { val: 'launch', title: 'Launch a new product/service', sub: 'Focusing on expanding offerings', score: 1, icon: <Rocket /> },
      { val: 'predictable', title: 'Build a predictable system', sub: 'Smoothing out the cash flow rollercoaster', score: 3, icon: <ShieldCheck /> }
    ]
  },
  {
    id: 14,
    title: "What's your biggest frustration with current marketing agencies/tools?",
    sub: "We want to ensure we don't repeat the same mistakes.",
    cols: 2,
    options: [
      { val: 'cost', title: 'Costs too much upfront', sub: 'High retainers with no guarantee', score: 1, icon: <Banknote /> },
      { val: 'no_roi', title: 'Cannot see the ROI', sub: 'No clear reporting or tracking', score: 2, icon: <Search /> },
      { val: 'time_drain', title: 'Takes too much of my time', sub: 'I end up managing them', score: 2, icon: <Timer /> },
      { val: 'confusion', title: 'Too complicated', sub: 'Don\'t know what actually works', score: 1, icon: <HelpCircle /> }
    ]
  },
  {
    id: 15,
    title: "How would you like to start?",
    sub: "There's no wrong answer — we'll make it work for you.",
    cols: 1,
    options: [
      { val: 'pilot', title: 'Free pilot — R0 upfront', sub: 'I activate the software tools. We see results first, then decide.', score: 2, icon: <HelpCircle /> },
      { val: 'paid', title: 'Paid setup — fastest delivery', sub: 'I pay the once-off setup fee and we start immediately with priority build and 7-day delivery.', score: 3, icon: <Rocket /> },
      { val: 'unsure', title: 'Not sure yet — I want advice first', sub: 'Show me the numbers and the plan on the call, then I\'ll decide with confidence.', score: 1, icon: <MessageSquare /> }
    ]
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'dashboard' | 'freelancers' | 'creators' | 'influencers' | 'careers' | 'academy' | 'blog'>('landing');
  const [scrolled, setScrolled] = useState(false);
  const [surveyStep, setSurveyStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, { val: string, score: number }>>({});
  const [surveyForm, setSurveyForm] = useState({
    fullName: '',
    businessName: '',
    phone: '',
    email: '',
    website: '',
    interest: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnswer = (q: number, val: string, score: number) => {
    setAnswers(prev => ({ ...prev, [q]: { val, score } }));
  };

  const nextStep = () => {
    if (surveyStep === 15) {
      const score = Object.values(answers).reduce((acc, curr) => acc + curr.score, 0);
      setTotalScore(score);
      setSurveyStep(16); // Squeeze page
    } else {
      setSurveyStep(prev => prev + 1);
    }
  };

  const prevStep = () => setSurveyStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Since we are running fully client-side / local storage for consumers, bypass firebase
      await new Promise(resolve => setTimeout(resolve, 800));
      const surveyData = {
        ...surveyForm,
        score: totalScore,
        answers: JSON.stringify(answers),
        createdAt: new Date().toISOString()
      };
      
      const existingSurveys = JSON.parse(localStorage.getItem('optiLinkSurveys') || '[]');
      localStorage.setItem('optiLinkSurveys', JSON.stringify([...existingSurveys, surveyData]));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPhaseInfo = () => {
    if (totalScore <= 15) return {
      phase: 'Phase 1 — Foundation',
      title: 'Your digital engine is ready to build.',
      sub: "You're leaving serious revenue on the table without an automated system. We can build your entire digital engine from scratch and have it live in 7 days — at zero upfront cost on our pilot model."
    };
    if (totalScore <= 22) return {
      phase: 'Phase 2 — Automation',
      title: 'You have presence — now you need automation.',
      sub: "You're generating traction but leads are slipping through. A WhatsApp pipeline and CRM will immediately recover lost revenue and convert more enquiries into paying customers."
    };
    if (totalScore <= 32) return {
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
    <div className="min-h-screen bg-opti-white selection:bg-opti-black selection:text-opti-white">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[300] bg-opti-black text-opti-white px-4 py-2 font-bold rounded-lg focus:outline-none focus:ring-4 focus:ring-opti-black/20">
        Skip to main content
      </a>
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-[200] transition-all duration-300 px-6 pt-[calc(1.5rem+env(safe-area-inset-top))]",
        scrolled ? "bg-opti-white/95 backdrop-blur-xl border-b border-opti-black/5 pb-5 shadow-sm" : "pb-8 pt-[calc(2.5rem+env(safe-area-inset-top))] bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group shrink-0" onClick={() => { setCurrentView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <Logo className="w-10 h-10 group-hover:scale-105 transition-transform duration-300" />
            <div className="leading-none hidden sm:block">
              <strong className="block text-lg font-black tracking-tight text-opti-black">Opti-Link</strong>
              <span className="block text-[0.65rem] font-bold text-opti-gray uppercase tracking-[0.2em]">Media Group</span>
            </div>
          </div>
          
            <ul className="hidden lg:flex items-center gap-8">
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
                    className="text-sm font-bold text-opti-gray hover:text-opti-black transition-colors flex items-center gap-1.5"
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown size={14} className="text-opti-gray/60 group-hover:text-opti-black transition-colors" />}
                  </a>
                  {item.dropdown && (
                    <div className="absolute top-full left-0 mt-4 w-56 bg-opti-white border border-opti-black/5 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all overflow-hidden translate-y-2 group-hover:translate-y-0 duration-300 z-50">
                      {item.dropdown.map(sub => (
                        <a 
                          key={sub} 
                          href={`#${sub.toLowerCase()}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentView(sub.toLowerCase() as any);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="block px-5 py-3 text-sm font-bold text-opti-gray hover:text-opti-black hover:bg-opti-lightgray transition-colors border-b border-opti-black/5 last:border-0"
                        >
                          {sub}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <button 
              onClick={() => setCurrentView('auth')}
              className="hidden sm:block text-sm font-bold text-opti-black px-4 py-2.5 hover:bg-opti-lightgray rounded-xl transition-colors"
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
              className="opti-button hidden md:flex text-sm py-2.5 px-5 min-w-0"
            >
              Get Started
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-3 text-opti-black hover:bg-opti-lightgray rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-opti-black flex items-center justify-center min-w-[44px] min-h-[44px]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-white border-b border-opti-black/5 shadow-xl max-h-[80vh] overflow-y-auto"
            >
              <div className="px-6 py-6 pb-[calc(2rem+env(safe-area-inset-bottom))] space-y-6">
                {[
                  { label: 'Services', items: ['Shopify Build', 'Meta Ads', 'CRM & WhatsApp Automation', 'Brand Identity'] },
                  { label: 'Platform', items: ['Features', 'Integrations', 'Pricing', 'Security'] },
                  { label: 'Resources', items: ['Blog', 'Case Studies', 'ROI Calculator', 'Academy'] },
                  { label: 'Login', action: () => { setCurrentView('auth'); setMobileMenuOpen(false); }, isAuth: true }
                ].map((cat, i) => (
                  <div key={i} className="border-b border-opti-black/5 pb-6 last:border-0 last:pb-0">
                    {cat.isAuth ? (
                      <button 
                        onClick={cat.action}
                        className="text-lg font-black text-opti-black uppercase tracking-tight hover:text-opti-black-800"
                      >
                        {cat.label}
                      </button>
                    ) : (
                      <>
                        <h4 className="text-lg font-black text-opti-black uppercase tracking-tight mb-4">{cat.label}</h4>
                        <ul className="space-y-1 pl-2 border-l-2 border-opti-black/20/30">
                          {cat.items?.map(item => (
                            <li key={item}>
                              <a href="#" className="block py-2.5 text-base font-bold text-opti-gray hover:text-opti-black transition-colors min-h-[44px] flex items-center">
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {currentView === 'landing' ? (
        <main id="main-content" className="bg-opti-white">
          {/* Hero Section */}
          <section className="relative pt-[calc(8rem+env(safe-area-inset-top))] pb-16 md:pt-48 md:pb-32 px-6 min-h-[95vh] flex items-center overflow-hidden bg-glow-gradient">
        {/* Subtle grid background masked to fade out top and bottom */}
        <div className="absolute inset-0 bg-grid-pattern [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] opacity-50 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.03)_0%,transparent_50%)] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10 w-full">
          {/* 3D Spinning Globe Background - Kept from previous request */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none -z-10 flex items-center justify-center -mt-10 opacity-30">
            <SphereLogo3D className="w-full h-full" dark={false} />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center w-full"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-opti-black text-opti-white font-mono text-[10px] font-bold uppercase tracking-widest mb-10 shadow-lg shadow-opti-black/20"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-opti-white animate-pulse" />
              Opti-Link V2.0 is Live
            </motion.div>
            
            <h1 className="text-[10vw] sm:text-6xl md:text-7xl lg:text-[100px] font-black text-opti-black tracking-tight leading-[1.05] mb-8 w-full">
              YOUR DIGITAL INFRASTRUCTURE,<br />
              <span className="text-ink bg-accent px-4 sm:px-6 py-1 md:py-2 mt-2 md:mt-4 inline-block rounded-lg shadow-opti-card">CONSTRUCTED.</span>
            </h1>

            <p className="text-lg md:text-xl text-opti-gray font-medium tracking-tight mb-14 max-w-3xl leading-relaxed">
              We are premier digital system and infrastructure constructors. We build, manage, and scale the digital engine that top agencies and modern brands use to capture leads and drive predictable revenue.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
              <button 
                onClick={() => document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' })}
                className="opti-button w-full sm:w-auto text-lg py-4 px-8 group gap-3 border-none ring-1 ring-ink/10"
              >
                Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setCurrentView('auth')}
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-opti-black/10 text-opti-black rounded-xl font-bold text-base hover:border-opti-black hover:bg-opti-lightgray transition-all duration-300 ease-out active:scale-[0.98]"
              >
                Client Portal
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section */}
      <div className="border-y border-opti-black/5 bg-opti-lightgray py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center font-mono text-[10px] md:text-xs font-bold text-opti-gray uppercase tracking-[0.3em] mb-8 md:mb-12">Trusted by modern scaling teams globally</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-24 opacity-60 mix-blend-multiply">
            <div className="font-black text-2xl tracking-tighter text-opti-black">NEXUS<span className="font-light">GLOBAL</span></div>
            <div className="font-black text-2xl tracking-widest text-opti-black">AURA</div>
            <div className="font-black text-2xl tracking-tighter text-opti-black">VERTEX<span className="text-opti-black">.</span></div>
            <div className="font-black text-2xl tracking-tight text-opti-black">QUANTUM</div>
            <div className="font-black text-2xl tracking-widest text-opti-black">ELEVATE</div>
          </div>
        </div>
      </div>

      {/* Logo Strip Section */}
      <section className="bg-opti-white py-32 px-6 overflow-hidden border-b border-opti-black/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-20 items-center">
          <div>
            <Logo className="w-32 h-32 mb-10 text-opti-black" />
            <div className="font-mono text-[10px] font-bold text-opti-gray uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <div className="w-4 h-[1px] bg-opti-black/20" /> About Opti-Link
            </div>
            <p className="text-xl md:text-2xl text-opti-black leading-relaxed font-medium max-w-md tracking-tight border-l-2 border-opti-black pl-6 py-2">
              We are digital system and infrastructure constructors. We <strong className="bg-opti-black text-opti-white px-2 py-0.5 rounded leading-normal inline-block">build and operate the digital engine</strong> that powers your entire growth pipeline.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: '150+', lbl: 'Stores digitised globally', change: 'Growing every month', icon: <TrendingUp size={14} /> },
              { num: '14d', lbl: 'Average time to results', change: 'Guaranteed success', icon: <Rocket size={14} /> },
              { num: 'R0', lbl: 'Upfront cost on pilot', change: 'Zero risk to start', icon: <Check size={14} /> },
              { num: '3.2×', lbl: 'Average client ROI', change: 'Within 12 months', icon: <TrendingUp size={14} /> },
              { num: 'R42k', lbl: 'Monthly revenue recovered', change: 'From automation', icon: <Banknote size={14} /> },
              { num: '5', lbl: 'Pilot slots available', change: '2 spots remaining', icon: <Hourglass size={14} /> }
            ].map((stat, i) => (
              <div key={i} className="bg-opti-lightgray p-8 rounded-2xl border border-opti-black/5 hover:border-opti-black/20 transition-colors duration-300 group shadow-sm hover:shadow-md">
                <div className="flex items-center gap-2 text-opti-black mb-6 bg-opti-white inline-flex px-3 py-1.5 rounded-lg shadow-sm border border-opti-black/5">
                  {stat.icon}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-opti-black">{stat.change}</span>
                </div>
                <div className="text-4xl font-black text-opti-black tracking-tighter mb-3 group-hover:-translate-y-1 transition-transform duration-300">{stat.num}</div>
                <div className="text-sm font-semibold text-opti-gray leading-snug">{stat.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Bar */}
      <div className="bg-opti-white border-y border-opti-black/5 py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 md:gap-12">
          {[
            { icon: <Target className="text-opti-white" />, title: 'No-Pay-Unless Model', desc: 'Zero upfront on our pilot option. Our costs are subsidized by software partners — you see results first, every time.' },
            { icon: <Rocket className="text-opti-white" />, title: 'Live in 7 Days or We Walk', desc: 'If your digital system isn\'t fully functional within 7 days, no service fees are charged. Hard deadline, every client.' },
            { icon: <TrendingUp className="text-opti-white" />, title: 'Revenue-Focused Only', desc: 'We don\'t report on vanity metrics. We track leads, conversions, and revenue attributed directly to your digital system.' }
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-opti-black shadow-opti-card flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="text-lg font-bold text-opti-black mb-2 tracking-tight">{item.title}</h4>
                <p className="text-sm text-opti-gray leading-relaxed font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <Section id="services" alt>
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-end mb-12 md:mb-16">
          <div>
            <Eyebrow>What we do</Eyebrow>
            <h2 className="text-5xl md:text-7xl font-black text-opti-black tracking-tighter leading-none uppercase mb-6">
              EVERYTHING YOUR<br />
              <span className="bg-opti-black text-opti-white px-4 py-1 mt-2 inline-block">BUSINESS NEEDS</span>
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
            <div key={i} className="bg-white p-10 rounded-[2rem] border border-opti-black/10 shadow-sm hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-all duration-500 ease-out group">
              <div className="w-16 h-16 rounded-2xl bg-opti-black text-opti-white border border-ink/10 flex items-center justify-center text-opti-black mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-sm">
                {React.cloneElement(svc.icon as any, { strokeWidth: 1.5, className: 'group-hover:stroke-[2px] transition-all duration-300' })}
              </div>
              <h3 className="text-2xl font-black text-opti-black mb-4 tracking-tight">{svc.title}</h3>
              <p className="text-base text-opti-gray leading-relaxed mb-8">{svc.desc}</p>
              <div className="flex flex-wrap gap-2">
                {svc.tags.map(tag => (
                  <span key={tag} className="font-mono text-[10px] font-bold bg-opti-white border border-opti-black/10 rounded-md px-3 py-1.5 text-opti-gray uppercase tracking-wider group-hover:bg-opti-black/5 group-hover:border-opti-black/20/30 group-hover:text-opti-black-800 transition-colors duration-300">
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
        <h2 className="text-5xl md:text-7xl font-black text-opti-black tracking-tighter leading-none uppercase mb-4 text-center">
          LIVE AND SELLING<br />
          <span className="bg-opti-black text-opti-white px-4 py-1 mt-2 inline-block">IN 14 DAYS</span>
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
              <div key={i} className="relative z-10 text-center group">
                <div className="w-16 h-16 rounded-2xl bg-opti-black text-opti-white flex items-center justify-center mx-auto mb-6 text-opti-black shadow-sm group-hover:scale-110 transition-transform duration-500 ease-out group-hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)]">
                  <span className="font-black text-2xl group-hover:hidden">{step.phase}</span>
                  <span className="hidden group-hover:block transition-all duration-300">
                    {React.cloneElement(step.icon as any, { strokeWidth: 2 })}
                  </span>
                </div>
                <h4 className="text-base font-bold text-opti-black mb-3 tracking-tight group-hover:text-opti-black-800 transition-colors duration-300">{step.title}</h4>
                <p className="text-sm text-opti-gray leading-relaxed group-hover:text-opti-black transition-colors duration-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 md:mt-20 bg-opti-lightgray border border-opti-black/5 p-8 md:p-16 grid lg:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center relative overflow-hidden">
          <div>
            <h3 className="text-3xl md:text-5xl font-black text-opti-black tracking-tight mb-6 leading-tight">
              The free pilot model —<br />how it actually works.
            </h3>
            <p className="text-opti-gray text-lg md:text-xl leading-relaxed max-w-3xl">
              Looking to scale without the upfront risk? We build your entire digital engine at <strong className="bg-opti-black text-opti-white px-2 py-0.5 rounded inline-block">zero upfront cost</strong>. We set up the core software tools your business needs to grow. Our costs are subsidized through strategic software partnerships, meaning you get a full setup delivered in 7 days, guaranteed, with zero risk.
            </p>
          </div>
          <button 
            onClick={() => document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' })}
            className="opti-button px-10 py-5 text-lg font-black whitespace-nowrap hidden md:inline-flex border-[1.5px] border-[#000]"
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
        <h2 className="text-5xl md:text-7xl font-black text-opti-black tracking-tighter leading-none uppercase mb-4 text-center">
          SIMPLE, HONEST<br />
          <span className="bg-opti-black text-opti-white px-4 py-1 mt-2 inline-block">PRICING</span>
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
              "relative p-10 rounded-3xl border transition-all duration-500 ease-out",
              plan.popular 
                ? "bg-ink border-ink scale-105 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] z-10 hover:scale-[1.07]" 
                : "bg-white border-opti-black/5 hover:border-opti-black/20 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-2"
            )}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-opti-black text-opti-white text-[0.65rem] font-black px-5 py-1.5 uppercase tracking-widest shadow-lg rounded-full">
                  Most Popular
                </div>
              )}
              <div className={cn("text-[0.65rem] font-black uppercase tracking-[0.25em] mb-4", plan.popular ? "text-white/30" : "text-opti-gray")}>
                {plan.name}
              </div>
              <div className={cn("text-5xl font-black tracking-tighter mb-2", plan.popular ? "text-white" : "text-opti-black")}>
                {plan.price}<span className={cn("text-sm font-normal tracking-normal transition-colors", plan.popular ? "text-white/30" : "text-opti-gray")}>/mo</span>
              </div>
              <p className={cn("text-[0.75rem] leading-relaxed mb-8", plan.popular ? "text-white/30" : "text-opti-gray")}>
                {plan.note}
              </p>
              <div className={cn("h-px w-full mb-8", plan.popular ? "bg-white/10" : "bg-bdr")} />
              <ul className="space-y-4 mb-10">
                {plan.feats.map(feat => (
                  <li key={feat} className={cn("flex items-start gap-3 text-sm font-bold", plan.popular ? "text-white/70" : "text-opti-black3")}>
                    <Check size={16} className={cn("mt-0.5 flex-shrink-0 transition-transform duration-300", plan.popular ? "text-white" : "text-opti-black")} />
                    {feat}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' })}
                className={cn(
                "w-full py-4 font-bold text-sm transition-all duration-300 hover:shadow-lg rounded-xl active:scale-95 border-2",
                plan.popular 
                  ? "bg-white text-opti-black border-transparent hover:bg-opti-lightgray shadow-[0_4px_14px_0_rgba(255,255,255,0.1)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.15)]" 
                  : "bg-opti-white border-opti-black/10 text-opti-black hover:bg-opti-black hover:text-white hover:border-opti-black"
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
        <h2 className="text-5xl md:text-7xl font-black text-opti-black tracking-tighter leading-none uppercase mb-4 text-center">
          SMMES GROWING<br />
          <span className="bg-opti-black text-opti-white px-4 py-1 mt-2 inline-block">WITH OPTI-LINK</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {[
            { name: 'Thandi Mokoena', role: 'Owner, Thandi\'s Boutique — Johannesburg', quote: "Within 10 days my Shopify store was live, WhatsApp automation was running, and I recovered three abandoned carts in the first week alone. I didn't pay a cent upfront.", color: '#1f4d32' },
            { name: 'Kagiso Dlamini', role: 'Co-founder, Kasi Fresh Foods — Durban', quote: "Month two we saw a 40% increase in repeat orders after Opti-Link built our CRM and WhatsApp pipeline. The retainer pays for itself every single month without question.", color: '#1e3a8a' },
            { name: 'Nandi Pieterse', role: 'Director, NP Design Studio — Cape Town', quote: "They built a lead funnel and automated my quote follow-ups. I booked R80,000 in new contracts in 30 days. As a service business I didn't think this model applied to me.", color: '#6d28d9' }
          ].map((testi, i) => (
            <div key={i} className="bg-opti-white border border-opti-black/5 rounded-[2rem] p-10 flex flex-col gap-8 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-2 hover:bg-white group cursor-default">
              <div className="flex gap-1 text-opti-black/20 group-hover:text-opti-black transition-colors duration-300">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-lg text-opti-gray italic leading-relaxed flex-1 group-hover:text-opti-black transition-colors duration-300">"{testi.quote}"</p>
              <div className="pt-8 border-t border-opti-black/5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-xs tracking-widest shadow-sm group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: testi.color }}>
                  {testi.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-base font-bold text-opti-black tracking-tight">{testi.name}</div>
                  <div className="text-[0.65rem] text-opti-gray font-bold uppercase tracking-widest mt-0.5">{testi.role}</div>
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
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-opti-black/10 rounded-full blur-3xl" />
            <img 
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1000" 
              alt="Team collaboration" 
              className="rounded-[2.5rem] shadow-2xl relative z-10 border border-opti-black/5"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 bg-opti-black text-opti-white p-8 shadow-2xl z-20 max-w-[240px]">
              <div className="text-3xl font-black mb-2">100%</div>
              <p className="text-xs font-bold uppercase tracking-widest leading-relaxed">Focus on your business growth, not just tech.</p>
            </div>
          </div>
          <div>
            <Eyebrow>Why choose us</Eyebrow>
            <h2 className="text-5xl md:text-7xl font-black text-opti-black tracking-tighter leading-none uppercase mb-8">
              WE DON'T JUST BUILD WEBSITES.<br />
              <span className="bg-opti-black text-opti-white px-4 py-2 mt-4 inline-block shadow-sm">WE BUILD BUSINESSES.</span>
            </h2>
            <div className="space-y-10 mt-12">
              {[
                { title: 'We speak your language', desc: 'No technical jargon. We talk about customers, sales, and profit — the things that actually matter to your business.' },
                { title: 'Results in 14 days', desc: 'We don\'t take months to deliver. Our systems are built to start working for you in two weeks or less.' },
                { title: 'Zero risk to start', desc: 'With our free pilot model, you can see the system working before you commit to a long-term partnership.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-10 h-10 bg-opti-black text-opti-white flex items-center justify-center flex-shrink-0 font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-opti-black mb-2 tracking-tight">{item.title}</h4>
                    <p className="text-sm text-opti-gray leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Survey Funnel Section */}
      <Section id="survey" className="bg-opti-lightgray">
        <div className="text-center mb-16">
          <Eyebrow centered>Free Business Audit</Eyebrow>
          <h2 className="text-5xl md:text-7xl font-black text-opti-black tracking-tighter leading-none uppercase mb-8 text-center">
            FIND OUT EXACTLY WHERE YOUR<br />
            <span className="bg-accent text-ink px-4 py-2 mt-4 inline-block shadow-sm">BUSINESS IS LOSING MONEY</span>
          </h2>
          <Subheading centered className="max-w-3xl mx-auto">Answer 15 simple questions. We'll show you how to find more customers and grow your profit — free, with no strings attached.</Subheading>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-opti-black/5 rounded-[2rem] overflow-hidden shadow-2xl shadow-ink/5">
            <AnimatePresence mode="wait">
              {surveyStep <= 15 ? (
                <motion.div
                  key={`survey-step-${surveyStep}`}
                  initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                  transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
                >
                  <div className="p-8 pb-0">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[0.65rem] font-bold text-opti-gray uppercase tracking-widest">Business Health Check</span>
                      <span className="text-[0.65rem] font-bold text-opti-black bg-opti-black text-opti-white px-2 py-1 rounded uppercase tracking-widest">Step {surveyStep} of 15</span>
                    </div>
                    <div className="h-1 w-full bg-opti-lightgray rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-opti-black text-opti-white"
                        animate={{ width: `${(surveyStep / 15) * 100}%` }}
                        transition={{ ease: "easeInOut", duration: 0.5 }}
                      />
                    </div>
                  </div>

                  <div className="p-8 md:p-12">
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-black text-opti-black tracking-tight mb-2">
                          {QUESTIONS[surveyStep - 1].title}
                        </h3>
                        <p className="text-sm text-opti-gray">
                          {QUESTIONS[surveyStep - 1].sub}
                        </p>
                      </div>
                      <div className={cn("grid gap-3", QUESTIONS[surveyStep - 1].cols === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2")}>
                        {QUESTIONS[surveyStep - 1].options.map(opt => (
                          <button
                            key={opt.val}
                            onClick={() => handleAnswer(surveyStep, opt.val, opt.score)}
                            className={cn(
                              "relative flex items-center gap-4 p-5 rounded-2xl border-2 w-full text-left transition-all duration-300 ease-out group overflow-hidden",
                              answers[surveyStep]?.val === opt.val 
                                ? "bg-opti-black/5 border-opti-black/20 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)]" 
                                : "bg-opti-white border-opti-black/10 hover:border-opti-black/20/50 hover:bg-white hover:shadow-lg hover:shadow-ink/5 hover:-translate-y-[2px]"
                            )}
                          >
                            <div className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ease-out",
                              answers[surveyStep]?.val === opt.val 
                                ? "bg-opti-black text-opti-white scale-110 shadow-sm" 
                                : "bg-white border border-opti-black/10 text-opti-black group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-opti-black/5 group-hover:border-opti-black/20/50 group-hover:text-opti-black-700"
                            )}>
                              <div className="scale-90 transition-transform duration-300 group-hover:scale-100 relative">
                                {opt.icon && React.cloneElement(opt.icon as any, { strokeWidth: answers[surveyStep]?.val === opt.val ? 2.5 : 1.5 })}
                              </div>
                            </div>
                            <div className="flex-1">
                              <strong className="block text-sm font-bold text-opti-black tracking-tight">{opt.title}</strong>
                              <span className="block text-[0.7rem] text-opti-gray leading-tight mt-0.5 pr-6">{opt.sub}</span>
                            </div>
                            {/* Checkmark indicator for selected state */}
                            {answers[surveyStep]?.val === opt.val && (
                              <div className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 bg-opti-black text-opti-white rounded-full flex items-center justify-center text-opti-black shadow-sm animate-in zoom-in duration-200">
                                <Check size={14} strokeWidth={3} />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-opti-black/5 flex justify-between items-center">
                      <button 
                        onClick={prevStep}
                        disabled={surveyStep === 1}
                        className="text-sm font-bold text-opti-gray hover:text-opti-black disabled:opacity-0 transition-colors duration-200"
                      >
                        Back
                      </button>
                      <button 
                        onClick={nextStep}
                        disabled={!answers[surveyStep]}
                        className="opti-button px-8 py-3 text-sm flex items-center gap-2 disabled:opacity-30 border-[1.5px] border-[#000]"
                      >
                        {surveyStep === 15 ? "See my results" : "Continue"}
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : surveyStep === 16 && !isSubmitted ? (
                <motion.div
                  key="squeeze"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 md:p-10 text-center"
                >
                  <div className="w-24 h-24 rounded-full border-2 border-opti-black/20 flex flex-col items-center justify-center mx-auto mb-6">
                    <span className="text-4xl font-black text-ink bg-accent px-2 py-1 tracking-tighter leading-none shadow-sm">{totalScore}</span>
                    <span className="text-[0.5rem] font-bold text-opti-gray uppercase tracking-widest mt-1">/ 45</span>
                  </div>
                  <div className="inline-block bg-accent text-ink border border-ink/20 rounded-full px-5 py-1.5 mb-6 text-[0.75rem] font-bold text-opti-black uppercase tracking-wider shadow-sm">
                    {getPhaseInfo().phase}
                  </div>
                  <h3 className="text-2xl font-black text-opti-black tracking-tight mb-2 leading-tight">Your Business Health Report is ready.</h3>
                  <p className="text-sm text-opti-gray leading-relaxed max-w-md mx-auto mb-10">
                    Enter your details below to unlock your personalised growth plan and see exactly where you're losing money.
                  </p>
                  
                  <div className="bg-opti-black text-opti-white border border-ink/20 rounded-xl p-4 flex items-center gap-4 text-left text-opti-black font-semibold text-xs mb-10">
                    <Check size={18} className="flex-shrink-0 text-opti-black" />
                    <span>Your report includes a 14-day growth roadmap and a free pilot offer.</span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="text-left space-y-1.5">
                        <label className="text-[0.65rem] font-bold text-opti-gray uppercase tracking-widest pl-1">Full Name <span className="text-red-500">*</span></label>
                        <input value={surveyForm.fullName} onChange={(e) => setSurveyForm(prev => ({...prev, fullName: e.target.value}))} required className="w-full p-4 bg-opti-white border-2 border-opti-black/10 rounded-xl text-sm outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/20 transition-all duration-300" placeholder="e.g. Jane Doe" />
                      </div>
                      <div className="text-left space-y-1.5">
                        <label className="text-[0.65rem] font-bold text-opti-gray uppercase tracking-widest pl-1">Business Name <span className="text-red-500">*</span></label>
                        <input value={surveyForm.businessName} onChange={(e) => setSurveyForm(prev => ({...prev, businessName: e.target.value}))} required className="w-full p-4 bg-opti-white border-2 border-opti-black/10 rounded-xl text-sm outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/20 transition-all duration-300" placeholder="Your Company Ltd" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="text-left space-y-1.5">
                        <label className="text-[0.65rem] font-bold text-opti-gray uppercase tracking-widest pl-1">WhatsApp Number <span className="text-red-500">*</span></label>
                        <input value={surveyForm.phone} onChange={(e) => setSurveyForm(prev => ({...prev, phone: e.target.value}))} required type="tel" className="w-full p-4 bg-opti-white border-2 border-opti-black/10 rounded-xl text-sm outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/20 transition-all duration-300" placeholder="+27 XX XXX XXXX" />
                      </div>
                      <div className="text-left space-y-1.5">
                        <label className="text-[0.65rem] font-bold text-opti-gray uppercase tracking-widest pl-1">Email <span className="text-red-500">*</span></label>
                        <input value={surveyForm.email} onChange={(e) => setSurveyForm(prev => ({...prev, email: e.target.value}))} required type="email" className="w-full p-4 bg-opti-white border-2 border-opti-black/10 rounded-xl text-sm outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/20 transition-all duration-300" placeholder="jane@example.com" />
                      </div>
                    </div>
                    <div className="text-left space-y-1.5">
                      <label className="text-[0.65rem] font-bold text-opti-gray uppercase tracking-widest pl-1">Website or Social Profile</label>
                      <input value={surveyForm.website} onChange={(e) => setSurveyForm(prev => ({...prev, website: e.target.value}))} className="w-full p-4 bg-opti-white border-2 border-opti-black/10 rounded-xl text-sm outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/20 transition-all duration-300" placeholder="https://..." />
                    </div>
                    <div className="text-left space-y-1.5">
                      <label className="text-[0.65rem] font-bold text-opti-gray uppercase tracking-widest pl-1">Interested Package <span className="text-red-500">*</span></label>
                      <select value={surveyForm.interest} onChange={(e) => setSurveyForm(prev => ({...prev, interest: e.target.value}))} required className="w-full p-4 bg-opti-white border-2 border-opti-black/10 rounded-xl text-sm outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/20 transition-all duration-300 appearance-none cursor-pointer">
                        <option value="">Select an option...</option>
                        <option value="Entry">Entry — R3,500/mo</option>
                        <option value="Growth">Growth — R5,500/mo</option>
                        <option value="Enterprise">Enterprise — Custom</option>
                        <option value="Pilot">Free pilot first, then decide</option>
                      </select>
                    </div>
                    
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-ink text-white py-5 rounded-xl font-black text-lg flex items-center justify-center gap-3 hover:bg-opti-black text-opti-white hover:text-opti-black hover:-translate-y-1 transition-all duration-300 ease-out shadow-lg hover:shadow-2xl hover:shadow-opti-black/30 disabled:opacity-50 active:scale-95"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" /> : <ClipboardCheck size={20} />}
                      Send Me My Free Audit Report
                    </button>
                  </form>
                  
                  <div className="flex items-center gap-4 my-6 text-[0.7rem] text-opti-gray font-bold uppercase tracking-widest">
                    <div className="h-px flex-1 bg-bdr" /> or <div className="h-px flex-1 bg-bdr" />
                  </div>

                  <a 
                    href="mailto:support@optilinkgroup.com"
                    className="w-full py-4 rounded-xl bg-opti-black text-opti-white border-2 border-ink/20 text-opti-black font-bold text-sm flex items-center justify-center gap-3 hover:bg-opti-black text-opti-white-h transition-all"
                  >
                    <MessageSquare size={18} />
                    Email us directly instead
                  </a>

                  <p className="mt-8 text-[0.65rem] text-opti-gray flex items-center justify-center gap-2">
                    <Lock size={12} /> Your information stays private. We only use it to prepare your audit.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 md:p-16 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-opti-black text-opti-white border-2 border-ink/20 flex items-center justify-center mx-auto mb-8 text-opti-black">
                    <Check size={40} />
                  </div>
                  <h3 className="text-3xl font-black text-opti-black tracking-tight mb-4">Your audit is on its way!</h3>
                  <p className="text-opti-gray leading-relaxed mb-12">We'll WhatsApp you within 2 hours to confirm your free 15-minute strategy call.</p>
                  
                  <div className="space-y-4 text-left max-w-sm mx-auto mb-12">
                    {[
                      'We review your business and map your top 3 revenue leaks',
                      'We WhatsApp you your personalised quick-win plan',
                      'We jump on a 15-minute call and show you exactly how to fix it',
                      'You choose: free pilot or paid setup — zero pressure, ever'
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-4 text-sm text-opti-black3 font-bold">
                        <div className="w-7 h-7 rounded-full bg-opti-black text-opti-white border border-ink/20 flex items-center justify-center text-[0.65rem] font-black text-opti-black flex-shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        {step}
                      </div>
                    ))}
                  </div>

                  <a 
                    href="mailto:support@optilinkgroup.com"
                    className="opti-button px-10 py-4 text-base gap-3 mx-auto flex w-fit"
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
      <footer className="bg-white pt-16 md:pt-24 pb-[calc(3rem+env(safe-area-inset-bottom))] px-6 border-t border-opti-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 mb-12 md:mb-20">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <Logo className="w-16 h-16" />
                <div className="leading-none">
                  <strong className="block text-lg font-black text-opti-black tracking-tight">Opti-Link</strong>
                  <span className="block text-[0.6rem] font-bold text-opti-gray uppercase tracking-[0.2em]">Media Group</span>
                </div>
              </div>
              <p className="text-sm text-opti-gray leading-relaxed max-w-xs">
                Your premier global digital growth partner. We build, automate, and operate your online business so you can focus on what matters.
              </p>
            </div>

            {[
              { title: 'Services', links: ['Ecommerce Setup', 'WhatsApp Automation', 'CRM & Workflows', 'Social Media', 'Paid Ads'] },
              { title: 'Contact', links: ['Cape Town (HQ)', 'hello@optilinkmedia.com'] },
              { title: 'Legal & Security', links: ['Trust Center', 'SOC 2 Compliance', 'GDPR Readiness', 'Privacy Policy'] }
            ].map((col, i) => (
              <div key={i}>
                <h5 className="text-[0.65rem] font-black text-opti-gray uppercase tracking-[0.3em] mb-8">{col.title}</h5>
                <ul className="space-y-4">
                  {col.links.map(link => (
                    <li key={link}>
                      <a 
                        href={link.includes('@') ? `mailto:${link}` : "#"} 
                        className="text-sm text-opti-gray hover:text-opti-black transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-opti-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-opti-gray text-center md:text-left">© 2026 Opti-Link Media Group. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs text-opti-gray">
              <a href="#" className="hover:text-opti-black transition-colors flex items-center gap-1"><ShieldCheck size={12} /> SOC 2 Type II Certified</a>
              <a href="#" className="hover:text-opti-black transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-opti-black transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <Chatbot />
      </main>
      ) : (
        <main id="main-content">
          <SolutionPage 
            type={currentView} 
            onCTA={() => {
              setCurrentView('landing');
              setTimeout(() => document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' }), 100);
            }} 
          />
        </main>
      )}
    </div>
  );
}
