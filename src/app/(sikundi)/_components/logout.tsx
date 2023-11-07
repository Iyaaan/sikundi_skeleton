"use client"

import { useForm } from 'react-hook-form'
import { Form } from '@sikundi/components/ui/form'
import { LogInSchemaType } from "@sikundi/app/(sikundi)/sikundi-login/api/log-in/schema"
import { Fragment, ReactNode } from "react"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { DropdownMenuItem } from "@sikundi/components/ui/dropdown-menu"
import useAction from '@sikundi/lib/client/hooks/useAction'
import LogOutAction from '@sikundi/app/(sikundi)/sikundi-login/actions/log-out'

export default function LogOut({children}: {children: ReactNode}) {
    const router = useRouter()
    const form = useForm<LogInSchemaType>()

    const { isLoading, execute } = useAction(LogOutAction, {
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(data => execute(data))}>
                <DropdownMenuItem disabled={isLoading} aria-disabled={isLoading} onClick={form.handleSubmit(data => execute(data))}>
                    {isLoading ? 
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