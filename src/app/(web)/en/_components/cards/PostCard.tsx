import React, { AnchorHTMLAttributes, FC } from 'react'
import Link, { LinkProps } from 'next/link'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
    data: {
        createdBy?: {
            name: string
        }
        category?: string
        title: string
        featureImageUrl?: string
    }
}

const PostCard:FC<Props> = ({ ...props }) => {
    return (
        <Link {...props}>
            
        </Link>
    )
}

export default PostCard