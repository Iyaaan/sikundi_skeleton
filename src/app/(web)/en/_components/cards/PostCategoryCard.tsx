import React, { AnchorHTMLAttributes, FC } from 'react'
import Link, { LinkProps } from 'next/link'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
    data: {
        createdBy?: {
            name: string
        }
        category?: string
        createdAt?: Date
        title: string
        description?: string
        featureImageUrl?: string
    }
}

const PostCategoryCard:FC<Props> = ({ ...props }) => {
    return (
        <Link {...props}>
        
        </Link>
    )
}

export default PostCategoryCard