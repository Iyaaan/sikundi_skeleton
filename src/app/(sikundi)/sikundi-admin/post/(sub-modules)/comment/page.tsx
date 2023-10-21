import EmptyPlaceholder from "@sikundi/app/(sikundi)/sikundi-admin/_components/EmptyPlaceHolder"
import { MessageCircle } from "lucide-react"

export default async function CategoryListPage() {
    return (
        <EmptyPlaceholder data={{
            url: "/sikundi-admin/post/comment", 
            name: "comments", 
            slug: "comment",
            Icon: MessageCircle,
            permissions: {
                create: false
            }
        }} />
    )
}
