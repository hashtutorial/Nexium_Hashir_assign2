import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        spin: 'spin 40s linear infinite',
      },
      blur: {
        '3xl': '160px',
      },
    },
  },
  plugins: [],
};

export default config;
