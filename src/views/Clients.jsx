import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { LayoutGrid, Plus, Rows3, Search, UsersRound } from 'lucide-react';
import { useStore } from '../store.jsx';
import { Avatar, Badge, EmptyState, Page, PageHead, ProgressBar, Segmented, Spotlight, statusTone } from '../components/ui.jsx';

export default function Clients() {
  const { t, clients, tasks, money, setModal, setDrawerId } = useStore();
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('grid');

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return clients.filter((c) => (filter === 'all' || c.status === filter) && (!s || `${c.name} ${c.company} ${c.email}`.toLowerCase().includes(s)));
  }, [clients, q, filter]);

  const progressOf = (id) => {
    const mine = tasks.filter((x) => x.client === id);
    const done = mine.filter((x) => x.status === 'done').length;
    return { open: mine.length - done, pct: mine.length ? (done / mine.length) * 100 : 0 };
  };

  const filters = [
    { value: 'all', label: t('c.all') },
    { value: 'active', label: t('st.active') },
    { value: 'lead', label: t('st.lead') },
    { value: 'paused', label: t('st.paused') },
  ];

  return (
    <Page>
      <PageHead
        title={t('cl.title')}
        sub={t('cl.sub', { n: clients.length })}
        actions={
          <button className="btn btn-primary" type="button" onClick={() => setModal({ type: 'client' })}>
            <Plus size={17} /> {t('cl.new')}
          </button>
        }
      />

      <div className="toolbar">
        <label className="search-field">
          <Search size={17} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('cl.searchPh')} aria-label={t('c.search')} />
        </label>
        <Segmented id="cl-filter" value={filter} onChange={setFilter} options={filters} />
        <Segmented
          id="cl-view"
          value={view}
          onChange={setView}
          options={[
            { value: 'grid', label: <span className="hide-sm">{t('cl.grid')}</span>, icon: <LayoutGrid size={15} /> },
            { value: 'table', label: <span className="hide-sm">{t('cl.table')}</span>, icon: <Rows3 size={15} /> },
          ]}
        />
      </div>

      {list.length === 0 && <EmptyState icon={<UsersRound size={26} />} text={t('cl.empty')} />}

      <LayoutGroup>
        {view === 'grid' ? (
          <motion.div className="client-grid" layout>
            <AnimatePresence mode="popLayout">
              {list.map((c, i) => {
                const p = progressOf(c.id);
                return (
                  <Spotlight
                    as={motion.button}
                    type="button"
                    key={c.id}
                    layout
                    initial={{ opacity: 0, y: 22, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 26, delay: Math.min(i * 0.04, 0.3) }}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.985 }}
                    className="card client-card"
                    onClick={() => setDrawerId(c.id)}
                  >
                    <div className="between">
                      <Avatar name={c.name} hue={c.hue} size={48} />
                      <Badge tone={statusTone[c.status]} dot>
                        {t(`st.${c.status}`)}
                      </Badge>
                    </div>
                    <h3 className="client-company display">{c.company}</h3>
                    <p className="muted">
                      {c.name} · {t(`ind.${c.industry}`)}
                    </p>
                    <div className="client-meta">
                      <span className="client-value display">
                        {money(c.value)}
                        <small>{t('c.perMonth')}</small>
                      </span>
                      <span className="muted">
                        {p.open} {t('cl.openTasks')}
                      </span>
                    </div>
                    <ProgressBar value={p.pct} />
                  </Spotlight>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div className="card table-card" layout>
            <div className="table-scroll">
              <table className="table">
                <thead>
                  <tr>
                    <th>{t('c.client')}</th>
                    <th>{t('c.industry')}</th>
                    <th>{t('c.status')}</th>
                    <th className="num">{t('c.value')}</th>
                    <th className="num">{t('cl.tasks')}</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence initial={false}>
                    {list.map((c, i) => (
                      <motion.tr
                        key={c.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: Math.min(i * 0.03, 0.25) }}
                        onClick={() => setDrawerId(c.id)}
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && setDrawerId(c.id)}
                      >
                        <td>
                          <div className="cell-user">
                            <Avatar name={c.name} hue={c.hue} size={36} />
                            <span>
                              <strong>{c.company}</strong>
                              <small>{c.name}</small>
                            </span>
                          </div>
                        </td>
                        <td>{t(`ind.${c.industry}`)}</td>
                        <td>
                          <Badge tone={statusTone[c.status]} dot>
                            {t(`st.${c.status}`)}
                          </Badge>
                        </td>
                        <td className="num mono">{money(c.value)}</td>
                        <td className="num mono">{progressOf(c.id).open}</td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </LayoutGroup>
    </Page>
  );
}
