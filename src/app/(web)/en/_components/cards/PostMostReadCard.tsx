import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import PostListMediumCard from './PostListMediumCard'

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

const PostMostReadCard:FC<Props> = ({ title, posts, ...props }) => {
    return (
        <div {...props}>
            {title && <h6>{title}</h6>}
            {posts?.map(({url, ...post}, index)=><PostListMediumCard key={index} data={post} href={url} />)}
        </div>
    )
}

export default PostMostReadCard