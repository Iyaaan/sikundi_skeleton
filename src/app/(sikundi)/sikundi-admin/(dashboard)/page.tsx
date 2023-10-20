import { Button } from "@sikundi/components/ui/button"
import getUser from "@sikundi/lib/server/utils/getUser"
import { CalendarDateRangePicker } from "./_component/date-range-picker"
import { DownloadIcon, GitBranchPlusIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@sikundi/components/ui/card"
import { Overview } from "./_component/overview"
import { RecentSales } from "./_component/recent-sales"

export default async function Dashboard() {
    const user = await getUser()
    return (
        <div className="container mx-auto p-4">
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
            <div className="grid gap-4 md:grid-cols-12">
                <Card className="lg:col-span-3 md:col-span-6">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Sessions
                        </CardTitle>
                        <GitBranchPlusIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                  <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground">
                            +0% from last month
                        </p>
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3 md:col-span-6">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Page Views
                        </CardTitle>
                        <GitBranchPlusIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                  <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground">
                            +0% from last month
                        </p>
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3 md:col-span-6">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Avg Session Duration
                        </CardTitle>
                        <GitBranchPlusIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                  <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground">
                            +0% from last month
                        </p>
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3 md:col-span-6">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Bounce Rate
                        </CardTitle>
                        <GitBranchPlusIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                  <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground">
                            +0% from last month
                        </p>
                  </CardContent>
                </Card>
                
                <Card className="lg:col-span-8 md:col-span-12">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview />
                    </CardContent>
                </Card>
                <Card className="lg:col-span-4 md:col-span-12">
                    <CardHeader>
                        <CardTitle>Top Authors</CardTitle>
                        <CardDescription>
                            Author authors in the past 30 day.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RecentSales />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
