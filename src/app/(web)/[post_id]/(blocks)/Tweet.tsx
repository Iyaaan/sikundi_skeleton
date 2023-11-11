"use client"

import React from 'react'
import { TwitterEmbed } from 'react-social-media-embed'
import { twMerge } from 'tailwind-merge'

export default function Tweet({id, className}:any) {
    return (
        <div className={twMerge([
            className
        ])}>
            <TwitterEmbed url={`https://twitter.com/user/status/${id}`} />
        </div>
    )
}
