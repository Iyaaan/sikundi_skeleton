"use client"

import { Button } from "@sikundi/components/ui/button"
import { Card, CardContent } from "@sikundi/components/ui/card"
import { Input } from "@sikundi/components/ui/input"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@sikundi/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import LogInSchema, { LogInSchemaType } from "@sikundi/app/(sikundi)/sikundi-login/api/log-in/schema"
import { useToast } from "@sikundi/components/ui/use-toast"
import useSWRMutation from 'swr/mutation'
import { Fragment } from "react"
import { ToastAction } from "@sikundi/components/ui/toast"
import { Loader2 } from "lucide-react"
import { PostHandler } from "@sikundi/lib/client/fetcher"
import { zodErrorGenerator } from "@sikundi/lib/client/utils"
import { useRouter } from "next/navigation"

export default function PostForm() {
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm<LogInSchemaType>({
        resolver: zodResolver(LogInSchema),
        defaultValues: {
            
        }
    })
    const { trigger, isMutating } = useSWRMutation('/', PostHandler<any>, {
        onSuccess: (data) => {
            toast(data?.data?.notification || {
                title: "successfully submitted",
                description: JSON.stringify(data.data)
            })
            // router.replace("/sikundi-admin")
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
                action: response.data.error.name !== "Validation Error" ? 
                    <ToastAction altText="Try again" onClick={form.handleSubmit(data => trigger(data))}>
                        Try again
                    </ToastAction> 
                : undefined
            })
        }
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(data => trigger(data))} className="grid grid-cols-12">
                <Card className="pt-6 col-span-8">
                    <CardContent className="grid gap-4">
                        
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}