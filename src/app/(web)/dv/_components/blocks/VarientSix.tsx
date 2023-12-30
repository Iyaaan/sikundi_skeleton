"use client"

import React, { DetailedHTMLProps, FC, HTMLAttributes, useState } from 'react'
import PostMediumCard from '@sikundi/app/(web)/dv/_components/cards/PostMediumCard'
import PostSmallCard from '../cards/PostSmallCard'
import { ArrowDown2 } from 'iconsax-react'
import { twMerge } from 'tailwind-merge'
import { RefreshCcw } from 'lucide-react'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>  {
    title?: string
    nextPage: number | null
    data: {
        href: string
        title: string
        featureImage: string
        description: string
    }[]
    loadMore?: (page?: number) => Promise<{
        name: string | undefined;
        photos: {
            href: string;
            title: string;
            description: string | null;
            createdAt: Date;
            featureImage: string | undefined;
        }[] | undefined;
        nextPage: number | null;
    }>
}

const VarientSix:FC<Props> = ({title, loadMore, data:d, nextPage:n, ...props}) => {
    const [data, setData] = useState(d || [])
    const [loading, setLoading] = useState(false)
    const [nextPage, setNextPage] = useState<number | null>(n)

    return (
        <div {...props} className={twMerge(['relative container px-0', props.className])}>
            <div className='lg:rounded-[20px] pb-20 pt-14 px-0 lg:px-8'>
                {title && <h1 className='col-span-4 text-center font-black text-4xl lg:text-6xl text-web-secondary dark:text-web-secondary-dark stroke-text-white stroke-text-white mb-16'>
                    {title}
                </h1>}
                {data?.length > 0 && <div className='grid lg:grid-cols-5 grid-cols-2 gap-4'>
                    <PostMediumCard href={`${data[0]?.href}`}
                        className="row-span-2 col-span-2 mb-9 lg:mb-0 lg:col-span-5 lg:row-span-2"
                        data={{
                            title: `${data[0]?.title}`,
                            description: `${data[0]?.description}`,
                            featureImage: `${data[0]?.featureImage}`
                        }}
                    />
                    <div className='px-4 grid lg:grid-cols-5 grid-cols-2 gap-4 col-span-2 lg:col-span-5'>
                        {data?.map((post, index) => index !== 0 && (
                            <PostSmallCard href={post.href} key={index}
                            className='text-white'
                            data={{
                                title: post.title,
                                featureImage: post.featureImage
                            }}
                            />
                        ))}
                    </div>
                </div>}
            </div>
            {(loadMore && nextPage) && <button disabled={loading} className={twMerge([
                'block p-4 shadow-2xl rounded-xl absolute left-1/2 -translate-x-1/2 -bottom-5',
                'bg-web-secondary dark:bg-web-secondary-dark border border-gray-800 dark:border-gray-900 hover:scale-105 active:scale-95 transition-all'
            ])} onClick={async () => {
                setLoading(true)
                const { photos, nextPage:page } = await loadMore(nextPage)
                setNextPage(page)
                // @ts-ignore
                setData((d)=>[...d, ...photos])
                setLoading(false)
            }}>
                {
                    loading ? <RefreshCcw className='animate-spin' /> :
                    <ArrowDown2 className='text-white' />
                }
                
            </button>}
        </div>
    )
}

export default VarientSix