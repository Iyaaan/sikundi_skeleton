"use client"

import Link from "next/link"
import { twMerge } from "tailwind-merge"

const menuItems = [
    { label: "About us", link: "/pages/about-us", className: "order-0" },
    { label: "Privacy Policy", link: "/pages/privacy-policy", className: "order-1" },
    { label: "Terms of Service", link: "/pages/terms-of-service", className: "order-3" },
    { label: "Privacy Policy", link: "/pages/privacy-policy", className: "order-4" }
]

const Footer = () => {
    return (
        <footer dir="ltr" className="bg-web-foreground dark:bg-web-foreground-dark rounded-t-3xl lg:rounded-t-[3rem]">
            <div className="container px-4 py-10 grid grid-cols-12 gap-4 items-center">
                {menuItems?.map((item, index)=>(
                    <Link key={index} href={item.link} className={twMerge([
                        "col-span-2 text-lg font-normal text-center hidden lg:block",
                        "hover:text-web-primary hover:dark:text-web-primary-dark focus:opacity-75",
                        item.className
                    ])}>
                        {item.label}
                    </Link>
                ))}
                <h3 className="col-span-12 lg:col-span-4 px-8 text-center order-2 text-xl font-extralight">
                    {"© 2019 Gaafu Media Group Pvt Ltd. All Rights Reserved"}
                </h3>
            </div>
        </footer>
    )
}

export default Footer