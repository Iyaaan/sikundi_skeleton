import React, { AnchorHTMLAttributes, FC } from 'react'
import Link, { LinkProps } from 'next/link'
import Image from 'next/image'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
    data: {
        createdBy?: {
            name: string
            profilePicture?: string
        }
        category?: string
        createdAt?: Date
        description?: string
        title: string
        featureImageUrl?: string
    }
}

const PostCard:FC<Props> = ({ data, ...props }) => {
    return (
        <Link {...props}>
            <span className='block relative'>
                {data.featureImageUrl && <Image src={data.featureImageUrl} fill sizes='75vw' alt={data.title} /> }
            </span>
            {data?.category && <span>{data.category}</span>}
            <b>{data.title}</b>
            {data?.createdAt && <span suppressHydrationWarning>{data.createdAt.toLocaleDateString()}</span>}
            {data?.description && <span>{data.description}</span>}
            <span>
                {data?.createdBy?.profilePicture && <span></span>}
                {data?.createdBy && `by ${data.createdBy.name}`}
            </span>
        </Link>
    )
}

export default PostCard