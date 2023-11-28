"use client"

import Image from "@sikundi/app/_component/Image"
import Link, { LinkProps } from 'next/link'
import React, { AnchorHTMLAttributes, FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { Clock, ReceiptEdit } from 'iconsax-react'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
    data: {
        title: string
        description: string
        publishedAt: string
        featureImage: string
    }
};

const PostBigCard:FC<Props> = ({data, ...props}) => {
    return (
        <Link {...props} className={twMerge([
            'relative flex items-center flex-col group',
            props.className
        ])}>
            <div className='dark:bg-web-accent-wall bg-web-accent-wall-dark p-4 h-full relative lg:rounded-[20px] overflow-hidden w-full aspect-square lg:aspect-[1083/520]'>
                <Image
                    cdn={true}
                    src={data.featureImage}
                    alt={data.title}
                    fill
                    className='object-cover group-hover:scale-110 transition-all'
                />
            </div>
            <div className='relative rounded-[20px] mx-4 flex flex-col bg-web-foreground dark:bg-web-foreground-dark -mt-12 lg:mt-0 pb-6 lg:pb-0'>
                <div className='inline-block -mt-7 bg-web-background-dark p-4 text-web-foreground rounded-full self-center'>
                    <ReceiptEdit />
                </div>
                <div className='px-10 lg:pr-4 pt-4 lg:pt-6 text-center'>
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

export default PostBigCard