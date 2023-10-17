import { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

const H4:FC<DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>> = (props) => {
    return (
        <h4 className={twMerge('scroll-m-20 text-xl font-semibold tracking-tight', props.className)} {...props} />
    )
}

export default H4