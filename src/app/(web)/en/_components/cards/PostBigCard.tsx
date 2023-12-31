import Link from 'next/link'
import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    data: {
        createdAt: Date
        category?: string
        title: string
        description?: string
        url: string
    }
}

const PostBigCard:FC<Props> = ({ data, ...props }) => {
    return (
        <div { ...props }>
            <h6 suppressHydrationWarning>
                {`${data.createdAt.toDateString()}${data.category && `| ${data.category}`}`}
            </h6>
            <h1>
                {data.title}
            </h1>
            {data.description && <p>
                {data.description}
            </p>}
            <Link href={data.url}>
                {"Read More"}
            </Link>
        </div>
    )
}

export default PostBigCard