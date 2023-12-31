import React, { AnchorHTMLAttributes, FC } from 'react'
import Link, { LinkProps } from 'next/link'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
    data: {
        createdBy?: {
            name: string
        }
        title: string
        featureImageUrl?: string
    }
}

const GalleryCard:FC<Props> = ({ ...props }) => {
    return (
        <Link {...props}>
            
        </Link>
    )
}

export default GalleryCard