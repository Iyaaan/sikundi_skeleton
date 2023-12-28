"use client"

import Image from "next/image"
import Link, { LinkProps } from 'next/link'
import React, { AnchorHTMLAttributes, FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { ReceiptEdit } from 'iconsax-react'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
    data: {
        title: string
        description: string
        featureImage: string
    }
};

const PostMediumCard:FC<Props> = ({data, ...props}) => {

    return (
        <Link {...props} className={twMerge([
            'relative flex items-center flex-col group',
            props.className
        ])}>
            <div className='dark:bg-web-accent-wall bg-web-accent-wall-dark p-4 h-full relative lg:rounded-[20px] overflow-hidden w-full aspect-square lg:aspect-[704/433]'>
                <Image
                    src={data.featureImage}
                    alt={data.title}
                    fill
                    sizes="50vw"
                    className='object-cover group-hover:scale-110 transition-all'
                />
            </div>
            <div className='relative -mt-24 rounded-[20px] mx-4 flex flex-col'>
                <span className='absolute w-full h-full overflow-hidden'>
                    <span className='absolute w-full h-full bg-[#00000046] rounded-[20px] backdrop-blur-[11.2px]'>
                    
                    </span>
                </span>
                <div className='inline-block -mt-7 bg-web-primary p-4 text-web-foreground rounded-full self-center relative'>
                    <ReceiptEdit />
                </div>
                <div className='p-6 pt-4 text-center text-white relative'>
                    <h1 className='text-3xl font-bold mb-4 leading-snug group-hover:text-web-primary transition-all line-clamp-3'>
                        {data.title}
                    </h1>
                    <p className='mb-4 text-base font-normal line-clamp-4 opacity-50'>
                        {data.description}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default PostMediumCard