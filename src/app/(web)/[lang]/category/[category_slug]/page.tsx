import VarientFour from "@sikundi/components/web/blocks/VarientFour"
import { prisma } from "@sikundi/lib/server/utils/prisma"

export const runtime = 'nodejs'
export const dynamic = 'force-static'
export const dynamicParams = true
export const revalidate = 1000

interface Props { 
    params: { 
        category_slug: number 
        lang: string 
    } 
}

export default async function CategoryPage(props: Props) {
    // @ts-ignore
    const { name, posts, nextPage } = await postsByCategory(String(props.params.category_slug), String(props.params.lang))
    return (
        // @ts-ignore
        <VarientFour title={name} className="mb-12" data={posts} loadMore={postsByCategory} nextPage={nextPage} />
    )
}

async function postsByCategory(slug:string, lang:string, page?: number) {
    "use server"

    const current = page || 1
    const per_page = 11
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
                take: per_page,
                skip: Number(current)-1 < 0 ? 0 : (Number(current)-1)*per_page
            }
        },
        where: {
            slug: slug
        }
    })

    const totalPosts = await prisma.post.aggregate({
        _count: true,
        where: {
            category: {
                slug: slug
            }
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
        })),
        nextPage: Math.ceil((Number(totalPosts._count)/per_page)) >= (current + 1) ? (current + 1) : null
    }
}