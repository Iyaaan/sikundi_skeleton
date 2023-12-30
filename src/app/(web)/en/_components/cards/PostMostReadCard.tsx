import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    posts: {
        createdAt: Date
        title: string
        url: string
        createdBy?: {
            name: string
        }
    }[]
}

const PostMostReadCard:FC<Props> = ({ ...props }) => {
    return (
        <div>PostMostReadCard</div>
    )
}

export default PostMostReadCard