"use client"

import React from 'react'
import { YouTubeEmbed } from 'react-social-media-embed'
import { twMerge } from 'tailwind-merge'

export default function Youtube({id, className}:any) {
    return (
        <div className={twMerge([
            className
        ])}>
            <YouTubeEmbed url={`https://www.youtube.com/watch?v=${id}`} />
        </div>
    )
}
