import { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

const H2:FC<DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>> = (props) => {
    return (
        <h2 className={twMerge('scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0', props.className)} {...props} />
    )
}

export default H2