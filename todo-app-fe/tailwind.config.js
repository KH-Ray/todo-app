/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "very-light-gray": "hsl(0, 0%, 98%)",
        "very-light-grayish-blue": "hsl(236, 33%, 92%)",
        "light-grayish-blue": "hsl(233, 11%, 84%)",
        "light-grayiish-blue-hover": "hsl(236, 33%, 92%)",
        "dark-grayish-blue": "hsl(236, 9%, 61%)",
        "very-dark-grayish-blue": "hsl(235, 19%, 35%)",
        "very-dark-blue": "hsl(235, 21%, 11%)",
        "very-dark-desaturated-blue": "hsl(235, 24%, 19%)",
        "bright-blue": "hsl(220, 98%, 61%)",
        "light-blue": "hsl(192, 100%, 67%)",
        "light-purple": "hsl(280, 87%, 65%)",
      },
      fontFamily: {
        "josefin-sans": ["Josefin Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
