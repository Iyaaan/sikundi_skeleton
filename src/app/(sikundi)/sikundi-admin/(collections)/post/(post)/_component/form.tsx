"use client"

import { Button } from "@sikundi/components/ui/button"
import { Card, CardContent, CardFooter } from "@sikundi/components/ui/card"
import { Input } from "@sikundi/components/ui/input"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@sikundi/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import PostSchema, { PostSchemaType } from "@sikundi/app/(sikundi)/sikundi-admin/(collections)/post/(post)/_actions/create/schema"
import { useToast } from "@sikundi/components/ui/use-toast"
import { CalendarIcon, ImageIcon, Loader2 } from "lucide-react"
import { cn } from "@sikundi/lib/client/utils"
import { useRouter } from "next/navigation"
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
import TextEditor from "@sikundi/components/text-editor"
import Select2 from "@sikundi/components/ui/Select2"
import Image from 'next/image'
import useAction from "@sikundi/lib/client/hooks/useAction"
import useRealTime from "@sikundi/lib/client/hooks/useRealTime"
import PostCreateAction from "@sikundi/app/(sikundi)/sikundi-admin/(collections)/post/(post)/_actions/create"
import PostUpdateAction from "@sikundi/app/(sikundi)/sikundi-admin/(collections)/post/(post)/_actions/update"
import Ping from "@sikundi/app/(sikundi)/sikundi-admin/(collections)/post/(post)/_actions/ping"
import kickOut from "@sikundi/app/(sikundi)/sikundi-admin/(collections)/post/(post)/_actions/kickout"
import { TimePickerDemo } from "@sikundi/components/ui/time-picker-demo"
import Link from "next/link"
import { UserType } from "@sikundi/lib/server/utils/getUser"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@sikundi/components/ui/dialog"
import { Badge } from "@sikundi/components/ui/badge"

interface Props {
    user: UserType
    data?: {[name:string]: unknown}
    permission?: {[name:string]: boolean}
    type: "create" | "update"
    editingUser?: any
    tags: {value: string, label: string}[]
    categories: {value: string, label: string}[]
}

const status = {
    drafted: "draft",
    published: "publish",
    soft_deleted: "soft_delete",
    pending: "pending",
}

