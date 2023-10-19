import { Fragment, ReactNode } from "react"
import Header from "../_components/Header"
import SideBar from "../_components/SideBar"

interface Props {
    children: ReactNode
}

export default async function SikundiAdminLayout(props: Props) {
    return (
        <Fragment>
            <Header />
            <div className="flex">
                <SideBar className="max-w-[325px]" />
                <main className="flex-1 lg:border-l">
                    {props.children}
                </main>
            </div>
        </Fragment>
    )
}