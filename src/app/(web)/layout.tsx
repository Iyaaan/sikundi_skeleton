import '../globals.css'
import type { Metadata } from 'next'
import ThemeProvider from "@sikundi/components/web/Theme"
import AnalyticsProvider from '@sikundi/components/web/GoogleAnalytics'
import Header from '@sikundi/app/(web)/Header'
import Footer from '@sikundi/app/(web)/Footer'
import MenuModal from '@sikundi/app/(web)/MenuModal'
import localFont from 'next/font/local'
import NextTopLoader from 'nextjs-toploader'
import LandScapeAdThin from '@sikundi/components/web/ad/LandScapeAdThin'
import { prisma } from '@sikundi/lib/server/utils/prisma'

const font = localFont({
    src: [
        {
            path: '../../../public/fonts/metropolis/Metropolis-Thin.woff2',
            weight: '100',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/dhivehi/mvtyper.woff2',
            weight: '100',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/metropolis/Metropolis-ExtraLight.woff2',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/dhivehi/mvtyper.woff2',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/metropolis/Metropolis-Light.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/dhivehi/mvtyper.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/metropolis/Metropolis-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/dhivehi/Randhoo_reg_hinted.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/metropolis/Metropolis-Medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/dhivehi/Randhoo_reg_hinted.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/metropolis/Metropolis-SemiBold.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/dhivehi/Randhoo_reg_hinted.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/metropolis/Metropolis-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/dhivehi/MVAWaheed.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/metropolis/Metropolis-ExtraBold.woff2',
            weight: '800',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/dhivehi/MVAWaheed.woff2',
            weight: '800',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/metropolis/Metropolis-Black.woff2',
            weight: '900',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/dhivehi/MVAWaheed.woff2',
            weight: '900',
            style: 'normal',
        }
    ],
    variable: '--font-inter',
    display: 'swap',
    adjustFontFallback: 'Times New Roman'
})

export const metadata: Metadata = {
    title: 'Web',
    description: 'Web View',
}

interface Props {
    children: React.ReactNode
}

export default async function RootLayout(props: Props) {
    const { items, latestPosts } = await menu()

    return (
        <html lang="dv-Mv" translate="no">
            <body className={`${font.className} bg-web-background dark:bg-web-background-dark text-web-accent dark:text-web-accent-dark selection:bg-web-primary dark:selection:bg-web-primary selection:text-white dark:selection:text-white`} dir='rtl'>
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
                        <div className='grid grid-cols-12'>
                            <LandScapeAdThin href={"https://bankofmaldives.com.mv"} 
                                target="_blank"
                                containerClass="container px-4 mt-4 col-span-12 lg:col-span-8 lg:col-start-3"
                                data={{
                                    coverImage: `/sample_media/NzVkNTc1ZmM5MzViZTRiYzMwMDJkYTI2OWIxMjA5OGM=.gif`,
                                    alt: "Bank Of Maldives"
                                }}
                            />
                        </div>
                        <Header menuItems={items} />
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
            }
        },
        orderBy: {
            id: "asc"
        }
    })

    const havePhotos = await prisma.photo.count({
        where: {
            status: "published"
        }
    })
    const haveVideos = await prisma.video.count({
        where: {
            status: "published"
        }
    })
    const haveGraphics = await prisma.graphic.count({
        where: {
            status: "published"
        }
    })

    const posts = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            featureImageUrl: true
        },
        orderBy: {
            createdAt: "asc"
        },
        where: {
            status: "published"
        },
        take: 8
    })

    return {
        items: [
            ...categories.map((category) => ({
                name: category.name,
                url: `/category/${category.slug}`,
                icon: category.icon
            })),
            havePhotos > 0 && {
                name: "ފޮޓޯ",
                url: `/gaafu-gallery`,
                icon: ""
            },
            haveVideos > 0 && {
                name: "ވިޑިއޯ",
                url: `/videos`,
                icon: ""
            },
            haveGraphics > 0 && {
                name: "ގްރެފިކްސް",
                url: `/gaafu_graphics`,
                icon: ""
            },
        ].filter(Boolean),
        latestPosts: posts?.map((post) => ({
            href: `/${post.id}`,
            title: post.title,
            featureImage: post.featureImageUrl
        }))
    }
}