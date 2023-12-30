import React, { AnchorHTMLAttributes, FC } from 'react'
import { LinkProps } from 'next/link'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
    data: {
        createdAt?: Date
        createdBy?: {
            name: string
        }
        category?: string
        title: string
        description?: string
        featureImageUrl?: string
    }
}

const PostMediumCard:FC<Props> = ({ ...props }) => {
    return (
        <div>PostMediumCard</div>
    )
}

export default PostMediumCard