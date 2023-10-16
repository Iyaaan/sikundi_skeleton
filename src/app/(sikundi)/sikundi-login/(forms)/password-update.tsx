"use client"

import { Button } from "@sikundi/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@sikundi/components/ui/card"
import { Input } from "@sikundi/components/ui/input"
import Image from "next/image"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@sikundi/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updatePasswordSchema, updatePasswordSchemaType } from "@sikundi/app/(sikundi)/sikundi-login/schema"


export default function PasswordUpdate() {
    const form = useForm<updatePasswordSchemaType>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            password: "",
            confirm_password: ""
        }
    })
  
    const onSubmit = form.handleSubmit((values: updatePasswordSchemaType) => {

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
                <form onSubmit={onSubmit}>
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
                        <Button className="w-full mb-4" type={"submit"}>Update</Button>
                    </CardFooter>
                </form>
            </Form>

            
        </Card>
    )
}