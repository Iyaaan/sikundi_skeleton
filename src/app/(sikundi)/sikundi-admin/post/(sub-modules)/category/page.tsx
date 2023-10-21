import EmptyPlaceholder from "@sikundi/app/(sikundi)/sikundi-admin/_components/EmptyPlaceHolder"
import { PackageOpen } from "lucide-react"

export default async function CategoryListPage() {
    return (
        <EmptyPlaceholder data={{
            url: "/sikundi-admin/post/category", 
            name: "categories", 
            slug: "category",
            Icon: PackageOpen,
            permissions: {
                create: true
            }
        }} />
    )
}
