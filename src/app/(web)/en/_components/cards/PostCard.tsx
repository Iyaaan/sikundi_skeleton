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
    imgFill?: boolean
}

const PostCard:FC<Props> = ({ data, className, imgFill, ...props }) => {
    return (
        <Link {...props} className={twMerge(['hover:opacity-90 active:opacity-75 flex flex-col', className])}>
            <span className={twMerge([
                'block relative w-full aspect-[294.56/189.03]',
                imgFill && 'flex-1'
            ])}>
                {data.featureImageUrl && <Image src={data.featureImageUrl} fill sizes='75vw' alt={data.title} className='object-cover' /> }
            </span>
            {data?.category && <span className='block -mt-3 relative ml-2'>
                <span className='bg-web-primary dark:bg-web-primary-dark text-white py-1 px-4 '>{data.category}</span>
            </span>}
            <b className='font-semibold text-xl block mt-3'>{data.title}</b>
            {data?.createdAt && <span className='mt-2 block' suppressHydrationWarning>{data.createdAt.toLocaleDateString()}</span>}
            {data?.description && <span className='block mt-2'>{data.description}</span>}
            <span className='mt-4 block'>
                {data?.createdBy?.profilePicture && <span></span>}
                {data?.createdBy && `by ${data.createdBy.name}`}
            </span>
        </Link>
    )
}

export default PostCard