import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import PostLargeCard from '@sikundi/app/(web)/en/_components/cards/PostLargeCard'
import PostListCard from '@sikundi/app/(web)/en/_components/cards/PostListCard'

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

const VarientTwo:FC<Props> = ({ title, posts, className, ...props }) => {
    return (
        <div { ...props } className={twMerge(['container px-4', className])}>
            <h5>{title}</h5>
            <div className='grid grid-cols-12 gap-4'>
                <div className='col-span-12 lg:col-span-4'>
                    {posts?.map(({ url, ...post }, index) => index !== 0 && <PostListCard key={index} href={url} data={{
                        createdAt: post.createdAt,
                        category: post.category,
                        title: post.title,
                        description: post.description
                    }} />)}
                </div>
                {posts?.[0] && <PostLargeCard href={posts?.[0].url} className='col-span-12 lg:col-span-8' data={{
                    createdAt: posts?.[0].createdAt,
                    category: posts?.[0].category,
                    title: posts?.[0].title,
                    description: posts?.[0].description,
                    featureImageUrl: posts?.[0].featureImageUrl,
                }} />}
            </div>
        </div>
    )
}

export default VarientTwo