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

export default function PasswordUpdate() {
    return (
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
                <div className="flex gap-3 items-end justify-center mb-3 flex-wrap">
                    <Image src={"/sikundi.svg"} alt="sikundi logo" width={50} height={50} />
                    <CardTitle className="text-3xl text-center font-bold">Sikundi io</CardTitle>
                </div>
                <CardDescription className="text-center">
                    Enter your new passwords below to update
                </CardDescription>
            </CardHeader>
            <form action="/">
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="*********" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirm_password">Confirm password</Label>
                        <Input id="confirm_password" type="password" placeholder="*********" required />
                    </div>
                </CardContent>
                <CardFooter>
                        <Button className="w-full mb-4">Update</Button>
                </CardFooter>
            </form>
        </Card>
    )
}