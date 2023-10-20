import { Metadata } from "next"
import { Bell, File, FileImage, GalleryHorizontal, ImageIcon, LayoutDashboard, LibraryIcon, LucideIcon, MessageSquare, MonitorPlay, PanelTop, ScrollText, Send, UserIcon } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Sikundi io',
    description: 'Hehe Just a project',
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
            { name: "Insights", link: "/sikundi-admin", Icon: LayoutDashboard },
            { name: "Notifications", link: "/sikundi-admin/notification", Icon: Bell }
        ]
    },
    {
        title: "Collections",
        items: [
            { name: "Posts", link: "/", Icon: File },
            { name: "Graphics", link: "/", Icon: FileImage },
            { name: "Photos", link: "/", Icon: ImageIcon },
            { name: "Videos", link: "/", Icon: MonitorPlay },
            { name: "Library", link: "/", Icon: LibraryIcon },
            { name: "Pages", link: "/", Icon: PanelTop },
            { name: "Users", link: "/", Icon: UserIcon }
        ]
    },
    {
        title: "Plugins",
        items: [
            { name: "Ads Manager", link: "/", Icon: GalleryHorizontal },
            { name: "Logs", link: "/", Icon: ScrollText },
            { name: "FCM Notification", link: "/", Icon: Send }
        ]
    }
]