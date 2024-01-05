"use client"

import Image from "next/image"
import Link from "next/link"
import { SearchNormal1 } from "iconsax-react"
import { twMerge } from "tailwind-merge"
import ToggleBtn from "@sikundi/app/(web)/dv/_components/ToggleBtn"
import { ThemeSwitcher } from "@sikundi/app/(web)/dv/_components/Theme"
import { useEffect, useRef, useState } from "react"
import transliterate from '@sikundi/lib/transliterate'
import { useModalStore } from "@sikundi/stores/modalStore"

const Header = ({ menuItems }: { menuItems: any }) => {
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
                <Link href={`/dv`}>
                    <Image 
                        src={"/logo.png"} alt="logo" 
                        width={50} height={50} 
                        priority={true}
                        className="rounded-xl min-h-[55px] min-w-[55px] hover:scale-95 active:scale-105 transition-all object-contain" 
                    />
                </Link>
                <nav className="bg-web-foreground dark:bg-web-foreground-dark lg:h-[55px] py-3 px-8 rounded-2xl gap-9 font-bold text-lg border-2 border-web-background dark:border-web-background-dark hidden lg:flex">
                    {
                        // @ts-ignore
                        menuItems?.map((menuItem, index)=> index < 10 && (
                            <Link href={menuItem.url} key={index} className="hover:text-web-primary active:opacity-50">{menuItem.name}</Link>
                        ))
                    }
                </nav>
                <label 
                    htmlFor="searchContainer" 
                    className={twMerge([
                        "py-[10px] px-4 flex w-full max-w-md bg-web-foreground dark:bg-web-foreground-dark items-center rounded-2xl hover:cursor-text",
                        "focus-within:border-web-primary dark:focus-within:border-web-primary-dark border-2 border-web-background dark:border-web-background-dark",
                        "hidden lg:flex gap-4",
                        'mr-auto'
                    ])}
                >
                    <label htmlFor="search" className="hidden"></label>
                    <input 
                        ref={search}
                        type="text" name="search" id="search"
                        className="font-bold text-xl w-full bg-transparent dark:bg-transparent"
                        onChange={(e)=>{
                            if(search.current?.value) search.current.value = transliterate(e.target.value)
                        }}
                    />
                    <SearchNormal1 className="h-5 w-5" />
                </label>
                <Link href={`/en`} className={twMerge([
                    'min-h-[55px] h-[55px] w-[55px] min-w-[55px] rounded-xl border border-web-background dark:border-transparent flex flex-col items-center justify-center hover:scale-95 active:scale-105 transition-all bg-white dark:bg-web-tertiary text-xl font-bold',
                    'mr-auto lg:mr-0'
                ])}>
                    <span className="mt-2">EN</span>
                </Link>
                <ThemeSwitcher className="min-h-[55px] h-[55px] w-[55px] min-w-[55px] border-2 border-web-background dark:border-transparent" />
                <ToggleBtn aria-label="menu" title="menu" className="bg-web-tertiary dark:bg-web-tertiary-dark gap-[4px] min-h-[55px] h-[55px] w-[55px] min-w-[55px] " onClick={() => on()}>
                    {[1,2,3].map((index)=><hr className="w-4 border-white border" key={index} />)}
                </ToggleBtn>
            </div>
        </header>
    )
}

export default Header