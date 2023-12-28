import { ImageResponse } from 'next/og'
import { prisma } from "@sikundi/lib/server/utils/prisma" 
 
// Route segment config
export const runtime = 'nodejs'
export const dynamic = 'force-static'
export const dynamicParams = true
export const revalidate = 'force-cache'
 
// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
// Image generation
export default async function Image({ params }: { params: { photo_id: string } }) {
    const data = await prisma.photo.findUnique({
        where: {
            id: parseInt(params.photo_id),
            language: "DV"
        },
        select: {
            featureImageUrl: true
        }
    })

    return new ImageResponse(
        (
            <div
                style={{
                fontSize: 128,
                background: 'white',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: "relative"
                }}
            >
                {/* eslint-disable-next-line */}
                <img src={`${process.env.SITE_NAME}${String(data?.featureImageUrl)}`} style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    objectFit: "cover",
                    inset: 0
                }} />
                {/* eslint-disable-next-line */}
                <img src={`${process.env.SITE_NAME}/og/OG.png`} style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    objectFit: "cover",
                    inset: 0
                }} />
            </div>
        ),
        {
            ...size
        }
    )
}