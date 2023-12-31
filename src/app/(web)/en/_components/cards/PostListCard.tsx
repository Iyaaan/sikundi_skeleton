import React, { AnchorHTMLAttributes, FC } from 'react'
import Link, { LinkProps } from 'next/link'
import { twMerge } from 'tailwind-merge'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
    data: {
        createdAt: Date
        category?: string
        title: string
        description?: string
    }
}

const PostListCard:FC<Props> = ({ data, className, ...props }) => {
    return (
        <Link {...props} className={twMerge(['block hover:opacity-75 active:opacity-50', className])}>
            <span suppressHydrationWarning className='flex gap-4 items-center mb-4'>
                {data?.category && <span className='bg-web-primary dark:bg-web-primary-dark text-white py-1 px-4'>{data.category}</span>}
                {data?.createdAt?.toLocaleDateString()}
            </span>
            <b className='font-semibold text-web-background-dark dark:text-web-background mb-2'>{data.title}</b>
            {data?.description && <span className='font-normal text-web-background-dark dark:text-web-background'>
                {data.description}
            </span>}
        </Link>
    )
}

export default PostListCard