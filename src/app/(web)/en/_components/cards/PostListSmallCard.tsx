import React, { AnchorHTMLAttributes, FC } from 'react'
import Link, { LinkProps } from 'next/link'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
    data: {
        createdAt?: Date
        title: string
    }
}

const PostListSmallCard:FC<Props> = ({ ...props }) => {
    return (
        <Link {...props}>
        
        </Link>
    )
}

export default PostListSmallCard