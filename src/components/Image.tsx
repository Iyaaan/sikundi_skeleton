import React from 'react'
import NextImage, { ImageProps } from 'next/image'

interface Props extends ImageProps {
    cdn?: boolean
}

export default function Image({cdn = false, ...props}:Props) {
    return props.src && (
        <NextImage
            {...props}
            src={`${(process.env.NEXT_PUBLIC_CDN_URL && cdn) ? process.env.NEXT_PUBLIC_CDN_URL : ''}${props.src}`}
            sizes='50vw'
        />
    )
}
