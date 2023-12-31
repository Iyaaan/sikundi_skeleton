import React, { AnchorHTMLAttributes, FC } from 'react'
import Link, { LinkProps } from 'next/link'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
    data: {
        category?: string
        createdAt?: Date
        title: string
        description?: string
        featureImageUrl?: string
    }
}

const PostCategoryCard:FC<Props> = ({ data, className, ...props }) => {
    return (
        <Link {...props} className={twMerge(['hover:opacity-90 active:opacity-75 grid grid-cols-12 gap-8', className])}>
            <span className={twMerge([
                'block relative w-full aspect-[209/189] col-span-5',
            ])}>
                {data.featureImageUrl && <Image src={data.featureImageUrl} fill sizes='75vw' alt={data.title} className='object-cover' /> }
            </span>
            <span className='col-span-7'>
                <span suppressHydrationWarning className='flex items-center gap-3'>
                    {data?.category && <span className='relative text-primary'>
                        <span className='bg-web-primary dark:bg-web-primary-dark text-white py-1 px-4 '>{data.category}</span>
                    </span>}
                    {data?.createdAt?.toLocaleDateString()}
                </span>
                <b className='font-semibold lg:text-xl text-base block mt-3'>{data.title}</b>
                {data?.description && <span className='mt-2 hidden lg:block'>{data.description}</span>}
            </span>
        </Link>
    )
}

export default PostCategoryCard