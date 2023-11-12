import VarientFour from "@sikundi/components/web/blocks/VarientFour"
import { prisma } from "@sikundi/lib/server/utils/prisma"

interface Props { 
    params: { 
        category_slug: number 
        lang: string 
    } 
}

export const dynamic = "force-dynamic"

export default async function CategoryPage(props: Props) {
    // @ts-ignore
    const { name, posts } = await postsByCategory(String(props.params.category_slug), String(props.params.lang))
    return (
        // @ts-ignore
        <VarientFour title={name} className="mb-12" data={posts} />
    )
}

async function postsByCategory(slug:string, lang:string) {
    const language = lang.toUpperCase() === "EN" ? "EN" : "DV"
    const category = await prisma.category.findUnique({
        select: {
            name: true,
            posts: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    createdAt: true,
                    featureImage: {
                        select: {
                            url: true
                        }
                    }
                },
                where: {
                    status: "published",
                    // @ts-ignore
                    language: language
                },
                orderBy: {
                    createdAt: "desc"
                },
                take: 6
            }
        },
        where: {
            slug: slug
        }
    })

    return {
        name: category?.name,
        // @ts-ignore
        posts: category?.posts.map((post) => ({
            href: `/${lang}/${post.id}`,
            title: post.title,
            description: post.description,
            createdAt: post.createdAt,
            featureImage: post.featureImage?.url
        }))
    }
}