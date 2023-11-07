"use client"

import { useModalStore } from '@sikundi/stores/modalStore'
import { SearchNormal1 } from 'iconsax-react'
import React, { Fragment, useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import transliterate from '@sikundi/lib/transliterate'

const MenuModal = () => {
    const { modal, off } = useModalStore()
    const search = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (modal) document.body.style.overflow = 'hidden' 
        else document.body.style.overflow = ''
    }, [modal])

    return (
        <Fragment>
            <span className={twMerge([
                'fixed inset-0 bg-[#00000030] backdrop-blur-[8.2px] z-50 block opacity-100 transition-all visible duration-300',
                !modal && 'invisible opacity-0'
            ])} onClick={()=>off()}></span>
            <aside className={twMerge([
                'fixed inset-0 z-50  pointer-events-none overflow-y-auto transition-all top-0 visible duration-300',
                !modal && '-top-full invisible'
            ])} dir='ltr'>
                <div className='container mx-auto p-4 my-20 grid grid-cols-12 gap-4 lg:gap-5' dir='rtl'>
                    <label 
                        htmlFor="search_modal" 
                        className={twMerge([
                            "py-4 px-6 flex col-span-12 pointer-events-auto bg-web-foreground dark:bg-web-foreground-dark items-center rounded-2xl hover:cursor-text",
                            "focus-within:border-web-primary dark:focus-within:border-web-primary-dark border-2 border-web-background dark:border-web-background-dark",
                            "gap-4"
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
                        'col-span-12 lg:col-span-8 pointer-events-auto bg-web-foreground dark:bg-web-foreground-dark min-h-[300px]',
                        'p-4 border-2 border-web-background dark:border-web-background-dark rounded-2xl'
                    ])}>

                    </div>
                    <div className={twMerge([
                        'col-span-12 lg:col-span-4 pointer-events-auto bg-web-foreground dark:bg-web-foreground-dark min-h-[300px]',
                        'p-4 border-2 border-web-background dark:border-web-background-dark rounded-2xl'
                    ])}>

                    </div>
                </div>
            </aside>
        </Fragment>
    )
}

export default MenuModal