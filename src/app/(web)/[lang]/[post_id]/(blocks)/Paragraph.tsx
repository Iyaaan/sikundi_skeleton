import React, { FC, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const Paragraph:FC<HTMLAttributes<HTMLParagraphElement>> = (props) => {
    return (
        <p {...props} className={twMerge([
            "text-xl mb-6",
            props.className
        ])}>
            {props.children}
        </p>
    )
}

export default Paragraph