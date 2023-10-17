import { BlockquoteHTMLAttributes, DetailedHTMLProps, FC } from "react"
import { twMerge } from "tailwind-merge"

const P:FC<DetailedHTMLProps<BlockquoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>> = (props) => {
    return (
        <blockquote className={twMerge('mt-6 border-l-2 pl-6 italic', props.className)} {...props} />
    )
}

export default P