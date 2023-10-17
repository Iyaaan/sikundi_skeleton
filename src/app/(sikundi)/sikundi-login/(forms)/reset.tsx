"use client"

import { Button } from "@sikundi/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@sikundi/components/ui/card"
import { Input } from "@sikundi/components/ui/input"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@sikundi/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import resetSchema, { resetSchemaType } from "@sikundi/app/(sikundi)/sikundi-login/actions/reset/schema"
import { useToast } from "@sikundi/components/ui/use-toast"
import { ToastAction } from "@sikundi/components/ui/toast"
import useSWRMutation from 'swr/mutation'
import { Fragment } from "react"
import { Loader2 } from "lucide-react"
import { PostHandler } from "@sikundi/lib/client/fetcher"

export default function Reset() {
    const { toast } = useToast()
    const router = useRouter()
    const { trigger, isMutating } = useSWRMutation('/sikundi-login/actions/reset', PostHandler<resetSchemaType>, {
        onSuccess: (data) => {
            toast({
                title: "successfully submitted",
                description: JSON.stringify(data.data)
            })
        },
        onError: ({ response }) => {
            toast({
                title: response.data.error,
                description: JSON.stringify(response.data.details),
                variant: "destructive",
                action: <ToastAction altText="Try again">Try again</ToastAction>
            })
            
        }
    })
    const form = useForm<resetSchemaType>({
        resolver: zodResolver(resetSchema),
        defaultValues: {
            email: ''
        }
    })

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
                <div className="flex gap-3 items-end justify-center mb-3 flex-wrap">
                    <Image src={"/sikundi.svg"} alt="sikundi logo" width={50} height={50} />
                    <CardTitle className="text-3xl text-center font-bold">Sikundi io</CardTitle>
                </div>
                <CardDescription className="text-center">
                    Enter your email below to reset
                </CardDescription>
            </CardHeader>


            <Form {...form}>
                <form onSubmit={form.handleSubmit(data => trigger(data))}>
                    <CardContent className="grid gap-4">
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                    <Input placeholder='coffeedev@sikundi.io' {...field} />
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
                            : "Reset"}
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