import { Avatar, AvatarFallback, AvatarImage } from "@sikundi/components/ui/avatar"
import { Button } from "@sikundi/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@sikundi/components/ui/dropdown-menu"
import { Input } from "@sikundi/components/ui/input"
import Image from "next/image"
import { ReactNode } from "react"
import getUser from "@sikundi/lib/server/getUser"
import LogOut from "../_components/logout"

interface Props {
    children: ReactNode
}

export default async function SikundiAdminLayout(props: Props) {
    const user = await getUser()

    return (
        <main className="">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <div className="flex items-center space-x-4 w-full">
                        <Image src={"/sikundi.svg"} alt="sikundi logo" width={55} height={55} />
                        <div className="flex-1">
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="md:w-[100px] lg:w-[300px]"
                            />
                        </div>
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
                    </div>
                </div>
            </div>
            {props.children}
        </main>
    )
}