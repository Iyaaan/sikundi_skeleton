import { ReactNode } from "react"

export default async function Dashboard({ children }: { children: ReactNode }) {
    return (
        <div className="container p-4">
            <div className="flex lg:items-center justify-between space-y-2 flex-col lg:flex-row gap-y-1 mb-4">
                <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
            </div>
            {children}
        </div>
    )
}
