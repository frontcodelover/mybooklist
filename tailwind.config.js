/** @type {import('tailwindcss').Config} */
/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-color': '#263059',
      },
      backgroundImage: {
        'hero-bg' : "url('../public/banniere.jpg')",
      },
      backgroundSize: {
        '75' : '75%',
      },
      height: {
        '50percent': '50%',
      }
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require('@tailwindcss/forms'),
  ],
};
