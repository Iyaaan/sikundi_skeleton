import { Button } from "@sikundi/components/ui/button"
import Link from "next/link"

export default async function PostListPage() {

    return (
        <main className="container mx-auto p-4 min-h-[calc(100vh-4.1rem)]">
            <div className="hidden h-full flex-1 flex-col md:flex">
                <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Posts</h2>
                </div>
                <div className="flex items-center space-x-2">
                    <Button asChild>
                        <Link href={"#"}>Add a post</Link>
                    </Button>
                </div>
                </div>
            </div>
        </main>
    )
}
