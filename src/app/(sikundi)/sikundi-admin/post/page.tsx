import Header from "@sikundi/app/(sikundi)/sikundi-admin/_components/Header"
import EmptyPlaceholder from "@sikundi/app/(sikundi)/sikundi-admin/_components/EmptyPlaceHolder"
import { File } from "lucide-react"

export default async function PostListPage() {
    return (
        <EmptyPlaceholder data={{
            slug: "post",
            name: "posts",
            url: "/sikundi/admin/post",
            Icon: File,
            permissions: {
                create: true
            }
        }} />
    )
}
