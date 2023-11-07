"use client"

import Image from "next/image"
import Link from "next/link"
import { SearchNormal1 } from "iconsax-react"
import { twMerge } from "tailwind-merge"
import ToggleBtn from "@sikundi/components/web/ToggleBtn"
import { ThemeSwitcher } from "@sikundi/components/web/Theme"
import { useEffect, useRef, useState } from "react"
import transliterate from '@sikundi/lib/transliterate'
import { useModalStore } from "@sikundi/stores/modalStore"

// @ts-ignore
const menuItems = [
    { label: "ހަބަރު", link: "/category/news" },
    { label: "ރިޕޯޓު", link: "/category/reports" },
    { label: "ކުޅިވަރު", link: "/category/sports" },
    { label: "މުނިފޫހިފިލުވުން", link: "/category/entertainment" },
    { label: "ލައިފްސްޓައިލް", link: "/category/life-style" },
    { label: "ވިޔަފާރި", link: "/category/business" },
]

const Header = () => {
    const [isScrollTop, setIsScrollTop] = useState(true)
    const search = useRef<HTMLInputElement>(null)
    const { on } = useModalStore()

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    
            if (scrollTop === 0) {
                setIsScrollTop(true)
            } else {
                setIsScrollTop(false)
            }
        }
    
        handleScroll()
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={twMerge([
            "sticky top-0 z-50",
            !isScrollTop && "bg-web-foreground dark:bg-web-foreground-dark shadow-lg"
        ])}>
            {/* <ThemeSwitcher /> */}
            <div className="container px-4 flex gap-4 h-[6.4rem] items-center">
                <Link href={"/"}>
                    <Image 
                        src={"/logo.png"} alt="logo" 
                        width={57} height={57} 
                        className="rounded-xl min-h-[57px] min-w-[57px] hover:scale-95 active:scale-105 transition-all" 
                    />
                </Link>
                <nav className="bg-web-foreground dark:bg-web-foreground-dark py-4 px-10 rounded-2xl gap-9 font-bold text-xl border-2 border-web-background dark:border-web-background-dark hidden lg:flex">
                    {
                        // @ts-ignore
                        menuItems?.map((menuItem, index)=>(
                            <Link href={menuItem.link} key={index} className="hover:text-web-primary active:opacity-50">{menuItem.label}</Link>
                        ))
                    }
                </nav>
                <label 
                    htmlFor="search" 
                    className={twMerge([
                        "py-4 px-6 flex w-full max-w-md bg-web-foreground dark:bg-web-foreground-dark mr-auto items-center rounded-2xl hover:cursor-text",
                        "focus-within:border-web-primary dark:focus-within:border-web-primary-dark border-2 border-web-background dark:border-web-background-dark",
                        "hidden lg:flex gap-4"
                    ])}
                >
                    <input 
                        ref={search}
                        type="text" name="search" id="search"
                        className="font-bold text-xl w-full bg-transparent dark:bg-transparent"
                        onChange={(e)=>{
                            if(search.current?.value) search.current.value = transliterate(e.target.value)
                        }}
                    />
                    <SearchNormal1 />
                </label>
                <ThemeSwitcher className="mr-auto lg:mr-0 min-h-[57px] min-w-[57px] border-2 border-web-background dark:border-transparent" />
                <ToggleBtn className="bg-web-tertiary dark:bg-web-tertiary-dark gap-[4px] min-h-[57px] min-w-[57px]" onClick={() => on()}>
                    {[1,2,3].map((index)=><hr className="w-5 border-white border" key={index} />)}
                </ToggleBtn>
            </div>
        </header>
    )
}

export default Header