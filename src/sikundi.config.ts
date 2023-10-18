import { Metadata } from "next"

export const theme = {
    primary: {
        DEFAULT: {
            background: "#C62128",
            foreground: "#FFFFFF"
        },
        dark: {
            background: "#C62128",
            foreground: "#FFFFFF"
        }
    }
}

export const metadata: Metadata = {
    title: 'Sikundi io',
    description: 'Hehe Just a project',
    metadataBase: new URL(`${process.env.SITE_NAME}`),
    openGraph: {
        title: 'Sikundi io',
        description: 'The future of jam stack web architecture',
        siteName: "Sikundi io",
        url: `${process.env.SITE_NAME}`,
        images: [
            {
              url: `/og.png`,
              width: 800,
              height: 600,
            }
        ],
        locale: 'en_US',
        type: 'website'
    }
}

export const sessionMaxDays = 30