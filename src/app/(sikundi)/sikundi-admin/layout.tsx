import { ReactNode } from "react"
import Header from "../_components/Header"
import SideBar from "../_components/SideBar"
import { Sheet } from "@sikundi/components/ui/sheet"

interface Props {
    children: ReactNode
}

export default async function SikundiAdminLayout(props: Props) {
    return (
        <Sheet>
            <Header />
            <div className="flex h-[calc(100vh-4.1rem)]">
                <SideBar className="h-full" />
                <main className="flex-1 lg:border-l">
                    {props.children}
                </main>
            </div>
        </Sheet>
    )
}