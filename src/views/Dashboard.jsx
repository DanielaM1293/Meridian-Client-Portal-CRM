import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCheck, ListTodo, Plus, TrendingUp, Users } from 'lucide-react';
import { useStore, dueInfo } from '../store.jsx';
import { REVENUE } from '../data.js';
import { AreaChart, Donut } from '../components/charts.jsx';
import { Avatar, Badge, CountUp, Page, Spotlight, prioTone, rise, stagger } from '../components/ui.jsx';

export default function Dashboard() {
  const { t, user, clients, tasks, activity, locale, money, dateFmt, taskTitle, relTime, seed, setModal } = useStore();

  const hour = new Date().getHours();
  const greet = hour < 12 ? 'morning' : hour < 19 ? 'afternoon' : 'evening';

  const stats = useMemo(() => {
    const active = clients.filter((c) => c.status === 'active');
    const revenue = active.reduce((a, c) => a + c.value, 0);
    const open = tasks.filter((x) => x.status !== 'done').length;
    const done = tasks.length - open;
    const rate = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
    const dueSoon = tasks.filter((x) => {
      if (x.status === 'done') return false;
      const d = dueInfo(x.due, false, t, dateFmt).days;
      return d !== null && d <= 7;
    }).length;
    return { active: active.length, revenue, open, rate, dueSoon };
  }, [clients, tasks, t, dateFmt]);

  const series = useMemo(() => [...REVENUE.slice(0, -1), stats.revenue], [stats.revenue]);
  const delta = ((series[series.length - 1] - series[series.length - 2]) / series[series.length - 2]) * 100;

  const labels = useMemo(() => {
    const f = new Intl.DateTimeFormat(locale, { month: 'short' });
    const now = new Date();
    return series.map((_, i) => f.format(new Date(now.getFullYear(), now.getMonth() - (series.length - 1 - i), 1)).replace('.', ''));
  }, [locale, series]);

  const segments = useMemo(
    () => [
      { key: 'todo', value: tasks.filter((x) => x.status === 'todo').length, color: 'var(--seg-todo)' },
      { key: 'doing', value: tasks.filter((x) => x.status === 'doing').length, color: 'var(--seg-doing)' },
      { key: 'review', value: tasks.filter((x) => x.status === 'review').length, color: 'var(--seg-review)' },
      { key: 'done', value: tasks.filter((x) => x.status === 'done').length, color: 'var(--seg-done)' },
    ],
    [tasks],
  );

  const upcoming = useMemo(
    () =>
      tasks
        .filter((x) => x.status !== 'done')
        .sort((a, b) => (a.due || '9').localeCompare(b.due || '9'))
        .slice(0, 5),
    [tasks],
  );

  const kpis = [
    { key: 'kpiRevenue', icon: TrendingUp, value: stats.revenue, format: (v) => money(v), tone: 'green', note: `${delta >= 0 ? '+' : ''}${delta.toFixed(1)}% ${t('dash.vs')}` },
    { key: 'kpiClients', icon: Users, value: stats.active, tone: 'blue', note: `${clients.length} total` },
    { key: 'kpiOpen', icon: ListTodo, value: stats.open, tone: 'amber', note: `${stats.dueSoon} · 7d` },
    { key: 'kpiRate', icon: CheckCheck, value: stats.rate, format: (v) => `${Math.round(v)}%`, tone: 'violet', note: `${tasks.length - stats.open}/${tasks.length}` },
  ];

  const whoName = (a) => a.who ?? t('c.you');
  const whatText = (a) => {
    if (a.what) return a.what;
    if (a.whatKey?.startsWith('seed.')) return seed(a.whatKey.slice(5));
    return t(a.whatKey);
  };

  return (
    <Page>
      <motion.header className="hero" variants={stagger(0.08)} initial="hidden" animate="show">
        <motion.div variants={rise}>
          <span className="eyebrow">{new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())}</span>
          <h1 className="display hero-title">
            {t(`dash.${greet}`)}, <em>{user.first}</em>
          </h1>
          <p className="muted">{t('dash.sub', { n: stats.dueSoon })}</p>
        </motion.div>
        <motion.div variants={rise} className="hero-actions">
          <button className="btn btn-primary" type="button" onClick={() => setModal({ type: 'task', data: null })}>
            <Plus size={17} /> {t('tk.new')}
          </button>
        </motion.div>
      </motion.header>

      <motion.div className="grid-dash" variants={stagger(0.07, 0.1)} initial="hidden" animate="show">
        {kpis.map(({ key, icon: Icon, value, format, tone, note }) => (
          <Spotlight as={motion.article} variants={rise} key={key} className="card kpi" whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
            <div className="between">
              <span className={`kpi-ico tone-${tone}`}>
                <Icon size={18} />
              </span>
              <ArrowUpRight size={16} className="kpi-arrow" />
            </div>
            <p className="kpi-label">{t(`dash.${key}`)}</p>
            <p className="kpi-value display">
              <CountUp value={value} format={format} />
            </p>
            <p className={`kpi-note ${key === 'kpiRevenue' && delta >= 0 ? 'up' : ''}`}>{note}</p>
          </Spotlight>
        ))}

        <motion.section variants={rise} className="card span-8">
          <div className="between card-head">
            <div>
              <h2 className="card-title">{t('dash.revenue')}</h2>
              <p className="muted">{t('dash.revenueSub')}</p>
            </div>
            <Badge tone="green" dot>
              {delta >= 0 ? '+' : ''}
              {delta.toFixed(1)}%
            </Badge>
          </div>
          <AreaChart data={series} labels={labels} format={(v) => money(v)} />
        </motion.section>

        <motion.section variants={rise} className="card span-4">
          <div className="card-head">
            <h2 className="card-title">{t('dash.byStatus')}</h2>
          </div>
          <Donut segments={segments} total={tasks.length} caption={t('dash.total')} />
          <ul className="legend">
            {segments.map((s) => (
              <li key={s.key}>
                <i style={{ background: s.color }} />
                {t(`ts.${s.key}`)}
                <strong>{s.value}</strong>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section variants={rise} className="card span-6">
          <div className="between card-head">
            <h2 className="card-title">{t('dash.upcoming')}</h2>
            <Link to="/tasks" className="link-arrow">
              {t('c.viewAll')} <ArrowUpRight size={14} />
            </Link>
          </div>
          {upcoming.length === 0 && <p className="muted">{t('dash.nothing')}</p>}
          <ul className="rows">
            {upcoming.map((task, i) => {
              const client = clients.find((c) => c.id === task.client);
              const due = dueInfo(task.due, false, t, dateFmt);
              return (
                <motion.li key={task.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.06 }}>
                  <button type="button" className="row-btn" onClick={() => setModal({ type: 'task', data: task })}>
                    <Avatar name={client?.company} hue={client?.hue} size={34} />
                    <span className="row-main">
                      <strong>{taskTitle(task)}</strong>
                      <small>{client?.company}</small>
                    </span>
                    <Badge tone={prioTone[task.priority]}>{t(`pr.${task.priority}`)}</Badge>
                    <span className={`due due-${due.tone}`}>{due.text}</span>
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </motion.section>

        <motion.section variants={rise} className="card span-6">
          <div className="card-head">
            <h2 className="card-title">{t('dash.activity')}</h2>
          </div>
          <ol className="timeline">
            {activity.slice(0, 6).map((a, i) => (
              <motion.li key={a.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 + i * 0.07 }}>
                <Avatar name={whoName(a)} hue={a.hue} size={32} />
                <div>
                  <p>{t(`act.${a.type}`, { who: whoName(a), what: whatText(a) })}</p>
                  <small>{relTime(a.ts)}</small>
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.section>
      </motion.div>
    </Page>
  );
}
