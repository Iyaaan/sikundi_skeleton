import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import PostCard from '@sikundi/app/(web)/en/_components/cards/PostCard'
import { twMerge } from 'tailwind-merge'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title?: string
    posts: {
        createdBy?: {
            name: string
        }
        category?: string
        title: string
        url: string
        featureImageUrl?: string
    }[]
}

const VarientThree:FC<Props> = ({ title, posts, className, ...props }) => {
    return (
        <div {...props} className={twMerge(['', className])}>
            <h5>{title}</h5>
            <div className='flex gap-4'>
                {posts?.map((post, index) => <PostCard key={index} href={post.url} data={{
                    createdBy: post.createdBy,
                    category: post.category,
                    title: post.title,
                    featureImageUrl: post.featureImageUrl
                }} />)}
            </div>
        </div>
    )
}

export default VarientThree