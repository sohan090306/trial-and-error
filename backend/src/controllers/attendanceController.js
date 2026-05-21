import QRCode from 'qrcode';
import { asyncHandler } from '../utils/apiError.js';

export const qrToken = asyncHandler(async (_req, res) => {
  const payload = `NEXAFIT:${Date.now()}:${Math.random().toString(36).slice(2)}`;
  const image = await QRCode.toDataURL(payload);
  res.json({ success: true, data: { payload, image } });
});

export const checkIn = asyncHandler(async (req, res) => {
  req.app.get('io')?.emit('attendance:update', {
    memberId: req.body.memberId,
    checkIn: new Date().toISOString(),
    zone: req.body.zone || 'Strength Deck'
  });
  res.json({ success: true, message: 'Check-in captured' });
});
