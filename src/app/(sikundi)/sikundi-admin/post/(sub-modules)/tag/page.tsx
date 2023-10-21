import EmptyPlaceholder from "@sikundi/app/(sikundi)/sikundi-admin/_components/EmptyPlaceHolder"
import { TagsIcon } from "lucide-react"


export default async function TagListPage() {
    return (
        <EmptyPlaceholder data={{
            url: "/sikundi-admin/post/tag", 
            name: "tags", 
            slug: "tag",
            Icon: TagsIcon,
            permissions: {
                create: true
            }
        }} />
    )
}
