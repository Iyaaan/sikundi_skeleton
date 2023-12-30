import React, { AnchorHTMLAttributes, FC } from 'react'
import { LinkProps } from 'next/link'

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
        <div>PostCard</div>
    )
}

export default PostCard