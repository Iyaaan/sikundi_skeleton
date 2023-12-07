import { ReactNode } from "react"
import Header from "../_components/Header"
import SideBar from "../_components/SideBar"
import { Sheet } from "@sikundi/components/ui/sheet"
import { ScrollArea } from "@sikundi/components/ui/scroll-area"
import getPermission from "@sikundi/lib/server/utils/getPermission"

interface Props {
    children: ReactNode
}

export default async function SikundiAdminLayout(props: Props) {
    const permission = await getPermission({
        post: ['view'],
        category: ['view'],
        tag: ['view'],
        library: ['view'],
        graphic: ['view'],
        photo: ['view'],
        video: ['view'],
        user: ['view'],
        role: ['view'],
        adBanner: ['view']
    })

    return (
        <Sheet>
            <Header />
            <div className="flex h-[calc(100vh-4.1rem)]">
                <SideBar permission={permission} className="h-full" />
                <ScrollArea className="w-full">
                    <main className="lg:border-l min-h-[calc(100vh-4.1rem)]">
                        {props.children}
                    </main>
                </ScrollArea>
            </div>
        </Sheet>
    )
}