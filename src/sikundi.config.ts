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
    title: 'Sikundi Skeleton',
    description: 'Hehe Just a project',
    openGraph: {
        title: 'Sikundi Skeleton',
        description: 'Hehe Just a project',
        siteName: "Sikundi Io",
        url: `${process.env.site_name}`,
        images: [
            {
              url: `${process.env.site_name}/og.png`,
              width: 800,
              height: 600,
            }
        ],
        locale: 'en_US',
        type: 'website'
    }
}