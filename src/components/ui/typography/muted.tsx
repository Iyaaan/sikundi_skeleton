import { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

const P:FC<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>> = (props) => {
    return (
        <p className={twMerge('text-sm text-muted-foreground', props.className)} {...props} />
    )
}

export default P