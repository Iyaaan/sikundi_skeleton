import { Button } from "@sikundi/components/ui/button"
import Header from "./_components/Header"
import EmptyPlaceholder from "./_components/EmptyPlaceHolder"

export default async function PostListPage() {

    return (
        <main className="container mx-auto p-4 min-h-[calc(100vh-4.1rem)]">
            <Header />
            <EmptyPlaceholder />
        </main>
    )
}
