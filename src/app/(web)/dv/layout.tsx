import '../../globals.css'
import ThemeProvider from "@sikundi/components/web/Theme"
import AnalyticsProvider from '@sikundi/components/web/GoogleAnalytics'
import Header from '@sikundi/app/(web)/dv/_components/Header'
import Footer from '@sikundi/app/(web)/dv/_components/Footer'
import MenuModal from '@sikundi/app/(web)/dv/_components/MenuModal'
import localFont from 'next/font/local'
import NextTopLoader from 'nextjs-toploader'
import { prisma } from '@sikundi/lib/server/utils/prisma'
import TBanner from '@sikundi/app/(web)/dv/_components/adBanner/TBanner'
export { metadata } from '@sikundi/sikundi.config'

export const runtime = 'nodejs'
export const dynamic = 'force-static'
export const revalidate = 1000

const font = localFont({
    src: [
        {
            path: '../../../../public/fonts/metropolis/Metropolis-Thin.woff2',
            weight: '100',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/dhivehi/mvtyper.woff2',
            weight: '100',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/metropolis/Metropolis-ExtraLight.woff2',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/dhivehi/mvtyper.woff2',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/metropolis/Metropolis-Light.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/dhivehi/mvtyper.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/metropolis/Metropolis-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/dhivehi/Randhoo_reg_hinted.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/metropolis/Metropolis-Medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/dhivehi/Randhoo_reg_hinted.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/metropolis/Metropolis-SemiBold.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/dhivehi/Randhoo_reg_hinted.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/metropolis/Metropolis-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/dhivehi/MVAWaheed.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/metropolis/Metropolis-ExtraBold.woff2',
            weight: '800',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/dhivehi/MVAWaheed.woff2',
            weight: '800',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/metropolis/Metropolis-Black.woff2',
            weight: '900',
            style: 'normal',
        },
        {
            path: '../../../../public/fonts/dhivehi/MVAWaheed.woff2',
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
    const { items, latestPosts } = await menu()
    const { t_banner } = await Ads()

    return (
        <html lang={"dv-Mv"} translate="no">
            <body dir={"rtl"} className={`${font.className} bg-web-background dark:bg-web-background-dark text-web-accent dark:text-web-accent-dark selection:bg-web-primary dark:selection:bg-web-primary selection:text-white dark:selection:text-white`}>
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
                        <TBanner slides={t_banner} className='max-w-4xl mx-auto mb-4' />
                        <MenuModal menuItems={items} latestPosts={latestPosts} />
                        <main className='w-full min-h-[calc(100vh-6.4rem)]'>
                            {props.children}
                        </main>
                        <Footer />
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
            posts: {
                some: {
                    status: "published"
                }
            },
            language: "DV"
        },
        orderBy: {
            id: "asc"
        }
    })

    const havePhotos = await prisma.photo.count({
        where: {
            status: "published",
            language: "DV"
        }
    })
    const haveVideos = await prisma.video.count({
        where: {
            status: "published",
            language: "DV"
        }
    })
    const haveGraphics = await prisma.graphic.count({
        where: {
            status: "published",
            language: "DV"
        }
    })

    const posts = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            featureImageUrl: true
        },
        orderBy: {
            createdAt: "desc"
        },
        where: {
            status: "published",
            language: "DV"
        },
        take: 8
    })

    return {
        items: [
            ...categories.map((category) => ({
                name: category.name,
                url: `/dv/category/${category.slug}`,
                icon: category.icon
            })),
            havePhotos > 0 && {
                name: "ފޮޓޯ",
                url: `/dv/gaafu-gallery`,
                icon: ""
            },
            haveVideos > 0 && {
                name: "ވިޑިއޯ", 
                url: `/dv/videos`,
                icon: ""
            },
            haveGraphics > 0 && {
                name: "ގްރެފިކްސް",
                url: `/dv/gaafu_graphics`,
                icon: ""
            },
        ].filter(Boolean),
        latestPosts: posts?.map((post) => ({
            href: `/dv/${post.id}`,
            title: post.title,
            featureImage: post.featureImageUrl
        }))
    }
}

async function Ads() {
    const t_banner = await prisma.adBanner.findMany({
        select: {
            id: true,
            altTxt: true,
            adBannerUrl: true,
            url: true
        },
        where: {
            status: "published",
            language: "DV",
            adType: "t_banner"
        },
        orderBy: {
            id: "desc"
        }
    })

    return {
        t_banner: t_banner.map((ad)=>({
            src: ad.adBannerUrl,
            altText: ad.altTxt,
            href: ad.url
        }))
    }
}