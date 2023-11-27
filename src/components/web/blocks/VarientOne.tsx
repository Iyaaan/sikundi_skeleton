import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import PostCard from '@sikundi/components/web/cards/PostCard'
import PortraitAd from '@sikundi/components/web/ad/PortraitAd'
import PostSmallCard from '../cards/PostSmallCard'
import { ArrowDown2 } from 'iconsax-react'
import { twMerge } from 'tailwind-merge'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title?: string
    data: {
        href: string
        title: string
        featureImage: string
        description: string
        crearedAt: string
    }[]
    loadMore?: boolean
}

const VarientOne:FC<Props> = ({title, data, loadMore, ...props}) => {
    return (
        <div {...props} className={twMerge([
            'container lg:px-4 px-0 ',
            props.className
        ])}>
            {title && <h1 className='col-span-4 text-center font-black text-4xl lg:text-6xl text-web-background dark:text-web-background-dark mb-10 stroke-text-accent'>
                {title}
            </h1>}
            {data[0] && <div className='grid grid-cols-12 gap-8 mb-4'>
                <PostCard href={String(data[0].href)}
                    className="lg:col-span-9 col-span-12"
                    data={{
                        title: String(data[0].title),
                        description: String(data[0].description),
                        publishedAt: data[0]?.crearedAt,
                        featureImage: data[0].featureImage
                    }}
                />
                <PortraitAd href={"https://sonee.com.mv"} 
                    target="_blank"
                    className="col-span-3 hidden lg:block"
                    data={{
                        coverImage: `/sample_media/OGQ2OWE4MDJkOGY5Y2Q4NzAzYzI2NGRkMTQ3YTFjZmE=.jpg`,
                        alt: "Sonnee Hardware"
                    }}
                />
            </div>}
            <div className='p-6 pb-12 grid lg:grid-cols-5 grid-cols-2 gap-4 bg-web-foreground dark:bg-web-foreground-dark rounded-[20px] mb-6 relative'>
                {data?.map((post, index) => index > 0 && (
                    <PostSmallCard href={`${post.href}`} key={index}
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

export default VarientOne