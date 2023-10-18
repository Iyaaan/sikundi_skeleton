import '../globals.css'
import { ThemeProvider } from "@sikundi/components/theme-provider"
import localFont from 'next/font/local'
import { ReactNode } from 'react'
export { metadata } from '@sikundi/sikundi.config'
import { Toaster } from "@sikundi/components/ui/toaster"
import CsrfProvider from '@sikundi/components/csrf-provider'

const inter = localFont({
    src: [
        {
            path: '../../../public/fonts/dhivehi/MV_Faseyha.woff2',
            weight: '100',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/inter/Inter-Thin.woff2',
            weight: '100',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/dhivehi/MV_Faseyha.woff2',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/inter/Inter-ExtraLight.woff2',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/dhivehi/MV_Faseyha.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/inter/Inter-Light.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/dhivehi/MV_Faseyha.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/inter/Inter-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/dhivehi/MVWaheed.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/inter/Inter-Medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/dhivehi/MVWaheed.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/inter/Inter-SemiBold.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/dhivehi/MVWaheed.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/inter/Inter-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/dhivehi/aammufkF.ttf',
            weight: '800',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/inter/Inter-ExtraBold.woff2',
            weight: '800',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/dhivehi/aammufkF.ttf',
            weight: '900',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/inter/Inter-Black.woff2',
            weight: '900',
            style: 'normal',
        },
    ],
    variable: '--font-inter',
    display: 'swap',
    adjustFontFallback: 'Times New Roman'
})

interface Props {
    children: ReactNode
}

export default function RootLayout(props: Props) {
    return (
        <html lang="en" className={`${inter.variable}`}>
            <body className='sikundi'>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <CsrfProvider token={String(process.env.CSRF_SECRET)}>
                        {props.children}
                    </CsrfProvider>
                </ThemeProvider>
                <Toaster />
            </body>
        </html>
    )
}
