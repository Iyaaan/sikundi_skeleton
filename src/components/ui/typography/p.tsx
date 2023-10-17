import { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

const P:FC<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>> = (props) => {
    return (
        <p className={twMerge('leading-7 [&:not(:first-child)]:mt-6', props.className)} {...props} />
    )
}

export default P