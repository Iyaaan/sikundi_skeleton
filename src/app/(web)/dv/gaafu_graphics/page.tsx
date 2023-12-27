import { prisma } from "@sikundi/lib/server/utils/prisma"
import VarientFive from "../_components/blocks/VarientFive"

export const runtime = 'nodejs'
export const dynamic = 'force-static'
export const dynamicParams = true
export const revalidate = 1000

export default async function GalleryPage() {
    const { graphics, nextPage } = await graphicsList()

    return (
        <div className="bg-web-secondary dark:bg-web-secondary-dark w-full min-h-screen">
            {(graphics?.length > 0) && 
                // @ts-ignore
                <VarientFive title="ގްރެފިކްސް" data={graphics} loadMore={graphicsList} nextPage={nextPage} />}
        </div>
    )
}

async function graphicsList(page?: number) {
    "use server"

    const current = page || 1
    const per_page = 11

    const graphics = await prisma.graphic.findMany({
        select: {
            id: true,
            graphicsUrl: true,
            title: true,
            description: true,
            createdAt: true
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
    })

    const totalgraphics = await prisma.graphic.aggregate({
        _count: true,
        where: {
            status: "published"
        }
    })

    return {
        graphics: graphics.map((photo) => ({
            href: `/dv/gallery/${photo.id}`,
            title: photo.title,
            description: photo.description,
            createdAt: photo.createdAt,
            featureImage: photo.graphicsUrl
        })),
        nextPage: Math.ceil((Number(totalgraphics._count)/per_page)) >= (current + 1) ? (current + 1) : null
    }
}