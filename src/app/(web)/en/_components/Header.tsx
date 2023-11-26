"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { MenuIcon, SearchIcon } from 'lucide-react';
import { ThemeSwitcherEN } from '@sikundi/components/web/Theme';

export default function Header({ items }:{items: {name: string; url:string;}[]}) {
    const [menu, setMenu] = useState(false)
    const [search, setSearch] = useState(false)
    const [searchActive, setSearchActive] = useState(false)

    return (
        <header className='w-full border-b border-[#0000000F] sticky top-0 bg-web-en-background dark:bg-web-en-background-dark'>
            <div className='flex container px-4 h-16 items-center gap-2'>
                <div className='flex items-center gap-4'>
                    <Image src={"/logo_new.png"} alt='logo' width={48} height={48} />
                    <h4 className='mt-5 text-4xl font-medium text-web-en-primary'>{"Bulletin"}</h4>
                </div>
                <nav className={twMerge([
                    'flex items-center lg:justify-end flex-1 gap-6 flex-col',
                    'lg:flex-row absolute lg:relative bg-web-en-background dark:bg-web-en-background-dark',
                    'overflow-auto w-full left-0 top-[64px] lg:top-0',
                    'border-b border-[#0000000F] border-t lg:py-0 lg:border-0 transition-all lg:h-[unset]',
                    !menu ? 'h-0' : 'h-[calc(100vh-64px)] py-4'
                ])}>
                    {items?.map((item, index)=>(
                        <Link key={index} href={item.url} className={twMerge([
                            'text-2xl text-web-en-accent dark:text-web-en-accent-dark hover:text-web-en-primary lg:mt-3'
                        ])}>
                            {item.name}
                        </Link>
                    ))}
                    <input type="search" placeholder='search...' className={twMerge([
                        'absolute bg-web-en-background dark:bg-web-en-background-dark border border-web-en-accent dark:border-web-en-accent-dark',
                        'right-0 top-0 bottom-0 rounded-lg transition-all',
                        searchActive ? 'w-full p-4 visible' : 'w-0 invisible'
                    ])} />
                </nav>
                <button onClick={()=>setSearchActive((s)=>!s)} className='hover:text-web-en-primary lg:px-4 px-3 ml-auto lg:ml-1 lg:mr-1 hidden lg:block'>
                    <SearchIcon className='h-5 w-5' />
                </button>
                <Link href={"/dv"} className={twMerge([
                    'bg-web-en-tertiary dark:bg-web-en-tertiary-dark',
                    'text-white min-h-[40px] min-w-[40px] flex items-center justify-center pt-[10px]',
                    'rounded-lg hover:opacity-75 active:opacity-50 ml-auto'
                ])}>
                    DV
                </Link>
                <ThemeSwitcherEN />
                <button onClick={()=>setMenu((m)=>!m)} className={twMerge([
                    'bg-web-en-tertiary dark:bg-web-en-tertiary-dark',
                    'text-white min-h-[40px] min-w-[40px] flex items-center justify-center',
                    'rounded-lg hover:opacity-75 active:opacity-50 lg:hidden'
                ])}>
                    <MenuIcon />
                </button>
            </div>
        </header>
    )
}
