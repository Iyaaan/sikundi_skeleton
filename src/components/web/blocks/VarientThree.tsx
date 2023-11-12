import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import PostMediumCard from '@sikundi/components/web/cards/PostMediumCard'
import PostSmallCard from '../cards/PostSmallCard'
import { ArrowDown2 } from 'iconsax-react'
import { twMerge } from 'tailwind-merge'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>  {
    title?: string
    data: {
        href: string
        title: string
        featureImage: string
        description: string
    }[]
    loadMore?: boolean
}

const VarientThree:FC<Props> = ({title, data, loadMore, ...props}) => {
    return (
        <div {...props} className={twMerge(['relative container px-0', props.className])}>
            <div className='mb-6 lg:rounded-[20px] bg-web-secondary dark:bg-web-secondary-dark pb-20 pt-14 px-0 lg:px-8'>
                {title && <h1 className='col-span-4 text-center font-black text-5xl lg:text-8xl text-web-secondary dark:text-web-secondary-dark stroke-text-white stroke-text-white mb-16'>
                    {title}
                </h1>}
                {data?.length > 0 && <div className='grid lg:grid-cols-4 grid-cols-2 gap-4'>
                    <PostMediumCard href={`${data[0]?.href}`}
                        className="row-span-2 col-span-2 mb-9 lg:mb-0"
                        data={{
                            title: `${data[0]?.title}`,
                            description: `${data[0]?.description}`,
                            featureImage: `${data[0]?.featureImage}`
                        }}
                    /> 
                    <div className='grid grid-cols-2 gap-4 col-span-2 px-4 lg:p-0'>
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
            {loadMore && <button className='block p-4 shadow-2xl rounded-xl absolute left-1/2 -translate-x-1/2 -bottom-5 bg-web-secondary dark:bg-web-secondary-dark border border-gray-800 dark:border-gray-900 hover:scale-105 active:scale-95 transition-all'>
                <ArrowDown2 className='text-white' />
            </button>}
        </div>
    )
}

export default VarientThree