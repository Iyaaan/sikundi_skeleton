"use client"

import { Button } from "@sikundi/components/ui/button"
import { useForm } from 'react-hook-form'
import { Form } from '@sikundi/components/ui/form'
import { LogInSchemaType } from "@sikundi/app/(sikundi)/sikundi-login/(actions)/log-in/schema"
import { useToast } from "@sikundi/components/ui/use-toast"
import useSWRMutation from 'swr/mutation'
import { Fragment, ReactNode } from "react"
import { ToastAction } from "@sikundi/components/ui/toast"
import { Loader2 } from "lucide-react"
import { PostHandler } from "@sikundi/lib/client/fetcher"
import { zodErrorGenerator } from "@sikundi/lib/client/utils"
import { useRouter } from "next/navigation"
import { DropdownMenuItem } from "@sikundi/components/ui/dropdown-menu"

export default function LogOut({children}: {children: ReactNode}) {
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm<LogInSchemaType>()
    const { trigger, isMutating } = useSWRMutation('/sikundi-login/log-out', PostHandler<any>, {
        onSuccess: (data) => {
            toast(data?.data?.notification || {
                title: "successfully submitted",
                description: JSON.stringify(data.data)
            })
            router.replace("/sikundi-login")
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
            <form onSubmit={form.handleSubmit(data => trigger(data))}>
                <DropdownMenuItem disabled={isMutating} aria-disabled={isMutating} onClick={form.handleSubmit(data => trigger(data))}>
                    {isMutating ? 
                    <Fragment>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </Fragment>
                    : children || "Log Out"}
                </DropdownMenuItem>
            </form>
        </Form>
    )
}