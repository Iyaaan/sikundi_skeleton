import React, { AnchorHTMLAttributes, FC } from 'react'
import Link, { LinkProps } from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { twMerge } from 'tailwind-merge'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
    data: {
        createdAt?: Date
        createdBy?: {
            name: string
        }
        title: string
    }
}
dayjs.extend(relativeTime)

const PostListMediumCard:FC<Props> = ({ data, className, ...props }) => {
    return (
        <Link {...props} className={twMerge(['block hover:opacity-75 active:opacity-50', className])}>
            <b className='text-xl text-white font-semibold block mb-2'>{data.title}</b>
            <span className='text-white font-normal text-sm'>
                <span suppressHydrationWarning className='opacity-70'>{`${dayjs(data.createdAt).fromNow()}`}</span>
                {data?.createdBy?.name && `   by ${data?.createdBy?.name}`}
            </span>
        </Link>
    )
}

export default PostListMediumCard