"use client"

import Link, { LinkProps } from 'next/link'
import React, { AnchorHTMLAttributes, FC } from 'react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
    data: {
        coverImage: string
        alt: string
    }
};

const PortraitAd:FC<Props> = (props) => {
    return (
        <Link {...{...props, data: undefined}} className={twMerge([
            'aspect-[282/394] relative overflow-hidden rounded-lg lg:rounded-xl dark:bg-web-accent-wall bg-web-accent-wall-dark',
            props.className
        ])}>
            <Image
                src={props.data.coverImage}
                alt={props.data.alt}
                fill
                className='w-full h-full object-cover'
            />
        </Link>
    )
}

export default PortraitAd