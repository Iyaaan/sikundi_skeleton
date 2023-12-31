import React, { AnchorHTMLAttributes, FC } from 'react'
import Link, { LinkProps } from 'next/link'
import { twMerge } from 'tailwind-merge'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
    data: {
        createdAt?: Date
        title: string
    }
}

const PostListSmallCard:FC<Props> = ({ data, className, ...props }) => {
    return (
        <Link {...props} className={twMerge(['border-b-2 border-web-accent dark:border-web-accent-dark block hover:opacity-75 active:opacity-50', className])}>
            <b className='block font-semibold text-base mb-5'>{data.title}</b>
            <span className='block font-normal text-xs text-web-primary mb-4' suppressHydrationWarning>{data.createdAt?.toLocaleDateString()}</span>
        </Link>
    )
}

export default PostListSmallCard