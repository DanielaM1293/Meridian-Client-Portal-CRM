import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Bell, ChevronsLeft, Command, Globe, KanbanSquare, LayoutDashboard, LogOut, Search, Settings, Users } from 'lucide-react';
import { useStore } from '../store.jsx';
import { Avatar, LangMenu, Logo, ThemeToggle, ToastStack, useClickOutside } from './ui.jsx';
import { ClientModal, TaskModal } from './Modals.jsx';
import ClientDrawer from './ClientDrawer.jsx';
import CommandPalette from './CommandPalette.jsx';
import Dashboard from '../views/Dashboard.jsx';
import Clients from '../views/Clients.jsx';
import Tasks from '../views/Tasks.jsx';
import Portal from '../views/Portal.jsx';
import SettingsView from '../views/Settings.jsx';

const NAV = [
  { to: '/', key: 'dashboard', icon: LayoutDashboard, end: true },
  { to: '/clients', key: 'clients', icon: Users },
  { to: '/tasks', key: 'tasks', icon: KanbanSquare },
  { to: '/portal', key: 'portal', icon: Globe },
];

function Notifications() {
  const { t } = useStore();
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setOpen(false));
  const items = [
    { k: 'n1', time: 'time1', hue: 162 },
    { k: 'n2', time: 'time2', hue: 262 },
    { k: 'n3', time: 'time3', hue: 38 },
  ];
  return (
    <div className="menu" ref={ref}>
      <button
        className="icon-btn"
        type="button"
        aria-label={t('c.notifications')}
        onClick={() => {
          setOpen((o) => !o);
          setSeen(true);
        }}
      >
        <Bell size={18} />
        {!seen && <span className="ping" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="menu-pop menu-right notif"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.16 }}
          >
            <h4>{t('nt.title')}</h4>
            {items.map((n, i) => (
              <motion.div key={n.k} className="notif-row" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                <Avatar name={t(`nt.${n.k}`)} hue={n.hue} size={32} />
                <p>{t(`nt.${n.k}`)}</p>
                <small>{t(`nt.${n.time}`)}</small>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function UserMenu() {
  const { t, user, logout } = useStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setOpen(false));
  return (
    <div className="menu" ref={ref}>
      <button className="avatar-btn" type="button" onClick={() => setOpen((o) => !o)} aria-label={user.name}>
        <Avatar name={user.name} hue={165} size={36} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="menu-pop menu-right user-pop"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.16 }}
          >
            <div className="user-pop-head">
              <strong>{user.name}</strong>
              <small className="trunc">{user.email}</small>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                navigate('/settings');
              }}
            >
              <Settings size={16} /> {t('nav.settings')}
            </button>
            <button type="button" onClick={logout}>
              <LogOut size={16} /> {t('c.logout')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Sidebar({ collapsed, setCollapsed }) {
  const { t, user, tasks } = useStore();
  const openCount = tasks.filter((x) => x.status !== 'done').length;
  return (
    <aside className={`sidebar ${collapsed ? 'is-collapsed' : ''}`}>
      <div className="side-brand">
        <Logo />
        <span className="side-name display">Meridian</span>
      </div>

      <nav className="side-nav" aria-label="Main">
        {NAV.map(({ to, key, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className="side-link" title={t(`nav.${key}`)}>
            {({ isActive }) => (
              <>
                {isActive && <motion.span layoutId="side-active" className="side-active" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
                <Icon size={19} className="side-ico" />
                <span className="side-label">{t(`nav.${key}`)}</span>
                {key === 'tasks' && <span className="side-count">{openCount}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="side-foot">
        <NavLink to="/settings" className="side-link" title={t('nav.settings')}>
          {({ isActive }) => (
            <>
              {isActive && <motion.span layoutId="side-active" className="side-active" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
              <Settings size={19} className="side-ico" />
              <span className="side-label">{t('nav.settings')}</span>
            </>
          )}
        </NavLink>
        <div className="side-user">
          <Avatar name={user.name} hue={165} size={38} />
          <div className="side-user-text">
            <strong>{user.first}</strong>
            <small>{t('se.role')}</small>
          </div>
        </div>
        <button className="side-collapse" type="button" onClick={() => setCollapsed(!collapsed)} aria-label={t('nav.collapse')}>
          <ChevronsLeft size={17} className={collapsed ? 'flip-x' : ''} />
        </button>
      </div>
    </aside>
  );
}

function BottomNav() {
  const { t } = useStore();
  return (
    <nav className="bottom-nav" aria-label="Main">
      {NAV.map(({ to, key, icon: Icon, end }) => (
        <NavLink key={to} to={to} end={end} className="bn-link">
          {({ isActive }) => (
            <>
              {isActive && <motion.span layoutId="bn-active" className="bn-active" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
              <Icon size={20} />
              <span>{t(`nav.${key}`)}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

export default function Shell() {
  const { t, setPaletteOpen } = useStore();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const titleKey = location.pathname === '/' ? 'dashboard' : location.pathname.slice(1).split('/')[0];

  return (
    <div className={`app ${collapsed ? 'collapsed' : ''}`}>
      <a className="skip" href="#main">
        {t('c.skip')}
      </a>
      <div className="bg-orbs" aria-hidden="true">
        <i />
        <i />
      </div>

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="main-col">
        <header className="topbar">
          <div className="topbar-brand">
            <Logo size={30} />
          </div>
          <span className="topbar-title display">{t(`nav.${titleKey}`)}</span>
          <button className="search-trigger" type="button" onClick={() => setPaletteOpen(true)} aria-label={t('c.search')}>
            <Search size={16} />
            <span>{t('c.search')}…</span>
            <kbd>
              <Command size={11} /> K
            </kbd>
          </button>
          <div className="topbar-actions">
            <button className="icon-btn only-mobile" type="button" onClick={() => setPaletteOpen(true)} aria-label={t('c.search')}>
              <Search size={18} />
            </button>
            <LangMenu compact />
            <ThemeToggle />
            <Notifications />
            <UserMenu />
          </div>
        </header>

        <main id="main" className="content">
          {/* keyed by path: each page remounts and plays its own entrance animation */}
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/portal" element={<Portal />} />
            <Route path="/settings" element={<SettingsView />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
      </div>

      <BottomNav />
      <ClientDrawer />
      <TaskModal />
      <ClientModal />
      <CommandPalette />
    </div>
  );
}

export { ToastStack };
