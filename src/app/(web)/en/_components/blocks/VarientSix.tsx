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

const VarientSix:FC<Props> = ({ ...props }) => {
    return (
        <div>VarientSix</div>
    )
}

export default VarientSix