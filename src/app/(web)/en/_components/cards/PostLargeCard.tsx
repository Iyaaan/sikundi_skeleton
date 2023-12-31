import React, { AnchorHTMLAttributes, FC } from 'react'
import Link, { LinkProps } from 'next/link'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
    data: {
        createdAt: Date
        category?: string
        title: string
        description?: string
        featureImageUrl?: string
    }
}

const PostLargeCard:FC<Props> = ({ ...props }) => {
    return (
        <Link {...props}>
        
        </Link>
    )
}

export default PostLargeCard