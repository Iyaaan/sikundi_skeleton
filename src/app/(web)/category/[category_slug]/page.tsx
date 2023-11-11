import VarientFour from "@sikundi/components/web/blocks/VarientFour"
import { prisma } from "@sikundi/lib/server/utils/prisma"

interface Props { 
    params: { 
        category_slug: number 
    } 
}

export default async function CategoryPage(props: Props) {
    // @ts-ignore
    const { name, posts } = await postsByCategory(String(props.params.category_slug))
    return (
        // @ts-ignore
        <VarientFour title={name} className="mb-12" data={posts} />
    )
}

async function postsByCategory(slug:string) {
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
                    status: "published"
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
        posts: category?.posts.map((post) => ({
            href: `/${post.id}`,
            title: post.title,
            description: post.description,
            createdAt: post.createdAt,
            featureImage: post.featureImage?.url
        }))
    }
}