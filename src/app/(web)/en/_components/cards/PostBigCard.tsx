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
            <h6 suppressHydrationWarning className='text-web-primary dark:text-web-primary-dark font-normal text-sm mb-5'>
                {`${data.createdAt.toDateString()}${data.category && ` | ${data.category}`}`}
            </h6>
            <h1 className='font-semibold text-4xl text-white mb-5'>
                {data.title}
            </h1>
            {data.description && <p className='text-white text-xl font-light mb-14'>
                {data.description}
            </p>}
            <Link href={data.url} className='bg-web-primary dark:bg-web-primary-dark text-white py-3 px-11 hover:opacity-75 active:opacity-50'>
                {"Read More"}
            </Link>
        </div>
    )
}

export default PostBigCard