import getUser from "@sikundi/lib/server/getUser"

export default async function Dashboard() {
    const user = await getUser()
    return (
        <div className="container mx-auto p-4">
            {user?.payload.userName}
        </div>
    )
}
