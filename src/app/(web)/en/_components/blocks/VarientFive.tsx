import React, { FC } from 'react'

interface Props {
    title?: string
    posts: {
        createdAt?: Date
        createdBy?: {
            name: string
        }
        category?: string
        title: string
        description?: string
        url: string
        featureImageUrl?: string
    }[]
}

const VarientFive:FC<Props> = ({ ...props }) => {
    return (
        <div>VarientFive</div>
    )
}

export default VarientFive