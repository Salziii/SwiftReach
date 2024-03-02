import type { Config } from "tailwindcss";

const {
 default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config = {
 darkMode: ["class"],
 content: [
  "./pages/**/*.{ts,tsx}",
  "./components/**/*.{ts,tsx}",
  "./app/**/*.{ts,tsx}",
  "./src/**/*.{ts,tsx}",
 ],
 prefix: "",
 theme: {
  container: {
   center: true,
   padding: "2rem",
   screens: {
    "2xl": "1400px",
   },
  },
  extend: {
   colors: {
    border: "var(--border)",
    input: "var(--input)",
    ring: "var(--ring)",
    background: "var(--background)",
    foreground: "var(--foreground)",
    primary: {
     DEFAULT: "var(--primary)",
     foreground: "var(--primary-foreground)",
    },
    secondary: {
     DEFAULT: "var(--secondary)",
     foreground: "var(--secondary-foreground)",
    },
    destructive: {
     DEFAULT: "var(--destructive)",
     foreground: "var(--destructive-foreground)",
    },
    muted: {
     DEFAULT: "var(--muted)",
     foreground: "var(--muted-foreground)",
    },
    accent: {
     DEFAULT: "var(--accent)",
     foreground: "var(--accent-foreground)",
    },
    popover: {
     DEFAULT: "var(--popover)",
     foreground: "var(--popover-foreground)",
    },
    card: {
     DEFAULT: "var(--card)",
     foreground: "var(--card-foreground)",
    },
   },
   borderRadius: {
    lg: "var(--radius)",
    md: "calc(var(--radius) - 2px)",
    sm: "calc(var(--radius) - 4px)",
   },
   keyframes: {
    scroll: {
     to: {
      transform: "translate(calc(-50% - 0.5rem))",
     },
    },
    "accordion-down": {
     from: { height: "0" },
     to: { height: "var(--radix-accordion-content-height)" },
    },
    "accordion-up": {
     from: { height: "var(--radix-accordion-content-height)" },
     to: { height: "0" },
    },
    moveHorizontal: {
     "0%": {
      transform: "translateX(-50%) translateY(-10%)",
     },
     "50%": {
      transform: "translateX(50%) translateY(10%)",
     },
     "100%": {
      transform: "translateX(-50%) translateY(-10%)",
     },
    },
    moveInCircle: {
     "0%": {
      transform: "rotate(0deg)",
     },
     "50%": {
      transform: "rotate(180deg)",
     },
     "100%": {
      transform: "rotate(360deg)",
     },
    },
    moveVertical: {
     "0%": {
      transform: "translateY(-50%)",
     },
     "50%": {
      transform: "translateY(50%)",
     },
     "100%": {
      transform: "translateY(-50%)",
     },
    },
   },
   animation: {
    "accordion-down": "accordion-down 0.2s ease-out",
    "accordion-up": "accordion-up 0.2s ease-out",
    first: "moveVertical 30s ease infinite",
    second: "moveInCircle 20s reverse infinite",
    third: "moveInCircle 40s linear infinite",
    fourth: "moveHorizontal 40s ease infinite",
    fifth: "moveInCircle 20s ease infinite",
    scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
   },
   textShadow: {
    sm: "0 1px 2px var(--tw-shadow-color)",
    DEFAULT: "0 2px 4px var(--tw-shadow-color)",
    lg: "0 8px 16px var(--tw-shadow-color)",
   }
  },
 },
 plugins: [require("tailwindcss-animate"), addVariablesForColors],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
 let allColors = flattenColorPalette(theme("colors"));
 let newVars = Object.fromEntries(
  Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
 );

 addBase({
  ":root": newVars,
 });
}

export default config;
