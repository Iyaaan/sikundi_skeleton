"use client"

import { Button } from "@sikundi/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@sikundi/components/ui/card"
import { Input } from "@sikundi/components/ui/input"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@sikundi/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import PostSchema, { PostSchemaType } from "@sikundi/app/(sikundi)/sikundi-admin/(collections)/post/(post)/api/create/schema"
import { useToast } from "@sikundi/components/ui/use-toast"
import useSWRMutation from 'swr/mutation'
import { ToastAction } from "@sikundi/components/ui/toast"
import { CalendarIcon, ImageIcon } from "lucide-react"
import { PostHandler } from "@sikundi/lib/client/fetcher"
import { cn, zodErrorGenerator } from "@sikundi/lib/client/utils"
import { useRouter } from "next/navigation"
import { Textarea } from "@sikundi/components/ui/textarea"
import { Select2Async } from "@sikundi/components/ui/Select2Async"
import { Popover, PopoverContent, PopoverTrigger } from "@sikundi/components/ui/popover"
import { format } from "date-fns"
import { Calendar } from "@sikundi/components/ui/calendar"
import { Switch } from "@sikundi/components/ui/switch"
import MediaLibraryModal from "@sikundi/app/(sikundi)/sikundi-admin/_components/MediaLibraryModal"

export default function PostForm() {
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm<PostSchemaType>({
        resolver: zodResolver(PostSchema),
        defaultValues: {
            
        }
    })
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
                            name='longTitle'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Long title</FormLabel>
                                    <FormControl>
                                        <Input dir="rtl" {...field} />
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
                <Card className="pt-6 lg:col-span-8 lg:order-4">
                    <CardContent className="grid gap-4">
                        <FormField
                            control={form.control}
                            name='lead'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Lead</FormLabel>
                                    <FormControl>
                                        <Textarea dir="rtl" rows={27} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
                <Card className="pt-6 lg:col-span-8 lg:order-6">
                    <CardContent className="grid gap-4 aspect-video">
                        <div className="border rounded-md items-center justify-center flex">
                            <MediaLibraryModal>
                                <ImageIcon className="mr-2" /> Add Feature Image
                            </MediaLibraryModal>
                        </div>
                    </CardContent>
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
                                            defaultOptions={[{
                                                // @ts-ignore
                                                label: `search for categories`, value: `search for categories`, isDisabled: true
                                            }]}
                                            loadOptions={(inputValue: string) => new Promise(async (resolve) => {
                                                // @ts-ignore
                                                resolve([])
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
                                            defaultOptions={[{
                                                // @ts-ignore
                                                label: `search for tags`, value: `search for tags`, isDisabled: true
                                            }]}
                                            loadOptions={(inputValue: string) => new Promise(async (resolve) => {
                                                // @ts-ignore
                                                resolve([])
                                            })}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
                <Card className="pt-6 lg:col-span-4 lg:order-5">
                    <CardContent className="grid gap-4">
                        {[
                            {name: "push.facebook", label: "Facebook", description: "Post the link to facebook page"},
                            {name: "push.telegram", label: "Telegram", description: "Post the link to telegram channel"},
                            {name: "push.viber", label: "Viber", description: "Post the link to viber community"},
                            {name: "push.x", label: "X (Twitter)", description: "Post the link to x (twitter) account"},
                            {name: "push.sms", label: "SMS", description: "SMS the link"},
                            {name: "push.email", label: "Email", description: "Email the link"},
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
                                            loadOptions={(inputValue: string) => new Promise(async (resolve) => {
                                                // @ts-ignore
                                                resolve([])
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