import { Metadata } from "next"
import { Bell, File, FileImage, GalleryHorizontal, ImageIcon, LayoutDashboard, LibraryIcon, LucideIcon, MonitorPlay, PanelTop, ScrollText, Send, UserIcon } from 'lucide-react'

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
        type: 'website',
    },
    metadataBase: new URL(String(process.env.SITE_NAME || "http://localhost:3000"))
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
            { 
                name: "Insights", 
                link: "/sikundi-admin",
                Icon: LayoutDashboard
            },
            { 
                name: "Notifications", 
                link: "/sikundi-admin/notification", 
                Icon: Bell
            }
        ]
    },
    {
        title: "Collections",
        items: [
            {
                name: "Posts", 
                link: "/sikundi-admin/post", 
                Icon: File 
            },
            { 
                name: "Library", 
                link: "/sikundi-admin/library", 
                Icon: LibraryIcon 
            },
            { 
                name: "Graphics", 
                link: "/sikundi-admin/graphic", 
                Icon: FileImage 
            },
            { 
                name: "Photo Gallery", 
                link: "/sikundi-admin/photo", 
                Icon: ImageIcon
            },
            { 
                name: "Videos", 
                link: "/sikundi-admin/video", 
                Icon: MonitorPlay 
            },
            // { 
            //     name: "Pages", 
            //     link: "/sikundi-admin/page", 
            //     Icon: PanelTop 
            // },
            { 
                name: "Users", 
                link: "/sikundi-admin/user", 
                Icon: UserIcon
            }
        ]
    },
    // {
    //     title: "Plugins",
    //     items: [
    //         { name: "Ads Manager", link: "/sikundi-admin/ad", Icon: GalleryHorizontal },
    //         { name: "Logs", link: "/sikundi-admin/log", Icon: ScrollText }
    //     ]
    // }
]