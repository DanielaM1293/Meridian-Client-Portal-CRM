import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Building2, Globe, Mail, Phone, Plus, X } from 'lucide-react';
import { useStore, dueInfo } from '../store.jsx';
import { Avatar, Badge, Drawer, ProgressBar, prioTone, rise, stagger, statusTone, taskTone } from './ui.jsx';

export default function ClientDrawer() {
  const { drawerId, setDrawerId, clients, tasks, t, money, dateFmt, taskTitle, setModal, setPortalId } = useStore();
  const navigate = useNavigate();
  const client = clients.find((c) => c.id === drawerId);
  const mine = tasks.filter((x) => x.client === drawerId);
  const done = mine.filter((x) => x.status === 'done').length;
  const open = mine.length - done;
  const close = () => setDrawerId(null);

  return (
    <Drawer open={!!client} onClose={close} label={t('cl.details')}>
      {client && (
        <motion.div className="drawer-inner" variants={stagger(0.06, 0.12)} initial="hidden" animate="show">
          <div className="drawer-bar">
            <span className="eyebrow">{t('cl.details')}</span>
            <button className="icon-btn" onClick={close} aria-label={t('c.close')} type="button">
              <X size={18} />
            </button>
          </div>

          <motion.div className="drawer-hero" variants={rise}>
            <Avatar name={client.name} hue={client.hue} size={72} />
            <div>
              <h2 className="display">{client.name}</h2>
              <p className="muted row-icon">
                <Building2 size={15} /> {client.company} · {t(`ind.${client.industry}`)}
              </p>
              <Badge tone={statusTone[client.status]} dot>
                {t(`st.${client.status}`)}
              </Badge>
            </div>
          </motion.div>

          <motion.div className="drawer-actions" variants={rise}>
            <a className="btn btn-soft" href={`mailto:${client.email}`}>
              <Mail size={16} /> {t('cl.sendEmail')}
            </a>
            <a className="btn btn-soft" href={`tel:${client.phone.replace(/\s/g, '')}`}>
              <Phone size={16} /> {t('cl.call')}
            </a>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                setPortalId(client.id);
                close();
                navigate('/portal');
              }}
            >
              <Globe size={16} /> {t('cl.openPortal')}
            </button>
          </motion.div>

          <motion.dl className="facts" variants={rise}>
            <div>
              <dt>{t('c.value')}</dt>
              <dd className="display">
                {money(client.value)}
                <small>{t('c.perMonth')}</small>
              </dd>
            </div>
            <div>
              <dt>{t('cl.since')}</dt>
              <dd className="display">{dateFmt(client.since, { month: 'short', year: 'numeric' })}</dd>
            </div>
            <div>
              <dt>{t('c.email')}</dt>
              <dd className="trunc">{client.email}</dd>
            </div>
            <div>
              <dt>{t('c.phone')}</dt>
              <dd>{client.phone}</dd>
            </div>
          </motion.dl>

          <motion.div className="drawer-progress" variants={rise}>
            <div className="between">
              <span>
                <strong>{open}</strong> {t('cl.openTasks')}
              </span>
              <span className="muted">
                {done} {t('cl.completed')}
              </span>
            </div>
            <ProgressBar value={mine.length ? (done / mine.length) * 100 : 0} />
          </motion.div>

          <motion.div variants={rise}>
            <div className="between section-title">
              <h3>{t('cl.tasks')}</h3>
              <button
                className="btn btn-ghost btn-sm"
                type="button"
                onClick={() => {
                  setModal({ type: 'task', data: { client: client.id } });
                }}
              >
                <Plus size={15} /> {t('cl.newTask')}
              </button>
            </div>
            {mine.length === 0 && <p className="muted">{t('cl.noTasks')}</p>}
            <ul className="mini-list">
              {mine.map((task) => {
                const due = dueInfo(task.due, task.status === 'done', t, dateFmt);
                return (
                  <li key={task.id}>
                    <button type="button" className="mini-row" onClick={() => setModal({ type: 'task', data: task })}>
                      <span className={`dot dot-${taskTone[task.status]}`} />
                      <span className="mini-title">{taskTitle(task)}</span>
                      <Badge tone={prioTone[task.priority]}>{t(`pr.${task.priority}`)}</Badge>
                      <span className={`due due-${due.tone}`}>{due.text}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </Drawer>
  );
}
