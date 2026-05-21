import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { demoAnalytics } from '../data/demo.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export function useRealtimeAnalytics() {
  const [analytics, setAnalytics] = useState(demoAnalytics);

  useEffect(() => {
    const socket = io(API_URL, { transports: ['websocket'], reconnectionAttempts: 2 });
    socket.on('analytics:tick', (data) => setAnalytics((old) => ({ ...old, ...data })));
    const localPulse = setInterval(() => {
      setAnalytics((old) => ({
        ...old,
        liveAttendance: Math.max(20, old.liveAttendance + Math.round(Math.sin(Date.now() / 5000) * 4)),
        monthlyRevenue: old.monthlyRevenue + 1200
      }));
    }, 4200);
    return () => {
      clearInterval(localPulse);
      socket.disconnect();
    };
  }, []);

  return analytics;
}
