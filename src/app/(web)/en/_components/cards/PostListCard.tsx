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

const PostListCard:FC<Props> = ({ data, ...props }) => {
    return (
        <Link {...props}>
            <span suppressHydrationWarning>
                {data?.category && <span>{data.category}</span>}
                {data?.createdAt?.toLocaleDateString()}
            </span>
            <b>{data.title}</b>
            {data?.description && <span>{data.description}</span>}
        </Link>
    )
}

export default PostListCard