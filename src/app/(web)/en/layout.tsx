import '../../globals.css'
import ThemeProvider from "@sikundi/components/web/Theme"
import AnalyticsProvider from '@sikundi/components/web/GoogleAnalytics'
import localFont from 'next/font/local'
import NextTopLoader from 'nextjs-toploader'
import Header from '@sikundi/app/(web)/en/_components/Header'
import Footer from '@sikundi/app/(web)/en/_components/Footer'
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
                        <Header items={[
                            {name: "News", url: "/category/news"},
                            {name: "Sports", url: "/category/sports"},
                            {name: "Earth", url: "/category/earth"},
                            {name: "Reel", url: "/category/reel"},
                            {name: "Worklife", url: "/category/work-life"},
                            {name: "Travel", url: "/category/travel"},
                            {name: "Culture", url: "/category/culture"}
                        ]} />
                        <main className='w-full min-h-[calc(100vh-64px)]'>
                            {props.children}
                        </main>
                        <Footer items={[
                            { name: "About us", url: "/pages/about-us" },
                            { name: "Privacy Policy", url: "/pages/privacy-policy" },
                            { name: "Terms of Service", url: "/pages/terms-of-service" },
                            { name: "Privacy Policy", url: "/pages/privacy-policy" }
                        ]} />
                    </AnalyticsProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}