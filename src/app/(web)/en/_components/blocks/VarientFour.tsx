import React, { FC } from 'react'

interface Props {
    title?: string
    posts: {
        createdBy?: {
            name: string
        }
        title: string
        url: string
        featureImageUrl?: string
    }[]
}

const VarientFour:FC<Props> = ({ title, posts, ...props }) => {
    return (
        <div>VarientFour</div>
    )
}

export default VarientFour