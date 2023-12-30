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
    mostRead: {
        createdAt: Date
        title: string
        url: string
        createdBy?: {
            name: string
        }
    }[]
}

const VarientOne:FC<Props> = ({ data, mostRead, ...props }) => {
    return (
        <div>VarientOne</div>
    )
}

export default VarientOne