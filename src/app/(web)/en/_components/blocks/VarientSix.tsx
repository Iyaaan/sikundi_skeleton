import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import PostCategoryCard from '../cards/PostCategoryCard'
import { twMerge } from 'tailwind-merge'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title?: string
    posts: {
        createdAt: Date
        category?: string
        title: string
        description?: string
        url: string
        featureImageUrl?: string
    }[]
}

const VarientSix:FC<Props> = ({ title, posts, className, ...props }) => {
    return (
        <div {...props} className={twMerge(['container px-4', className])}>
            <h5 className='text-xl text-web-background-dark dark:text-web-background uppercase font-semibold mb-6'>{title}</h5>
            <div className='grid grid-cols-4 gap-4'>
                {posts?.map(({ url, ...post }, index) => <PostCategoryCard key={index} href={url} data={post} className='col-span-4 lg:col-span-2' />)}
            </div>
        </div>
    )
}

export default VarientSix