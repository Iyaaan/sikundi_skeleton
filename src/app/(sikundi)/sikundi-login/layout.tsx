import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export default function SikundiLoginLayout(props: Props) {
    return (
        <main>
            {props.children}
        </main>
    )
}