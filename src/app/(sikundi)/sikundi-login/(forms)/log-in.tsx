"use client"

import { Button } from "@sikundi/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@sikundi/components/ui/card"
import { Input } from "@sikundi/components/ui/input"
import { Label } from "@sikundi/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { login } from "@sikundi/app/(sikundi)/sikundi-login/actions"

export default function LogIn() {
    return (
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
                <div className="flex gap-3 items-end justify-center mb-3 flex-wrap">
                    <Image src={"/sikundi.svg"} alt="sikundi logo" width={50} height={50} />
                    <CardTitle className="text-3xl text-center font-bold">Sikundi io</CardTitle>
                </div>
                <CardDescription className="text-center">
                    Enter your email below to login
                </CardDescription>
            </CardHeader>
            <form action={login}>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="demo@sikundi.io" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="*********" required />
                    </div>
                    <Button className="w-full mb-4">Log In</Button>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or
                            </span>
                        </div>
                    </div>
                </CardContent>
            </form>
            <CardFooter>
                <Button className="w-full" variant={"outline"} asChild>
                    <Link href={{pathname: "/sikundi-login", query: {
                        "action": "lostpassword"
                    }}}>
                        Reset
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}