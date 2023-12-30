import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import PostMediumCard from '../cards/PostMediumCard'
import PostListSmallCard from '../cards/PostListSmallCard'
import { twMerge } from 'tailwind-merge'

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
        <div {...props} className={twMerge(['', className])}>
            <h5>{title}</h5>
            <div className='grid grid-cols-4 gap-4'>
                {posts?.[0] && <PostMediumCard href={posts[0].url} data={{
                    createdAt: posts[0].createdAt,
                    createdBy: posts[0].createdBy,
                    category: posts[0].category,
                    title: posts[0].title,
                    description: posts[0].description,
                    featureImageUrl: posts[0].featureImageUrl
                }} />}
                <div>
                    {posts?.[1] && <PostMediumCard href={posts[1].url} data={{
                        createdAt: posts[1].createdAt,
                        createdBy: posts[1].createdBy,
                        category: posts[1].category,
                        title: posts[1].title,
                        description: posts[1].description,
                        featureImageUrl: posts[1].featureImageUrl
                    }} />}
                    {posts?.[2] && <PostMediumCard href={posts[2].url} data={{
                        createdAt: posts[2].createdAt,
                        createdBy: posts[2].createdBy,
                        category: posts[2].category,
                        title: posts[2].title,
                        description: posts[2].description,
                        featureImageUrl: posts[2].featureImageUrl
                    }} />}
                </div>
                <div>
                    {posts?.map(({ url, ...post }, index) => (index > 2 && <PostListSmallCard key={index} href={url} data={post} />))}
                </div>
            </div>
        </div>
    )
}

export default VarientFive