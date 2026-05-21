export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Orbitron', 'Inter', 'sans-serif']
      },
      colors: {
        void: '#05070d',
        panel: 'rgba(10, 18, 32, 0.72)',
        cyan: '#16f4ff',
        pink: '#ff2fd6',
        acid: '#c8ff3d',
        amber: '#ffb020'
      },
      boxShadow: {
        neon: '0 0 28px rgba(22,244,255,.32)',
        pink: '0 0 28px rgba(255,47,214,.28)'
      }
    }
  },
  plugins: []
};
