import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Globe2, KanbanSquare, Loader2, Mail } from 'lucide-react';
import { useStore } from '../store.jsx';
import { Field, LangMenu, Logo, ThemeToggle, rise, stagger } from '../components/ui.jsx';

function FloatCard({ className, delay = 0, children }) {
  return (
    <motion.div className={`float-card ${className}`} initial={{ opacity: 0, y: 30, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.5 + delay, type: 'spring', stiffness: 120, damping: 18 }}>
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5 + delay * 2, repeat: Infinity, ease: 'easeInOut', delay }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function Login() {
  const { t, login, user, toast } = useStore();
  const [email, setEmail] = useState(user.email);
  const [pass, setPass] = useState('demo-password');
  const [busy, setBusy] = useState(false);

  const enter = (e) => {
    e?.preventDefault();
    if (busy) return;
    setBusy(true);
    window.setTimeout(() => {
      login();
      toast(t('to.welcome', { name: user.first }));
    }, 900);
  };

  return (
    <div className="login">
      <aside className="login-art" aria-hidden="false">
        <div className="art-grid" aria-hidden="true" />
        <div className="art-glow" aria-hidden="true" />

        <motion.div className="art-top" variants={stagger(0.1)} initial="hidden" animate="show">
          <motion.div variants={rise} className="brand-row">
            <Logo size={40} />
            <span className="display brand-name">Meridian</span>
          </motion.div>
          <motion.h1 variants={rise} className="display art-title">
            {t('login.title')}
          </motion.h1>
          <motion.p variants={rise} className="art-sub">
            {t('login.sub')}
          </motion.p>
          <motion.ul variants={rise} className="art-feats">
            <li>
              <KanbanSquare size={16} /> {t('login.f1')}
            </li>
            <li>
              <Globe2 size={16} /> {t('login.f2')}
            </li>
            <li>
              <CheckCircle2 size={16} /> {t('login.f3')}
            </li>
          </motion.ul>
        </motion.div>

        <div className="art-floats" aria-hidden="true">
          <FloatCard className="fc-a" delay={0}>
            <div className="fc-row">
              <span className="fc-dot" style={{ background: 'var(--seg-doing)' }} />
              <strong>Redesign landing page</strong>
            </div>
            <div className="fc-bar">
              <motion.i initial={{ width: 0 }} animate={{ width: '72%' }} transition={{ delay: 1.2, duration: 1.2 }} />
            </div>
          </FloatCard>
          <FloatCard className="fc-b" delay={0.6}>
            <small>MRR</small>
            <strong className="display">$16,800</strong>
            <span className="fc-up">+5.7%</span>
          </FloatCard>
          <FloatCard className="fc-c" delay={1.1}>
            <CheckCircle2 size={18} />
            <span>Mockups approved</span>
          </FloatCard>
        </div>

        <p className="art-credit">
          {t('login.made')} <strong>{user.name}</strong>
        </p>
      </aside>

      <main className="login-panel">
        <div className="login-controls">
          <LangMenu />
          <ThemeToggle />
        </div>

        <motion.form className="login-card" onSubmit={enter} variants={stagger(0.08, 0.15)} initial="hidden" animate="show">
          <motion.div variants={rise} className="login-mobile-brand">
            <Logo size={36} />
            <span className="display brand-name">Meridian</span>
          </motion.div>
          <motion.span variants={rise} className="eyebrow">
            {t('login.kicker')}
          </motion.span>
          <motion.h2 variants={rise} className="display login-h">
            {t('tagline')}
          </motion.h2>

          <motion.div variants={rise}>
            <Field label={t('login.email')}>
              <span className="input-icon">
                <Mail size={17} />
                <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              </span>
            </Field>
          </motion.div>
          <motion.div variants={rise}>
            <Field label={t('login.password')}>
              <input className="input" type="password" value={pass} onChange={(e) => setPass(e.target.value)} autoComplete="current-password" />
            </Field>
          </motion.div>

          <motion.button variants={rise} className="btn btn-primary btn-lg btn-block" type="submit" whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.97 }} disabled={busy}>
            {busy ? (
              <>
                <Loader2 size={18} className="spin" /> <span>{t('login.signingIn')}</span>
              </>
            ) : (
              <>
                <span>{t('login.signin')}</span> <ArrowRight size={18} />
              </>
            )}
          </motion.button>

          <motion.div variants={rise} className="divider">
            <span>{t('login.or')}</span>
          </motion.div>
          <motion.button variants={rise} className="btn btn-soft btn-lg btn-block" type="button" onClick={enter} disabled={busy}>
            {t('login.demo')}
          </motion.button>
          <motion.p variants={rise} className="hint">
            {t('login.hint')}
          </motion.p>
        </motion.form>

        <p className="login-credit">
          {t('login.made')} <a href={`mailto:${user.email}`}>{user.name}</a>
        </p>
      </main>
    </div>
  );
}
