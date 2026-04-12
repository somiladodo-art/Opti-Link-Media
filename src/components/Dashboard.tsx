import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut,
  TrendingUp,
  ArrowUpRight,
  ShoppingCart,
  CheckCircle2,
  Circle,
  ArrowRight,
  User,
  Save,
  Loader2,
  Menu,
  X,
  Bell,
  Search,
  Filter,
  Rocket,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const Tooltip = ({ children, content }: { children: React.ReactNode, content: string }) => (
  <div className="relative group inline-flex items-center">
    {children}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-ink text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-xl">
      {content}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-ink" />
    </div>
  </div>
);

const OnboardingModal = ({ 
  onClose, 
  profileData, 
  setProfileData 
}: { 
  onClose: () => void, 
  profileData: any, 
  setProfileData: any 
}) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
    else onClose();
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="fixed inset-0 bg-ink/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col"
      >
        {/* Progress Bar */}
        <div className="h-1.5 bg-cream3 w-full">
          <div 
            className="h-full bg-green transition-all duration-500 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        <div className="p-8 md:p-12 flex-1">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
              <div className="w-20 h-20 bg-green-lt rounded-full flex items-center justify-center mx-auto mb-6">
                <Rocket size={32} className="text-green" />
              </div>
              <h2 className="text-3xl font-black text-ink tracking-tight mb-4">Welcome to Opti-Link</h2>
              <p className="text-gray leading-relaxed max-w-md mx-auto">
                We're thrilled to have you on board. Let's take a quick tour to set up your digital engine and show you around your new command center.
              </p>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-black text-ink tracking-tight mb-2">Verify Business Details</h2>
              <p className="text-gray text-sm mb-8">Ensure your core information is correct before we launch.</p>
              
              <div className="space-y-5">
                <div>
                  <label className="block font-mono text-[10px] font-bold text-ink uppercase tracking-wider mb-2">Business Name</label>
                  <input 
                    type="text" 
                    value={profileData.businessName}
                    onChange={(e) => setProfileData({...profileData, businessName: e.target.value})}
                    className="w-full p-4 bg-cream border-2 border-cream3 rounded-lg text-sm outline-none focus:border-green transition-all" 
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] font-bold text-ink uppercase tracking-wider mb-2">Industry</label>
                  <select 
                    value={profileData.industry}
                    onChange={(e) => setProfileData({...profileData, industry: e.target.value})}
                    className="w-full p-4 bg-cream border-2 border-cream3 rounded-lg text-sm outline-none focus:border-green transition-all appearance-none"
                  >
                    <option>Retail / E-commerce</option>
                    <option>Professional Services</option>
                    <option>Health & Wellness</option>
                    <option>Real Estate</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-black text-ink tracking-tight mb-2">Key Features Tour</h2>
              <p className="text-gray text-sm mb-8">Hover over the features to learn how they power your growth.</p>
              
              <div className="grid gap-4">
                <div className="p-5 border border-bdr-d rounded-xl flex items-start gap-4 hover:bg-cream transition-colors group">
                  <div className="w-12 h-12 rounded-lg bg-green-lt flex items-center justify-center text-green shrink-0 group-hover:scale-110 transition-transform">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-ink mb-1 flex items-center gap-2">
                      CRM & Leads
                      <Tooltip content="Customer Relationship Management">
                        <div className="w-4 h-4 rounded-full bg-cream3 flex items-center justify-center text-[10px] font-bold text-gray cursor-help">?</div>
                      </Tooltip>
                    </h3>
                    <p className="text-sm text-gray">Track every lead, manage your pipeline, and never let a potential customer slip through the cracks.</p>
                  </div>
                </div>

                <div className="p-5 border border-bdr-d rounded-xl flex items-start gap-4 hover:bg-cream transition-colors group">
                  <div className="w-12 h-12 rounded-lg bg-green-lt flex items-center justify-center text-green shrink-0 group-hover:scale-110 transition-transform">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-ink mb-1 flex items-center gap-2">
                      Automations
                      <Tooltip content="Workflows that run 24/7 without manual effort">
                        <div className="w-4 h-4 rounded-full bg-cream3 flex items-center justify-center text-[10px] font-bold text-gray cursor-help">?</div>
                      </Tooltip>
                    </h3>
                    <p className="text-sm text-gray">Set up WhatsApp follow-ups, abandoned cart recovery, and welcome emails that run on autopilot.</p>
                  </div>
                </div>

                <div className="p-5 border border-bdr-d rounded-xl flex items-start gap-4 hover:bg-cream transition-colors group">
                  <div className="w-12 h-12 rounded-lg bg-green-lt flex items-center justify-center text-green shrink-0 group-hover:scale-110 transition-transform">
                    <BarChart3 size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-ink mb-1 flex items-center gap-2">
                      Analytics
                      <Tooltip content="Data-driven insights and ROI tracking">
                        <div className="w-4 h-4 rounded-full bg-cream3 flex items-center justify-center text-[10px] font-bold text-gray cursor-help">?</div>
                      </Tooltip>
                    </h3>
                    <p className="text-sm text-gray">Monitor your revenue, conversion rates, and campaign performance in real-time.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} className="text-accent" />
              </div>
              <h2 className="text-3xl font-black text-ink tracking-tight mb-4">You're All Set!</h2>
              <p className="text-gray leading-relaxed max-w-md mx-auto">
                Your digital engine is ready. Explore your dashboard, connect your channels, and let's start growing your business.
              </p>
            </motion.div>
          )}
        </div>

        <div className="p-6 md:px-12 border-t border-bdr-d bg-cream/50 flex justify-between items-center">
          <div className="font-mono text-[10px] font-bold text-gray uppercase tracking-wider">
            Step {step} of {totalSteps}
          </div>
          <div className="flex gap-3">
            {step > 1 && (
              <button 
                onClick={prevStep}
                className="px-5 py-2.5 rounded-lg font-bold text-sm text-ink hover:bg-cream3 transition-colors"
              >
                Back
              </button>
            )}
            <button 
              onClick={nextStep}
              className="bg-ink text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-green transition-colors shadow-lg shadow-ink/10"
            >
              {step === totalSteps ? 'Go to Dashboard' : 'Continue'}
              {step < totalSteps && <ArrowRight size={16} />}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+27 82 123 4567',
    businessName: 'Doe Enterprises',
    website: 'https://doe-enterprises.co.za',
    industry: 'Retail / E-commerce'
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-cream flex selection:bg-accent selection:text-ink">
      {showOnboarding && (
        <OnboardingModal 
          onClose={() => setShowOnboarding(false)} 
          profileData={profileData}
          setProfileData={setProfileData}
        />
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-ink/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "w-64 bg-ink text-white flex flex-col fixed h-full z-40 transition-transform duration-300 ease-in-out md:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-8 flex items-center justify-between">
          <div>
            <div className="text-xl font-black tracking-tight mb-1">Opti-Link</div>
            <div className="text-[0.65rem] font-bold text-white/40 uppercase tracking-[0.2em]">Client Portal</div>
          </div>
          <button 
            className="md:hidden text-white/50 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {[
            { id: 'overview', icon: <LayoutDashboard size={18} />, label: 'Overview' },
            { id: 'profile', icon: <User size={18} />, label: 'Client Profile' },
            { id: 'crm', icon: <Users size={18} />, label: 'CRM & Leads' },
            { id: 'automations', icon: <MessageSquare size={18} />, label: 'Automations' },
            { id: 'analytics', icon: <BarChart3 size={18} />, label: 'Analytics' },
            { id: 'settings', icon: <Settings size={18} />, label: 'Settings' },
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                activeTab === item.id ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5 hover:text-white"
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-white/50 hover:bg-white/5 hover:text-white transition-all">
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-12 w-full max-w-[100vw]">
        <header className="flex justify-between items-start md:items-center mb-12 gap-4">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 -ml-2 text-ink hover:bg-cream3 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-ink tracking-tight">
                {activeTab === 'overview' ? 'Welcome back, Client' : 
                 activeTab === 'profile' ? 'Client Profile' : 
                 activeTab === 'crm' ? 'CRM & Leads' :
                 activeTab === 'automations' ? 'Automations' :
                 activeTab === 'analytics' ? 'Analytics' :
                 'Settings'}
              </h1>
              <p className="text-sm text-gray mt-1 hidden md:block">
                {activeTab === 'overview' ? "Here's what's happening with your digital engine today." :
                 activeTab === 'profile' ? "Manage your personal and business details." :
                 activeTab === 'crm' ? "Manage your pipeline and customer relationships." :
                 activeTab === 'automations' ? "Configure your automated workflows and broadcasts." :
                 activeTab === 'analytics' ? "Deep dive into your performance metrics." :
                 "Manage your settings and preferences."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-white border border-bdr-d flex items-center justify-center text-gray hover:text-ink transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white"></span>
            </button>
            <div className="text-right hidden md:block">
              <div className="text-sm font-bold text-ink">{profileData.businessName}</div>
              <div className="text-xs text-gray">Growth Plan</div>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-lt border-2 border-green/20 flex items-center justify-center text-green font-black text-sm md:text-base">
              {profileData.fullName.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        </header>

        {activeTab === 'overview' && (
          <>
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Revenue (30d)', value: 'R 42,500', trend: '+12.5%', icon: <TrendingUp size={20} /> },
            { label: 'Active Leads', value: '128', trend: '+24', icon: <Users size={20} /> },
            { label: 'Automated Follow-ups', value: '845', trend: '+142', icon: <MessageSquare size={20} /> }
          ].map((metric, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="bg-white p-6 rounded-xl border border-bdr-d shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-lt flex items-center justify-center text-green">
                  {metric.icon}
                </div>
                <div className="flex items-center gap-1 font-mono text-[10px] font-bold text-green bg-green-lt px-2 py-1 rounded-md">
                  <ArrowUpRight size={12} />
                  {metric.trend}
                </div>
              </div>
              <div className="text-3xl font-black text-ink tracking-tight mb-1 font-mono">{metric.value}</div>
              <div className="font-mono text-[10px] font-bold text-gray uppercase tracking-wider">{metric.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Onboarding / Tasks */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white rounded-xl border border-bdr-d p-8 shadow-sm"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-ink tracking-tight">Implementation Phase</h2>
              <span className="font-mono text-[10px] font-bold text-green bg-green-lt px-3 py-1 rounded-md uppercase tracking-wider">75% Complete</span>
            </div>
            
            <div className="space-y-4">
              {[
                { title: 'Domain & Hosting Setup', desc: 'Secure your online address', done: true },
                { title: 'Shopify Store Build', desc: 'Upload products and configure theme', done: true },
                { title: 'WhatsApp API Integration', desc: 'Connect your business number', done: true },
                { title: 'CRM Configuration', desc: 'Set up automated pipelines', done: false },
                { title: 'Launch Ad Campaigns', desc: 'Turn on the traffic engine', done: false }
              ].map((task, i) => (
                <div key={i} className={cn(
                  "flex items-start gap-4 p-4 rounded-2xl border transition-all",
                  task.done ? "bg-cream border-bdr" : "bg-white border-bdr-d hover:border-green/30"
                )}>
                  {task.done ? (
                    <CheckCircle2 className="text-green flex-shrink-0 mt-0.5" size={20} />
                  ) : (
                    <Circle className="text-gray-lt flex-shrink-0 mt-0.5" size={20} />
                  )}
                  <div>
                    <div className={cn("text-sm font-bold tracking-tight mb-0.5", task.done ? "text-gray line-through" : "text-ink")}>{task.title}</div>
                    <div className="text-xs text-gray">{task.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-ink rounded-xl p-8 text-white relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-[60px]" />
            <h2 className="text-xl font-black tracking-tight mb-6 relative z-10">Quick Actions</h2>
            
            <div className="space-y-3 relative z-10">
              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                <div className="flex items-center gap-3 text-sm font-bold">
                  <ShoppingCart size={18} className="text-accent" />
                  Add New Product
                </div>
                <ArrowRight size={16} className="text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                <div className="flex items-center gap-3 text-sm font-bold">
                  <MessageSquare size={18} className="text-accent" />
                  Send Broadcast
                </div>
                <ArrowRight size={16} className="text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                <div className="flex items-center gap-3 text-sm font-bold">
                  <BarChart3 size={18} className="text-accent" />
                  View Full Report
                </div>
                <ArrowRight size={16} className="text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-accent/10 border border-accent/20 relative z-10">
              <div className="text-xs font-bold text-accent uppercase tracking-wider mb-1">Need Help?</div>
              <div className="text-sm text-white/70 mb-3">Your account manager is available.</div>
              <button className="text-xs font-bold bg-accent text-ink px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Book a Call
              </button>
            </div>
          </motion.div>
        </div>
        </>
        )}

        {activeTab === 'profile' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <form onSubmit={handleSaveProfile} className="bg-white rounded-xl border border-bdr-d shadow-sm overflow-hidden">
              <div className="p-8 border-b border-bdr-d">
                <h2 className="text-xl font-black text-ink tracking-tight mb-1">Personal Information</h2>
                <p className="text-sm text-gray">Update your contact details and login information.</p>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-[10px] font-bold text-ink uppercase tracking-wider mb-2">Full Name</label>
                    <input 
                      type="text" 
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                      className="w-full p-4 bg-cream border-2 border-cream3 rounded-lg text-sm outline-none focus:border-green transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] font-bold text-ink uppercase tracking-wider mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full p-4 bg-cream border-2 border-cream3 rounded-lg text-sm outline-none focus:border-green transition-all" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-mono text-[10px] font-bold text-ink uppercase tracking-wider mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full p-4 bg-cream border-2 border-cream3 rounded-lg text-sm outline-none focus:border-green transition-all" 
                    />
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-b border-bdr-d bg-cream/50">
                <h2 className="text-xl font-black text-ink tracking-tight mb-1">Business Details</h2>
                <p className="text-sm text-gray">Manage your company information and industry settings.</p>
              </div>

              <div className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block font-mono text-[10px] font-bold text-ink uppercase tracking-wider mb-2">Business Name</label>
                    <input 
                      type="text" 
                      value={profileData.businessName}
                      onChange={(e) => setProfileData({...profileData, businessName: e.target.value})}
                      className="w-full p-4 bg-cream border-2 border-cream3 rounded-lg text-sm outline-none focus:border-green transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] font-bold text-ink uppercase tracking-wider mb-2">Website URL</label>
                    <input 
                      type="url" 
                      value={profileData.website}
                      onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                      className="w-full p-4 bg-cream border-2 border-cream3 rounded-lg text-sm outline-none focus:border-green transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] font-bold text-ink uppercase tracking-wider mb-2">Industry</label>
                    <select 
                      value={profileData.industry}
                      onChange={(e) => setProfileData({...profileData, industry: e.target.value})}
                      className="w-full p-4 bg-cream border-2 border-cream3 rounded-lg text-sm outline-none focus:border-green transition-all appearance-none"
                    >
                      <option>Retail / E-commerce</option>
                      <option>Professional Services</option>
                      <option>Health & Wellness</option>
                      <option>Real Estate</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-cream border-t border-bdr-d flex justify-end">
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="bg-ink text-white px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-green disabled:opacity-70 transition-all shadow-lg shadow-ink/10"
                >
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {isSaving ? 'Saving Changes...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* CRM Placeholder */}
        {activeTab === 'crm' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <div className="bg-white rounded-xl border border-bdr-d shadow-sm overflow-hidden">
              <div className="p-6 border-b border-bdr-d flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative w-full md:w-64">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-lt" />
                  <input 
                    type="text" 
                    placeholder="Search leads..." 
                    className="w-full pl-10 pr-4 py-2 bg-cream rounded-lg text-sm outline-none focus:ring-2 ring-green/20 border border-transparent focus:border-green/30 transition-all"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray bg-cream hover:bg-cream3 rounded-lg transition-colors">
                    <Filter size={16} /> Filter
                  </button>
                  <button className="bg-ink text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-green transition-colors">
                    Add Lead
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-cream/50 font-mono text-[10px] font-bold text-gray uppercase tracking-wider border-b border-bdr-d">
                      <th className="p-4 pl-6">Name</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Value</th>
                      <th className="p-4">Last Contact</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[
                      { name: 'Sarah Jenkins', email: 'sarah@example.com', status: 'Hot Lead', value: 'R 12,500', date: '2 hours ago', color: 'bg-accent text-ink' },
                      { name: 'Michael Chen', email: 'mike@company.com', status: 'In Progress', value: 'R 8,000', date: 'Yesterday', color: 'bg-green-lt text-green' },
                      { name: 'Emma Watson', email: 'emma@studio.co.za', status: 'New', value: 'R 15,000', date: '3 days ago', color: 'bg-cream3 text-ink' },
                      { name: 'David Smith', email: 'david@retail.com', status: 'Closed Won', value: 'R 24,000', date: '1 week ago', color: 'bg-ink text-white' },
                    ].map((lead, i) => (
                      <tr key={i} className="border-b border-bdr-d hover:bg-cream/30 transition-colors">
                        <td className="p-4 pl-6">
                          <div className="font-bold text-ink">{lead.name}</div>
                          <div className="text-xs text-gray">{lead.email}</div>
                        </td>
                        <td className="p-4">
                          <span className={cn("px-2 py-1 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider", lead.color)}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="p-4 font-bold text-ink font-mono">{lead.value}</td>
                        <td className="p-4 text-gray text-xs">{lead.date}</td>
                        <td className="p-4 text-right">
                          <button className="text-gray hover:text-ink font-bold text-xs">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Automations Placeholder */}
        {activeTab === 'automations' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {[
              { title: 'Abandoned Cart Recovery', desc: 'Sends WhatsApp reminder after 1 hour', status: 'Active', runs: '1,240' },
              { title: 'Welcome Series', desc: '3-part email sequence for new subscribers', status: 'Active', runs: '856' },
              { title: 'Post-Purchase Review Request', desc: 'Asks for review 7 days after delivery', status: 'Paused', runs: '0' },
              { title: 'Lead Qualification Bot', desc: 'Qualifies incoming WhatsApp leads', status: 'Active', runs: '3,412' },
            ].map((auto, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-bdr-d shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center text-ink">
                      <MessageSquare size={20} />
                    </div>
                    <span className={cn(
                      "px-2 py-1 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider",
                      auto.status === 'Active' ? "bg-green-lt text-green" : "bg-cream3 text-gray"
                    )}>
                      {auto.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-ink tracking-tight mb-1">{auto.title}</h3>
                  <p className="text-sm text-gray mb-6">{auto.desc}</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-bdr-d">
                  <div className="font-mono text-[10px] font-bold text-gray uppercase tracking-wider">
                    {auto.runs} Runs
                  </div>
                  <button className="text-sm font-bold text-ink hover:text-green transition-colors">Edit Workflow</button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Analytics Placeholder */}
        {activeTab === 'analytics' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <div className="bg-white p-8 rounded-xl border border-bdr-d shadow-sm mb-6 flex flex-col items-center justify-center min-h-[300px] text-center">
              <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center text-gray mb-4">
                <BarChart3 size={32} />
              </div>
              <h3 className="text-xl font-black text-ink tracking-tight mb-2">Detailed Analytics Generating</h3>
              <p className="text-sm text-gray max-w-md">Your custom data dashboard is currently compiling data from the last 30 days. Check back shortly for full insights.</p>
            </div>
          </motion.div>
        )}

        {/* Settings Placeholder */}
        {activeTab === 'settings' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="bg-white rounded-xl border border-bdr-d shadow-sm overflow-hidden">
              <div className="p-6 border-b border-bdr-d flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-ink">Notifications</h3>
                  <p className="text-xs text-gray">Manage how we contact you.</p>
                </div>
                <div className="w-12 h-6 bg-green rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="p-6 border-b border-bdr-d flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-ink">Two-Factor Authentication</h3>
                  <p className="text-xs text-gray">Add an extra layer of security.</p>
                </div>
                <button className="text-sm font-bold text-ink bg-cream px-4 py-2 rounded-lg hover:bg-cream3 transition-colors">Enable</button>
              </div>
              <div className="p-6 border-b border-bdr-d flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-ink flex items-center gap-2">
                    <ShieldCheck size={16} className="text-green" />
                    Security & Compliance
                  </h3>
                  <p className="text-xs text-gray">Download SOC 2 Type II and GDPR readiness reports.</p>
                </div>
                <button className="text-sm font-bold text-ink bg-cream px-4 py-2 rounded-lg hover:bg-cream3 transition-colors">View Reports</button>
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-red-600">Danger Zone</h3>
                  <p className="text-xs text-gray">Permanently delete your account and data.</p>
                </div>
                <button className="text-sm font-bold text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">Delete Account</button>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
