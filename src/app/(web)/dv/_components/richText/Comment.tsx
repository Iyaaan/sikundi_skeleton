"use client"

import React, { useRef } from 'react'
import Heading from './Heading'
import transliterate from '@sikundi/lib/transliterate'

interface Props {
    lang?: "en" | "dv"
    onSubmit?: () => void
}

const Comment = ({onSubmit, lang = "en"}: Props) => {
    const name = useRef<HTMLInputElement>(null)
    const content = useRef<HTMLTextAreaElement>(null)
    return (
        <div className='px-6 max-w-3xl mx-auto' dir={lang === "en"? "ltr" : "rtl"}>
            <div className='p-5 bg-web-foreground dark:bg-web-foreground-dark rounded-[20px] mb-6'>
                <div className='lg:col-span-4 col-span-2'>
                    <Heading className=' text-web-accent dark:text-web-accent-dark mb-4 text-base'>
                        {lang === "en" ? "Comment" : "ކޮމެންޓް"}
                    </Heading>
                </div>
                <input 
                    ref={name}
                    type="text" name="name" id="name"
                    className="bg-web-background dark:bg-web-background-dark font-semibold text-lg w-full py-2 px-4 rounded-xl mb-4"
                    onChange={(e)=>{
                        if(name.current?.value) name.current.value = transliterate(e.target.value)
                    }}
                    placeholder={lang === "en" ? "Name" : "ނަން"}
                />
                <textarea 
                    ref={content}
                    name="content" id="content" rows={7}
                    className="bg-web-background dark:bg-web-background-dark font-semibold text-lg w-full py-3 px-4 rounded-xl"
                    onChange={(e)=>{
                        if(content.current?.value) content.current.value = transliterate(e.target.value)
                    }}
                    placeholder={lang === "en" ? "Comment" : "ކޮމެންޓް"}
                />
                <button type="button" className=' bg-web-primary dark:bg-web-primary-dark text-white px-8 py-2 rounded-lg font-bold ms-auto block hover:opacity-75 active:opacity-50'>
                    {lang === "en" ? "Comment" : "ކޮމެންޓް"}
                </button>
            </div>
        </div>
    )
    }

export default Comment