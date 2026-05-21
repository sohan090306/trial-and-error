import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const tooltip = {
  contentStyle: { background: 'rgba(5, 10, 20, .92)', border: '1px solid rgba(22,244,255,.25)', borderRadius: 8, color: '#fff' }
};

export function RevenueChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#16f4ff" stopOpacity={0.72} />
            <stop offset="95%" stopColor="#16f4ff" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
        <XAxis dataKey="month" stroke="#7dd3fc" />
        <YAxis stroke="#7dd3fc" />
        <Tooltip {...tooltip} />
        <Area type="monotone" dataKey="revenue" stroke="#16f4ff" fill="url(#revenue)" strokeWidth={3} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function HeatChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
        <XAxis dataKey="hour" stroke="#f0abfc" />
        <YAxis stroke="#f0abfc" />
        <Tooltip {...tooltip} />
        <Bar dataKey="count" fill="#ff2fd6" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function WorkoutTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
        <XAxis dataKey="day" stroke="#d9f99d" />
        <YAxis stroke="#d9f99d" />
        <Tooltip {...tooltip} />
        <Line type="monotone" dataKey="strength" stroke="#16f4ff" strokeWidth={3} dot={false} />
        <Line type="monotone" dataKey="cardio" stroke="#ff2fd6" strokeWidth={3} dot={false} />
        <Line type="monotone" dataKey="recovery" stroke="#c8ff3d" strokeWidth={3} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
