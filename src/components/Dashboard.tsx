import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  User, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut,
  TrendingUp,
  ArrowUpRight,
  Menu,
  X,
  Bell,
  CheckCircle2,
  Rocket
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('optiLinkUser');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      onLogout();
    }
  }, [onLogout]);

  const handleLogout = () => {
    // Note: Do not clear localStorage here so they can log back in, 
    // but in a real app you might clear a session token.
    onLogout();
  };

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-opti-lightgray flex selection:bg-opti-green selection:text-opti-black font-sans">
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-opti-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "w-64 bg-opti-black text-opti-white flex flex-col fixed h-full z-40 transition-transform duration-300 ease-in-out md:translate-x-0 border-r border-white/5",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-8 flex items-center justify-between border-b border-white/10">
          <div>
            <div className="text-xl font-black tracking-tight mb-1">Opti-Link</div>
            <div className="text-[10px] font-bold text-opti-green uppercase tracking-[0.2em]">Client Portal</div>
          </div>
          <button 
            className="md:hidden text-white/50 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {[
            { id: 'overview', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
            { id: 'profile', icon: <User size={18} />, label: 'Profile' },
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                activeTab === item.id 
                  ? "bg-opti-green text-opti-black shadow-lg shadow-opti-green/20" 
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-white/50 hover:bg-white/5 hover:text-white transition-all">
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-12 w-full max-w-[100vw]">
        <header className="flex justify-between items-start md:items-center mb-12 gap-4">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 -ml-2 text-opti-black hover:bg-black/5 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-2xl md:text-4xl font-black text-opti-black tracking-tight">
                {activeTab === 'overview' ? 'Performance Overview' : 'Client Profile'}
              </h1>
              <p className="text-sm text-opti-gray mt-1 hidden md:block font-medium">
                {activeTab === 'overview' ? "Your data-driven growth metrics and connected campaigns." : "Manage your Opti-Link account information."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="w-10 h-10 rounded-full bg-opti-white border border-opti-black/10 flex items-center justify-center text-opti-gray hover:text-opti-black transition-colors relative shadow-sm">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-opti-green rounded-full border-2 border-opti-white"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-opti-black">{userData.fullName}</div>
                <div className="text-xs text-opti-gray">Growth Partner</div>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-opti-black text-opti-green flex items-center justify-center font-black text-sm md:text-base border border-opti-green/20 shadow-opti-glow">
                {userData.fullName.split(' ').map((n: string) => n[0]).join('').substring(0,2).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {activeTab === 'overview' && (
          <AnimatePresence mode="wait">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Earnings This Month', value: '$24,500', trend: '+14.5%', icon: <TrendingUp size={20} /> },
                  { label: 'Completed Campaigns', value: '18', trend: '+3', icon: <Rocket size={20} /> },
                  { label: 'Lifetime Revenue', value: '$142,800', trend: '+22.4%', icon: <BarChart3 size={20} /> },
                  { label: 'Performance Score', value: '98/100', trend: 'Top 5%', icon: <CheckCircle2 size={20} /> }
                ].map((metric, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="bg-opti-white p-6 rounded-2xl border border-opti-black/5 shadow-opti-card hover:-translate-y-1 transition-transform duration-300"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-xl bg-opti-black flex items-center justify-center text-opti-green shadow-inner">
                        {metric.icon}
                      </div>
                      <div className="flex items-center gap-1 font-mono text-[10px] font-bold text-opti-black bg-opti-green px-2 py-1 rounded-md">
                        {metric.trend}
                      </div>
                    </div>
                    <div className="text-3xl font-black text-opti-black tracking-tight mb-1">{metric.value}</div>
                    <div className="text-xs font-semibold text-opti-gray uppercase tracking-wider">{metric.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Chart / Activity area representation */}
              <div className="bg-opti-white rounded-2xl border border-opti-black/5 p-8 shadow-opti-card mt-8 flex flex-col items-center justify-center min-h-[300px] text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-opti-green/5 rounded-full blur-[80px]" />
                <div className="w-16 h-16 rounded-full bg-opti-lightgray flex items-center justify-center text-opti-gray mb-4 relative z-10">
                  <BarChart3 size={32} />
                </div>
                <h3 className="text-xl font-black text-opti-black tracking-tight mb-2 relative z-10">Real-time Data Syncing</h3>
                <p className="text-sm text-opti-gray max-w-md relative z-10 font-medium">Your custom data stream is currently compiling from the connected platforms. Check back shortly for full insights.</p>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {activeTab === 'profile' && (
          <AnimatePresence mode="wait">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-4xl"
            >
              <div className="bg-opti-white rounded-2xl border border-opti-black/5 shadow-opti-card overflow-hidden">
                <div className="p-8 md:p-10 border-b border-opti-black/5 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-opti-black tracking-tight mb-2">Account Details</h2>
                    <p className="text-sm text-opti-gray font-medium">View and manage your core identity information.</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-opti-success/10 text-opti-success rounded-full text-xs font-bold tracking-wider uppercase">
                    <div className="w-2 h-2 rounded-full bg-opti-success animate-pulse"></div>
                    Status: Active
                  </div>
                </div>
                
                <div className="p-8 md:p-10 space-y-8">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 rounded-full bg-opti-black text-opti-green flex items-center justify-center font-black text-3xl shadow-opti-glow">
                      {userData.fullName.split(' ').map((n: string) => n[0]).join('').substring(0,2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-opti-black">{userData.fullName}</h3>
                      <p className="text-sm text-opti-gray">@{userData.username}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                    <div>
                      <label className="text-[10px] font-bold text-opti-gray uppercase tracking-wider mb-2 block">Full Name</label>
                      <div className="text-base font-semibold text-opti-black pb-2 border-b border-opti-black/10">
                        {userData.fullName}
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-opti-gray uppercase tracking-wider mb-2 block">Username</label>
                      <div className="text-base font-semibold text-opti-black pb-2 border-b border-opti-black/10">
                        {userData.username}
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-opti-gray uppercase tracking-wider mb-2 block">Email Address</label>
                      <div className="text-base font-semibold text-opti-black pb-2 border-b border-opti-black/10">
                        {userData.email}
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-opti-gray uppercase tracking-wider mb-2 block">Member Since</label>
                      <div className="text-base font-semibold text-opti-black pb-2 border-b border-opti-black/10 font-mono">
                        {new Date(userData.memberSince).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 bg-opti-lightgray border-t border-opti-black/5">
                  <p className="text-xs text-opti-gray font-medium text-center">
                    To change your account details or password, please contact your account manager.
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}

