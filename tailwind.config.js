/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    colors: {
      // Paleta industrial basada en la imagen
      primary: {
        50: '#f0f4ff',
        100: '#e0eaff',
        200: '#c7d8ff',
        300: '#a5bbff',
        400: '#8194ff',
        500: '#4169e1', // Azul principal
        600: '#2c4fd6',
        700: '#1e3bb3',
        800: '#1a2f8f',
        900: '#162673',
      },
      secondary: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b', // Gris industrial
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
      },
      accent: {
        50: '#fff7ed',
        100: '#ffedd5',
        200: '#fed7aa',
        300: '#fdba74',
        400: '#fb923c',
        500: '#f97316', // Naranja/amarillo para innovación
        600: '#ea580c',
        700: '#c2410c',
        800: '#9a3412',
        900: '#7c2d12',
      },
      dark: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#000000', // Negro puro
      },
      navy: {
        50: '#f0f4ff',
        100: '#e0eaff',
        200: '#c7d8ff',
        300: '#a5bbff',
        400: '#8194ff',
        500: '#1e3a8a', // Azul marino industrial
        600: '#1e40af',
        700: '#1d4ed8',
        800: '#1e3a8a',
        900: '#1e293b',
      }
    },
    fontFamily: {
      sans: ["Inter", "ui-sans-serif", "system-ui"],
      heading: ["Poppins", "ui-sans-serif", "system-ui"],
      mono: ["JetBrains Mono", "ui-monospace", "monospace"],
    },
    boxShadow: {
      card: "0 4px 20px rgba(30, 58, 138, 0.1)",
      cardHover: "0 8px 30px rgba(30, 58, 138, 0.15)",
      glow: "0 0 20px rgba(65, 105, 225, 0.3)",
      'glow-orange': "0 0 20px rgba(249, 115, 22, 0.3)",
    },
    spacing: {
      18: "4.5rem",
      22: "5.5rem",
      26: "6.5rem",
    },
    borderRadius: {
      xl: "1rem",
      "2xl": "1.5rem",
    },
    maxWidth: {
      container: "1200px",
    },
    animation: {
      'float': 'float 6s ease-in-out infinite',
      'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      'spin-slow': 'spin 8s linear infinite',
      'bounce-slow': 'bounce 3s infinite',
    },
    keyframes: {
      float: {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-20px)' },
      }
    }
  },
};
export const plugins = [
  require("@tailwindcss/typography"),
  require("@tailwindcss/line-clamp"),
];