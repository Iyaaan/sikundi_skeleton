import React, { AnchorHTMLAttributes, FC } from 'react'
import Link, { LinkProps } from 'next/link'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
    data: {
        createdBy?: {
            name: string
        }
        title: string
        featureImageUrl?: string
    }
}

const GalleryCard:FC<Props> = ({ data, className, ...props }) => {
    return (
        <Link {...props} className={twMerge(['hover:opacity-90 active:opacity-75 flex flex-col', className])}>
            <span className='block relative w-full aspect-[294.56/189.03] flex-1'>
                {data.featureImageUrl && <Image src={data.featureImageUrl} fill sizes='75vw' alt={data.title} className='object-cover' /> }
            </span>
            <b className='font-semibold mb-4 text-xl block mt-3 text-white'>{data.title}</b>
            <span className='text-white block'>
                <span></span>
                {data?.createdBy && `by ${data.createdBy.name}`}
            </span>
            
        </Link>
    )
}

export default GalleryCard