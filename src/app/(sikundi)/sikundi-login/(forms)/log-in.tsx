"use client"

import { Button } from "@sikundi/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@sikundi/components/ui/card"
import { Input } from "@sikundi/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@sikundi/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LogInSchema, LogInSchemaType } from "@sikundi/app/(sikundi)/sikundi-login/action/schema"
import { ToastAction } from "@sikundi/components/ui/toast"
import { useToast } from "@sikundi/components/ui/use-toast"

export default function LogIn() {
    const { toast } = useToast()
    const form = useForm<LogInSchemaType>({
        resolver: zodResolver(LogInSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })
  
    const onSubmit = form.handleSubmit((values: LogInSchemaType) => {
        toast({
            variant: "destructive",
            title: "SERVER ERROR",
            description: "unknown error happened at postgres://192.168.0.12:5453",
            action: <ToastAction altText="Try again">Try again</ToastAction>
        })
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
                <form onSubmit={onSubmit}>
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
                        <Button className="w-full mb-4" type="submit">Log In</Button>
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
                        Reset
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}