import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CornerDownLeft, Globe, KanbanSquare, LayoutDashboard, ListPlus, Moon, Search, Settings, UserPlus, Users } from 'lucide-react';
import { useStore } from '../store.jsx';
import { Avatar } from './ui.jsx';

export default function CommandPalette() {
  const { paletteOpen, setPaletteOpen, t, clients, tasks, taskTitle, setModal, setDrawerId, toggleTheme } = useStore();
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const listRef = useRef(null);
  const close = () => setPaletteOpen(false);

  useEffect(() => {
    if (paletteOpen) {
      setQ('');
      setIdx(0);
    }
  }, [paletteOpen]);

  const items = useMemo(() => {
    const go = (path) => () => navigate(path);
    const all = [
      { group: t('cmd.nav'), icon: <LayoutDashboard size={17} />, label: t('nav.dashboard'), run: go('/') },
      { group: t('cmd.nav'), icon: <Users size={17} />, label: t('nav.clients'), run: go('/clients') },
      { group: t('cmd.nav'), icon: <KanbanSquare size={17} />, label: t('nav.tasks'), run: go('/tasks') },
      { group: t('cmd.nav'), icon: <Globe size={17} />, label: t('nav.portal'), run: go('/portal') },
      { group: t('cmd.nav'), icon: <Settings size={17} />, label: t('nav.settings'), run: go('/settings') },
      { group: t('cmd.actions'), icon: <ListPlus size={17} />, label: t('cmd.newTask'), run: () => setModal({ type: 'task', data: null }) },
      { group: t('cmd.actions'), icon: <UserPlus size={17} />, label: t('cmd.newClient'), run: () => setModal({ type: 'client' }) },
      { group: t('cmd.actions'), icon: <Moon size={17} />, label: t('cmd.theme'), run: toggleTheme },
      ...clients.map((c) => ({
        group: t('cmd.clients'),
        icon: <Avatar name={c.name} hue={c.hue} size={24} />,
        label: c.company,
        hint: c.name,
        run: () => setDrawerId(c.id),
      })),
      ...tasks.map((k) => ({
        group: t('cmd.tasks'),
        icon: <KanbanSquare size={17} />,
        label: taskTitle(k),
        hint: t(`ts.${k.status}`),
        run: () => setModal({ type: 'task', data: k }),
      })),
    ];
    const s = q.trim().toLowerCase();
    return s ? all.filter((i) => `${i.label} ${i.hint || ''}`.toLowerCase().includes(s)) : all.slice(0, 8);
  }, [q, t, clients, tasks, taskTitle, navigate, setModal, setDrawerId, toggleTheme]);

  useEffect(() => setIdx(0), [q]);

  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [idx]);

  const run = (item) => {
    close();
    window.setTimeout(item.run, 60);
  };

  const onKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIdx((i) => Math.min(i + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && items[idx]) {
      e.preventDefault();
      run(items[idx]);
    } else if (e.key === 'Escape') {
      close();
    }
  };

  let lastGroup = null;
  return createPortal(
    <AnimatePresence>
      {paletteOpen && (
        <motion.div
          className="overlay overlay-top"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            className="palette"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          >
            <div className="palette-input">
              <Search size={18} />
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKey} placeholder={t('cmd.ph')} aria-label={t('c.search')} />
              <kbd>esc</kbd>
            </div>
            <div className="palette-list" ref={listRef}>
              {items.length === 0 && <p className="palette-empty">{t('cmd.noRes')}</p>}
              {items.map((item, i) => {
                const showGroup = item.group !== lastGroup;
                lastGroup = item.group;
                return (
                  <div key={`${item.group}-${item.label}-${i}`}>
                    {showGroup && <div className="palette-group">{item.group}</div>}
                    <button
                      type="button"
                      className={`palette-item ${i === idx ? 'on' : ''}`}
                      data-active={i === idx}
                      onMouseMove={() => setIdx(i)}
                      onClick={() => run(item)}
                    >
                      <span className="palette-ico">{item.icon}</span>
                      <span className="palette-label">{item.label}</span>
                      {item.hint && <span className="palette-hint">{item.hint}</span>}
                      {i === idx && <CornerDownLeft size={14} className="palette-enter" />}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="palette-foot">
              <span>
                <kbd>↑</kbd> <kbd>↓</kbd> {t('cmd.nav').toLowerCase()}
              </span>
              <span>
                <kbd>↵</kbd> {t('cmd.select')}
              </span>
              <span>
                <kbd>esc</kbd> {t('cmd.close')}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
