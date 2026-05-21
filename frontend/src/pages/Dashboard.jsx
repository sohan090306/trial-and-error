import { Activity, Banknote, BrainCircuit, Dumbbell, Flame, ScanFace, Trophy, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { MetricTile } from '../components/MetricTile.jsx';
import { HeatChart, RevenueChart, WorkoutTrendChart } from '../components/Charts.jsx';
import { HoloScene } from '../components/HoloScene.jsx';
import { achievements, members, trainers } from '../data/demo.js';

export function Dashboard({ analytics, onNavigate }) {
  return (
    <main className="space-y-6">
      <section className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">NexaFit AI Gym Operating System</p>
          <h1>Real-time fitness command center for members, trainers, revenue, recovery, and AI decisions.</h1>
          <div className="hero-actions">
            <button type="button" onClick={() => onNavigate('intelligence', 'smart-mirror-mode')}><ScanFace size={18} /> Smart Mirror</button>
            <button type="button" className="secondary" onClick={() => onNavigate('intelligence', 'ai-fitness-planner')}><BrainCircuit size={18} /> AI Workout</button>
          </div>
        </div>
        <HoloScene />
      </section>

      <section className="metric-grid">
        <MetricTile label="Active Members" value={analytics.activeMembers} icon={Users} />
        <MetricTile label="Live Attendance" value={analytics.liveAttendance} accent="pink" icon={Activity} />
        <MetricTile label="Monthly Revenue" value={`₹${Math.round(analytics.monthlyRevenue / 1000)}K`} accent="acid" icon={Banknote} />
        <MetricTile label="Retention" value={analytics.retention} suffix="%" accent="amber" icon={Flame} />
      </section>

      <section className="dashboard-grid">
        <Panel title="Revenue Intelligence" icon={Banknote}>
          <RevenueChart data={analytics.revenueSeries} />
        </Panel>
        <Panel title="Peak Hour Heatmap" icon={Activity}>
          <HeatChart data={analytics.attendanceHeatmap} />
        </Panel>
      </section>

      <section className="dashboard-grid wide-left">
        <Panel title="Workout Trend Matrix" icon={Dumbbell}>
          <WorkoutTrendChart data={analytics.workoutTrends} />
        </Panel>
        <Panel title="AI Fatigue Watchlist" icon={BrainCircuit}>
          <div className="space-y-3">
            {members.map((member) => (
              <div className="list-row" key={member.id}>
                <div>
                  <p className="font-semibold text-white">{member.name}</p>
                  <p className="text-xs text-slate-400">{member.goal} · {member.membership}</p>
                </div>
                <span className={`risk risk-${member.risk}`}>{member.risk}</span>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section className="dashboard-grid">
        <Panel title="Trainer Performance" icon={Users}>
          <div className="space-y-3">
            {trainers.map((trainer) => (
              <div className="list-row" key={trainer.name}>
                <div>
                  <p className="font-semibold text-white">{trainer.name}</p>
                  <p className="text-xs text-slate-400">{trainer.spec}</p>
                </div>
                <strong className="text-cyan">{trainer.retention}%</strong>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Achievement Reactor" icon={Trophy}>
          <div className="achievement-grid">
            {achievements.map((achievement) => (
              <motion.div className={`achievement achievement-${achievement.color}`} key={achievement.title} whileHover={{ rotate: 1, scale: 1.04 }}>
                <Trophy size={20} />
                <p>{achievement.title}</p>
                <strong>+{achievement.xp} XP</strong>
              </motion.div>
            ))}
          </div>
        </Panel>
      </section>
    </main>
  );
}

function Panel({ title, icon: Icon, children }) {
  return (
    <section className="panel">
      <div className="panel-title">
        <Icon size={18} />
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}
