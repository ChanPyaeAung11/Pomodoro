/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "5vh": "5vh",
        "10vh": "10vh",
        "25vh": "25vh",
        "50vh": "50vh",
        "75vh": "75vh",
      },
      colors: {
        "gray-brown": "#928f8f",
        "ebony-1": "#282c34",
      },
    },
  },
  plugins: [],
};
