"use client"

import Image from "@sikundi/components/Image"
import React, { AnchorHTMLAttributes, FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { Clock, ReceiptEdit, Facebook, Instagram, Youtube, Whatsapp } from 'iconsax-react'
import Link from 'next/link'

type Props = AnchorHTMLAttributes<HTMLDivElement> & {
    data: {
        title: string
        featureImage?: string | null
        tags: string[]
        published: {
            by: {
                photo: string
                name: string
            }
            date: Date
        }
        social: {
            facebook: string
            instagram: string
            youtube: string
            whatsapp: string
        }
    }
};

const Feature:FC<Props> = ({data, ...props}) => {
    return (
        <div {...props} className={twMerge([
            '',
            props.className
        ])}>
            <div className='relative flex items-start flex-col lg:mb-12'>
                <div className='dark:bg-web-accent-wall bg-web-accent-wall-dark p-4 h-full relative lg:rounded-[20px] overflow-hidden w-full aspect-square lg:aspect-[704/433]'>
                    {data?.featureImage && 
                    <Image
                        cdn={true}
                        src={data.featureImage}
                        alt={data.title}
                        fill
                        className='object-cover'
                    />}
                </div>
                <div className='lg:absolute relative lg:-bottom-12 rounded-[20px] mx-4 -mt-[25%] lg:mt-0 flex flex-col'>
                    <span className='absolute w-full h-full overflow-hidden'>
                        <span className='absolute w-full h-full dark:bg-[#00000075] bg-[#FFFFFF75] rounded-[20px] backdrop-blur-[11.2px] border-[#00000014] border'>
                        
                        </span>
                    </span>
                    <div className='inline-block -mt-7 lg:ms-14 mx-auto bg-web-background-dark p-4 text-web-foreground rounded-full self-start relative'>
                        <ReceiptEdit />
                    </div>
                    <div className='py-6 lg:px-14 px-10 pt-4 relative max-w-2xl'>
                        {data?.tags?.map((tag, index)=>(
                            <p key={index} className='text-web-secondary dark:text-white inline-block me-3 mb-3 text-lg'># {tag}</p>
                        ))}
                        <h1 className='text-[32px] font-bold mb-4 leading-snug transition-all line-clamp-3 lg:me-12 text-web-secondary dark:text-white'>
                            {data.title}
                        </h1>
                        <div className='flex items-center gap-8 gap-y-3 flex-wrap'>
                            <Link href={"#"} className='flex items-center gap-2 group'>
                                <span className='w-10 aspect-square rounded-full bg-web-background-dark mb-1'></span>
                                <p className='text-lg font-bold text-black dark:text-white group-hover:text-web-primary'>{data.published.by.name}</p>
                            </Link>
                            <p dir='ltr' suppressHydrationWarning className='text-web-accent dark:text-web-accent-des-dark mt-2 hidden lg:block'>
                                <Clock className='inline mr-1 h-4' />
                                {new Date(data.published.date).toLocaleString()}
                            </p>
                            <div className='flex items-center gap-3 flex-1 justify-center lg:justify-start' dir='ltr'>
                                <Facebook /> 
                                <Instagram />
                                <Youtube />
                                <Whatsapp />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feature