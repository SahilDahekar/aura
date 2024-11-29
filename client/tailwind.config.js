/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {},
      fontFamily: {
        'messina': ['Messina Sans', 'sans-serif'],
        'messina-mono': ['Messina Sans Mono', 'monospace'],
      },
      fontWeight: {
        light: 300,
        normal: 400,
        semibold: 600,
        bold: 700,
        black: 900,
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

