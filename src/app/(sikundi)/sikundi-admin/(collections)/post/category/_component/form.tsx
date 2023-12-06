"use client"

import { Button } from "@sikundi/components/ui/button"
import { Card, CardContent } from "@sikundi/components/ui/card"
import { Input } from "@sikundi/components/ui/input"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@sikundi/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from "@sikundi/components/ui/use-toast"
import { ToastAction } from "@sikundi/components/ui/toast"
import { CalendarIcon, Loader2 } from "lucide-react"
import { cn } from "@sikundi/lib/client/utils"
import { useParams, useRouter } from "next/navigation"
import { Select2Async } from "@sikundi/components/ui/Select2Async"
import { Popover, PopoverContent, PopoverTrigger } from "@sikundi/components/ui/popover"
import { format } from "date-fns"
import { Calendar } from "@sikundi/components/ui/calendar"
import CategorySchema, { CategorySchemaType } from "@sikundi/app/(sikundi)/sikundi-admin/(collections)/post/category/_actions/create/schema"
import { Fragment, useEffect } from "react"
import { ThaanaLatin } from "@sikundi/lib/transliterate"
import axios from "axios"
import { Textarea } from "@sikundi/components/ui/textarea"
import useAction from "@sikundi/lib/client/hooks/useAction"
import CategoryCreateAction from "@sikundi/app/(sikundi)/sikundi-admin/(collections)/post/category/_actions/create"
import CategoryUpdateAction from "@sikundi/app/(sikundi)/sikundi-admin/(collections)/post/category/_actions/update"
import Select2 from "@sikundi/components/ui/Select2"
import { User } from "@prisma/client"
import { UserType } from "@sikundi/lib/server/utils/getUser"

interface Props {
    user: UserType
    data?: {[name:string]: unknown}
    permission?: {[name:string]: boolean}
    type: "create" | "update"
}

export default function CategoryForm({ user, data, type, permission }: Props) {
    const { toast } = useToast()
    const router = useRouter()
    const params = useParams()
    const form = useForm<CategorySchemaType>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            createdBy: { label: `${user?.payload?.userName}`, value: `${user?.payload?.userName}` },
            createdAt: new Date(),
            name: "",
            slug: "",
            icon: "",
            language: {
                // @ts-ignore
                label: "Dhivehi", value: "DV"
            },
            ...data
        }
    })
    
    const name = form.watch("name") 
    const lang = form.watch("language") 
    useEffect(() => {
        // @ts-ignore
        if(name !== data?.name) {
            form.setValue("slug", ThaanaLatin(form.getValues('name')))
        }
    }, [name, form, type, data?.name])


    const { isLoading, execute } = useAction(type === "create" ? CategoryCreateAction : CategoryUpdateAction, {
        onSuccess: ({ data }) => {
            router.push('/sikundi-admin/post/category')
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
            <form onSubmit={form.handleSubmit(data => execute({ ...data, id: type === "update" ? parseInt(`${params.id}`) : undefined }))} className="grid lg:grid-cols-12 gap-4">
                <Card className="pt-6 lg:col-span-8 lg:row-span-2 lg:order-1">
                    <CardContent className="grid gap-4">
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input dir={lang.value === "DV" ? "rtl" : "ltr"} {...field} />
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
                                        <Textarea dir={lang.value === "DV" ? "rtl" : "ltr"} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="icon"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Icon</FormLabel>
                                    <FormControl>
                                        <Textarea rows={10} {...field} />
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
                            name='language'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select2
                                            isClearable={false}
                                            className='col-span-2 justify-start'
                                            options={[
                                                // @ts-ignore
                                                {label: "English", value: "EN"},
                                                // @ts-ignore
                                                {label: "Dhivehi", value: "DV"}
                                            ]}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                                            <ToastAction altText="Try again" onClick={form.handleSubmit(data => execute({ ...data, id: type === "update" ? parseInt(`${params.id}`) : undefined }))}>
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
                            {type === "create" ? <Fragment>
                                {permission?.create && <Button className="col-span-2" disabled={isLoading} aria-disabled={isLoading} onClick={()=>form.setValue("action", "create")}>
                                    {(isLoading && form.getValues("action") === "create") ? 
                                    <Fragment>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Loading
                                    </Fragment>
                                    : "create"}
                                </Button>}
                            </Fragment> :
                            <Fragment>
                                {permission?.update && <Button disabled={isLoading} aria-disabled={isLoading} onClick={()=>form.setValue("action", "update")}>
                                    {(isLoading && form.getValues("action") === "update") ? 
                                    <Fragment>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Loading
                                    </Fragment>
                                    : "update"}
                                </Button> }
                                {permission?.delete && <Button disabled={isLoading} aria-disabled={isLoading} variant={"secondary"} onClick={()=>form.setValue("action", "delete")}>
                                    {(isLoading && form.getValues("action") === "delete") ? 
                                    <Fragment>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Loading
                                    </Fragment>
                                    : "delete"}
                                </Button> }
                            </Fragment>}
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}