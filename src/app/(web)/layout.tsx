import '../globals.css'
import type { Metadata } from 'next'
import ThemeProvider from "@sikundi/components/web/Theme"
import AnalyticsProvider from '@sikundi/components/web/GoogleAnalytics'
import Header from '@sikundi/app/(web)/Header'
import Footer from '@sikundi/app/(web)/Footer'
import MenuModal from '@sikundi/app/(web)/MenuModal'
import localFont from 'next/font/local'

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

export default function RootLayout(props: Props) {
    return (
        <html lang="dv-Mv" translate="no">
            <body className={`${font.className} bg-web-background dark:bg-web-background-dark text-web-accent dark:text-web-accent-dark selection:bg-web-primary dark:selection:bg-web-primary selection:text-white dark:selection:text-white`} dir='rtl'>
                <ThemeProvider>
                    <AnalyticsProvider>
                        <Header />
                        <MenuModal />
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
