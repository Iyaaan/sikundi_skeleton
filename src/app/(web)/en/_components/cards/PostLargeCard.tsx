import React, { AnchorHTMLAttributes, FC } from 'react'
import Link, { LinkProps } from 'next/link'
import { twMerge } from 'tailwind-merge'
import Image from 'next/image'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
    data: {
        createdAt: Date
        category?: string
        title: string
        description?: string
        featureImageUrl?: string
    }
}

const PostLargeCard:FC<Props> = ({ data, className, ...props }) => {
    return (
        <Link {...props} className={twMerge(['flex flex-col justify-end bg-web-tertiary dark:bg-web-tertiary-dark lg:p-16 p-6 relative hover:opacity-90 active:opacity-75', className])}>
            <div className='absolute w-full h-full left-0 top-0'>
                {data?.featureImageUrl && <Image
                    src={data?.featureImageUrl}
                    alt={data?.title}
                    fill
                    sizes='100vw'
                    className='object-cover'
                />}
                <span className='gradient-feature-post inset-0 block absolute' />
            </div>
            <span suppressHydrationWarning className='flex gap-4 items-center mb-4 text-web-primary dark:text-web-primary-dark relative'>
                {data?.category && <span className='bg-web-primary dark:bg-web-primary-dark text-white py-1 px-4'>{data.category}</span>}
                {data?.createdAt?.toLocaleDateString()}
            </span>
            <b className='font-semibold text-white text-3xl mb-4 block relative'>{data.title}</b>
            {data?.description && <span className='block font-normal text-white text-xl relative'>{data.description}</span>}
        </Link>
    )
}

export default PostLargeCard