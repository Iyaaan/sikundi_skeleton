"use client"

import { Button } from "@sikundi/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@sikundi/components/ui/card"
import { Input } from "@sikundi/components/ui/input"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@sikundi/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { verificationSchema, verificationSchemaType } from "@sikundi/app/(sikundi)/sikundi-login/action/schema"

export default function Verification() {
    const router = useRouter()
    const form = useForm<verificationSchemaType>({
        resolver: zodResolver(verificationSchema),
        defaultValues: {
            otp: ''
        }
    })
  
    const onSubmit = form.handleSubmit((values: verificationSchemaType) => {

    })

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
                <div className="flex gap-3 items-end justify-center mb-3 flex-wrap">
                    <Image src={"/sikundi.svg"} alt="sikundi logo" width={50} height={50} />
                    <CardTitle className="text-3xl text-center font-bold">Sikundi io</CardTitle>
                </div>
                <CardDescription className="text-center">
                    Enter otp sent to your email below to reset
                </CardDescription>
            </CardHeader>


            <Form {...form}>
                <form onSubmit={onSubmit}>
                    <CardContent className="grid gap-4">
                        <FormField
                            control={form.control}
                            name='otp'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Otp</FormLabel>
                                    <FormControl>
                                    <Input
                                        type='password'
                                        placeholder='****'
                                        {...field}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full mb-4">Verify</Button>
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
            </Form>


            <CardFooter>
                <Button className="w-full" variant={"outline"} onClick={() => router.back()}>
                    Back
                </Button>
            </CardFooter>
        </Card>
    )
}