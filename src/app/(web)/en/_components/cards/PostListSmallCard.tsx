import React, { AnchorHTMLAttributes, FC } from 'react'
import { LinkProps } from 'next/link'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
    data: {
        createdAt?: Date
        title: string
    }
}

const PostListSmallCard:FC<Props> = ({ ...props }) => {
    return (
        <div>PostListSmallCard</div>
    )
}

export default PostListSmallCard