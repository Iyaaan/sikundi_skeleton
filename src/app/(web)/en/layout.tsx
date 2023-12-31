import '../../globals.css'
import ThemeProvider from "@sikundi/app/(web)/dv/_components/Theme"
import AnalyticsProvider from '@sikundi/app/(web)/dv/_components/GoogleAnalytics'
import localFont from 'next/font/local'
import NextTopLoader from 'nextjs-toploader'
import Header from '@sikundi/app/(web)/en/_components/Header'
import Footer from '@sikundi/app/(web)/en/_components/Footer'
export { metadata } from '@sikundi/sikundi.config'
import { prisma } from '@sikundi/lib/server/utils/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-static'
export const revalidate = 1000

const font = localFont({
    src: [
        {
            path: '../../../../public/fonts/dhivehi/mvtyper.woff2',
            weight: '100',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/lora/Lora-Regular.woff2',
            weight: '100',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/dhivehi/mvtyper.woff2',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/lora/Lora-Regular.woff2',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/dhivehi/mvtyper.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/lora/Lora-Regular.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/dhivehi/Randhoo_reg_hinted.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/lora/Lora-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/dhivehi/Randhoo_reg_hinted.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/lora/Lora-Regular.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/dhivehi/Randhoo_reg_hinted.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/lora/Lora-SemiBold.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/dhivehi/MVAWaheed.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/lora/Lora-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/dhivehi/MVAWaheed.woff2',
            weight: '800',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/lora/Lora-Bold.woff2',
            weight: '800',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/dhivehi/MVAWaheed.woff2',
            weight: '900',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/lora/Lora-Bold.woff2',
            weight: '900',
            style: 'normal',
        }
    ],
    variable: '--font-inter',
    display: 'swap',
    adjustFontFallback: 'Times New Roman'
})

interface Props {
    children: React.ReactNode
    params: { 

    } 
}

export default async function RootLayout(props: Props) {
    // @ts-ignore
    const { items } = await menu()

    return (
        <html lang={"en-Us"} translate="no">
            <body dir={"ltr"} className={`${font.className} bg-web-en-background dark:bg-web-en-background-dark`}>
                <ThemeProvider>
                    <NextTopLoader
                        color={"#ca2126"}
                        initialPosition={0.08}
                        crawlSpeed={200}
                        height={3}
                        crawl={true}
                        showSpinner={false}
                        easing="ease"
                        speed={200}
                        shadow="0 0 10px #000000,0 0 5px #000000"
                        template='<div class="bar" role="bar"><div class="peg"></div></div> 
                        <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
                        zIndex={1600}
                    />
                    <AnalyticsProvider>
                        <Header menuItems={items} />
                        <main className='w-full min-h-[calc(100vh-64px)]'>
                            {props.children}
                        </main>
                        <Footer items={[
                            { name: "About us", url: "/pages/about-us" },
                            { name: "Team", url: "/team" },
                            { name: "Terms of Service", url: "/pages/terms-of-service" },
                            { name: "Privacy Policy", url: "/pages/privacy-policy" }
                        ]} />
                    </AnalyticsProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}

async function menu () {
    const categories = await prisma.category.findMany({
        select: {
            id: true,
            icon: true,
            name: true,
            slug: true
        },
        where: {
            // posts: {
            //     some: {
            //         status: "published"
            //     }
            // },
            language: "EN"
        },
        orderBy: {
            id: "asc"
        }
    })

    const havePhotos = await prisma.photo.count({
        where: {
            status: "published",
            language: "EN"
        }
    })
    const haveVideos = await prisma.video.count({
        where: {
            status: "published",
            language: "EN"
        }
    })
    const haveGraphics = await prisma.graphic.count({
        where: {
            status: "published",
            language: "EN"
        }
    })

    return {
        items: [
            {
                name: "home",
                url: `/en`,
            },
            ...categories.map((category) => ({
                name: category.name,
                url: `/en/category/${category.slug}`
            })),
            havePhotos > 0 && {
                name: "photo",
                url: `/en/gaafu-gallery`,
            },
            haveVideos > 0 && {
                name: "video", 
                url: `/en/videos`,
            },
            haveGraphics > 0 && {
                name: "graphics",
                url: `/en/gaafu_graphics`,
            },
        ].filter(Boolean)
    }
}