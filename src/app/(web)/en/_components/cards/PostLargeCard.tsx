import React, { AnchorHTMLAttributes, FC } from 'react'
import { LinkProps } from 'next/link'

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
        <div>PostLargeCard</div>
    )
}

export default PostLargeCard