import Header from "@sikundi/app/(sikundi)/sikundi-admin/_components/Header"
import EmptyPlaceholder from "@sikundi/app/(sikundi)/sikundi-admin/_components/EmptyPlaceHolder"
import { PackageOpen } from "lucide-react"

async function getMenu() {
    return {
        items: [
            {url: "/sikundi-admin/post", name: "posts", slug: "post"},
            {url: "/sikundi-admin/post/category", name: "categories", slug: "category"},
            {url: "/sikundi-admin/post/tag", name: "tags", slug: "tag"},
            {url: "/sikundi-admin/post/comment", name: "comments", slug: "comment"},
        ],
        active: {
            url: "/sikundi-admin/post/category", 
            name: "categories", 
            slug: "category",
            Icon: PackageOpen,
            permissions: {
                create: true
            }
        }
    }
}

export default async function CategoryListPage() {
    const menu = await getMenu()
    return (
        <main className="container mx-auto p-4 min-h-[calc(100vh-4.1rem)]">
            <Header menu={menu} />
            <EmptyPlaceholder data={menu.active} />
        </main>
    )
}
