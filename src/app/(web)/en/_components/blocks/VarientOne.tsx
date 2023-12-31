import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import PostBigCard from '@sikundi/app/(web)/en/_components/cards/PostBigCard'
import PostMostReadCard from '@sikundi/app/(web)/en/_components/cards/PostMostReadCard'
import { twMerge } from 'tailwind-merge'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    data: {
        createdAt: Date
        category?: string
        title: string
        description?: string
        url: string
        featureImageUrl?: string
    }
    posts: {
        createdAt: Date
        title: string
        url: string
        createdBy?: {
            name: string
        }
    }[]
}

const VarientOne:FC<Props> = ({ data, posts, className, ...props }) => {
    return (
        <div { ...props } className={twMerge(['relative min-h-[calc(100vh-150px)] flex flex-col justify-end', className])}>
            <div className="container grid grid-cols-12 gap-4 px-4 relative">
                <PostBigCard className='lg:col-span-5 col-span-12' data={{
                    createdAt: data.createdAt,
                    category: data.category,
                    title: data.title,
                    description: data.description,
                    url: data.url,
                }} />
                <PostMostReadCard title='Most Read' className='lg:col-span-4 col-span-12 lg:col-start-9' posts={posts} />
            </div>
        </div>
    )
}

export default VarientOne