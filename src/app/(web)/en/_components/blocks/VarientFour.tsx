import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import GalleryCard from '@sikundi/app/(web)/en/_components/cards/GalleryCard'
import { twMerge } from 'tailwind-merge'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title?: string
    posts: {
        createdBy?: {
            name: string
        }
        title: string
        url: string
        featureImageUrl?: string
    }[]
}

const VarientFour:FC<Props> = ({ title, posts, className, ...props }) => {
    return (
        <div {...props} className={twMerge(['bg-web-secondary dark:bg-web-secondary-dark', className])}>
            <div className='container px-4'>
                <h5>{title}</h5>
                <div className='grid grid-cols-6 gap-4'>
                    {posts?.map(({ url, ...post }, index) => <GalleryCard key={index} href={url} data={post} className={twMerge([
                        index === 0 ? "lg:col-span-3 col-span-6 row-span-2" : "lg:col-span-1 col-span-3"
                    ])} />)}
                </div>
            </div>
        </div>
    )
}

export default VarientFour