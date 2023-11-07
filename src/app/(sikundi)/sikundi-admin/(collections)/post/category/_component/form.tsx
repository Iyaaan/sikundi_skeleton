"use client"

import { Button } from "@sikundi/components/ui/button"
import { Card, CardContent } from "@sikundi/components/ui/card"
import { Input } from "@sikundi/components/ui/input"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@sikundi/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from "@sikundi/components/ui/use-toast"
import useSWRMutation from 'swr/mutation'
import { ToastAction } from "@sikundi/components/ui/toast"
import { CalendarIcon, Loader2 } from "lucide-react"
import { PostHandler } from "@sikundi/lib/client/fetcher"
import { cn, zodErrorGenerator } from "@sikundi/lib/client/utils"
import { useParams, useRouter } from "next/navigation"
import { Select2Async } from "@sikundi/components/ui/Select2Async"
import { Popover, PopoverContent, PopoverTrigger } from "@sikundi/components/ui/popover"
import { format } from "date-fns"
import { Calendar } from "@sikundi/components/ui/calendar"
import CategorySchema, { CategorySchemaType } from "../api/create/schema"
import { Fragment, useEffect } from "react"
import { ThaanaLatin } from "@sikundi/lib/transliterate"
import { UserType } from "@sikundi/lib/server/utils/getUser"
import axios from "axios"
import { Textarea } from "@sikundi/components/ui/textarea"

interface Props {
    user: UserType
    data?: {[name:string]: unknown}
    type: "create" | "update"
}

export default function CategoryForm({ user, data, type }: Props) {
    const { toast } = useToast()
    const router = useRouter()
    const params = useParams()
    const form = useForm<CategorySchemaType>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            createdBy: { label: `${user.payload.userName}`, value: `${user.payload.email}` },
            createdAt: new Date(),
            name: "",
            slug: "",
            ...data
        }
    })
    
    const name = form.watch("name") 
    useEffect(() => {
        form.setValue("slug", ThaanaLatin(form.getValues('name')))
    }, [name, form])

    const { trigger, isMutating } = useSWRMutation(
        type === 'create' ? '/sikundi-admin/post/category/api/create' :
        `/sikundi-admin/post/category/api/${params.id}/update`
        , PostHandler<any>, {
        onSuccess: (data) => {
            toast(data?.data?.notification || {
                title: "successfully submitted",
                description: JSON.stringify(data.data)
            })
            router.back()
            router.refresh()
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
            <form onSubmit={form.handleSubmit(data => trigger(data))} className="grid lg:grid-cols-12 gap-4">
                <Card className="pt-6 lg:col-span-8 lg:row-span-2 lg:order-1">
                    <CardContent className="grid gap-4">
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input dir="rtl" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea dir="rtl" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
                <Card className="pt-6 lg:col-span-4 lg:order-2">
                    <CardContent className="grid gap-4">
                        <FormField
                            control={form.control}
                            name='createdAt'
                            render={({ field }) => (
                                <FormItem>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                                >
                                                {field.value ? (
                                                    format(new Date(field.value), "PPP")
                                                ) : (
                                                    <span>Publish at</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value ? new Date(field.value) : undefined}
                                                onSelect={field.onChange}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='createdBy'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select2Async
                                            isClearable={false}
                                            className='col-span-2 justify-start'
                                            placeholder="author"
                                            defaultOptions={[{
                                                // @ts-ignore
                                                label: `search for authors`, value: `search for authors`, isDisabled: true
                                            }]}
                                            loadOptions={(inputValue: string) => new Promise(async (resolve) => {
                                                axios.get('/sikundi-admin/user/api/select', {
                                                    params: {
                                                        query: inputValue
                                                    }
                                                }).then(({ data }) => {
                                                    resolve(data.data)
                                                }).catch((error) => {
                                                    toast({
                                                        title: error.data.notification.title || error.data.error.name,
                                                        description: error.data.notification.description || JSON.stringify(error.data.error.details),
                                                        variant: "destructive",
                                                        action: error.data.error.name !== "Validation Error" ? 
                                                            <ToastAction altText="Try again" onClick={form.handleSubmit(data => trigger(data))}>
                                                                Try again
                                                            </ToastAction> 
                                                        : undefined
                                                    })
                                                    resolve([])
                                                })
                                            })}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 items-center gap-2">
                            {
                                type === "create" ?
                                <Button className="col-span-2" disabled={isMutating} aria-disabled={isMutating} onClick={()=>form.setValue("action", "create")}>
                                    {(isMutating && form.getValues("action") === "create") ? 
                                    <Fragment>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Loading
                                    </Fragment>
                                    : "create"}
                                </Button> :
                                <Fragment>
                                    <Button disabled={isMutating} aria-disabled={isMutating} onClick={()=>form.setValue("action", "update")}>
                                        {(isMutating && form.getValues("action") === "update") ? 
                                        <Fragment>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Loading
                                        </Fragment>
                                        : "update"}
                                    </Button> 
                                    <Button disabled={isMutating} aria-disabled={isMutating} variant={"secondary"} onClick={()=>form.setValue("action", "delete")}>
                                        {(isMutating && form.getValues("action") === "delete") ? 
                                        <Fragment>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Loading
                                        </Fragment>
                                        : "delete"}
                                    </Button> 
                                </Fragment>
                            }
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}