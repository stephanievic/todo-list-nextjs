import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: {50: '#FBF9FF', 100: '#F5F7FF'},
        black: {100: '#262626', 200: '#212121'},
        gray: '#656464',
        purple: {100: '#B2A0D2', 200: '#9591E1', 300: '#8552DC', 400: '#674E93'}
      },
    },
  },
  plugins: [],
} satisfies Config;
