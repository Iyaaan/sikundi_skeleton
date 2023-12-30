import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    data: {
        createdAt: Date
        category?: string
        title: string
        description?: string
        url: string
    }
}

const PostBigCard:FC<Props> = ({ ...props }) => {
    return (
        <div>PostBigCard</div>
    )
}

export default PostBigCard