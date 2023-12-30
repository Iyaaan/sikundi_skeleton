"use client"

import PostSmallCard from '@sikundi/app/(web)/dv/_components/cards/PostSmallCardAlt'
import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import Heading from './Heading'
import { twMerge } from 'tailwind-merge'
import { useLatestPostStore } from '@sikundi/stores/latestPosts'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}

const LatestPosts:FC<Props> = (props) => {
    const { posts } = useLatestPostStore()

    return (
        <div className='w-full p-4 pb-8 bg-web-foreground dark:bg-web-foreground-dark rounded-[20px] mb-6 overflow-hidden'>
            <Heading className='text-web-accent dark:text-web-accent-dark mb-4 text-xl'>{"ފަހުގެ"}</Heading>
            <div {...props} className={twMerge([
                'relative flex overflow-x-auto md:block gap-4',
                props.className
            ])}>
                {posts?.map((post, index) => index <= 4 && (
                    <PostSmallCard className='min-w-[80vw] md:min-w-[unset]' href={post.href} key={index}
                        data={{
                            title: post.title,
                            featureImage: String(post.featureImage)
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export default LatestPosts