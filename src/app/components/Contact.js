'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cfg = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  table: process.env.NEXT_PUBLIC_SUPABASE_TABLE || 'contact_messages',
};

// Lazy singleton — created only on first form submit, NOT on module import.
// This removes @supabase/supabase-js from the initial JS bundle.
let _supabase = null;
async function getSupabase() {
  if (_supabase) return _supabase;
  if (!cfg.url || !cfg.anonKey || cfg.url === 'YOUR_SUPABASE_PROJECT_URL') return null;
  const { createClient } = await import('@supabase/supabase-js');
  _supabase = createClient(cfg.url, cfg.anonKey);
  return _supabase;
}

const MAX_MSG = 1000;

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  // Field-level validation errors
  const [errors, setErrors] = useState({});
  // Separate state for API / network errors to avoid collision with field errors
  const [apiError, setApiError] = useState('');
  const [msgLen, setMsgLen] = useState(0);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setApiError('');
    setSuccess(false);

    const fd = new FormData(e.target);
    const name    = fd.get('name')?.toString().trim()    || '';
    const email   = fd.get('email')?.toString().trim()   || '';
    const subject = fd.get('subject')?.toString().trim() || '';
    const message = fd.get('message')?.toString().trim() || '';
    // Honeypot — bots fill this, humans don't
    const website = fd.get('website')?.toString().trim() || '';

    if (website) {
      setSuccess(true);
      e.target.reset();
      setMsgLen(0);
      return;
    }

    const newErrors = {};
    if (!name) newErrors.name = 'Name is required.';
    else if (name.length > 100) newErrors.name = 'Name cannot exceed 100 characters.';

    if (!email) newErrors.email = 'Email is required.';
    else if (!validateEmail(email)) newErrors.email = 'Please enter a valid email.';
    else if (email.length > 255) newErrors.email = 'Email cannot exceed 255 characters.';

    if (!subject) newErrors.subject = 'Subject is required.';
    else if (subject.length > 200) newErrors.subject = 'Subject cannot exceed 200 characters.';

    if (!message || message.length < 10) newErrors.message = 'Message must be at least 10 characters.';
    else if (message.length > MAX_MSG) newErrors.message = `Message cannot exceed ${MAX_MSG} characters.`;

    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setLoading(true);
    try {
      const supabaseClient = await getSupabase();
      if (!supabaseClient) {
        setApiError('Contact form is not yet configured. Please email me directly at avi620nash@gmail.com');
        return;
      }
      const { error } = await supabaseClient.from(cfg.table).insert([{ name, email, subject, message }]);
      if (error) throw error;
      e.target.reset();
      setMsgLen(0);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 6000);
    } catch (err) {
      console.error('[Contact Form] Supabase error:', err);
      setApiError('Something went wrong. Please try emailing me directly at avi620nash@gmail.com');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 relative z-10 bg-[#080c18]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-3 mb-10 sm:mb-16"
        >
          <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">// get_in_touch</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100">Let&apos;s Work Together</h2>
          <p className="max-w-xl text-slate-400 text-sm sm:text-base">Open to freelance projects, full-time roles, and interesting collaborations.</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 flex flex-col gap-6 sm:gap-10"
          >
            <div>
              <h3 className="text-xl sm:text-3xl font-bold text-slate-100 mb-3 sm:mb-4">Have a project in mind?</h3>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-lg">Whether it&apos;s building a robust automation framework, architecting a platform, or integrating AI into your workflow — let&apos;s talk about how I can help.</p>
            </div>

            <div className="flex flex-col gap-4">
              <a href="mailto:avi620nash@gmail.com" className="group flex items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-slate-900/50 border border-slate-700/50 hover:bg-slate-800/80 hover:border-cyan-400/50 transition-all active:scale-[0.98]">
                <div className="w-11 h-11 sm:w-14 sm:h-14 bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-slate-400 font-medium mb-1">Email</div>
                  <div className="text-sm sm:text-lg text-slate-200 font-semibold group-hover:text-cyan-400 transition-colors break-all">avi620nash@gmail.com</div>
                </div>
              </a>

              <a href="https://github.com/avi735" className="group flex items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-slate-900/50 border border-slate-700/50 hover:bg-slate-800/80 hover:border-emerald-500/50 transition-all active:scale-[0.98]" target="_blank" rel="noopener noreferrer">
                <div className="w-11 h-11 sm:w-14 sm:h-14 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-slate-400 font-medium mb-1">GitHub</div>
                  <div className="text-sm sm:text-lg text-slate-200 font-semibold group-hover:text-emerald-400 transition-colors">github.com/avi735</div>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/avinash-kumar-a1444a31b/" className="group flex items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-slate-900/50 border border-slate-700/50 hover:bg-slate-800/80 hover:border-blue-500/50 transition-all active:scale-[0.98]" target="_blank" rel="noopener noreferrer">
                <div className="w-11 h-11 sm:w-14 sm:h-14 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-slate-400 font-medium mb-1">LinkedIn</div>
                  <div className="text-sm sm:text-lg text-slate-200 font-semibold group-hover:text-blue-400 transition-colors">linkedin.com/in/avinash-kumar</div>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-[1.5] bg-[#111827]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl"
          >
            <form id="contact-form" noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* Honeypot — hidden from humans, visible to bots */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
                <label htmlFor="contact-website">Website</label>
                <input type="text" id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="text-sm font-semibold text-slate-300">Name</label>
                  <input
                    type="text" id="contact-name" name="name"
                    placeholder="Your name" autoComplete="name"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`w-full bg-[#080c18]/80 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all`}
                  />
                  {errors.name && <span id="name-error" className="text-xs text-red-400" role="alert">{errors.name}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="text-sm font-semibold text-slate-300">Email</label>
                  <input
                    type="email" id="contact-email" name="email"
                    placeholder="your@email.com" autoComplete="email"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`w-full bg-[#080c18]/80 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all`}
                  />
                  {errors.email && <span id="email-error" className="text-xs text-red-400" role="alert">{errors.email}</span>}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-subject" className="text-sm font-semibold text-slate-300">Subject</label>
                <input
                  type="text" id="contact-subject" name="subject"
                  placeholder="What's this about?"
                  aria-invalid={errors.subject ? 'true' : 'false'}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                  className={`w-full bg-[#080c18]/80 border ${errors.subject ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all`}
                />
                {errors.subject && <span id="subject-error" className="text-xs text-red-400" role="alert">{errors.subject}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="contact-message" className="text-sm font-semibold text-slate-300">Message</label>
                  <span className={`text-xs font-mono transition-colors ${msgLen > MAX_MSG * 0.9 ? 'text-red-400' : 'text-slate-500'}`}>
                    {msgLen}/{MAX_MSG}
                  </span>
                </div>
                <textarea
                  id="contact-message" name="message" rows="5"
                  placeholder="Tell me about your project or opportunity..."
                  maxLength={MAX_MSG}
                  onChange={(e) => setMsgLen(e.target.value.length)}
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`w-full bg-[#080c18]/80 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-y`}
                />
                {errors.message && <span id="message-error" className="text-xs text-red-400" role="alert">{errors.message}</span>}
              </div>

              <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 mt-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-500 text-slate-950 font-bold hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] disabled:opacity-70 disabled:cursor-not-allowed transition-all">
                <span>{loading ? 'Sending...' : 'Send Message'}</span>
                {!loading && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                )}
                {loading && (
                  <svg className="animate-spin w-5 h-5 text-slate-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                )}
              </button>

              {/* API / network error — separate from field validation errors */}
              <AnimatePresence>
                {apiError && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm"
                    role="alert"
                  >
                    <svg width="18" height="18" className="flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>{apiError}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success message */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl"
                    role="status"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Message sent! I&apos;ll get back to you within 24 hours.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
