"use client"

import React from 'react'
import { FacebookEmbed } from 'react-social-media-embed'
import { twMerge } from 'tailwind-merge'

export default function Youtube({id, className}:any) {
    return (
        <div className={twMerge([
            className
        ])}>
            <FacebookEmbed url={`https://www.facebook.com/123/posts/${id}`} />
        </div>
    )
}
