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
        <div {...props} className={twMerge(['container px-4', className])}>
            <h5 className='text-xl text-web-background-dark dark:text-web-background uppercase font-semibold mb-6'>{title}</h5>
            <div className='gap-4 flex overflow-x-auto snap-mandatory snap-x'>
                {posts?.map((post, index) => <PostCard key={index} href={post.url} className='min-w-[90%] lg:min-w-[calc(25%-1rem)] snap-start' data={{
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