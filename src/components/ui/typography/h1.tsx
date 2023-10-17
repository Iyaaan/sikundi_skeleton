import { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

const H1:FC<DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>> = (props) => {
    return (
        <h1 className={twMerge('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', props.className)} {...props} />
    )
}

export default H1