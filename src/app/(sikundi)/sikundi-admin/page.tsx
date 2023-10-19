import getUser from "@sikundi/lib/server/getUser"
import H3 from "@sikundi/components/ui/typography/h3"

export default async function Dashboard() {
    const user = await getUser()
    return (
        <div className="container mx-auto p-4">
            <H3>Welcome {String(user?.payload?.email)}</H3>
        </div>
    )
}
