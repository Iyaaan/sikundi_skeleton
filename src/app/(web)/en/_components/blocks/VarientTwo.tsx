import React, { FC } from 'react'

interface Props {
    title?: string
    posts: {
        createdAt: Date
        category?: string
        title: string
        description?: string
        url: string
        featureImageUrl?: string
    }[]
}

const VarientTwo:FC<Props> = ({ title, posts, ...props }) => {
    return (
        <div>VarientTwo</div>
    )
}

export default VarientTwo