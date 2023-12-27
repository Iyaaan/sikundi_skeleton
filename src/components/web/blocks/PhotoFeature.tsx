"use client"

import Image from "next/image"
import React, { AnchorHTMLAttributes, FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { ReceiptEdit } from 'iconsax-react'

type Props = AnchorHTMLAttributes<HTMLDivElement> & {
    data: {
        title: string
        featureImage: string
        description?: string
        published: {
            by: {
                photo: string
                name: string
            }
            date: Date
        }
    }
};

const PhotoFeature:FC<Props> = ({data, ...props}) => {
    return (
        <div {...props} className={twMerge([
            'relative flex items-center flex-col',
            props.className
        ])}>
            <div className='dark:bg-web-accent-wall bg-web-accent-wall-dark p-4 h-full relative lg:rounded-[20px] overflow-hidden w-full aspect-square lg:aspect-[704/433]'>
                <Image
                    src={"https://images.unsplash.com/photo-1692641995795-59026e35e458?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    alt={data.title}
                    fill
                    className='object-cover transition-all'
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
                    <h1 className='text-3xl font-bold mb-4 leading-snug transition-all line-clamp-3'>
                        {data.title}
                    </h1>
                    <p className='mb-4 text-base font-normal line-clamp-4 opacity-50'>
                        {data.description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PhotoFeature