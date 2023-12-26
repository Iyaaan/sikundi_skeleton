'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { useInterval } from 'usehooks-ts'

interface Props {
    slides: {
        src: string | null;
        altText: string;
        href: string | null;
    }[]
    className?: string
}
export default function TBanner(props:Props) {
    const [slides, setSlides] = useState(props.slides)
    const [index, setIndex] = useState(0)
    useInterval(() => {
        if(slides?.length !== (index+1)) {
            setIndex(index+1)
        } else {
            setIndex(0)
        }
    }, 5000)

    if(!slides?.[index]?.src) return null

    return (
        <div className='container px-4'>
            <Link href={slides?.[index]?.href || ""} className={twMerge(['relative w-full aspect-[900/114] block bg-secondary rounded-xl overflow-hidden', props?.className])}>
                <Image src={slides?.[index]?.src || ""} fill alt={slides?.[index]?.altText || ""} className='object-cover w-full h-full' />
            </Link>
        </div>
    )
}
