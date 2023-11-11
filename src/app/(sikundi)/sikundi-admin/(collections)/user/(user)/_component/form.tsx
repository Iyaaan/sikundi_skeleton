"use client"

import { Button } from "@sikundi/components/ui/button"
import { Card, CardContent } from "@sikundi/components/ui/card"
import { Input } from "@sikundi/components/ui/input"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@sikundi/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import UserSchema, { UserSchemaType } from "@sikundi/app/(sikundi)/sikundi-admin/(collections)/user/(user)/actions/create/schema"
import { useToast } from "@sikundi/components/ui/use-toast"
import { CalendarIcon, ImageIcon, Loader2 } from "lucide-react"
import { cn } from "@sikundi/lib/client/utils"
import { useParams, useRouter } from "next/navigation"
import { Textarea } from "@sikundi/components/ui/textarea"
import { Select2Async } from "@sikundi/components/ui/Select2Async"
import { Popover, PopoverContent, PopoverTrigger } from "@sikundi/components/ui/popover"
import { format } from "date-fns"
import { Calendar } from "@sikundi/components/ui/calendar"
import { Switch } from "@sikundi/components/ui/switch"
import MediaLibraryModal from "@sikundi/app/(sikundi)/sikundi-admin/_components/MediaLibraryModal"
import { Fragment, useEffect, useState } from "react"
import { ThaanaLatin } from "@sikundi/lib/transliterate"
import axios from "axios"
import { UserType } from "@sikundi/lib/server/utils/getUser"
import TextEditor from "@sikundi/components/text-editor"
import Select2 from "@sikundi/components/ui/Select2"
import Image from "next/image"
import useAction from "@sikundi/lib/client/hooks/useAction"
import UserCreateAction from "@sikundi/app/(sikundi)/sikundi-admin/(collections)/user/(user)/actions/create"
import UserUpdateAction from "@sikundi/app/(sikundi)/sikundi-admin/(collections)/user/(user)/actions/update"
import { TimePickerDemo } from "@sikundi/components/ui/time-picker-demo"
import Link from "next/link"

interface Props {
    user: UserType
    data?: {[name:string]: unknown}
    type: "create" | "update"
}

export default function PostForm({ user, data, type }: Props) {
    const { toast } = useToast()
    const [image, setImage] = useState<string | undefined>(undefined)
    const [lead, setLead] = useState<{[name:string]: any}>(data?.lead ? JSON?.parse(String(data?.lead)) : {})
    const router = useRouter()
    const params = useParams()
    const form = useForm<UserSchemaType>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            createdBy: { label: `${user.payload.userName}`, value: `${user.payload.userName}` },
            createdAt: new Date(),
            userName: "",
            email: "",
            description: "",
            profilePictureUrl: "",
            ...data
        }
    })

    const profilePictureUrl = form.watch("profilePictureUrl") 
    useEffect(() => {
        setImage(profilePictureUrl)
    }, [profilePictureUrl, form])

    const { isLoading, execute } = useAction(type === "create" ? UserCreateAction : UserUpdateAction, {
        onSuccess: ({ data }) => {
            router.push('/sikundi-admin/user')
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
            <form onSubmit={form.handleSubmit(data => execute({ ...data, id: type === "update" ? parseInt(`${params.id}`) : undefined }), (e) => console.error(e))} className="grid lg:grid-cols-12 gap-4">
                <Card className="lg:col-span-8 lg:order-1 overflow-hidden">
                    <CardContent className="grid gap-4 aspect-video relative">
                        {
                            !image ? 
                            <div className="border rounded-md items-center justify-center flex mt-6">
                                <MediaLibraryModal onComplete={(values) => {
                                    form.setValue("profilePictureUrl", values[0].url)
                                }}>
                                    <ImageIcon className="mr-2" /> Add Profile Picture
                                </MediaLibraryModal>
                            </div>
                            : <Fragment>
                                <Image fill src={image} alt="feature image" className="w-full h-full object-cover" />
                                <Button type="button" variant={"destructive"} className="relative self-center justify-self-center" onClick={() => {
                                    form.setValue("profilePictureUrl", undefined)
                                }}>
                                    Remove
                                </Button>
                                <FormField
                                    control={form.control}
                                    name='profilePictureUrl'
                                    render={({ field }) => (
                                        <FormItem className="hidden">
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </Fragment>
                        }
                    </CardContent>
                </Card>
                <Card className="pt-6 lg:col-span-8 lg:row-span-2 lg:order-3">
                    <CardContent className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="userName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User Name</FormLabel>
                                    <FormControl>
                                        <Input dir="rtl" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea dir="rtl" rows={7} {...field} />
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
                            name='role'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select2
                                            isClearable={false}
                                            className='col-span-2 justify-start'
                                            options={[
                                                // @ts-ignore
                                                {label: "Admin", value: "Admin"},
                                                // @ts-ignore
                                                {label: "Editor", value: "Editor"},
                                                // @ts-ignore
                                                {label: "Author", value: "Author"}
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
                                                    format(new Date(field.value), "PPP HH:mm:ss")
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
                                            <div className="p-3 border-t border-border">
                                                <TimePickerDemo setDate={(date)=>form.setValue("createdAt", date)} date={new Date(String(form.getValues("createdAt")))} />
                                            </div>
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
                                <FormItem className="hidden">
                                    <FormControl>
                                        <Select2Async
                                            isClearable={false}
                                            className='col-span-2 justify-start'
                                            placeholder="create"
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
                                                        variant: "destructive"
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
                                <Button className="col-span-2" disabled={isLoading} aria-disabled={isLoading} onClick={()=>form.setValue("action", "active")}>
                                    {(isLoading && form.getValues("action") === "active") ? 
                                    <Fragment>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Loading
                                    </Fragment>
                                    : "create"}
                                </Button> :
                                <Fragment>
                                    <Button variant={"secondary"} disabled={isLoading} aria-disabled={isLoading} onClick={()=>form.setValue("action", "active")}>
                                        {(isLoading && form.getValues("action") === "active") ? 
                                        <Fragment>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Loading
                                        </Fragment>
                                        : "Update"}
                                    </Button>
                                    <Button disabled={isLoading} aria-disabled={isLoading} onClick={()=>form.setValue("action", "blocked")}>
                                        {(isLoading && form.getValues("action") === "blocked") ? 
                                        <Fragment>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Loading
                                        </Fragment>
                                        : "blocked"}
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