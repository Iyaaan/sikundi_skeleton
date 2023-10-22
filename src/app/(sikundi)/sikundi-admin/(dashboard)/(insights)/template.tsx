import { Button } from "@sikundi/components/ui/button"
import { CalendarDateRangePicker } from "./_component/date-range-picker"
import { DownloadIcon } from "lucide-react"
import { ReactNode } from "react"

export default async function Dashboard({ children }: { children: ReactNode }) {
    return (
        <div className="container p-4">
            <div className="flex lg:items-center justify-between space-y-2 flex-col lg:flex-row gap-y-1 mb-4">
                <h2 className="text-2xl font-bold tracking-tight">Insights</h2>
                <div className="flex items-center space-x-2 justify-between">
                    <CalendarDateRangePicker className="w-full" />
                    <Button>
                        <span className="lg:block hidden">Download</span>
                        <DownloadIcon className="lg:hidden" />
                    </Button>
                </div>
            </div>
            {children}
        </div>
    )
}
