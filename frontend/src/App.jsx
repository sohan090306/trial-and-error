import { Activity, BrainCircuit, LayoutDashboard, Menu, Settings, Shield, Users } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { AssistantOrb } from './components/AssistantOrb.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Intelligence } from './pages/Intelligence.jsx';
import { Operations } from './pages/Operations.jsx';
import { useRealtimeAnalytics } from './hooks/useRealtimeAnalytics.js';

const nav = [
  { id: 'dashboard', label: 'Command', icon: LayoutDashboard },
  { id: 'operations', label: 'Operations', icon: Users },
  { id: 'intelligence', label: 'AI Core', icon: BrainCircuit }
];

export function App() {
  const [page, setPage] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const analytics = useRealtimeAnalytics();

  function navigateTo(nextPage, sectionId) {
    setPage(nextPage);
    if (sectionId) {
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    }
  }

  return (
    <div className="app-shell">
      <div className="scanlines" />
      <aside className={collapsed ? 'sidebar collapsed' : 'sidebar'}>
        <button className="menu-button" onClick={() => setCollapsed((value) => !value)} title="Toggle navigation">
          <Menu size={19} />
        </button>
        <div className="brand">
          <div className="brand-mark"><Activity size={22} /></div>
          {!collapsed && (
            <div>
              <strong>NexaFit</strong>
              <span>AI Gym OS</span>
            </div>
          )}
        </div>
        <nav>
          {nav.map((item) => (
            <button key={item.id} className={page === item.id ? 'active' : ''} onClick={() => setPage(item.id)} title={item.label}>
              <item.icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <Shield size={18} />
          {!collapsed && <span>RBAC · JWT · OTP</span>}
        </div>
      </aside>

      <div className="main-frame">
        <header className="topbar">
          <div>
            <p className="eyebrow">Live Startup Demo</p>
            <h2>Smart Gym Management & Fitness Intelligence Platform</h2>
          </div>
          <div className="topbar-actions">
            <button title="Settings"><Settings size={18} /></button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
            transition={{ duration: 0.35 }}
          >
            {page === 'dashboard' && <Dashboard analytics={analytics} onNavigate={navigateTo} />}
            {page === 'operations' && <Operations />}
            {page === 'intelligence' && <Intelligence />}
          </motion.div>
        </AnimatePresence>
      </div>
      <AssistantOrb />
    </div>
  );
}
