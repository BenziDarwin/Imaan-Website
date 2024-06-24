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
          '50': '#80cbff',
          '100': '#4db6ff',
          '150': '#1aa1ff',
          '200': '#0087e6',
          '250': '#0069b2',
          '300': '#004b80',
          '500': '#0088e8',
          '600': '#0073c4',
          '700': '#0064aa',
          '800': '#005896',
          '900': '#004f86',
          '950': '#004475'
      }
    
    
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
export default config;
