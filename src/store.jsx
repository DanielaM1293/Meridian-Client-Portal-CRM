import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { LOCALES, detectLang, seedText, translate } from './i18n.js';
import { OWNER, seedActivity, seedClients, seedTasks } from './data.js';

const Store = createContext(null);
export const useStore = () => useContext(Store);

const PREFIX = 'meridian.v1.';

function usePersisted(key, init) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      if (raw !== null) return JSON.parse(raw);
    } catch {
      /* storage unavailable */
    }
    return typeof init === 'function' ? init() : init;
  });
  useEffect(() => {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  }, [key, value]);
  return [value, setValue];
}

const detectTheme = () => {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
};

let uid = 0;
const newId = (p) => `${p}${Date.now().toString(36)}${(uid++).toString(36)}`;

export function StoreProvider({ children }) {
  const [lang, setLang] = usePersisted('lang', detectLang);
  const [theme, setTheme] = usePersisted('theme', detectTheme);
  const [authed, setAuthed] = usePersisted('auth', false);
  const [clients, setClients] = usePersisted('clients', seedClients);
  const [tasks, setTasks] = usePersisted('tasks', seedTasks);
  const [activity, setActivity] = usePersisted('activity', seedActivity);
  const [approvals, setApprovals] = usePersisted('approvals', {});
  const [messages, setMessages] = usePersisted('messages', {});

  const [toasts, setToasts] = useState([]);
  const [modal, setModal] = useState(null); // { type: 'task' | 'client', data }
  const [drawerId, setDrawerId] = useState(null);
  const [portalId, setPortalId] = useState('c1');
  const [paletteOpen, setPaletteOpen] = useState(false);

  const locale = LOCALES[lang] || 'en-US';

  /* ───── i18n helpers ───── */
  const t = useCallback((key, vars) => translate(lang, key, vars), [lang]);
  const seed = useCallback((k) => seedText[lang]?.[k] ?? seedText.en[k] ?? k, [lang]);
  const taskTitle = useCallback((task) => (task.titleKey ? seed(task.titleKey) : task.title), [seed]);

  /* ───── formatters ───── */
  const money = useCallback(
    (n) => new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n),
    [locale],
  );
  const dateFmt = useCallback(
    (isoDate, opts = { day: 'numeric', month: 'short' }) => new Intl.DateTimeFormat(locale, opts).format(new Date(`${isoDate}T12:00:00`)),
    [locale],
  );
  const relTime = useCallback(
    (ts) => {
      const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
      const mins = Math.round((Date.now() - ts) / 60000);
      if (mins < 60) return rtf.format(-Math.max(mins, 1), 'minute');
      if (mins < 60 * 24) return rtf.format(-Math.round(mins / 60), 'hour');
      return rtf.format(-Math.round(mins / 1440), 'day');
    },
    [locale],
  );

  /* ───── document-level effects ───── */
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0A110F' : '#F4F1EA');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    root.classList.add('theme-anim');
    window.setTimeout(() => root.classList.remove('theme-anim'), 550);
    setTheme((x) => (x === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  /* ───── toasts ───── */
  const toast = useCallback((message, tone = 'ok') => {
    const id = newId('t');
    setToasts((l) => [...l.slice(-3), { id, message, tone }]);
    window.setTimeout(() => setToasts((l) => l.filter((x) => x.id !== id)), 3200);
  }, []);
  const dismissToast = useCallback((id) => setToasts((l) => l.filter((x) => x.id !== id)), []);

  /* ───── activity ───── */
  const pushActivity = useCallback(
    (entry) => setActivity((l) => [{ id: newId('a'), who: null, hue: 170, ts: Date.now(), ...entry }, ...l].slice(0, 12)),
    [setActivity],
  );

  /* ───── auth ───── */
  const login = useCallback(() => {
    setAuthed(true);
  }, [setAuthed]);
  const logout = useCallback(() => setAuthed(false), [setAuthed]);

  /* ───── clients ───── */
  const addClient = useCallback(
    (data) => {
      const c = { id: newId('c'), hue: Math.floor(Math.random() * 360), since: new Date().toISOString().slice(0, 10), ...data };
      setClients((l) => [c, ...l]);
      pushActivity({ type: 'client', what: c.company, hue: c.hue });
      return c;
    },
    [setClients, pushActivity],
  );

  /* ───── tasks ───── */
  const addTask = useCallback(
    (data) => {
      const task = { id: newId('k'), ...data };
      setTasks((l) => [task, ...l]);
      pushActivity({ type: 'created', what: task.title });
      return task;
    },
    [setTasks, pushActivity],
  );
  const updateTask = useCallback(
    (id, patch) => setTasks((l) => l.map((x) => (x.id === id ? { ...x, ...patch } : x))),
    [setTasks],
  );
  const deleteTask = useCallback((id) => setTasks((l) => l.filter((x) => x.id !== id)), [setTasks]);
  const moveTask = useCallback(
    (id, status) => {
      setTasks((l) => l.map((x) => (x.id === id ? { ...x, status } : x)));
    },
    [setTasks],
  );

  /* ───── portal ───── */
  const isApproved = useCallback((id) => (id in approvals ? approvals[id] : id.endsWith('-d1')), [approvals]);
  const approve = useCallback(
    (id, clientName, titleKey) => {
      setApprovals((a) => ({ ...a, [id]: true }));
      pushActivity({ type: 'approved', who: clientName, whatKey: titleKey, hue: 162 });
    },
    [setApprovals, pushActivity],
  );
  const sendMessage = useCallback(
    (clientId, text) => {
      setMessages((m) => ({
        ...m,
        [clientId]: [...(m[clientId] || []), { id: newId('m'), from: 'client', text, ts: Date.now() }],
      }));
    },
    [setMessages],
  );

  const resetData = useCallback(() => {
    setClients(seedClients());
    setTasks(seedTasks());
    setActivity(seedActivity());
    setApprovals({});
    setMessages({});
  }, [setClients, setTasks, setActivity, setApprovals, setMessages]);

  /* ───── global shortcut: ⌘/Ctrl + K ───── */
  const authedRef = useRef(authed);
  authedRef.current = authed;
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k' && authedRef.current) {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const value = useMemo(
    () => ({
      lang, setLang, locale, t, seed, taskTitle, money, dateFmt, relTime,
      theme, toggleTheme,
      authed, login, logout, user: OWNER,
      clients, addClient,
      tasks, addTask, updateTask, deleteTask, moveTask,
      activity, pushActivity,
      approvals, isApproved, approve, messages, sendMessage,
      toasts, toast, dismissToast,
      modal, setModal, drawerId, setDrawerId, portalId, setPortalId, paletteOpen, setPaletteOpen,
      resetData,
    }),
    [
      lang, setLang, locale, t, seed, taskTitle, money, dateFmt, relTime, theme, toggleTheme, authed, login, logout,
      clients, addClient, tasks, addTask, updateTask, deleteTask, moveTask, activity, pushActivity,
      approvals, isApproved, approve, messages, sendMessage, toasts, toast, dismissToast, modal, drawerId, portalId, paletteOpen, resetData,
    ],
  );

  return <Store.Provider value={value}>{children}</Store.Provider>;
}

// Shared helper: how a due date should read and be toned.
export function dueInfo(iso, done, t, dateFmt) {
  if (!iso) return { text: t('c.noDate'), tone: 'muted', days: null };
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const d = new Date(`${iso}T00:00:00`);
  const days = Math.round((d - start) / 86400000);
  if (done) return { text: dateFmt(iso), tone: 'muted', days };
  if (days < 0) return { text: t('c.overdue'), tone: 'rose', days };
  if (days === 0) return { text: t('c.today'), tone: 'amber', days };
  if (days === 1) return { text: t('c.tomorrow'), tone: 'amber', days };
  return { text: dateFmt(iso), tone: 'muted', days };
}
