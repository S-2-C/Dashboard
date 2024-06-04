import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

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
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        blue : {
          DEFAULT: "hsl(var(--blue))",
          foreground: "hsl(var(--blue-foreground))",
          highlight: "hsl(var(--blue-highlight))",
          dark: "hsl(var(--blue-dark))",
          darkhighlight: "hsl(var(--blue-darkhighlight))",
          teal: "hsl(var(--blue-teal))",
        },
        teal: {
          DEFAULT: "hsl(var(--teal))",
          foreground: "hsl(var(--teal-foreground))",
          highlight: "hsl(var(--teal-highlight))",
          dark: "hsl(var(--teal-dark))",
          background : "hsl(var(--teal-background))",
          FU: "hsl(var(--teal-FU))",
        },
        figma: {
          DEFAULT: "hsl(var(--figma))",
          figma1: "hsl(var(--figma-figma1))",
          figma2: "hsl(var(--figma-figma2))",
          figma3: "hsl(var(--figma-figma3))",
          figma4: "hsl(var(--figma-figma4))",
          figma5: "hsl(var(--figma-figma5))",
          figma6: "hsl(var(--figma-figma6))",
          figma7: "hsl(var(--figma-figma7))",
          figma8: "hsl(var(--figma-figma8))",
          figma9: "hsl(var(--figma-figma9))",
          figma10: "hsl(var(--figma-figma10))",
          figma11: "hsl(var(--figma-figma11))",
          figma12: "hsl(var(--figma-figma12))",
          figma13: "hsl(var(--figma-figma13))",
          figma14: "hsl(var(--figma-figma14))",
          figma15: "hsl(var(--figma-figma15))",
          figma16: "hsl(var(--figma-figma16))",
        },

        metrics: {

          DEFAULT: "hsl(var(--metrics))",

        },
        
        gray:{
          DEFAULT: "hsl(var(--gray))",

        },

        agenman: {
          DEFAULT: "hsl(var(--agenman))",
          agenmangray: "hsl(var(--agenman-agenmangray))",
          agenmanred: "hsl(var(--agenman-agenmanred))",
          agenmanyellow: "hsl(var(--agenman-agenmanyellow))",
          agenmanblue: "hsl(var(--agenman-agenmanblue))",
          agenmandarkblue: "hsl(var(--agenman-agenmandarkblue))",
          agenmansblue1: "hsl(var(--agenman-agenmansblue1))",
          agenmansblue2: "hsl(var(--agenman-agenmansblue2))",
          agenmansblue3: "hsl(var(--agenman-agenmansblue3))",
        },


        
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "spinBackAndForth": {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(140deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin 3s linear infinite",
        wiggle: "wiggle 0.2s ease-in-out infinite",
        "spinBackAndForth": "spinBackAndForth 2s infinite",
      },
      
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
