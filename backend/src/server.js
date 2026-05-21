import http from 'http';
import { Server } from 'socket.io';
import { createApp } from './app.js';
import { env } from './config/env.js';
import { testDatabase } from './config/db.js';
import { analyticsSnapshot } from './utils/demoData.js';
import { logger } from './utils/logger.js';

const app = createApp();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: env.frontendUrl, methods: ['GET', 'POST'] }
});

app.set('io', io);

io.on('connection', (socket) => {
  socket.emit('analytics:tick', analyticsSnapshot);
  socket.on('smart-mirror:rep', (payload) => io.emit('smart-mirror:rep', payload));
});

setInterval(() => {
  const flux = Math.round(Math.sin(Date.now() / 9000) * 9);
  io.emit('analytics:tick', {
    ...analyticsSnapshot,
    liveAttendance: analyticsSnapshot.liveAttendance + flux,
    activeMembers: analyticsSnapshot.activeMembers + Math.max(0, flux),
    monthlyRevenue: analyticsSnapshot.monthlyRevenue + Math.max(0, flux * 3500)
  });
}, 3500);

await testDatabase();

server.listen(env.port, () => {
  logger.info(`NexaFit backend running on http://localhost:${env.port}`);
});
