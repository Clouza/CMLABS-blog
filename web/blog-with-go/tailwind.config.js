/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { extend: {}, },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#179ffb",
          "secondary": "#54d5ff",
          "accent": "#baeeff",
          "neutral": "#020617",
          "base-100": "#fcfcfd",
          "info": "#eefbff",
          "success": "#059669",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
      },
    ],
  },
}

