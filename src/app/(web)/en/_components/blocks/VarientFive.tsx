import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import PostListSmallCard from '../cards/PostListSmallCard'
import { twMerge } from 'tailwind-merge'
import PostCard from '../cards/PostCard'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title?: string
    posts: {
        createdAt?: Date
        createdBy?: {
            name: string
        }
        category?: string
        title: string
        description?: string
        url: string
        featureImageUrl?: string
    }[]
}

const VarientFive:FC<Props> = ({ title, posts, className, ...props }) => {
    return (
        <div {...props} className={twMerge(['container px-4', className])}>
            <h5 className='text-xl text-web-background-dark dark:text-web-background uppercase font-semibold mb-6'>{title}</h5>
            <div className='grid grid-cols-4 gap-4'>
                {posts?.[0] && <PostCard href={posts[0].url} imgFill className='lg:col-span-2 lg:row-span-2 col-span-4 lg:order-1' data={{
                    createdAt: posts[0].createdAt,
                    createdBy: posts[0].createdBy,
                    category: posts[0].category,
                    title: posts[0].title,
                    description: posts[0].description,
                    featureImageUrl: posts[0].featureImageUrl
                }} />} 
                {posts?.[1] && <PostCard href={posts[1].url} className='lg:order-2 col-span-2 lg:col-span-1' data={{
                    createdAt: posts[1].createdAt,
                    createdBy: posts[1].createdBy,
                    category: posts[1].category,
                    title: posts[1].title,
                    description: posts[1].description,
                    featureImageUrl: posts[1].featureImageUrl
                }} />}
                {posts?.[2] && <PostCard href={posts[2].url} className='lg:order-4 col-span-2 lg:col-span-1' data={{
                    createdAt: posts[2].createdAt,
                    createdBy: posts[2].createdBy,
                    category: posts[2].category,
                    title: posts[2].title,
                    description: posts[2].description,
                    featureImageUrl: posts[2].featureImageUrl
                }} />}
                <div className='lg:col-span-1 col-span-4 lg:row-span-2 lg:order-3'>
                    {posts?.map(({ url, ...post }, index) => (index > 2 && <PostListSmallCard key={index} href={url} data={post} className=' mb-4' />))}
                </div>
            </div>
        </div>
    )
}

export default VarientFive