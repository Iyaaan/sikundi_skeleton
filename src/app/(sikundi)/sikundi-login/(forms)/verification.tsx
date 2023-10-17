"use client"

import { Button } from "@sikundi/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@sikundi/components/ui/card"
import { Input } from "@sikundi/components/ui/input"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@sikundi/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import verificationSchema, { verificationSchemaType } from "@sikundi/app/(sikundi)/sikundi-login/actions/verify/schema"
import useSWRMutation from 'swr/mutation'
import axios from 'axios'
import { Fragment, useEffect } from "react"
import { useToast } from "@sikundi/components/ui/use-toast"
import { ToastAction } from "@sikundi/components/ui/toast"
import { Loader2 } from "lucide-react"

export default function Verification() {
    const { toast } = useToast()
    const router = useRouter()
    const { trigger, isMutating, data, error } = useSWRMutation('/sikundi-login/actions/verify', async (url, { arg }: { arg: verificationSchemaType }) => await axios.post<any>(url, arg))
    const form = useForm<verificationSchemaType>({
        resolver: zodResolver(verificationSchema),
        defaultValues: {
            otp: ''
        }
    })

    useEffect(() => {
        console.log("rerender")
        if (error) {
            const err = error.response.data
            toast({
                title: err.error,
                description: JSON.stringify(err.details),
                variant: "destructive",
                action: <ToastAction altText="Try again">Try again</ToastAction>
            })
        }
        if (data) {
            toast({
                title: "successfully submitted",
                description: JSON.stringify(data.data)
            })
        }
    }, [data, error, toast])

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
                <form onSubmit={form.handleSubmit(data => trigger(data))}>
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
                        <Button className="w-full mb-4" type={"submit"}>
                            {isMutating ? 
                            <Fragment>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Fragment>
                            : "Verify"}
                        </Button>
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