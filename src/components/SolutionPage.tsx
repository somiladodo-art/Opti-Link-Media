import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Globe, Rocket, Users, Target, Briefcase, GraduationCap } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const contentMap: Record<string, any> = {
  freelancers: {
    title: 'Scale Your Freelance Business',
    desc: 'Stop trading time for money. We build automated client acquisition systems, streamlined invoicing, and project management hubs so you can focus on delivering great work.',
    icon: <Users size={32} className="text-ink" />,
    features: [
      'Automated Lead Generation',
      'Client Onboarding Portals',
      'Invoicing & Payment Automation',
      'Project Management Setup'
    ]
  },
  creators: {
    title: 'Monetize Your Audience',
    desc: 'Turn followers into a sustainable business. We build your personal brand\'s digital infrastructure, from newsletters to merch stores and membership sites.',
    icon: <Globe size={32} className="text-ink" />,
    features: [
      'Custom Newsletter Setup',
      'Merch Store Integration',
      'Membership & Community Hubs',
      'Automated Content Distribution'
    ]
  },
  influencers: {
    title: 'Turn Influence Into Revenue',
    desc: 'Professionalize your brand. We provide custom landing pages, a brand deal CRM, and automated outreach systems to secure higher-paying partnerships.',
    icon: <Target size={32} className="text-ink" />,
    features: [
      'Media Kit Landing Pages',
      'Brand Deal CRM',
      'Automated Outreach Campaigns',
      'Contract & Invoice Management'
    ]
  },
  careers: {
    title: 'Join the Opti-Link Team',
    desc: 'We are always looking for top talent in digital operations, marketing, and engineering. Build the future of global business scaling with us.',
    icon: <Briefcase size={32} className="text-ink" />,
    features: [
      'Remote-First Culture',
      'Competitive Compensation',
      'Continuous Learning Budget',
      'Global Impact Projects'
    ]
  },
  academy: {
    title: 'Opti-Link Academy',
    desc: 'Learn our exact frameworks. Comprehensive courses on digital growth, automation, and scaling your business from the ground up.',
    icon: <GraduationCap size={32} className="text-ink" />,
    features: [
      'Step-by-Step Video Courses',
      'Automation Templates',
      'Live Q&A Sessions',
      'Private Community Access'
    ]
  }
};

export default function SolutionPage({ type, onCTA }: { type: string, onCTA: () => void }) {
  const content = contentMap[type] || contentMap.freelancers;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-cream flex flex-col items-center justify-center bg-grid-pattern">
      <div className="max-w-4xl mx-auto px-6 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-bdr-d shadow-2xl p-6 sm:p-8 md:p-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-green/10 rounded-full blur-[80px] opacity-50 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-green rounded-2xl flex items-center justify-center mb-8 border border-green/10">
              {content.icon}
            </div>
            
            <div className="font-mono text-[10px] font-bold text-green uppercase tracking-[0.3em] mb-4">
              [Solutions / {type}]
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-ink tracking-tighter leading-none uppercase mb-4 md:mb-6">
              {content.title.split(' ')[0]} {content.title.split(' ').length > 1 && content.title.split(' ')[1]}<br className="hidden md:block" />
              {content.title.split(' ').length > 2 && (
                <span className="bg-green text-ink px-4 py-1 mt-2 inline-block">
                  {content.title.split(' ').slice(2).join(' ')}
                </span>
              )}
            </h1>
            
            <p className="text-lg md:text-xl text-gray leading-relaxed max-w-2xl mb-12">
              {content.desc}
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12 w-full max-w-2xl text-left">
              {content.features.map((feature: string, i: number) => (
                <div key={i} className="flex items-center gap-3 bg-cream/50 p-4 rounded-lg border border-bdr-d">
                  <div className="w-6 h-6 rounded-full bg-green flex items-center justify-center shrink-0">
                    <CheckCircle2 size={14} className="text-ink" />
                  </div>
                  <span className="font-bold text-ink">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-8 border-t border-bdr-d flex flex-col sm:flex-row justify-center gap-4 w-full">
              <button 
                onClick={onCTA}
                className="opti-button text-base px-8 py-4 gap-2"
              >
                Get Started
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
