import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@sikundi/components/ui/card"
import { Overview } from "./_component/overview"
import { RecentSales } from "./_component/recent-sales"
import getAnalytics from "@sikundi/lib/server/utils/getAnalytics"
import { Textarea } from "@sikundi/components/ui/textarea"

export default async function Dashboard() {
    const analytics = await getAnalytics()

    return (
        <div className="grid gap-4 md:grid-cols-12">
            {analytics.summery.map((metric, index) => (
                <Card className="lg:col-span-3 md:col-span-6" key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {metric.name}
                        </CardTitle>
                        <metric.Icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{metric.value}</div>
                        <p className="text-xs text-muted-foreground">
                            {metric.difference} from last month
                        </p>
                    </CardContent>
                </Card>
            ))}
            
            <Card className="lg:col-span-8 md:col-span-12">
                <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <Overview data={analytics.records} />
                </CardContent>
            </Card>
            <Card className="lg:col-span-4 md:col-span-12 flex flex-col">
                <CardHeader>
                    <CardTitle>Your notes</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                    <Textarea placeholder="Type your notes here." className="h-full min-h-[350px]" />
                </CardContent>
            </Card>
            <Card className="lg:col-span-4 md:col-span-12">
                <CardHeader>
                    <CardTitle>Top Authors</CardTitle>
                    <CardDescription>
                        Top authors in the past 30 day.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RecentSales />
                </CardContent>
            </Card>
            <Card className="lg:col-span-8 md:col-span-8">
                <CardHeader>
                    <CardTitle>Top Posts</CardTitle>
                    <CardDescription>
                        Top posts in the past 30 day.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RecentSales />
                </CardContent>
            </Card>
        </div>
    )
}

export const dynamic = "force-dynamic"