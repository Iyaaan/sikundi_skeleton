import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import PostSmallCard from '../../../../../components/web/cards/PostSmallCard'
import { ArrowDown2 } from 'iconsax-react'
import { twMerge } from 'tailwind-merge'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>  {
    title?: string
    data: {
        href: string
        title: string
        featureImage: string
    }[]
    loadMore?: boolean
    containerClassName?: string
}

const VarientTwo:FC<Props> = ({title, data, loadMore, containerClassName, ...props}) => {
    return (
        <div {...props} className={twMerge([
            'container bg-web-foreground dark:bg-web-foreground-dark rounded-[20px] relative px-0',
            props.className
        ])}>
            <div className={twMerge(['grid lg:grid-cols-5 grid-cols-2 gap-4 p-6 pb-16 mb-6', containerClassName])}>
                {data?.map((post, index) => (
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
    )
}

export default VarientTwo