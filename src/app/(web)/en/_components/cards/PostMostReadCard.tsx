import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import PostListMediumCard from './PostListMediumCard'
import { twMerge } from 'tailwind-merge'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title?: string
    posts: {
        createdAt: Date
        title: string
        url: string
        createdBy?: {
            name: string
        }
    }[]
}

const PostMostReadCard:FC<Props> = ({ title, posts, className, ...props }) => {
    return (
        <div {...props} className={twMerge(['bg-[#0D3167] px-11 py-10', className])}>
            {title && <h6 className='font-normal text-white opacity-70 text-sm uppercase mb-5'>{title}</h6>}
            {posts?.map(({url, ...post}, index)=><PostListMediumCard key={index} data={post} href={url} className={twMerge([
                index !== posts.length - 1 && 'mb-11'
            ])} />)}
        </div>
    )
}

export default PostMostReadCard