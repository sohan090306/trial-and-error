export const demoMembers = [
  {
    id: 1,
    name: 'Aarav Mehta',
    email: 'aarav@nexafit.local',
    phone: '+91 98765 11001',
    goal: 'Hypertrophy',
    status: 'active',
    aura: 92,
    streak: 31,
    xp: 12840,
    trainer: 'Rhea Kapoor',
    membership: 'Premium Elite',
    expiryDate: '2026-08-30',
    risk: 'low'
  },
  {
    id: 2,
    name: 'Mira Shah',
    email: 'mira@nexafit.local',
    phone: '+91 98765 11002',
    goal: 'Fat Loss',
    status: 'active',
    aura: 87,
    streak: 18,
    xp: 10120,
    trainer: 'Kabir Sethi',
    membership: 'Yearly',
    expiryDate: '2026-10-12',
    risk: 'medium'
  },
  {
    id: 3,
    name: 'Dev Iyer',
    email: 'dev@nexafit.local',
    phone: '+91 98765 11003',
    goal: 'Athletic Performance',
    status: 'expiring',
    aura: 76,
    streak: 9,
    xp: 7340,
    trainer: 'Rhea Kapoor',
    membership: 'Quarterly',
    expiryDate: '2026-05-27',
    risk: 'medium'
  }
];

export const demoTrainers = [
  { id: 1, name: 'Rhea Kapoor', specialization: 'Strength and Mobility', rating: 4.9, sessions: 182, retention: 94 },
  { id: 2, name: 'Kabir Sethi', specialization: 'Fat Loss and HIIT', rating: 4.8, sessions: 166, retention: 91 },
  { id: 3, name: 'Naina Rao', specialization: 'Yoga Recovery', rating: 4.95, sessions: 119, retention: 96 }
];

export const analyticsSnapshot = {
  activeMembers: 486,
  liveAttendance: 73,
  monthlyRevenue: 1285000,
  growth: 18.7,
  retention: 91.4,
  peakHour: '18:00 - 20:00',
  fatigueAlerts: 12,
  paymentDue: 43,
  revenueSeries: [
    { month: 'Jan', revenue: 820000, members: 356 },
    { month: 'Feb', revenue: 910000, members: 382 },
    { month: 'Mar', revenue: 1040000, members: 421 },
    { month: 'Apr', revenue: 1160000, members: 451 },
    { month: 'May', revenue: 1285000, members: 486 }
  ],
  attendanceHeatmap: [
    { hour: '06', count: 28 }, { hour: '08', count: 46 }, { hour: '10', count: 34 },
    { hour: '12', count: 21 }, { hour: '16', count: 55 }, { hour: '18', count: 92 },
    { hour: '20', count: 81 }, { hour: '22', count: 30 }
  ],
  workoutTrends: [
    { day: 'Mon', strength: 72, cardio: 41, recovery: 24 },
    { day: 'Tue', strength: 66, cardio: 52, recovery: 32 },
    { day: 'Wed', strength: 81, cardio: 46, recovery: 28 },
    { day: 'Thu', strength: 74, cardio: 61, recovery: 35 },
    { day: 'Fri', strength: 88, cardio: 57, recovery: 38 },
    { day: 'Sat', strength: 94, cardio: 69, recovery: 42 },
    { day: 'Sun', strength: 53, cardio: 44, recovery: 61 }
  ]
};
