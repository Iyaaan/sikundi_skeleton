import { Metadata } from "next"
import { Bell, File, FileImage, ImageIcon, LayoutDashboard, LibraryIcon, LucideIcon, MessageSquare, MonitorPlay, Send } from 'lucide-react'

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



interface menuItemType {
    title: string
    items: {
        name: string
        link: string
        Icon: LucideIcon
    }[]
}
export const menuItems:menuItemType[] = [
    {
        title: "Dashboard",
        items: [
            { name: "Insights", link: "/", Icon: LayoutDashboard },
            { name: "Notifications", link: "/", Icon: Bell }
        ]
    },
    {
        title: "Collections",
        items: [
            { name: "Posts", link: "/", Icon: File },
            { name: "Graphics", link: "/", Icon: FileImage },
            { name: "Photos", link: "/", Icon: ImageIcon },
            { name: "Videos", link: "/", Icon: MonitorPlay },
            { name: "Library", link: "/", Icon: LibraryIcon }
        ]
    },
    {
        title: "Plugins",
        items: [
            { name: "Message Bird", link: "/", Icon: MessageSquare },
            { name: "FCM Notification", link: "/", Icon: Send }
        ]
    }
]