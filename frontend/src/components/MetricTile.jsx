import { motion } from 'framer-motion';

export function MetricTile({ label, value, suffix = '', accent = 'cyan', icon: Icon }) {
  return (
    <motion.div className={`metric metric-${accent}`} whileHover={{ y: -4, scale: 1.01 }}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs uppercase tracking-[.24em] text-slate-400">{label}</span>
        {Icon ? <Icon size={18} /> : null}
      </div>
      <strong className="mt-3 block font-display text-3xl text-white">{value}{suffix}</strong>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div className="h-full rounded-full bg-current" initial={{ width: '12%' }} animate={{ width: '78%' }} transition={{ duration: 1.2 }} />
      </div>
    </motion.div>
  );
}
