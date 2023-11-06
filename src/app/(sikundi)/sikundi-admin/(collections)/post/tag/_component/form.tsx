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
import { CalendarIcon } from "lucide-react"
import { PostHandler } from "@sikundi/lib/client/fetcher"
import { cn, zodErrorGenerator } from "@sikundi/lib/client/utils"
import { useRouter } from "next/navigation"
import { Select2Async } from "@sikundi/components/ui/Select2Async"
import { Popover, PopoverContent, PopoverTrigger } from "@sikundi/components/ui/popover"
import { format } from "date-fns"
import { Calendar } from "@sikundi/components/ui/calendar"
import TagSchema, { TagSchemaType } from "../api/create/schema"
import { useEffect } from "react"
import { ThaanaLatin } from "@sikundi/lib/transliterate"
import axios from "axios"
import { UserType } from "@sikundi/lib/server/utils/getUser"

interface Props {
    user: UserType
}

export default function TagForm({ user }: Props) {
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm<TagSchemaType>({
        resolver: zodResolver(TagSchema),
        defaultValues: {
            
        }
    })

    useEffect(() => {
        form.setValue("slug", ThaanaLatin(form.getValues('title'))?.replaceAll(" ", "-"))
    }, [form.watch("title")])

    const { trigger, isMutating } = useSWRMutation('/sikundi-admin/post/api/create', PostHandler<any>, {
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
            <form onSubmit={form.handleSubmit(data => trigger(data))} className="grid lg:grid-cols-12 gap-4">
                <Card className="pt-6 lg:col-span-8 lg:row-span-2 lg:order-1">
                    <CardContent className="grid gap-4">
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
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
                                                    format(field.value, "PPP")
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
                                                selected={field.value}
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
                                            // @ts-ignore
                                            defaultValue={{ label: `${user.payload.userName}`, value: `${user.payload.email}` }}
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
                        <div className="flex items-center gap-4">
                            <Button className="flex-1">Publish</Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}