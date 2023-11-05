"use client"

import { useState, useEffect, ReactNode, Fragment, ButtonHTMLAttributes, DetailedHTMLProps } from "react"
import { useTheme } from "next-themes"
import { ThemeProvider } from "next-themes"
import ToggleBtn from "./ToggleBtn"
import { LampOn, Moon, Monitor } from "iconsax-react"
import { twMerge } from "tailwind-merge"

interface Props {
    children: ReactNode
}
export default function Providers(props: Props) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <Fragment>{props.children}</Fragment>
    return <ThemeProvider attribute="class">{props.children}</ThemeProvider>
}


interface buttonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {

}

export const ThemeSwitcher = (props: buttonProps) => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, []);

    if (!mounted) return (
        <ToggleBtn {...props} className={twMerge(["bg-white dark:bg-[#451790] gap-[4px] aspect-square", props.className])}>
            <LampOn 
                className=""
            />
        </ToggleBtn>
    )

    return (
        <ToggleBtn {...props} className={twMerge(["bg-white dark:bg-[#451790] gap-[4px] aspect-square", props.className])} onClick={()=>{
            if (theme === "system") setTheme("light")
            if (theme === "dark") setTheme("light")
            if (theme === "light") setTheme("dark")
        }}>
            {theme === "system" && <Monitor />}
            {theme === "dark" && <Moon />}
            {theme === "light" && <LampOn />}
        </ToggleBtn>
    )
}