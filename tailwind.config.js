import withMt from "@material-tailwind/react/utils/withMT";
/** @type {import('tailwindcss').Config} */
export default withMt({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      desktop: { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      laptop: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      tablet: { max: "800px" },
      // => @media (max-width: 1023px) { ... }

      mobile: { max: "500px" },
      // => @media (max-width: 767px) { ... }

      desktopMin: { min: "1535px" },
      // => @media (min-width: 1535px) { ... }

      laptopMin: { min: "1279px" },
      // => @media (min-width: 1279px) { ... }

      tabletMin: { min: "800px" },
      // => @media (min-width: 1023px) { ... }

      mobileMin: { min: "500px" },
      // => @media (min-width: 767px) { ... }
    },
    extend: {
      width: {
        100: "100%",
      },
      height: {
        mobileHeaderHeight: "50px",
        100: "100%",
        "100vh": "100vh",
      },
      borderRadius: {
        circle: "50%",
      }
    },
  },
  plugins: [],
});
