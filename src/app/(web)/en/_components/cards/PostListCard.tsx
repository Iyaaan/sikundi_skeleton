import React, { AnchorHTMLAttributes, FC } from 'react'
import Link, { LinkProps } from 'next/link'

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
        <Link {...props}>
        
        </Link>
    )
}

export default PostListCard