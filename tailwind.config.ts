import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable dark mode using the 'class' strategy
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'morado-50': 'var(--morado-50)',
        'morado-100': 'var(--morado-100)',
        'morado-200': 'var(--morado-200)',
        'morado-300': 'var(--morado-300)',
        'morado-400': 'var(--morado-400)',
        'morado-500': 'var(--morado-500)',
        'morado-600': 'var(--morado-600)',
        'morado-700': 'var(--morado-700)',
        'morado-800': 'var(--morado-800)',
        'morado-900': 'var(--morado-900)',
        'morado-950': 'var(--morado-950)',
      },
    },
  },
  plugins: [],
}
export default config
