import { useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/* Smooth animated area chart — pure SVG, no chart library. */
export function AreaChart({ data, labels, format }) {
  const gid = useId().replace(/:/g, '');
  const ref = useRef(null);
  const [hover, setHover] = useState(null);

  const W = 680;
  const H = 260;
  const P = { l: 10, r: 10, t: 22, b: 30 };
  const max = Math.max(...data) * 1.12;
  const x = (i) => P.l + (i * (W - P.l - P.r)) / (data.length - 1);
  const y = (v) => P.t + (1 - v / max) * (H - P.t - P.b);

  const pts = data.map((v, i) => [x(i), y(v)]);
  const line = pts.reduce((acc, [px, py], i) => {
    if (i === 0) return `M${px},${py}`;
    const [qx, qy] = pts[i - 1];
    const cx = (qx + px) / 2;
    return `${acc} C${cx},${qy} ${cx},${py} ${px},${py}`;
  }, '');
  const area = `${line} L${x(data.length - 1)},${H - P.b} L${x(0)},${H - P.b} Z`;

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const rel = ((e.clientX - r.left) / r.width) * W;
    const step = (W - P.l - P.r) / (data.length - 1);
    setHover(Math.max(0, Math.min(data.length - 1, Math.round((rel - P.l) / step))));
  };

  const grid = [0, 0.25, 0.5, 0.75, 1];
  const active = hover ?? data.length - 1;

  return (
    <div className="chart" ref={ref} onMouseMove={onMove} onMouseLeave={() => setHover(null)} onTouchMove={(e) => onMove(e.touches[0])}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Revenue chart">
        <defs>
          <linearGradient id={`fill-${gid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary-2)" stopOpacity="0.32" />
            <stop offset="100%" stopColor="var(--primary-2)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`stroke-${gid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--primary-2)" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
        </defs>

        {grid.map((g) => {
          const gy = P.t + g * (H - P.t - P.b);
          return <line key={g} x1={P.l} x2={W - P.r} y1={gy} y2={gy} className="chart-grid" />;
        })}

        <motion.path d={area} fill={`url(#fill-${gid})`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} />
        <motion.path
          d={line}
          fill="none"
          stroke={`url(#stroke-${gid})`}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {labels.map((l, i) =>
          i % 2 === 0 || data.length < 8 ? (
            <text key={i} x={x(i)} y={H - 8} textAnchor="middle" className="chart-label">
              {l}
            </text>
          ) : null,
        )}

        <motion.line
          x1={x(active)}
          x2={x(active)}
          y1={P.t}
          y2={H - P.b}
          className="chart-cursor"
          animate={{ x1: x(active), x2: x(active) }}
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        />
        <motion.circle
          r="6"
          className="chart-dot"
          animate={{ cx: x(active), cy: y(data[active]) }}
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
          initial={{ cx: x(data.length - 1), cy: y(data[data.length - 1]) }}
        />
      </svg>

      <AnimatePresence>
        <motion.div
          key="tip"
          className="chart-tip"
          style={{ left: `${Math.min(Math.max((x(active) / W) * 100, 11), 89)}%`, top: `${(y(data[active]) / H) * 100}%` }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <small>{labels[active]}</small>
          <strong>{format(data[active])}</strong>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* Animated donut with centre total */
export function Donut({ segments, total, caption }) {
  const R = 58;
  const C = 2 * Math.PI * R;
  const sum = segments.reduce((a, s) => a + s.value, 0) || 1;
  let offset = 0;
  return (
    <div className="donut">
      <svg viewBox="0 0 160 160" role="img" aria-label={caption}>
        <circle cx="80" cy="80" r={R} className="donut-track" />
        <g transform="rotate(-90 80 80)">
          {segments.map((s, i) => {
            const len = (s.value / sum) * C;
            const gap = segments.length > 1 && s.value > 0 ? 4 : 0;
            const el = (
              <motion.circle
                key={s.key}
                cx="80"
                cy="80"
                r={R}
                fill="none"
                stroke={s.color}
                strokeWidth="14"
                strokeLinecap="round"
                strokeDashoffset={-offset}
                initial={{ strokeDasharray: `0 ${C}` }}
                animate={{ strokeDasharray: `${Math.max(len - gap, 0)} ${C}` }}
                transition={{ duration: 1.1, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              />
            );
            offset += len;
            return el;
          })}
        </g>
      </svg>
      <div className="donut-center">
        <strong className="display">{total}</strong>
        <span>{caption}</span>
      </div>
    </div>
  );
}

/* Circular progress ring for the client portal */
export function Ring({ value, size = 132 }) {
  const R = 52;
  const C = 2 * Math.PI * R;
  return (
    <svg viewBox="0 0 128 128" width={size} height={size} className="ring" aria-hidden="true">
      <defs>
        <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--primary-2)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      <circle cx="64" cy="64" r={R} className="donut-track" />
      <motion.circle
        cx="64"
        cy="64"
        r={R}
        fill="none"
        stroke="url(#ring-grad)"
        strokeWidth="11"
        strokeLinecap="round"
        transform="rotate(-90 64 64)"
        strokeDasharray={C}
        initial={{ strokeDashoffset: C }}
        animate={{ strokeDashoffset: C * (1 - value / 100) }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
    </svg>
  );
}
