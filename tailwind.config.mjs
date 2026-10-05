import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "full",
          },
        },
      },
    },
  },
  plugins: [
    typography,
    // rm: variant, same shape as the built-in dark: one (darkMode: ["class"]
    // effectively means "html.dark &") - lets ReducedMotionToggle's icon
    // swap use the same pattern ThemeToggle already does for sun/moon.
    plugin(function ({ addVariant }) {
      addVariant("rm", "html.reduce-motion &");
      addVariant("listening", "html.listening &");
    }),
  ],
};
