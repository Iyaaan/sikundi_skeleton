import React, { AnchorHTMLAttributes, FC } from 'react'
import Link, { LinkProps } from 'next/link'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
    data: {
        createdBy?: {
            name: string
            profilePicture?: string
        }
        category?: string
        createdAt?: Date
        description?: string
        title: string
        featureImageUrl?: string
    }
}

const PostCard:FC<Props> = ({ data, className, ...props }) => {
    return (
        <Link {...props} className={twMerge(['hover:opacity-90 active:opacity-75', className])}>
            <span className='block relative w-full aspect-[294.56/189.03]'>
                {data.featureImageUrl && <Image src={data.featureImageUrl} fill sizes='75vw' alt={data.title} /> }
            </span>
            {data?.category && <span className='block -mt-3 relative ml-2 mb-3'>
                <span className='bg-web-primary dark:bg-web-primary-dark text-white py-1 px-4 '>{data.category}</span>
            </span>}
            <b className='font-semibold mb-4 text-xl block'>{data.title}</b>
            {data?.createdAt && <span suppressHydrationWarning>{data.createdAt.toLocaleDateString()}</span>}
            {data?.description && <span>{data.description}</span>}
            <span>
                {data?.createdBy?.profilePicture && <span></span>}
                {data?.createdBy && `by ${data.createdBy.name}`}
            </span>
        </Link>
    )
}

export default PostCard