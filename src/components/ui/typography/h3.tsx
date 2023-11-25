import { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

const H3:FC<DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>> = ({className, ...props}) => {
    return (
        <h3 className={twMerge(['scroll-m-20 text-2xl font-semibold tracking-tight', className])} {...props} />
    )
}

export default H3