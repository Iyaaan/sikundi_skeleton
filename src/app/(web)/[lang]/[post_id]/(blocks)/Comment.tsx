"use client"

import React, { useRef } from 'react'
import Heading from './Heading'
import transliterate from '@sikundi/lib/transliterate'

const Comment = () => {
    const search = useRef<HTMLInputElement>(null)
    const content = useRef<HTMLTextAreaElement>(null)
    return (
        <div className='px-6 max-w-3xl mx-auto'>
            <div className='p-5 bg-web-foreground dark:bg-web-foreground-dark rounded-[20px] mb-6'>
                <div className='lg:col-span-4 col-span-2' dir='ltr'>
                    <Heading className=' text-web-accent dark:text-web-accent-dark mb-4 text-base'>Comment</Heading>
                </div>
                <input 
                    ref={search}
                    type="text" name="search" id="search"
                    className="bg-web-background dark:bg-web-background-dark font-semibold text-lg w-full py-2 px-4 rounded-xl mb-4"
                    onChange={(e)=>{
                        if(search.current?.value) search.current.value = transliterate(e.target.value)
                    }}
                    placeholder='ނަން'
                />
                <textarea 
                    ref={content}
                    name="search" id="content" rows={7}
                    className="bg-web-background dark:bg-web-background-dark font-semibold text-lg w-full py-3 px-4 rounded-xl"
                    onChange={(e)=>{
                        if(content.current?.value) content.current.value = transliterate(e.target.value)
                    }}
                    placeholder='ކޮމެންޓް'
                />
                <button type="button" className=' bg-web-primary dark:bg-web-primary-dark text-white px-8 py-2 rounded-lg font-bold ms-auto block hover:opacity-75 active:opacity-50'>{"ކޮމެންޓް"}</button>
            </div>
        </div>
    )
    }

export default Comment