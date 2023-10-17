"use client"

import { Button } from "@sikundi/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@sikundi/components/ui/card"
import { Input } from "@sikundi/components/ui/input"
import Image from "next/image"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@sikundi/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import updatePasswordSchema, { updatePasswordSchemaType } from "@sikundi/app/(sikundi)/sikundi-login/(actions)/update-password/schema"
import { useToast } from "@sikundi/components/ui/use-toast"
import useSWRMutation from 'swr/mutation'
import { Fragment } from "react"
import { ToastAction } from "@sikundi/components/ui/toast"
import { Loader2 } from "lucide-react"
import { PostHandler } from "@sikundi/lib/client/fetcher"
import { zodErrorGenerator } from "@sikundi/lib/client/utils"


export default function PasswordUpdate() {
    const { toast } = useToast()
    const { trigger, isMutating } = useSWRMutation('/sikundi-login/update-password', PostHandler<updatePasswordSchemaType>, {
        onSuccess: (data) => {
            toast({
                title: "successfully submitted",
                description: JSON.stringify(data.data)
            })
        },
        onError: ({ response }) => {
            zodErrorGenerator(response.data.error, (data) => form.setError(
                // @ts-ignore
                data.field,
                { message: data.message },
                { shouldFocus: true }
            ))
            toast({
                title: response.data.notification.title || response.data.error.name,
                description: response.data.notification.description || JSON.stringify(response.data.error.details),
                variant: "destructive",
                action: <ToastAction altText="Try again" onClick={form.handleSubmit(data => trigger(data))}>Try again</ToastAction>
            })
        }
    })

    const form = useForm<updatePasswordSchemaType>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            password: "",
            confirm_password: ""
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
                    Enter your new passwords below to update
                </CardDescription>
            </CardHeader>


            <Form {...form}>
                <form onSubmit={form.handleSubmit(data => trigger(data))}>
                    <CardContent className="grid gap-4">
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                        <Input
                                            type='password'
                                            placeholder='******'
                                            {...field}
                                        />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='confirm_password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                        <Input
                                            type='password'
                                            placeholder='******'
                                            {...field}
                                        />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full mb-4" type={"submit"}>
                            {isMutating ? 
                            <Fragment>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Fragment>
                            : "Update"}
                        </Button>
                    </CardFooter>
                </form>
            </Form>

            
        </Card>
    )
}