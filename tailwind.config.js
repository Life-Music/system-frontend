/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{vue,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#349861",
        main: "#0b121e",
        beige: "#bcc8dc",
      },
      backgroundImage: {
        "main-gradient":
          "linear-gradient(45deg, rgba(188,200,220,1) 0%, rgba(182,227,237,1) 28%, rgba(93,193,215,1) 63%, rgba(80,192,214,1) 100%);",
        "music-gradient":
          "linear-gradient(74deg, rgba(244,118,239,1) 0%, rgba(244,118,239,1) 28%, rgba(176,148,229,1) 59%, rgba(80,192,214,1) 100%);",
      },
    },
  },
  plugins: [],
};
