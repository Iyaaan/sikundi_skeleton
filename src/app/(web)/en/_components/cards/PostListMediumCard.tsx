import React, { AnchorHTMLAttributes, FC } from 'react'
import Link, { LinkProps } from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

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

const PostListMediumCard:FC<Props> = ({ data, ...props }) => {
    return (
        <Link {...props}>
            <b>{data.title}</b>
            <span suppressHydrationWarning>{`${dayjs(data.createdAt).fromNow()}${data?.createdBy?.name && `   by ${data?.createdBy?.name}`}`}</span>
        </Link>
    )
}

export default PostListMediumCard