import getUser from "@sikundi/lib/server/getUser"

export default async function Dashboard() {
    const user = await getUser()
    return (
        <main className="container mx-auto p-4">
            <h1>Welcome {String(user?.payload?.email)}</h1>
        </main>
    )
}
