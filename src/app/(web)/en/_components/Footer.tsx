"use client"

import Link from "next/link"
import { twMerge } from "tailwind-merge"

export default function Footer({ items }:{items: {name: string; url:string;}[]}) {
    return (
        <footer className="w-full border border-[#0000000F] bg-web-en-background dark:bg-web-en-background-dark rounded-t-3xl lg:rounded-t-[3rem]">
            <div className="container px-4 py-10 grid grid-cols-12 gap-4 items-center">
                {items?.map((item, index)=>(
                    <Link key={index} href={item.url} className={twMerge([
                        "col-span-2 text-base font-normal text-center hidden lg:block",
                        "hover:text-web-primary hover:dark:text-web-primary-dark focus:opacity-75",
                        index == 0 && "order-1",
                        index == 1 && "order-2",
                        index == 2 && "order-4",
                        index == 3 && "order-5"
                    ])}>
                        {item.name}
                    </Link>
                ))}
                <h3 className="col-span-12 lg:col-span-4 px-8 text-center text-base font-extralight order-3">
                    {"© 2019 Gaafu Media Group Pvt Ltd. All Rights Reserved"}
                </h3>
            </div>
        </footer>
    )
}