export default function PostForm({ user, data, type, permission, editingUser, categories, tags }: Props) {
    const { toast } = useToast()
    const [image, setImage] = useState<string | undefined>(undefined)
    const [lead, setLead] = useState<{[name:string]: any}>(data?.lead ? JSON?.parse(String(data?.lead)) : {})
    const router = useRouter()
    const form = useForm<PostSchemaType>({
        resolver: zodResolver(PostSchema),
        defaultValues: {
            createdBy: { label: `${user?.payload?.userName}`, value: `${user?.payload?.userName}` },
            createdAt: new Date(),
            language: {
                label: "Dhivehi", value: "DV"
            },
            title: "",
            latinTitle: "",
            breaking: false,
            liveblog: false,
            longTitle: "",
            description: "",
            featureImageUrl: "",
            featureImageCaption: "",
            action: "draft",
            tags: [],
            push: {
                all: false,
                facebook: false,
                telegram: false,
                viber: false,
                x: false,
                firebase: false
            },
            ...data
        }
    })
    
    const title = form.watch("title") 
    const id = form.watch("id") 
    const lang = form.watch("language")
    useEffect(() => {
        // @ts-ignore
        if(title !== data?.title) {
            form.setValue("latinTitle", ThaanaLatin(form.getValues('title'))?.split(' ')?.map(word => word?.charAt(0)?.toUpperCase() + word?.slice(1))?.join(' '))
            if(type === "create") {
                form.setValue("longTitle", form.getValues('title'))
            }
        }
    }, [title, form, data?.title, type])

    const featureImageUrl = form.watch("featureImageUrl") 
    useEffect(() => {
        setImage(featureImageUrl)
    }, [featureImageUrl, form])

    useEffect(() => {
        form.setValue("lead", JSON.stringify(lead))
    }, [lead, form])
    
    const push_all = form.watch("push.all") 
    useEffect(() => {
        form.setValue("push.facebook", form.getValues("push.all"))
        form.setValue("push.firebase", form.getValues("push.all"))
        form.setValue("push.telegram", form.getValues("push.all"))
        form.setValue("push.viber", form.getValues("push.all"))
        form.setValue("push.x", form.getValues("push.all"))
    }, [push_all, form])


    const { isLoading, execute } = useAction((type === "create" && !id) ? PostCreateAction : PostUpdateAction, {
        onSuccess: ({ data }) => {
            if (data.action === "pending") {
                router.push('/sikundi-admin/post/copydesk')
            } else if (data.action === "soft_delete") {
                router.push('/sikundi-admin/post/trash')
            } else {
                router.push('/sikundi-admin/post')
            }
        },
        onError: ({ error }) => console.error(error),
        onValidationError: (data) => form.setError(
            // @ts-ignore
            data.field,
            { message: data.message },
            { shouldFocus: true }
        )
    })

    useRealTime(Ping, id, editingUser?.email ? (editingUser?.email === user?.payload?.email) : true)

    return (
        <Form {...form}>
            {(editingUser?.email && (editingUser?.email !== user?.payload?.email)) && <Dialog open>
                <DialogContent className="sm:max-w-[425px] min-w-[90vw] md:min-w-[unset]">
                    <DialogHeader>
                        <DialogTitle>{editingUser?.userName} is currently editing</DialogTitle>
                        <DialogDescription>
                            You can either wait until to the user is done with their revisions or you can kick them out.
                        </DialogDescription>
                        </DialogHeader>
                    <DialogFooter>
                        <Button type="button" onClick={async () => {
                            if(id) {
                                const res = await kickOut({
                                    id: id
                                })
                                res?.notification && toast({
                                    ...res.notification,
                                    duration: 2000
                                })
                                res.data?.ok && router.refresh()
                            }
                        }}>
                            Kick them out
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>}
            <form onSubmit={form.handleSubmit(data => execute(data), (e) => console.error(e))} className="grid lg:grid-cols-12 gap-4">
                <Card className="pt-6 lg:col-span-8 lg:row-span-2 lg:order-1">
                    <CardContent className="grid gap-4">
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input dir={lang.value === "DV" ? "rtl" : "ltr"} {...field} onBlur={async () => {
                                            if(!id && title && type === "create") {
                                                const data = await PostCreateAction(form.getValues())
                                                form.setValue("id", data.data?.post.id)
                                            }
                                        }} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='longTitle'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Long title</FormLabel>
                                    <FormControl>
                                        <Input dir={lang.value === "DV" ? "rtl" : "ltr"} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='latinTitle'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Latin title</FormLabel>
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
                                        <Textarea dir={lang.value === "DV" ? "rtl" : "ltr"} rows={17} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
                <FormItem className="lg:col-span-8 lg:order-4">
                    <FormControl>
                        <TextEditor defaultValue={data?.lead || null} value={lead} onChange={(v) => setLead(v)} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                <Card className="lg:col-span-8 lg:order-6 overflow-hidden">
                    <CardContent className="grid gap-4 aspect-video relative">
                        {
                            !image ? 
                            <div className="border rounded-md items-center justify-center flex mt-6">
                                <MediaLibraryModal multi={false} onComplete={(values) => {
                                    form.setValue("featureImageUrl", values[0].url)
                                }}>
                                    <ImageIcon className="mr-2" /> Add Feature Image
                                </MediaLibraryModal>
                            </div>
                            : <div className="border rounded-md items-center justify-center flex mt-6 relative">
                                <Image fill sizes="75vw" src={image} alt="feature image" className="w-full h-full object-cover" />
                                <Button type="button" variant={"destructive"} className="relative self-center justify-self-center" onClick={() => {
                                    form.setValue("featureImageUrl", undefined)
                                }}>
                                    Remove
                                </Button>
                                <FormField
                                    control={form.control}
                                    name='featureImageUrl'
                                    render={({ field }) => (
                                        <FormItem className="hidden">
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        }
                    </CardContent>
                    <CardFooter>
                        <FormField
                            control={form.control}
                            name='featureImageCaption'
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input dir={lang.value === "DV" ? "rtl" : "ltr"} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardFooter>
                </Card>
                <Card className="pt-6 lg:col-span-4 lg:order-3">
                    <CardContent className="grid gap-4">
                        <FormField
                            control={form.control}
                            name='category'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Select2Async
                                            isClearable={false}
                                            className='col-span-2 justify-start'
                                            defaultOptions={[...categories]}
                                            loadOptions={(inputValue: string) => new Promise(async (resolve) => {
                                                axios.get('/sikundi-admin/post/category/api/select', {
                                                    params: {
                                                        query: inputValue
                                                    }
                                                }).then(({ data }) => {
                                                    resolve(data.data)
                                                }).catch((error) => {
                                                    toast({
                                                        title: error?.data?.notification?.title || error?.data?.error?.name,
                                                        description: error?.data?.notification?.description || JSON.stringify(error?.data?.error?.details),
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
                        <FormField
                            control={form.control}
                            name='tags'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <Select2Async
                                            isClearable={false}
                                            createAble
                                            isMulti
                                            className='col-span-2 justify-start'
                                            defaultOptions={[...tags]}
                                            loadOptions={(inputValue: string) => new Promise(async (resolve) => {
                                                axios.get('/sikundi-admin/post/tag/api/select', {
                                                    params: {
                                                        query: inputValue
                                                    }
                                                }).then(({ data }) => {
                                                    resolve(data.data)
                                                }).catch((error) => {
                                                    toast({
                                                        title: error?.data?.notification?.title || error?.data?.error?.name,
                                                        description: error?.data?.notification?.description || JSON.stringify(error?.data?.error?.details),
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
                        <FormField
                            control={form.control}
                            name="breaking"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                    breaking
                                    </FormLabel>
                                    <FormDescription>
                                    Is this a breaking news
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="liveblog"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                    live blog
                                    </FormLabel>
                                    <FormDescription>
                                    Is this a live blog
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
                <Card className="pt-6 lg:col-span-4 lg:order-5">
                    <CardContent className="grid gap-4">
                        {[
                            {name: "push.all", label: "All", description: "Post the link to all channels"},
                            {name: "push.facebook", label: "Facebook", description: "Post the link to facebook page"},
                            {name: "push.telegram", label: "Telegram", description: "Post the link to telegram channel"},
                            {name: "push.viber", label: "Viber", description: "Post the link to viber community"},
                            {name: "push.x", label: "X (Twitter)", description: "Post the link to x (twitter) account"},
                            {name: "push.firebase", label: "Firebase", description: "Push notification to whom subscribed"}
                        ].map((poster, index) => <FormField key={index}
                            control={form.control}
                            // @ts-ignore
                            name={poster.name}
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">{poster.label}</FormLabel>
                                        <FormDescription>
                                            {poster.description}
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            // @ts-ignore
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />)}
                    </CardContent>
                </Card>
                <Card className="pt-6 lg:col-span-4 lg:order-2">
                    <CardContent className="grid gap-4">
                        <div className="flex items-end justify-end">
                            {/* @ts-ignore */}
                            {status?.[data?.status] && <Badge variant={"secondary"}>{status?.[data?.status]}</Badge>}
                        </div>
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
                                // @ts-ignore
                                permission?.[(status?.[data?.status] || "draft")] &&
                                // @ts-ignore
                                <Button onClick={()=>form.setValue("action", (status?.[data?.status] || "draft"))} disabled={isLoading} aria-disabled={isLoading} className="col-span-2">
                                    {/* @ts-ignore */}
                                    {(isLoading && form.getValues("action") === (status?.[data?.status] || "draft")) ? 
                                    <Fragment>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Loading
                                    </Fragment>
                                    : "Save"}
                                </Button>
                            }
                            {Object.entries(status).map(([key, value], index) => (
                                permission?.[value] &&
                                <Fragment key={index}>
                                    <Button onClick={()=>form.setValue("action", (data?.status === "soft_deleted" && key === "soft_deleted") ? "delete" : value)} 
                                        disabled={isLoading} aria-disabled={isLoading} variant={"secondary"}
                                    >
                                        {(isLoading && (form.getValues("action") === value || (
                                            form.getValues("action") === "delete" && key === "soft_deleted"
                                        ))) ?
                                        <Fragment>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Loading
                                        </Fragment>
                                        : (
                                            key === "soft_deleted" ?
                                            (data?.status === "soft_deleted" ? "delete" : value.replaceAll("_", " ")) :
                                            value.replaceAll("_", " ")
                                        )}
                                    </Button>
                                </Fragment>
                            ))}
                            {data?.id ? <Fragment>
                                {data?.status !== "published" ? <Button variant={"outline"} disabled={isLoading} aria-disabled={isLoading} className="col-span-2" type="button" asChild>
                                    <Link href={`/${data?.id}/preview`}>Preview</Link>
                                </Button> : <Button variant={"outline"} disabled={isLoading} aria-disabled={isLoading} className="col-span-2" type="button" asChild>
                                    <Link href={`/${data?.id}`}>Perma Link</Link>
                                </Button>}
                            </Fragment> : null}
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}