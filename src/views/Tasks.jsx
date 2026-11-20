import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { CalendarDays, Check, ChevronLeft, ChevronRight, Flag, KanbanSquare, List, Plus } from 'lucide-react';
import { useStore, dueInfo } from '../store.jsx';
import { STATUSES } from '../data.js';
import { Avatar, Badge, EmptyState, Page, PageHead, Segmented, prioTone, taskTone } from '../components/ui.jsx';

function KCard({ task, dragging, onDragStart, onDragEnd }) {
  const { t, clients, taskTitle, dateFmt, setModal, moveTask, toast } = useStore();
  const client = clients.find((c) => c.id === task.client);
  const due = dueInfo(task.due, task.status === 'done', t, dateFmt);
  const idx = STATUSES.indexOf(task.status);

  const step = (e, dir) => {
    e.stopPropagation();
    const next = STATUSES[idx + dir];
    if (!next) return;
    moveTask(task.id, next);
    toast(t('to.moved', { status: t(`ts.${next}`) }));
  };

  return (
    <div className={`kwrap ${dragging ? 'dragging' : ''}`} draggable onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <motion.article
        layout
        layoutId={`task-${task.id}`}
        initial={{ opacity: 0.6, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        whileHover={{ y: -3 }}
        className={`kcard prio-${task.priority}`}
        onClick={() => setModal({ type: 'task', data: task })}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setModal({ type: 'task', data: task })}
      >
        <div className="between">
          <Badge tone={prioTone[task.priority]}>
            <Flag size={11} /> {t(`pr.${task.priority}`)}
          </Badge>
          {task.status === 'done' && (
            <span className="done-check">
              <Check size={13} strokeWidth={3} />
            </span>
          )}
        </div>
        <h4>{taskTitle(task)}</h4>
        <div className="kcard-meta">
          <span className="chip">
            <Avatar name={client?.company} hue={client?.hue} size={20} />
            {client?.company}
          </span>
        </div>
        <div className="kcard-foot">
          <span className={`due due-${due.tone}`}>
            <CalendarDays size={13} /> {due.text}
          </span>
          <span className="kmove">
            <button type="button" onClick={(e) => step(e, -1)} disabled={idx === 0} aria-label={t('tk.moveLeft')}>
              <ChevronLeft size={15} />
            </button>
            <button type="button" onClick={(e) => step(e, 1)} disabled={idx === STATUSES.length - 1} aria-label={t('tk.moveRight')}>
              <ChevronRight size={15} />
            </button>
          </span>
        </div>
      </motion.article>
    </div>
  );
}

function Board({ tasks }) {
  const { t, moveTask, toast } = useStore();
  const [dragId, setDragId] = useState(null);
  const [over, setOver] = useState(null);

  const drop = (e, col) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain') || dragId;
    const task = tasks.find((x) => x.id === id);
    if (task && task.status !== col) {
      moveTask(id, col);
      toast(t('to.moved', { status: t(`ts.${col}`) }));
    }
    setOver(null);
    setDragId(null);
  };

  return (
    <LayoutGroup>
      <div className="board">
        {STATUSES.map((col, ci) => {
          const items = tasks.filter((x) => x.status === col);
          return (
            <motion.section
              key={col}
              className={`col ${over === col ? 'over' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ci * 0.07, type: 'spring', stiffness: 220, damping: 26 }}
              onDragOver={(e) => {
                e.preventDefault();
                setOver(col);
              }}
              onDragLeave={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setOver(null);
              }}
              onDrop={(e) => drop(e, col)}
              aria-label={t(`ts.${col}`)}
            >
              <header className="col-head">
                <span className={`dot dot-${taskTone[col]}`} />
                <h3>{t(`ts.${col}`)}</h3>
                <span className="col-count">{items.length}</span>
              </header>
              <div className="col-body">
                {items.map((task) => (
                  <KCard
                    key={task.id}
                    task={task}
                    dragging={dragId === task.id}
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', task.id);
                      e.dataTransfer.effectAllowed = 'move';
                      setDragId(task.id);
                    }}
                    onDragEnd={() => {
                      setDragId(null);
                      setOver(null);
                    }}
                  />
                ))}
                {items.length === 0 && <div className="col-empty">{t('tk.empty')}</div>}
              </div>
            </motion.section>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

function ListView({ tasks }) {
  const { t, clients, taskTitle, dateFmt, moveTask, setModal } = useStore();
  return (
    <div className="card table-card">
      <div className="table-scroll">
        <table className="table">
          <thead>
            <tr>
              <th aria-label={t('c.done')} />
              <th>{t('c.title')}</th>
              <th>{t('c.client')}</th>
              <th>{t('c.priority')}</th>
              <th>{t('c.status')}</th>
              <th>{t('c.dueDate')}</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {tasks.map((task, i) => {
                const client = clients.find((c) => c.id === task.client);
                const due = dueInfo(task.due, task.status === 'done', t, dateFmt);
                const isDone = task.status === 'done';
                return (
                  <motion.tr
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: Math.min(i * 0.025, 0.25) }}
                    onClick={() => setModal({ type: 'task', data: task })}
                  >
                    <td className="check-cell">
                      <button
                        type="button"
                        className={`check ${isDone ? 'on' : ''}`}
                        aria-label={t('c.done')}
                        aria-pressed={isDone}
                        onClick={(e) => {
                          e.stopPropagation();
                          moveTask(task.id, isDone ? 'todo' : 'done');
                        }}
                      >
                        <AnimatePresence>
                          {isDone && (
                            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: 'spring', stiffness: 500, damping: 22 }}>
                              <Check size={13} strokeWidth={3.5} />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    </td>
                    <td className={isDone ? 'struck' : ''}>
                      <strong>{taskTitle(task)}</strong>
                    </td>
                    <td>{client?.company}</td>
                    <td>
                      <Badge tone={prioTone[task.priority]}>{t(`pr.${task.priority}`)}</Badge>
                    </td>
                    <td>
                      <Badge tone={taskTone[task.status]} dot>
                        {t(`ts.${task.status}`)}
                      </Badge>
                    </td>
                    <td>
                      <span className={`due due-${due.tone}`}>{due.text}</span>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Tasks() {
  const { t, tasks, clients, setModal } = useStore();
  const [view, setView] = useState('board');
  const [client, setClient] = useState('all');
  const [prio, setPrio] = useState('all');

  const filtered = useMemo(
    () => tasks.filter((x) => (client === 'all' || x.client === client) && (prio === 'all' || x.priority === prio)),
    [tasks, client, prio],
  );

  return (
    <Page>
      <PageHead
        title={t('tk.title')}
        sub={t('tk.sub')}
        actions={
          <button className="btn btn-primary" type="button" onClick={() => setModal({ type: 'task', data: null })}>
            <Plus size={17} /> {t('tk.new')}
          </button>
        }
      />

      <div className="toolbar">
        <select className="input select-sm" value={client} onChange={(e) => setClient(e.target.value)} aria-label={t('c.client')}>
          <option value="all">{t('tk.allClients')}</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.company}
            </option>
          ))}
        </select>
        <Segmented
          id="tk-prio"
          value={prio}
          onChange={setPrio}
          options={[
            { value: 'all', label: t('c.all') },
            { value: 'high', label: t('pr.high') },
            { value: 'medium', label: t('pr.medium') },
            { value: 'low', label: t('pr.low') },
          ]}
        />
        <Segmented
          id="tk-view"
          value={view}
          onChange={setView}
          options={[
            { value: 'board', label: <span className="hide-sm">{t('tk.board')}</span>, icon: <KanbanSquare size={15} /> },
            { value: 'list', label: <span className="hide-sm">{t('tk.list')}</span>, icon: <List size={15} /> },
          ]}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={<KanbanSquare size={26} />} text={t('tk.none')} />
      ) : view === 'board' ? (
        <Board tasks={filtered} />
      ) : (
        <ListView tasks={filtered} />
      )}
    </Page>
  );
}
