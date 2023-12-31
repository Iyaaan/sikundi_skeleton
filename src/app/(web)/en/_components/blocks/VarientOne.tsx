import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import PostBigCard from '@sikundi/app/(web)/en/_components/cards/PostBigCard'
import PostMostReadCard from '@sikundi/app/(web)/en/_components/cards/PostMostReadCard'
import { twMerge } from 'tailwind-merge'
import Image from 'next/image'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
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

const VarientOne:FC<Props> = ({ data, posts, className, ...props }) => {
    return (
        <div { ...props } className={twMerge(['relative min-h-[calc(100vh-125px)] flex flex-col justify-end', className])}>
            <div className='absolute w-full h-full max-h-[calc(100vh-350px)] lg:max-h-screen top-0'>
                {data?.featureImageUrl && <Image
                    src={data?.featureImageUrl}
                    alt={data?.title}
                    fill
                    sizes='100vw'
                    className='object-cover'
                />}
                <span className='gradient-feature-post inset-0 block absolute' />
            </div>
            <div className="container grid grid-cols-12 gap-4 px-4 relative py-10 items-end">
                <PostBigCard className='lg:col-span-5 col-span-12' data={{
                    createdAt: data.createdAt,
                    category: data.category,
                    title: data.title,
                    description: data.description,
                    url: data.url,
                }} />
                <PostMostReadCard title='Most Read' className='lg:col-span-4 col-span-12 lg:col-start-9 bg-[#0D3167] p-10' posts={posts} />
            </div>
        </div>
    )
}

export default VarientOne