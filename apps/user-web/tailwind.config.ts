import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: {
    plugins: { handler: () => void }[];
    theme: {
        extend: {
            keyframes: {
                "accordion-up": { from: { height: string }; to: { height: string } };
                "accordion-down": { from: { height: string }; to: { height: string } }
            };
            fontFamily: { heading: string[]; body: string[] };
            borderRadius: { xl: string; md: string; sm: string; lg: string };
            backgroundImage: { "gradient-conic": string; "gradient-radial": string };
            colors: {
                border: string;
                secondary: { foreground: string; DEFAULT: string };
                input: string;
                ring: string;
                background: string;
                popover: { foreground: string; DEFAULT: string };
                foreground: string;
                muted: { foreground: string; DEFAULT: string };
                accent: { foreground: string; DEFAULT: string };
                destructive: { foreground: string; DEFAULT: string };
                card: { foreground: string; DEFAULT: string };
                primary: { foreground: string; DEFAULT: string }
            };
            animation: { "accordion-up": string; "accordion-down": string }
        }
    };
    content: string[]
} = {
    content: [
        "./_components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ['var(--font-heading)', ...fontFamily.sans],
                body: ['var(--font-body)', ...fontFamily.sans],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                "border": "hsl(var(--border))",
                "input": "hsl(var(--input))",
                "ring": "hsl(var(--ring))",
                "background": "hsl(var(--background))",
                "foreground": "hsl(var(--foreground))",
                "primary": {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                "secondary": {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                "destructive": {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                "muted": {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                "accent": {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                "popover": {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                "card": {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                xl: "calc(var(--radius) + 4px)",
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
                "accordion-down": "accordion-down 0.3s ease-in-out",
                "accordion-up": "accordion-up 0.3s ease-in-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;
