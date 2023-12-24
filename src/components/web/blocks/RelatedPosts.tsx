import PostSmallCard from '@sikundi/components/web/cards/PostSmallCard'
import { ArrowDown2 } from 'iconsax-react'
import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import Heading from './Heading'
import { twMerge } from 'tailwind-merge'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title?: string
    data?: {
        href: string
        title: string
        featureImage: string
    }[]
    loadMore?: boolean
}

const RelatedPosts:FC<Props> = ({data, loadMore, title, ...props}) => {
    return (
        <div className='px-6 max-w-3xl mx-auto'>
            <div {...props} className={twMerge([
                'p-6 pb-12 grid lg:grid-cols-4 grid-cols-2 gap-4 bg-web-foreground dark:bg-web-foreground-dark rounded-[20px] mb-6 relative',
                props.className
            ])}>
                <div className='lg:col-span-4 col-span-2' dir='ltr'>
                    <Heading className=' text-web-accent dark:text-web-accent-dark mb-0 text-base'>Related</Heading>
                </div>
                {data?.map((post, index) => (
                    <PostSmallCard href={post.href} key={index}
                        data={{
                            title: post.title,
                            featureImage: post.featureImage
                        }}
                    />
                ))}
                {loadMore && <button className='block p-4 shadow-2xl rounded-xl absolute left-1/2 -translate-x-1/2 -bottom-5 bg-web-foreground dark:bg-web-foreground-dark border border-gray-100 dark:border-gray-800 hover:scale-105 active:scale-95 transition-all'>
                    <ArrowDown2 />
                </button>}
            </div>
        </div>
    )
}

export default RelatedPosts