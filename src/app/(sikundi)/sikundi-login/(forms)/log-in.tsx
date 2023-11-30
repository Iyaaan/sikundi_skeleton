"use client"

import { Button } from "@sikundi/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@sikundi/components/ui/card"
import { Input } from "@sikundi/components/ui/input"
import Image from "@sikundi/components/Image"
import Link from "next/link"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@sikundi/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import LogInSchema, { LogInSchemaType } from "@sikundi/app/(sikundi)/sikundi-login/actions/log-in/schema"
import { Fragment } from "react"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import useAction from "@sikundi/lib/client/hooks/useAction"
import LogInAction from "../actions/log-in"

export default function LogIn() {
    const router = useRouter()
    const form = useForm<LogInSchemaType>({
        resolver: zodResolver(LogInSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const { isLoading, execute } = useAction(LogInAction, {
        onSuccess: ({ data }) => {
            router.refresh()
        },
        onError: ({ error }) => console.error(error),
        onValidationError: (data) => form.setError(
            // @ts-ignore
            data.field,
            { message: data.message },
            { shouldFocus: true }
        )
    })

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

            <Form {...form}>
                <form onSubmit={form.handleSubmit(data => execute(data))}>
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
                        <Button className="w-full mb-4" type="submit" disabled={isLoading} aria-disabled={isLoading}>
                            {isLoading ? 
                            <Fragment>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Fragment>
                            : "Log In"}
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
                <Button className="w-full" variant={"outline"} asChild>
                    <Link href={{pathname: "/sikundi-login", query: {
                        "action": "lostpassword"
                    }}}>
                        Forgot password?
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}