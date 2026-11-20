import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, animate, motion } from 'framer-motion';
import { AlertCircle, Check, ChevronDown, Moon, Sun, X } from 'lucide-react';
import { useStore } from '../store.jsx';
import { LANGS } from '../i18n.js';

/* ───────── motion presets ───────── */
export const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 240, damping: 26 } },
};
export const stagger = (gap = 0.06, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export function Page({ children, className = '' }) {
  return (
    <motion.div
      className={`page ${className}`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function PageHead({ title, sub, actions }) {
  return (
    <motion.div className="page-head" variants={stagger(0.07)} initial="hidden" animate="show">
      <motion.div variants={rise}>
        <h1 className="display">{title}</h1>
        {sub && <p className="muted">{sub}</p>}
      </motion.div>
      {actions && (
        <motion.div className="page-actions" variants={rise}>
          {actions}
        </motion.div>
      )}
    </motion.div>
  );
}

/* ───────── small atoms ───────── */
export function Avatar({ name = '', hue = 165, size = 40 }) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  return (
    <span
      className="avatar"
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background: `linear-gradient(135deg, hsl(${hue} 55% 44%), hsl(${(hue + 45) % 360} 62% 30%))`,
      }}
    >
      {initials}
    </span>
  );
}

export function Badge({ tone = 'muted', dot = false, children }) {
  return (
    <span className={`badge badge-${tone}`}>
      {dot && <i className="badge-dot" />}
      {children}
    </span>
  );
}

export const statusTone = { active: 'green', lead: 'amber', paused: 'muted' };
export const taskTone = { todo: 'muted', doing: 'blue', review: 'violet', done: 'green' };
export const prioTone = { high: 'rose', medium: 'amber', low: 'muted' };

export function ProgressBar({ value, tone = 'primary' }) {
  return (
    <div className="bar" role="progressbar" aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={100}>
      <motion.span
        className={`bar-fill bar-${tone}`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      />
    </div>
  );
}

export function CountUp({ value, format, duration = 1.3 }) {
  const { locale } = useStore();
  const ref = useRef(null);
  const fmt = useRef(format);
  fmt.current = format || ((v) => Math.round(v).toLocaleString(locale));
  useEffect(() => {
    const ctrl = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = fmt.current(v);
      },
    });
    return () => ctrl.stop();
  }, [value, duration]);
  useEffect(() => {
    // keep text correct when only the language changes
    if (ref.current) ref.current.textContent = fmt.current(value);
  }, [locale]); // eslint-disable-line
  return <span ref={ref}>{fmt.current(0)}</span>;
}

/* Card with a soft glow that follows the pointer */
export function Spotlight({ as: Tag = 'div', className = '', children, ...rest }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <Tag className={`spot ${className}`} onMouseMove={onMove} {...rest}>
      {children}
    </Tag>
  );
}

export function Segmented({ value, onChange, options, id }) {
  return (
    <div className="segmented" role="tablist">
      {options.map((o) => {
        const on = value === o.value;
        return (
          <button key={o.value} role="tab" aria-selected={on} className={on ? 'on' : ''} onClick={() => onChange(o.value)} type="button">
            {on && <motion.span layoutId={`seg-${id}`} className="seg-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
            <span className="seg-label">
              {o.icon}
              {o.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function Field({ label, error, children }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {error && (
        <span className="field-error">
          <AlertCircle size={13} /> {error}
        </span>
      )}
    </label>
  );
}

export function useClickOutside(ref, handler) {
  useEffect(() => {
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) handler();
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [ref, handler]);
}

/* ───────── overlays ───────── */
function useOverlay(open, onClose) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);
}

export function Modal({ open, onClose, title, children, footer, size = 'md' }) {
  const { t } = useStore();
  useOverlay(open, onClose);
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            className={`modal modal-${size}`}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
          >
            <header className="modal-head">
              <h3 className="display">{title}</h3>
              <button className="icon-btn" onClick={onClose} aria-label={t('c.close')} type="button">
                <X size={18} />
              </button>
            </header>
            <div className="modal-body">{children}</div>
            {footer && <footer className="modal-foot">{footer}</footer>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export function Drawer({ open, onClose, children, label }) {
  useOverlay(open, onClose);
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="overlay overlay-drawer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.aside
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-label={label}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 36 }}
          >
            {children}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/* ───────── toasts ───────── */
export function ToastStack() {
  const { toasts, dismissToast } = useStore();
  return createPortal(
    <div className="toasts" aria-live="polite">
      <AnimatePresence initial={false}>
        {toasts.map((x) => (
          <motion.div
            key={x.id}
            layout
            className="toast"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            onClick={() => dismissToast(x.id)}
          >
            <span className="toast-ico">
              <Check size={14} strokeWidth={3} />
            </span>
            {x.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body,
  );
}

/* ───────── theme + language controls ───────── */
export function ThemeToggle() {
  const { theme, toggleTheme, t } = useStore();
  return (
    <button className="icon-btn theme-btn" onClick={toggleTheme} aria-label={t('c.switchTheme')} title={t('c.switchTheme')} type="button">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
          transition={{ duration: 0.22 }}
          style={{ display: 'grid', placeItems: 'center' }}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function LangMenu({ compact = false, align = 'right' }) {
  const { lang, setLang, t } = useStore();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setOpen(false));
  const current = LANGS.find((l) => l.code === lang);
  return (
    <div className="menu" ref={ref}>
      <button className="lang-btn" onClick={() => setOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={open} aria-label={t('c.language')} type="button">
        <span className="mono">{current.short}</span>
        {!compact && <ChevronDown size={14} className={open ? 'flip' : ''} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            className={`menu-pop menu-${align}`}
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.16 }}
          >
            {LANGS.map((l) => (
              <li key={l.code}>
                <button
                  role="option"
                  aria-selected={l.code === lang}
                  className={l.code === lang ? 'on' : ''}
                  onClick={() => {
                    setLang(l.code);
                    setOpen(false);
                  }}
                  type="button"
                >
                  <span className="mono lang-code">{l.short}</span>
                  {l.label}
                  {l.code === lang && <Check size={15} className="menu-check" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Logo({ size = 34 }) {
  return (
    <span className="logo-mark" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 64 64" width={size * 0.62} height={size * 0.62}>
        <path d="M14 48V18l18 20 18-20v30" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <i className="logo-dot" />
    </span>
  );
}

export function EmptyState({ icon, text }) {
  return (
    <div className="empty">
      <span className="empty-ico">{icon}</span>
      <p>{text}</p>
    </div>
  );
}
