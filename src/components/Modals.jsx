import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useStore } from '../store.jsx';
import { Field, Modal } from './ui.jsx';
import { INDUSTRIES, PRIORITIES, STATUSES } from '../data.js';

const todayPlus = (n) => new Date(Date.now() + n * 86400000).toISOString().slice(0, 10);

/* ───────────── Task create / edit ───────────── */
export function TaskModal() {
  const { modal, setModal, clients, addTask, updateTask, deleteTask, taskTitle, t, toast } = useStore();
  const open = modal?.type === 'task';
  const editing = open ? modal.data?.id : null;
  const [f, setF] = useState({ title: '', client: '', status: 'todo', priority: 'medium', due: todayPlus(3) });
  const [err, setErr] = useState({});

  useEffect(() => {
    if (!open) return;
    const d = modal.data || {};
    setErr({});
    setF({
      title: d.id ? taskTitle(d) : '',
      client: d.client || clients[0]?.id || '',
      status: d.status || 'todo',
      priority: d.priority || 'medium',
      due: d.due || todayPlus(3),
    });
  }, [open]); // eslint-disable-line

  const close = () => setModal(null);
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!f.title.trim()) {
      setErr({ title: t('c.required') });
      return;
    }
    if (editing) {
      updateTask(editing, { ...f, title: f.title.trim(), titleKey: undefined });
      toast(t('to.taskUpdated'));
    } else {
      addTask({ ...f, title: f.title.trim() });
      toast(t('to.taskCreated'));
    }
    close();
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title={editing ? t('tk.editTitle') : t('tk.newTitle')}
      footer={
        <>
          {editing && (
            <button
              type="button"
              className="btn btn-danger-ghost"
              onClick={() => {
                deleteTask(editing);
                toast(t('to.taskDeleted'));
                close();
              }}
            >
              <Trash2 size={16} /> {t('c.delete')}
            </button>
          )}
          <span className="spacer" />
          <button type="button" className="btn btn-ghost" onClick={close}>
            {t('c.cancel')}
          </button>
          <button type="submit" form="task-form" className="btn btn-primary">
            {editing ? t('c.saveChanges') : t('c.create')}
          </button>
        </>
      }
    >
      <form id="task-form" className="form" onSubmit={submit} noValidate>
        <Field label={t('c.title')} error={err.title}>
          <input className="input" value={f.title} onChange={set('title')} autoFocus placeholder="…" />
        </Field>
        <div className="form-row">
          <Field label={t('c.client')}>
            <select className="input" value={f.client} onChange={set('client')}>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.company}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t('c.dueDate')}>
            <input className="input" type="date" value={f.due} onChange={set('due')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label={t('c.status')}>
            <select className="input" value={f.status} onChange={set('status')}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {t(`ts.${s}`)}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t('c.priority')}>
            <select className="input" value={f.priority} onChange={set('priority')}>
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {t(`pr.${p}`)}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </form>
    </Modal>
  );
}

/* ───────────── Client create ───────────── */
export function ClientModal() {
  const { modal, setModal, addClient, t, toast } = useStore();
  const open = modal?.type === 'client';
  const blank = { name: '', company: '', email: '', phone: '', industry: 'design', status: 'lead', value: 1500 };
  const [f, setF] = useState(blank);
  const [err, setErr] = useState({});

  useEffect(() => {
    if (open) {
      setF(blank);
      setErr({});
    }
  }, [open]); // eslint-disable-line

  const close = () => setModal(null);
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!f.name.trim()) next.name = t('c.required');
    if (!f.company.trim()) next.company = t('c.required');
    if (!/^\S+@\S+\.\S+$/.test(f.email)) next.email = t('c.required');
    setErr(next);
    if (Object.keys(next).length) return;
    addClient({ ...f, name: f.name.trim(), company: f.company.trim(), value: Number(f.value) || 0 });
    toast(t('to.clientCreated'));
    close();
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title={t('cl.new')}
      footer={
        <>
          <span className="spacer" />
          <button type="button" className="btn btn-ghost" onClick={close}>
            {t('c.cancel')}
          </button>
          <button type="submit" form="client-form" className="btn btn-primary">
            {t('c.create')}
          </button>
        </>
      }
    >
      <form id="client-form" className="form" onSubmit={submit} noValidate>
        <div className="form-row">
          <Field label={t('c.name')} error={err.name}>
            <input className="input" value={f.name} onChange={set('name')} autoFocus />
          </Field>
          <Field label={t('c.company')} error={err.company}>
            <input className="input" value={f.company} onChange={set('company')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label={t('c.email')} error={err.email}>
            <input className="input" type="email" value={f.email} onChange={set('email')} />
          </Field>
          <Field label={t('c.phone')}>
            <input className="input" type="tel" value={f.phone} onChange={set('phone')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label={t('c.industry')}>
            <select className="input" value={f.industry} onChange={set('industry')}>
              {INDUSTRIES.map((i) => (
                <option key={i} value={i}>
                  {t(`ind.${i}`)}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t('c.status')}>
            <select className="input" value={f.status} onChange={set('status')}>
              {['active', 'lead', 'paused'].map((s) => (
                <option key={s} value={s}>
                  {t(`st.${s}`)}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field label={`${t('c.value')} (USD)`}>
          <input className="input" type="number" min="0" step="50" value={f.value} onChange={set('value')} />
        </Field>
      </form>
    </Modal>
  );
}
