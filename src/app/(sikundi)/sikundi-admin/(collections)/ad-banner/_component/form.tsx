"use client"

import { Button } from "@sikundi/components/ui/button"
import { Card, CardContent } from "@sikundi/components/ui/card"
import { Input } from "@sikundi/components/ui/input"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@sikundi/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import AdSchema, { AdSchemaType } from "@sikundi/app/(sikundi)/sikundi-admin/(collections)/ad-banner/_actions/create/schema"
import { useToast } from "@sikundi/components/ui/use-toast"
import { CalendarIcon, ImageIcon, Loader2 } from "lucide-react"
import { cn } from "@sikundi/lib/client/utils"
import { useParams, useRouter } from "next/navigation"
import { Select2Async } from "@sikundi/components/ui/Select2Async"
import { Popover, PopoverContent, PopoverTrigger } from "@sikundi/components/ui/popover"
import { format } from "date-fns"
import { Calendar } from "@sikundi/components/ui/calendar"
import MediaLibraryModal from "@sikundi/app/(sikundi)/sikundi-admin/_components/MediaLibraryModal"
import { Fragment, useEffect, useState } from "react"
import axios from "axios"
import Select2 from "@sikundi/components/ui/Select2"
import Image from 'next/image'
import useAction from "@sikundi/lib/client/hooks/useAction"
import AdCreateAction from "@sikundi/app/(sikundi)/sikundi-admin/(collections)/ad-banner/_actions/create"
import AdUpdateAction from "@sikundi/app/(sikundi)/sikundi-admin/(collections)/ad-banner/_actions/update"
import { TimePickerDemo } from "@sikundi/components/ui/time-picker-demo"
import { UserType } from "@sikundi/lib/server/utils/getUser"

interface Props {
    user: UserType
    data?: {[name:string]: unknown}
    permission?: {[name:string]: boolean}
    type: "create" | "update"
}

export default function PostForm({ user, data, type, permission }: Props) {
    const { toast } = useToast()
    const [image, setImage] = useState<string | undefined>(undefined)
    const router = useRouter()
    const params = useParams()
    const form = useForm<AdSchemaType>({
        resolver: zodResolver(AdSchema),
        defaultValues: {
            createdBy: { label: `${user?.payload?.userName}`, value: `${user?.payload?.userName}` },
            createdAt: new Date(),
            language: {
                label: "Dhivehi", value: "DV"
            },
            altTxt: "",
            url: "",
            adsUrl: "",
            ...data
        }
    })
    
    const lang = form.watch("language") 

    const adsUrl = form.watch("adsUrl")
    useEffect(() => {
        setImage(adsUrl)
    }, [adsUrl, form])


    const { isLoading, execute } = useAction(type === "create" ? AdCreateAction : AdUpdateAction, {
        onSuccess: ({ data }) => {
            router.push('/sikundi-admin/ad-banner')
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
                <Card className="pt-6 lg:col-span-8 lg:row-span-2 lg:order-1">
                    <CardContent className="grid gap-4">
                        <FormField
                            control={form.control}
                            name='altTxt'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Alt Text</FormLabel>
                                    <FormControl>
                                        <Input dir={lang.value === "DV" ? "rtl" : "ltr"} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='url'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Url</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='adType'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ad Type</FormLabel>
                                    <FormControl>
                                        <Select2
                                            isClearable={false}
                                            className='col-span-2 justify-start'
                                            options={[
                                                // @ts-ignore
                                                {label: "Top banner", value: "t_banner"},
                                                // @ts-ignore
                                                {label: "Small side banner", value: "ss_banner"},
                                                // @ts-ignore
                                                {label: "Extra small side banner", value: "ess_banner"},
                                                // @ts-ignore
                                                {label: "Large side banner", value: "ls_banner"},
                                                // @ts-ignore
                                                {label: "Mid large banner", value: "ml_banner"},
                                                // @ts-ignore
                                                {label: "Mid small long banner", value: "msl_banner"},
                                                // @ts-ignore
                                                {label: "In article banner", value: "ia_banner"},
                                                // @ts-ignore
                                                {label: "Article end banner", value: "ae_banner"},
                                            ]}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
                <Card className="lg:col-span-8 lg:order-6 overflow-hidden">
                    <CardContent className="grid gap-4 aspect-video relative">
                        {
                            !image ? 
                            <div className="border rounded-md items-center justify-center flex mt-6">
                                <MediaLibraryModal onComplete={(values) => {
                                    form.setValue("adsUrl", values[0].url)
                                }}>
                                    <ImageIcon className="mr-2" /> Add Feature Image
                                </MediaLibraryModal>
                            </div>
                            : <Fragment>
                                <Image fill sizes="50vw" src={image} alt="feature image" className="w-full h-full object-contain" />
                                <Button type="button" variant={"destructive"} className="relative self-center justify-self-center" onClick={() => {
                                    form.setValue("adsUrl", undefined)
                                }}>
                                    Remove
                                </Button>
                                <FormField
                                    control={form.control}
                                    name='adsUrl'
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
                            {permission?.draft && <Button disabled={isLoading} aria-disabled={isLoading} onClick={()=>form.setValue("action", "draft")}>
                                {(isLoading && form.getValues("action") === "draft") ? 
                                <Fragment>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Loading
                                </Fragment>
                                : "draft"}
                            </Button> }
                            {permission?.publish && <Button disabled={isLoading} aria-disabled={isLoading} onClick={()=>form.setValue("action", "publish")}>
                                {(isLoading && form.getValues("action") === "publish") ? 
                                <Fragment>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Loading
                                </Fragment>
                                : "publish"}
                            </Button>}
                            {permission?.pending && <Button disabled={isLoading} aria-disabled={isLoading} onClick={()=>form.setValue("action", "pending")}>
                                {(isLoading && form.getValues("action") === "pending") ? 
                                <Fragment>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Loading
                                </Fragment>
                                : "pending"}
                            </Button>}
                            {data?.id ? <Fragment>
                                {data?.status === "soft_deleted" ? <Fragment>
                                    {permission?.delete && <Button disabled={isLoading} aria-disabled={isLoading} variant={"destructive"} onClick={()=>form.setValue("action", "delete")}>
                                        {(isLoading && form.getValues("action") === "delete") ? 
                                        <Fragment>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Loading
                                        </Fragment>
                                        : "shift delete"}
                                    </Button>}
                                </Fragment> : <Fragment>
                                    {permission?.soft_delete && <Button disabled={isLoading} aria-disabled={isLoading} variant={"destructive"} onClick={()=>form.setValue("action", "soft_delete")}>
                                        {(isLoading && form.getValues("action") === "soft_delete") ? 
                                        <Fragment>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Loading
                                        </Fragment>
                                        : "delete"}
                                    </Button> }
                                </Fragment>}
                            </Fragment> : null}
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}