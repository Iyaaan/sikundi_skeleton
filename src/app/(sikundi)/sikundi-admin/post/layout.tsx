import { Fragment, ReactNode } from "react"
import Header from "../_components/Header"
import { File } from "lucide-react"

interface Props {
    children: ReactNode
}

async function getMenu() {
    return {
        items: [
            {url: "/sikundi-admin/post", name: "posts", slug: "post", permissions: {
                create: true
            }},
            {url: "/sikundi-admin/post/category", name: "categories", slug: "category", permissions: {
                create: true
            }},
            {url: "/sikundi-admin/post/tag", name: "tags", slug: "tag", permissions: {
                create: true
            }},
            {url: "/sikundi-admin/post/comment", name: "comments", slug: "comment", permissions: {
                create: false
            }},
        ],
        active: {
            slug: "post",
            name: "posts",
            url: "/sikundi/admin/post",
            Icon: File,
            permissions: {
                create: true
            }
        }
    }
}

export default async function SikundiAdminLayout(props: Props) {
    const menu = await getMenu()
    return (
        <main className="container mx-auto p-4 min-h-[calc(100vh-4.1rem)]">
            <Header menu={JSON.parse(JSON.stringify(menu))} />
            {props.children}
        </main>
    )
}