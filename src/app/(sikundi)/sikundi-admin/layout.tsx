import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export default function SikundiAdminLayout(props: Props) {
    return (
        <main className="">
            {props.children}
        </main>
    )
}