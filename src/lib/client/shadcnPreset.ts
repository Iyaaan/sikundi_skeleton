import type { Config } from 'tailwindcss'
import { shadcnPlugin } from './shadcnPlugin'
import animatePlugin from 'tailwindcss-animate'

export const shadcnPreset = {
    darkMode: ["class"],
    content: [],
    plugins: [animatePlugin, shadcnPlugin]
} satisfies Config