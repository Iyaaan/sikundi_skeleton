"use client"

import Image from "next/image"
import Link, { LinkProps } from 'next/link'
import React, { AnchorHTMLAttributes, FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { Clock, ReceiptEdit } from 'iconsax-react'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
    priority?: boolean
    data: {
        title: string
        description: string
        publishedAt: string
        featureImage: string
    }
};

const PostCard:FC<Props> = ({data, priority = false, ...props}) => {

    return (
        <Link {...props} className={twMerge([
            'relative flex items-center lg:flex-row flex-col group',
            props.className
        ])}>
            <div className='flex-[6] dark:bg-web-accent-wall bg-web-accent-wall-dark p-4 h-full relative lg:rounded-[20px] overflow-hidden w-full aspect-square lg:aspect-auto lg:min-h-[400px]'>
                <Image
                    src={data.featureImage}
                    alt={data.title}
                    priority={priority}
                    fill
                    sizes="75vw"
                    className='object-cover group-hover:scale-110 transition-all'
                />
            </div>
            <div className='flex-[4] bg-web-foreground dark:bg-web-foreground-dark relative lg:-ms-5 -mt-10 lg:mt-0 rounded-[20px] mx-4 lg:mx-0 flex flex-col lg:flex-row'>
                <div className='inline-block -mt-7 lg:-ms-7 bg-web-background-dark p-4 text-web-foreground rounded-full self-center lg:self-start lg:mt-10'>
                    <ReceiptEdit />
                </div>
                <div className='p-10 lg:pr-4 pt-4 lg:pt-10'>
                    <h1 className='text-3xl font-bold mb-4 leading-snug group-hover:text-web-primary transition-all line-clamp-3'>
                        {data.title}
                    </h1>
                    <p className='mb-4 text-base font-normal text-web-accent-sub dark:text-web-accent-sub-dark line-clamp-4'>
                        {data.description}
                    </p>
                    <span dir='ltr' suppressHydrationWarning className='text-web-accent-des dark:text-web-accent-des-dark'>
                        <Clock className='inline mr-1 h-4' />
                        {new Date(data.publishedAt).toLocaleString()}
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default PostCard