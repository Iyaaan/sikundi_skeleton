import VarientFour from "@sikundi/app/(web)/dv/_components/blocks/VarientFour"
import { prisma } from "@sikundi/lib/server/utils/prisma"

export const runtime = 'nodejs'
export const dynamic = 'force-static'
export const dynamicParams = true
export const revalidate = 1000

interface Props { 
    params: { 
        category_slug: number 
    } 
}

export default async function CategoryPage(props: Props) {
    
    const { name, posts, nextPage } = await postsByCategory(String(props.params.category_slug))
    return (
        // @ts-ignore
        <VarientFour title={name} className="mb-12" data={posts} loadMore={postsByCategory} nextPage={nextPage} />
    )
}

async function postsByCategory(slug:string, page?: number) {
    "use server"

    const current = page || 1
    const per_page = 11
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
                    language: "DV"
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
            href: `/dv/${post.id}`,
            title: post.title,
            description: post.description,
            createdAt: post.createdAt,
            featureImage: post.featureImage?.url
        })),
        nextPage: Math.ceil((Number(totalPosts._count)/per_page)) >= (current + 1) ? (current + 1) : null
    }
}