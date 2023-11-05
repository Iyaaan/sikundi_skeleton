"use client"

import Link, { LinkProps } from 'next/link'
import React, { AnchorHTMLAttributes, FC } from 'react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
    containerClass?: string
    data: {
        coverImage: string
        alt: string
    }
};

const LandScapeAd:FC<Props> = ({data, containerClass, ...props}) => {
    return (
        <div className={twMerge([containerClass])}>
            <Link {...props} className={twMerge([
                'aspect-[1262/248] block w-full relative overflow-hidden rounded-lg lg:rounded-2xl dark:bg-web-accent-wall bg-web-accent-wall-dark',
                props.className
            ])}>
                <Image
                    src={data.coverImage}
                    alt={data.alt}
                    fill
                    className='w-full h-full object-cover'
                />
            </Link>
        </div>
    )
}

export default LandScapeAd