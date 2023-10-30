import { ReactNode } from "react"
import Header from "../_components/Header"
import SideBar from "../_components/SideBar"
import { Sheet } from "@sikundi/components/ui/sheet"
import { ScrollArea } from "@sikundi/components/ui/scroll-area"

interface Props {
    children: ReactNode
}

export default async function SikundiAdminLayout(props: Props) {
    return (
        <Sheet>
            <Header />
            <div className="flex h-[calc(100vh-4.1rem)]">
                <SideBar className="h-full" />
                <main className="lg:border-l min-h-[calc(100vh-4.1rem)] w-full">
                    <ScrollArea className="w-full">
                        {props.children}
                    </ScrollArea>
                </main>
            </div>
        </Sheet>
    )
}