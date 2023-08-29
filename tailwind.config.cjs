/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        backdrop: "#f1f6f1",
        contrast: "#031926",
        purple: "#6e61ff",
        orange: "#ff611e",
      },
    },
  },
  plugins: [],
};
