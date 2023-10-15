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
    metadataBase: new URL(`${process.env.site_name}`),
    openGraph: {
        title: 'Sikundi io',
        description: 'The future of jam stack web architecture',
        siteName: "Sikundi io",
        url: `${process.env.site_name}`,
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