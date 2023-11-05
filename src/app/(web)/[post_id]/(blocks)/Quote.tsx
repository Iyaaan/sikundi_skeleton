import { QuoteDown } from 'iconsax-react'
import React, { FC, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const Quote:FC<HTMLAttributes<HTMLQuoteElement>> = (props) => {
    return (
        <div className='pt-[28px]'>
            <blockquote {...props} className={twMerge([
                "text-xl mb-6 text-web-primary dark:text-web-primary-dark bg-web-foreground dark:bg-web-foreground-dark p-9 rounded-2xl leading-loose relative",
                props.className
            ])}>
                <QuoteDown className='absolute -top-[28px] h-[56px] w-[56px]' />
                {props.children}
            </blockquote>
        </div>
    )
}

export default Quote