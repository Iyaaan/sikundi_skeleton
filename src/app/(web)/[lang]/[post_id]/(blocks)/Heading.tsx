import React, { FC, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends HTMLAttributes<HTMLParagraphElement> {
    level?: 1 | 2 | 3 | 4 | 5 | 6
}

const Heading:FC<Props> = ({level, ...props}) => {
    if (level === 1) return (
        <h1 {...props} className={twMerge([
            "text-web-primary dark:text-web-primary-dark mb-3 font-bold text-7xl",
            props.className
        ])}>

        </h1>
    )
    if (level === 2) return (
        <h2 {...props} className={twMerge([
            "text-web-primary dark:text-web-primary-dark mb-3 font-bold text-6xl",
            props.className
        ])}>

        </h2>
    )
    if (level === 3) return (
        <h3 {...props} className={twMerge([
            "text-web-primary dark:text-web-primary-dark mb-3 font-bold text-5xl",
            props.className
        ])}>

        </h3>
    )
    if (level === 4) return (
        <h4 {...props} className={twMerge([
            "text-web-primary dark:text-web-primary-dark mb-3 font-bold text-4xl",
            props.className
        ])}>

        </h4>
    )
    if (level === 5) return (
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