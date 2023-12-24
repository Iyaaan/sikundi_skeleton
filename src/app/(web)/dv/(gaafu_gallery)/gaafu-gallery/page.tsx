import { prisma } from "@sikundi/lib/server/utils/prisma"
import VarientSix from "../../_components/blocks/VarientSix"

export const runtime = 'nodejs'
export const dynamic = 'force-static'
export const dynamicParams = true
export const revalidate = 1000

export default async function GalleryPage() {
    const { photos, nextPage } = await photosList()

    return (
        <div className="bg-web-secondary dark:bg-web-secondary-dark w-full min-h-screen">
            {(photos?.length > 0) && 
                // @ts-ignore
                <VarientSix title="ފޮޓޯ ގެލެރީ" data={photos} loadMore={photosList} nextPage={nextPage} />}
        </div>
    )
}

async function photosList(page?: number) {
    "use server"

    const current = page || 1
    const per_page = 11

    const photos = await prisma.photo.findMany({
        select: {
            id: true,
            featureImageUrl: true,
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

    const totalPhotos = await prisma.photo.aggregate({
        _count: true,
        where: {
            status: "published"
        }
    })

    return {
        photos: photos.map((photo) => ({
            href: `/dv/gallery/${photo.id}`,
            title: photo.title,
            description: photo.description,
            createdAt: photo.createdAt,
            featureImage: photo.featureImageUrl
        })),
        nextPage: Math.ceil((Number(totalPhotos._count)/per_page)) >= (current + 1) ? (current + 1) : null
    }
}