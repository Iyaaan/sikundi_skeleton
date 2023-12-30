import React, { FC } from 'react'

interface Props {
    data: {
        createdAt: Date
        category?: string
        title: string
        description?: string
        url: string
        featureImageUrl?: string
    }
    posts: {
        createdAt: Date
        title: string
        url: string
        createdBy?: {
            name: string
        }
    }[]
}

const VarientOne:FC<Props> = ({ data, posts, ...props }) => {
    return (
        <div>VarientOne</div>
    )
}

export default VarientOne