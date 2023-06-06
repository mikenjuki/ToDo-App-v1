/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      xl: "1440px",
    },
    colors: {
      brightBlue: "hsl(220, 98%, 61%)",
      checkBgGradient:
        "linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))",

      veryLightGray: "hsl(0, 0%, 98%)",
      veryLightGrayishBlue: "hsl(236, 33%, 92%)",
      lightGrayishBlue: "hsl(233, 11%, 84%)",
      darkGrayishBlue: "hsl(236, 9%, 61%)",
      veryDarkGrayishBlueA: "hsl(235, 19%, 35%)",

      veryDarkBlue: "hsl(235, 21%, 11%)",
      veryDarkDesaturatedBlue: "hsl(235, 24%, 19%)",
      lightGrayishBlue: "hsl(234, 39%, 85%)",
      lightGrayishBlueHover: "hsl(236, 33%, 92%)",
      darkerGrayishBlueA: "hsl(234, 11%, 52%)",
      veryDarkGrayishBlueB: "hsl(233, 14%, 35%)",
      darkerGrayishBlueB: "hsl(237, 14%, 26%)",
    },
    fontFamily: {
      josefin: ["Josefin Sans", "sans-serif"],
    },
    fontWeight: { normal: "400", bold: "700" },
    extend: {
      backgroundImage: {
        "desktop-dark": "url('/assets/images/bg-desktop-dark.jpg')",
        "desktop-light": "url('/assets/images/bg-desktop-light.jpg')",
        "mobile-dark": "url('/assets/images/bg-mobile-dark.jpg')",
        "mobile-light": "url('/assets/images/bg-mobile-light.jpg')",
      },
      height: ["responsive"],
    },
  },
  plugins: [],
};
