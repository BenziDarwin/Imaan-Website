import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
         'primary': {
        '50': '#f0f2ff',
        '100': '#e4e6ff',
        '200': '#ccd0ff',
        '300': '#a4aaff',
        '400': '#7071ff',
        '500': '#4037ff',
        '600': '#280fff',
        '700': '#1700ff',
        '800': '#1100da',
        '900': '#1000b5',
        '950': '#03007a',
    },
    
    
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
export default config;
