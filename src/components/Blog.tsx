import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Tag, ChevronRight, Facebook, Twitter, Linkedin } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Ultimate Guide to Digital Growth in 2026",
    excerpt: "Discover the core strategies that are driving massive revenue growth for service-based businesses this year. From AI automation to hyper-personalized outreach.",
    author: "Opti-Link Team",
    date: "April 12, 2026",
    category: "Growth Strategy",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Why Your Current CRM is Costing You Clients",
    excerpt: "Are leads slipping through the cracks? Learn how implementing a streamlined, automated CRM pipeline can recover up to 30% of lost revenue within the first month.",
    author: "Sarah Jenkins",
    date: "April 5, 2026",
    category: "Automation",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Mastering WhatsApp Marketing for B2B",
    excerpt: "Email open rates are dropping. See how B2B companies are leveraging WhatsApp Business API to achieve 98% open rates and close deals faster.",
    author: "Opti-Link Team",
    date: "March 28, 2026",
    category: "Marketing",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Scaling from 6 to 7 Figures: The Infrastructure Shift",
    excerpt: "What got you here won't get you there. We break down the exact operational and digital infrastructure shifts required to scale past the million-dollar mark.",
    author: "David Chen",
    date: "March 15, 2026",
    category: "Scaling",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
  }
];

const ShareButtons = ({ title }: { title: string }) => {
  const handleShare = (e: React.MouseEvent, platform: string) => {
    e.stopPropagation();
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    let shareLink = '';
    
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="flex items-center gap-1 border-l border-bdr pl-2 ml-1">
      <button onClick={(e) => handleShare(e, 'facebook')} className="p-1.5 text-gray-lt hover:text-ink hover:bg-cream3 rounded-md transition-colors" aria-label="Share on Facebook">
        <Facebook size={14} />
      </button>
      <button onClick={(e) => handleShare(e, 'twitter')} className="p-1.5 text-gray-lt hover:text-ink hover:bg-cream3 rounded-md transition-colors" aria-label="Share on Twitter">
        <Twitter size={14} />
      </button>
      <button onClick={(e) => handleShare(e, 'linkedin')} className="p-1.5 text-gray-lt hover:text-ink hover:bg-cream3 rounded-md transition-colors" aria-label="Share on LinkedIn">
        <Linkedin size={14} />
      </button>
    </div>
  );
};

export default function Blog({ onBack }: { onBack: () => void }) {
  // SEO Optimization
  useEffect(() => {
    const defaultTitle = "Opti-Link Media | Strategic Operations Partner";
    document.title = "Blog & Insights | Opti-Link Media Group";
    
    // Helper to set or update meta tags
    const setMetaTag = (selector: string, attr: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${selector}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
      return element;
    };

    // Update primary SEO metadata
    const desc = 'Read the latest insights on digital growth, automation, and scaling your business from the experts at Opti-Link Media Group.';
    const title = 'Blog & Insights | Opti-Link Media Group';

    const tags = [
      setMetaTag('name', 'name', 'description', desc),
      setMetaTag('property', 'property', 'og:title', title),
      setMetaTag('property', 'property', 'og:description', desc),
      setMetaTag('name', 'name', 'twitter:title', title),
      setMetaTag('name', 'name', 'twitter:description', desc)
    ];
    
    return () => {
      document.title = defaultTitle;
      // Reset main description to default
      setMetaTag('name', 'name', 'description', "South Africa's premier digital growth partner. We build, automate, and operate your online business so you can focus on what matters.");
      setMetaTag('property', 'property', 'og:title', 'Opti-Link Media | Digital Growth Partner');
      setMetaTag('property', 'property', 'og:description', "We build, automate, and operate your online business to drive massive revenue growth.");
      setMetaTag('name', 'name', 'twitter:title', 'Opti-Link Media | Digital Growth Partner');
      setMetaTag('name', 'name', 'twitter:description', "We build, automate, and operate your online business to drive massive revenue growth.");
    };
  }, []);

  return (
    <div className="min-h-screen bg-cream pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray hover:text-ink font-semibold mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-black text-ink tracking-tighter leading-none uppercase mb-6">
              INSIGHTS &<br />
              <span className="bg-green text-ink px-4 py-1 mt-2 inline-block">STRATEGIES</span>
            </h1>
            <p className="text-xl text-gray max-w-2xl leading-relaxed">
              Expert advice, case studies, and actionable strategies to help you scale your business, automate your operations, and dominate your market.
            </p>
          </motion.div>
        </div>

        {/* Featured Post */}
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16 group cursor-pointer"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-3xl p-4 border border-bdr-d shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="rounded-2xl overflow-hidden h-[300px] md:h-[400px]">
              <img 
                src={BLOG_POSTS[0].image} 
                alt={BLOG_POSTS[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-6 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-green text-ink font-bold text-xs uppercase tracking-wider px-3 py-1">
                  {BLOG_POSTS[0].category}
                </span>
                <span className="text-gray-lt text-sm font-semibold flex items-center gap-1">
                  <Calendar size={14} />
                  {BLOG_POSTS[0].date}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-ink leading-tight mb-4 group-hover:opacity-80 transition-opacity">
                {BLOG_POSTS[0].title}
              </h2>
              <p className="text-gray text-lg mb-8 leading-relaxed">
                {BLOG_POSTS[0].excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-ink pr-3">
                    <User size={16} className="text-gray-lt" />
                    {BLOG_POSTS[0].author}
                  </div>
                  <ShareButtons title={BLOG_POSTS[0].title} />
                </div>
                <span className="text-ink bg-green px-3 py-1 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Article <ChevronRight size={18} />
                </span>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Post Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.slice(1).map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              className="bg-white rounded-3xl border border-bdr-d overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-green text-ink px-2 py-1 rounded font-bold text-xs uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span className="text-gray-lt text-xs font-semibold">
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-black text-ink leading-tight mb-3 group-hover:opacity-80 transition-opacity">
                  {post.title}
                </h3>
                <p className="text-gray text-sm mb-6 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-bdr">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-lt pr-2">
                      {post.date}
                    </span>
                    <ShareButtons title={post.title} />
                  </div>
                  <span className="text-ink bg-green px-2 py-1 rounded font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read <ChevronRight size={16} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
