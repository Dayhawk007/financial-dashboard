import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary-bg":"#EBEBEB",
        "accent":"#304DAF",
        "secondary":"#4A5564",
        black: "#000",
        darkslateblue: "#304daf",
        white: "#fff",
        dimgray: "#4a5564",
        slategray: "#6d7d93",
        lightgray: "#d6d6d6",
        lightergray: "#a6a6a6",
        lightestgray: "#ababab",
        gray: "#252532",
        skyblue: "#64cff6"
      },
      borderRadius: {
        "6xs": "7px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
