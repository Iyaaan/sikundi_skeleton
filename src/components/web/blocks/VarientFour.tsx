import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import PostSmallCard from '../cards/PostSmallCard'
import PostBigCard from '../cards/PostBigCard'
import { ArrowDown2 } from 'iconsax-react'
import { twMerge } from 'tailwind-merge'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>  {
    title?: string
    data: {
        href: string
        title: string
        description: string
        featureImage: string
        createdAt: string
    }[]
    loadMore?: boolean
}

const VarientFour:FC<Props> = ({title, data, loadMore, ...props}) => {
    return (
        <div {...props} className={twMerge(['container px-0', props.className])}>
            {title && <h1 className='col-span-4 text-center font-black text-5xl lg:text-8xl text-web-background dark:text-web-background-dark lg:mb-10 mb-0 stroke-text-accent'>
                {title}
            </h1>}
            <div className='lg:bg-web-foreground lg:dark:bg-web-foreground-dark rounded-[20px] relative mb-6'>
                <div className='lg:px-4 grid grid-cols-12 gap-8 mb-4 lg:mt-36 mt-32'>
                    <PostBigCard href={String(data?.[0]?.href)}
                        className="lg:col-span-10 lg:col-start-2 -mt-24 col-span-12"
                        data={{
                            title: String(data?.[0]?.title),
                            description: String(data?.[0]?.description),
                            // publishedAt: `${new Date(String(data?.[0]?.createdAt))}`,
                            publishedAt: ``,
                            featureImage: String(data?.[0]?.featureImage)
                        }}
                    />
                </div>
                <div className='p-6 pb-12 grid lg:grid-cols-5 grid-cols-2 gap-4 bg-web-foreground dark:bg-web-foreground-dark rounded-[20px]'>
                    {data?.map((post:any, index:any) => index > 0 && (
                        <PostSmallCard href={post.href} key={index}
                            data={{
                                title: post.title,
                                featureImage: post.featureImage
                            }}
                        />
                    ))}
                </div>
                {loadMore && <button className='block p-4 shadow-2xl rounded-xl absolute left-1/2 -translate-x-1/2 -bottom-5 bg-web-foreground dark:bg-web-foreground-dark border border-gray-100 dark:border-gray-800 hover:scale-105 active:scale-95 transition-all'>
                    <ArrowDown2 />
                </button>}
            </div>
        </div>
    )
}

export default VarientFour