import React, { AnchorHTMLAttributes, FC } from 'react'
import Link, { LinkProps } from 'next/link'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
    data: {
        createdAt?: Date
        title: string
    }
}

const PostListSmallCard:FC<Props> = ({ data, ...props }) => {
    return (
        <Link {...props}>
            <b>{data.title}</b>
            <span>{data.createdAt?.toLocaleDateString()}</span>
        </Link>
    )
}

export default PostListSmallCard