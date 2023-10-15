import plugin from 'tailwindcss/plugin'
import { hexToHslString } from './utils'
import { theme } from "../sikundi.config"

export const shadcnPlugin = plugin(
    function ({ addBase }) {
        addBase({
            ":root": {
                "--background": "0 0% 100%",
                "--foreground": "0 0% 3.9%",
                "--card": "0 0% 100%",
                "--card-foreground": "0 0% 3.9%",
                "--popover": "0 0% 100%",
                "--popover-foreground": "0 0% 3.9%",
                "--primary": hexToHslString(theme.primary.DEFAULT.background),
                "--primary-foreground": hexToHslString(theme.primary.DEFAULT.foreground),
                "--secondary": "0 0% 96.1%",
                "--secondary-foreground": "0 0% 9%",
                "--muted": "0 0% 96.1%",
                "--muted-foreground": "0 0% 45.1%",
                "--accent": "0 0% 96.1%",
                "--accent-foreground": "0 0% 9%",
                "--destructive": "0 84.2% 60.2%",
                "--destructive-foreground": "0 0% 98%",
                "--border": "0 0% 89.8%",
                "--input": "0 0% 89.8%",
                "--ring": "0 72.2% 50.6%",
                "--radius": "0.5rem"
            },
            ".dark": {
                "--background": "0 0% 3.9%",
                "--foreground": "0 0% 98%",
                "--card": "0 0% 3.9%",
                "--card-foreground": "0 0% 98%",
                "--popover": "0 0% 3.9%",
                "--popover-foreground": "0 0% 98%",
                "--primary": hexToHslString(theme.primary.dark.background),
                "--primary-foreground": hexToHslString(theme.primary.dark.foreground),
                "--secondary": "0 0% 14.9%",
                "--secondary-foreground": "0 0% 98%",
                "--muted": "0 0% 14.9%",
                "--muted-foreground": "0 0% 63.9%",
                "--accent": "0 0% 14.9%",
                "--accent-foreground": "0 0% 98%",
                "--destructive": "0 62.8% 30.6%",
                "--destructive-foreground": "0 0% 98%",
                "--border": "0 0% 14.9%",
                "--input": "0 0% 14.9%",
                "--ring": "0 72.2% 50.6%"
            }
        })

        addBase({
            "*": {
                "@apply border-border": {}
            },
            "body": {
                "@apply bg-background text-foreground": {}
            }
        })
    },
    {
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
                    border: "hsl(var(--border))",
                    input: "hsl(var(--input))",
                    ring: "hsl(var(--ring))",
                    background: "hsl(var(--background))",
                    foreground: "hsl(var(--foreground))",
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
                },
                animation: {
                    "accordion-down": "accordion-down 0.2s ease-out",
                    "accordion-up": "accordion-up 0.2s ease-out",
                },
                fontFamily: {
                    sans: ['var(--font-inter)'],
                }
            },
        }
    }
)