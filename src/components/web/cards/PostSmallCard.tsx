"use client"

import Image from "next/image"
import Link, { LinkProps } from 'next/link'
import React, { AnchorHTMLAttributes, FC } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
    data: {
        title: string
        featureImage: string
    }
};

const PostSmallCard:FC<Props> = ({data, ...props}) => {

    return (
        <Link {...props} className={twMerge([
            'relative group',
            props.className
        ])}>
            <div className='dark:bg-web-accent-wall bg-web-accent-wall-dark relative rounded-2xl lg:rounded-[20px] overflow-hidden aspect-[223/157] mb-[18px]'>
                {data.featureImage && <Image
                    src={"https://images.unsplash.com/photo-1692641995795-59026e35e458?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    alt={data.title}
                    fill
                    className='object-cover group-hover:scale-110 transition-all'
                />}
            </div>
            <h3 className='text-lg font-bold leading-snug group-hover:text-web-primary transition-all line-clamp-3'>
                {data.title}
            </h3>
        </Link>
    )
}

export default PostSmallCard