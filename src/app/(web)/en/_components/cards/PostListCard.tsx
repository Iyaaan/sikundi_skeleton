import React, { AnchorHTMLAttributes, FC } from 'react'
import { LinkProps } from 'next/link'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
    data: {
        createdAt: Date
        category?: string
        title: string
        description?: string
    }
}

const PostListCard:FC<Props> = ({ ...props }) => {
    return (
        <div>PostListCard</div>
    )
}

export default PostListCard