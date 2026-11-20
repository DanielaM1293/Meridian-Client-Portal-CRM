import { motion } from 'framer-motion';
import { Mail, Moon, RotateCcw, Sun } from 'lucide-react';
import { useStore } from '../store.jsx';
import { LANGS } from '../i18n.js';
import { Avatar, Page, PageHead, Segmented, rise, stagger } from '../components/ui.jsx';

const STACK = ['React 18', 'Vite', 'Framer Motion', 'React Router', 'Lucide', 'Fraunces', 'Instrument Sans', 'CSS Variables'];

export default function SettingsView() {
  const { t, user, theme, toggleTheme, lang, setLang, resetData, toast } = useStore();

  return (
    <Page>
      <PageHead title={t('se.title')} />
      <motion.div className="settings" variants={stagger(0.08)} initial="hidden" animate="show">
        <motion.section className="card profile-card" variants={rise}>
          <Avatar name={user.name} hue={165} size={84} />
          <div>
            <span className="eyebrow">{t('se.profile')}</span>
            <h2 className="display">{user.name}</h2>
            <p className="muted">{t('se.role')}</p>
            <a className="link-arrow" href={`mailto:${user.email}`}>
              <Mail size={15} /> {user.email}
            </a>
          </div>
        </motion.section>

        <motion.section className="card" variants={rise}>
          <h2 className="card-title">{t('se.appearance')}</h2>
          <p className="muted">{t('se.themeSub')}</p>
          <div className="setting-control">
            <Segmented
              id="theme"
              value={theme}
              onChange={(v) => v !== theme && toggleTheme()}
              options={[
                { value: 'light', label: t('c.light'), icon: <Sun size={15} /> },
                { value: 'dark', label: t('c.dark'), icon: <Moon size={15} /> },
              ]}
            />
          </div>
        </motion.section>

        <motion.section className="card" variants={rise}>
          <h2 className="card-title">{t('se.language')}</h2>
          <p className="muted">{t('se.languageSub')}</p>
          <div className="setting-control">
            <Segmented id="lang" value={lang} onChange={setLang} options={LANGS.map((l) => ({ value: l.code, label: l.label }))} />
          </div>
        </motion.section>

        <motion.section className="card" variants={rise}>
          <h2 className="card-title">{t('se.data')}</h2>
          <p className="muted">{t('se.dataSub')}</p>
          <div className="setting-control">
            <button
              className="btn btn-soft"
              type="button"
              onClick={() => {
                resetData();
                toast(t('to.reset'));
              }}
            >
              <RotateCcw size={16} /> {t('se.reset')}
            </button>
          </div>
        </motion.section>

        <motion.section className="card span-all" variants={rise}>
          <h2 className="card-title">{t('se.about')}</h2>
          <p className="muted">{t('se.aboutText')}</p>
          <p className="eyebrow stack-label">{t('se.built')}</p>
          <div className="stack">
            {STACK.map((s, i) => (
              <motion.span key={s} className="chip chip-lg" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.05, type: 'spring', stiffness: 300, damping: 18 }}>
                {s}
              </motion.span>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </Page>
  );
}
