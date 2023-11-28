import React, { FC, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends HTMLAttributes<HTMLParagraphElement> {
    level?: 1 | 2 | 3
}

const Heading:FC<Props> = ({level, ...props}) => {
    if (level === 1) return (
        <h4 {...props} className={twMerge([
            "text-web-primary dark:text-web-primary-dark mb-3 font-bold text-4xl",
            props.className
        ])}>

        </h4>
    )
    if (level === 2) return (
        <h5 {...props} className={twMerge([
            "text-web-primary dark:text-web-primary-dark mb-3 font-bold text-3xl",
            props.className
        ])}>

        </h5>
    )
    return (
        <h6 {...props} className={twMerge([
            "text-web-primary dark:text-web-primary-dark mb-3 font-bold text-2xl",
            props.className
        ])}>

        </h6>
    )
}

export default Heading