import React, { AnchorHTMLAttributes, FC } from 'react'
import Link, { LinkProps } from 'next/link'
import { twMerge } from 'tailwind-merge'

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
        <Link {...props} className={twMerge(['flex flex-col justify-end', className])}>
            <span suppressHydrationWarning>
                {data?.category && <span>{data.category}</span>}
                {data?.createdAt?.toLocaleDateString()}
            </span>
            <b>{data.title}</b>
            {data?.description && <span>{data.description}</span>}
        </Link>
    )
}

export default PostLargeCard