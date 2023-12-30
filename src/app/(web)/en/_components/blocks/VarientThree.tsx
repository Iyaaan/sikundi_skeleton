import React, { FC } from 'react'

interface Props {
    title?: string
    posts: {
        createdBy?: {
            name: string
        }
        category?: string
        title: string
        url: string
        featureImageUrl?: string
    }[]
}

const VarientThree:FC<Props> = ({ title, posts, ...props }) => {
    return (
        <div>VarientThree</div>
    )
}

export default VarientThree