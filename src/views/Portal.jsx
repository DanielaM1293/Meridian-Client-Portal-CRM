import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Download, Eye, FileText, Lock, Send } from 'lucide-react';
import { useStore } from '../store.jsx';
import { Ring } from '../components/charts.jsx';
import { Avatar, Badge, CountUp, Page, PageHead, rise, stagger } from '../components/ui.jsx';

const DELIVERABLES = ['d1', 'd2', 'd3'];
const MILESTONES = [25, 50, 75, 100]; // progress threshold at which each milestone is reached

export default function Portal() {
  const { t, clients, tasks, portalId, setPortalId, money, dateFmt, isApproved, approve, messages, sendMessage, toast } = useStore();
  const client = clients.find((c) => c.id === portalId) || clients[0];
  const [draft, setDraft] = useState('');
  const chatRef = useRef(null);

  const mine = tasks.filter((x) => x.client === client.id);
  const pct = mine.length ? Math.round((mine.filter((x) => x.status === 'done').length / mine.length) * 100) : 0;
  const reached = MILESTONES.filter((m) => pct >= m).length; // completed milestones
  const slug = client.company.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-');

  const thread = useMemo(() => {
    const seeded = [
      { id: 's1', from: 'me', text: t('po.m.m1'), ts: 1 },
      { id: 's2', from: 'client', text: t('po.m.m2'), ts: 2 },
    ];
    return [...seeded, ...(messages[client.id] || [])];
  }, [messages, client.id, t]);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [thread.length]);

  const invoices = useMemo(() => {
    const base = Math.max(client.value, 600);
    const mk = (n, off, amount, paid) => {
      const d = new Date();
      d.setMonth(d.getMonth() + off);
      return { id: `INV-2026-0${10 + n}`, date: d.toISOString().slice(0, 10), amount, paid };
    };
    return [mk(3, 0, base, false), mk(2, -1, base, true), mk(1, -2, Math.round(base * 0.6), true)];
  }, [client.value]);

  const send = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    sendMessage(client.id, draft.trim());
    setDraft('');
    toast(t('to.msg'));
  };

  const firstName = client.name.split(' ')[0];

  return (
    <Page>
      <PageHead
        title={t('po.title')}
        sub={t('po.sub')}
        actions={
          <label className="preview-select">
            <Eye size={16} />
            <span>{t('po.previewAs')}</span>
            <select className="input select-sm" value={client.id} onChange={(e) => setPortalId(e.target.value)}>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.company}
                </option>
              ))}
            </select>
          </label>
        }
      />

      <motion.div className="browser" initial={{ opacity: 0, y: 24, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 160, damping: 22, delay: 0.1 }}>
        <div className="browser-bar">
          <span className="traffic">
            <i />
            <i />
            <i />
          </span>
          <div className="browser-url">
            <Lock size={12} />
            <span>portal.meridian.app/{slug}</span>
          </div>
          <span className="browser-banner">{t('po.banner', { client: client.company })}</span>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={client.id} className="portal" variants={stagger(0.07)} initial="hidden" animate="show" exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}>
            {/* hero */}
            <motion.header className="portal-hero" variants={rise}>
              <div className="portal-brand">
                <Avatar name={client.company} hue={client.hue} size={56} />
                <div>
                  <h2 className="display">{t('po.welcome', { name: firstName })}</h2>
                  <p className="muted">{t('po.welcomeSub')}</p>
                </div>
              </div>
              <div className="portal-ring">
                <Ring value={pct} />
                <div className="ring-text">
                  <strong className="display">
                    <CountUp key={client.id} value={pct} format={(v) => `${Math.round(v)}%`} />
                  </strong>
                  <span>{t('po.complete')}</span>
                </div>
              </div>
            </motion.header>

            {/* milestones */}
            <motion.section className="portal-card" variants={rise}>
              <h3 className="card-title">{t('po.milestones')}</h3>
              <ol className="stepper">
                {['m1', 'm2', 'm3', 'm4'].map((m, i) => {
                  const state = i < reached ? 'done' : i === reached ? 'current' : 'todo';
                  return (
                    <li key={m} className={`step step-${state}`}>
                      <span className="step-dot">{state === 'done' ? <Check size={14} strokeWidth={3} /> : i + 1}</span>
                      <span className="step-label">{t(`po.ms.${m}`)}</span>
                    </li>
                  );
                })}
                <motion.span className="step-line-fill" initial={{ scaleX: 0 }} animate={{ scaleX: Math.min(reached / 3, 1) }} transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} />
              </ol>
            </motion.section>

            <div className="portal-cols">
              {/* deliverables + invoices */}
              <div className="portal-stack">
                <motion.section className="portal-card" variants={rise}>
                  <h3 className="card-title">{t('po.deliverables')}</h3>
                  <ul className="deliv">
                    {DELIVERABLES.map((d) => {
                      const id = `${client.id}-${d}`;
                      const ok = isApproved(id);
                      return (
                        <li key={d}>
                          <span className="deliv-ico">
                            <FileText size={18} />
                          </span>
                          <span className="deliv-main">
                            <strong>{t(`po.d.${d}`)}</strong>
                            <small>{ok ? t('po.approved') : t('po.awaiting')}</small>
                          </span>
                          <AnimatePresence mode="wait" initial={false}>
                            {ok ? (
                              <motion.span key="ok" className="approved-pill" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 18 }}>
                                <Check size={14} strokeWidth={3} /> {t('po.approved')}
                              </motion.span>
                            ) : (
                              <motion.button
                                key="btn"
                                type="button"
                                className="btn btn-primary btn-sm"
                                exit={{ scale: 0.8, opacity: 0 }}
                                whileTap={{ scale: 0.94 }}
                                onClick={() => {
                                  approve(id, client.name, `po.d.${d}`);
                                  toast(t('to.approved'));
                                }}
                              >
                                {t('po.approve')}
                              </motion.button>
                            )}
                          </AnimatePresence>
                          <button type="button" className="icon-btn icon-btn-sm" aria-label="Download">
                            <Download size={16} />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </motion.section>

                <motion.section className="portal-card" variants={rise}>
                  <h3 className="card-title">{t('po.invoices')}</h3>
                  <ul className="invoices">
                    {invoices.map((inv) => (
                      <li key={inv.id}>
                        <span className="mono inv-id">{inv.id}</span>
                        <span className="muted inv-date">{dateFmt(inv.date, { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        <strong className="mono inv-amt">{money(inv.amount)}</strong>
                        <Badge tone={inv.paid ? 'green' : 'amber'} dot>
                          {inv.paid ? t('po.paid') : t('po.pending')}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </motion.section>
              </div>

              {/* messages */}
              <motion.section className="portal-card chat-card" variants={rise}>
                <h3 className="card-title">{t('po.messages')}</h3>
                <div className="chat" ref={chatRef} aria-live="polite">
                  <AnimatePresence initial={false}>
                    {thread.map((m) => (
                      <motion.div
                        key={m.id}
                        layout
                        className={`bubble ${m.from === 'client' ? 'mine' : 'theirs'}`}
                        initial={{ opacity: 0, y: 12, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      >
                        {m.text}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <form className="composer" onSubmit={send}>
                  <input className="input" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={t('po.write')} aria-label={t('po.write')} />
                  <motion.button className="btn btn-primary btn-icon" type="submit" whileTap={{ scale: 0.9 }} aria-label={t('po.send')}>
                    <Send size={17} />
                  </motion.button>
                </form>
              </motion.section>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </Page>
  );
}
