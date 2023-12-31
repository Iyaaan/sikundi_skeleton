import React, { AnchorHTMLAttributes, FC } from 'react'
import Link, { LinkProps } from 'next/link'
import Image from 'next/image'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
    data: {
        createdBy?: {
            name: string
        }
        title: string
        featureImageUrl?: string
    }
}

const GalleryCard:FC<Props> = ({ data, ...props }) => {
    return (
        <Link {...props}>
            <span className='block relative'>
                {data.featureImageUrl && <Image src={data.featureImageUrl} fill sizes='75vw' alt={data.title} /> }
            </span>
            <b>{data.title}</b>
            <span>
                <span></span>
                {data?.createdBy && `by ${data.createdBy.name}`}
            </span>
            
        </Link>
    )
}

export default GalleryCard