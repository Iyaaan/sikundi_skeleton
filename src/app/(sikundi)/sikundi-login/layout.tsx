import { ReactNode } from "react"
import ThemeSwitcher from "@sikundi/components/ui/theme-switcher"
import Muted from "@sikundi/components/ui/typography/muted"

interface Props {
    children: ReactNode
}

export default function SikundiLoginLayout(props: Props) {
    return (
        <main className="w-full min-h-screen flex flex-col p-8 gap-8">
            <div className="flex justify-end">
                <ThemeSwitcher />
            </div>
            <div className="container flex flex-col items-center justify-center flex-1 p-0 gap-3">
                {props.children}
                <Muted>Product of © CoffeeDev</Muted>
            </div>
        </main>
    )
}