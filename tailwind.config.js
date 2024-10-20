/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "max-sm": { max: "640px" }, // Targets screens smaller than 640px
        "max-md": { max: "768px" }, // Targets screens smaller than 768px
        "max-lg": { max: "1024px" }, // Targets screens smaller than 1024px
        "max-xl": { max: "1280px" }, // Targets screens smaller than 1280px
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "category-gradient":
          "linear-gradient(161.42deg, rgb(110, 232, 252) 5.47%, rgb(106, 226, 251) 21.27%, rgb(94, 209, 247) 42.01%, rgb(75, 181, 241) 65.72%, rgb(48, 142, 232) 91.39%, rgb(38, 127, 229) 100.28%)",
        "secondary-gradient":
          "linear-gradient(225deg, rgba(212, 8, 140, 0.7) 14.64%, rgba(204, 8, 140, 0.7) 17.47%, rgba(133, 7, 138, 0.7) 47.17%, rgba(89, 6, 137, 0.7) 68.39%, rgba(72, 6, 137, 0.7) 79%)",
        "custom-gradient":
          "linear-gradient(225deg, rgba(212, 8, 140, 0.7) 14.64%, rgba(204, 8, 140, 0.7) 17.47%, rgba(133, 7, 138, 0.7) 47.17%, rgba(89, 6, 137, 0.7) 68.39%, rgba(72, 6, 137, 0.7) 79%)",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
