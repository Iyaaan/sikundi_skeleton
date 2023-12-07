import { Metadata } from "next"
import { Bell, File, FileImage, GalleryHorizontal, ImageIcon, LayoutDashboard, LibraryIcon, LucideIcon, MonitorPlay, PanelTop, ScrollText, Send, Table2Icon, UserIcon } from 'lucide-react'

export const metadata: Metadata = {
    title: 'gaafu media',
    description: 'gaafu media',
    openGraph: {
        title: 'gaafu media',
        description: 'gaafu media',
        siteName: "gaafu media",
        url: `${process.env.SITE_NAME}`,
        images: [
            {
              url: `/og.png`,
              width: 800,
              height: 600,
            }
        ],
        type: 'website',
    },
    metadataBase: new URL(String(process.env.SITE_NAME || "http://localhost:3000"))
}

export const sessionMaxDays = 30



interface menuItemType {
    title: string
    items: {
        name: string
        collection?: string
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
                collection: 'post',
                Icon: File 
            },
            { 
                name: "Library", 
                link: "/sikundi-admin/library", 
                collection: 'library',
                Icon: LibraryIcon 
            },
            { 
                name: "Graphics", 
                link: "/sikundi-admin/graphic", 
                collection: 'graphic',
                Icon: FileImage 
            },
            { 
                name: "Photo Gallery", 
                link: "/sikundi-admin/photo", 
                collection: 'photo',
                Icon: ImageIcon
            },
            { 
                name: "Videos", 
                link: "/sikundi-admin/video", 
                collection: 'video',
                Icon: MonitorPlay 
            },
            { 
                name: "Ad Manager", 
                link: "/sikundi-admin/ad-banner", 
                collection: 'adBanner',
                Icon: Table2Icon
            },
            // { 
            //     name: "Pages", 
            //     link: "/sikundi-admin/page", 
            //     Icon: PanelTop 
            // },
            { 
                name: "Users", 
                link: "/sikundi-admin/user", 
                collection: 'user',
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

export const permission = [
    {name: "post", actions: [
        "view",
        "draft",
        "delete",
        "soft_delete",
        "publish",
        "pending"
    ]},
    {name: "category", actions: [
        "view",
        "delete",
        "create",
        "update"
    ]},
    {name: "tag", actions: [
        "view",
        "delete",
        "create",
        "update"
    ]},
    {name: "library", actions: [
        "view",
        "delete",
        "create",
    ]},
    {name: "graphic", actions: [
        "view",
        "draft",
        "delete",
        "soft_delete",
        "publish",
        "pending"
    ]},
    {name: "adBanner", actions: [
        "view",
        "draft",
        "delete",
        "soft_delete",
        "publish",
        "pending"
    ]},
    {name: "photo", actions: [
        "view",
        "draft",
        "delete",
        "soft_delete",
        "publish",
        "pending"
    ]},
    {name: "video", actions: [
        "view",
        "draft",
        "delete",
        "soft_delete",
        "publish",
        "pending"
    ]},
    {name: "user", actions: [
        "view",
        "block",
        "create",
        "update"
    ]},
    {name: "role", actions: [
        "view",
        "delete",
        "create",
        "update"
    ]},
]