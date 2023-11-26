"use client"

import { useModalStore } from '@sikundi/stores/modalStore'
import { SearchNormal1 } from 'iconsax-react'
import React, { Fragment, useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import transliterate from '@sikundi/lib/transliterate'
import VarientTwo from '@sikundi/components/web/blocks/VarientTwo'
import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'

const MenuModal = ({ latestPosts, menuItems }: any) => {
    const { modal, off } = useModalStore()
    const path = usePathname()
    const params = useParams()
    const search = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (modal) document.body.style.overflow = 'hidden' 
        else document.body.style.overflow = ''
    }, [modal])

    useEffect(() => {
        off()
    }, [path, params, off])

    return (
        <Fragment>
            <span className={twMerge([
                'fixed inset-0 bg-[#00000030] backdrop-blur-[8.2px] z-50 block opacity-100 transition-all visible duration-300',
                !modal && 'invisible opacity-0'
            ])} onClick={()=>off()}></span>
            <aside className={twMerge([
                'fixed inset-0 z-50  pointer-events-none overflow-y-auto transition-all top-0 visible duration-300 opacity-100',
                !modal && '-top-full invisible opacity-0'
            ])} dir='ltr'>
                <div className='container mx-auto p-4 my-20 grid grid-cols-12 gap-4 lg:gap-5' dir='rtl'>
                    <label 
                        htmlFor="search_modal" 
                        className={twMerge([
                            "py-4 px-6 flex col-span-12 pointer-events-auto bg-web-foreground dark:bg-web-foreground-dark items-center rounded-2xl hover:cursor-text",
                            "focus-within:border-web-primary dark:focus-within:border-web-primary-dark border-2 border-web-background dark:border-web-background-dark",
                            "gap-4 lg:order-1"
                        ])}
                    >
                        <input 
                            ref={search}
                            type="text" name="search" id="search_modal"
                            className="bg-white font-bold text-xl w-full bg-transparent dark:bg-transparent"
                            onChange={(e)=>{
                                if(search.current?.value) search.current.value = transliterate(e.target.value)
                            }}
                        />
                        <SearchNormal1 />
                    </label>
                    <div className={twMerge([
                        'col-span-12 lg:col-span-3 pointer-events-auto bg-web-foreground dark:bg-web-foreground-dark min-h-[300px] lg:order-3',
                        'p-4 border-2 border-web-background dark:border-web-background-dark rounded-2xl'
                    ])}>
                        {
                            // @ts-ignore
                            menuItems?.map((menuItem, index)=>(
                                <Link href={menuItem.url} key={index} className="active:opacity-50 flex items-center text-xl font-bold mb-4 gap-4">
                                    <span className=' bg-web-tertiary dark:bg-web-tertiary-dark h-10 w-10 rounded-full'></span>
                                    {menuItem.name}
                                </Link>
                            ))
                        }
                    </div>
                    <div className={twMerge([
                        'col-span-12 lg:col-span-9 pointer-events-auto bg-web-foreground dark:bg-web-foreground-dark min-h-[300px] lg:order-2',
                        'p-4 border-2 border-web-background dark:border-web-background-dark rounded-2xl'
                    ])}>
                        <VarientTwo containerClassName="lg:grid-cols-4" className="mb-12" data={latestPosts} />
                    </div>
                </div>
            </aside>
        </Fragment>
    )
}

export default MenuModal