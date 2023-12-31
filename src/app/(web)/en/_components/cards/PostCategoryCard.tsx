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
        <Link {...props} className={twMerge(['', className])}>
            <span className='block relative'>
                {data.featureImageUrl && <Image src={data.featureImageUrl} fill sizes='75vw' alt={data.title} /> }
            </span>
            <span>
                <span suppressHydrationWarning>
                    {data?.category && <span>{data.category}</span>}
                    {data?.createdAt?.toLocaleDateString()}
                </span>
                <b>{data.title}</b>
                {data?.description && <span>{data.description}</span>}
            </span>
        </Link>
    )
}

export default PostCategoryCard