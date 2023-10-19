import React from 'react'
import LogOut from "../_components/logout"
import ThemeSwitcher from "@sikundi/components/ui/theme-switcher"
import { Avatar, AvatarFallback, AvatarImage } from "@sikundi/components/ui/avatar"
import { Button } from "@sikundi/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@sikundi/components/ui/dropdown-menu"
import { Input } from "@sikundi/components/ui/input"
import Image from "next/image"
import getUser from "@sikundi/lib/server/getUser"
import H1 from '@sikundi/components/ui/typography/h1'
import { SheetTrigger } from '@sikundi/components/ui/sheet'
import { MoreVertical } from 'lucide-react'

export default async function Header () {
    const user = await getUser()
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <div className="flex items-center space-x-4 w-full">
                    <div className='flex lg:w-[300px] items-center gap-4'>
                        <Image src={"/sikundi.svg"} alt="sikundi logo" width={45} height={45} />
                        <H1 className="text-3xl text-center font-semibold hidden lg:block">Sikundi io</H1>
                    </div>
                    <div className="flex-1">
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="md:w-[150px] lg:w-[400px]"
                        />
                    </div>
                    <ThemeSwitcher />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                                <AvatarFallback>{String(user?.payload?.userName).split(" ").map((l)=>l[0])}</AvatarFallback>
                            </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none mb-1">{String(user?.payload?.userName)}</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {String(user?.payload?.email)}
                                </p>
                            </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Report
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <LogOut>Log out</LogOut>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <SheetTrigger className='lg:hidden'>
                        <MoreVertical />
                    </SheetTrigger>
                </div>
            </div>
        </div>
    )
}