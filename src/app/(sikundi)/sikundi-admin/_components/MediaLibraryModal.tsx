"use client"

import { Button, ButtonProps } from '@sikundi/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@sikundi/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@sikundi/components/ui/tabs'
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import EmptyPlaceholder from './EmptyPlaceHolder'
import { ImageIcon, Loader2Icon, XIcon } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import P from '@sikundi/components/ui/typography/p'
import { ScrollArea } from '@sikundi/components/ui/scroll-area'
import H4 from '@sikundi/components/ui/typography/h4'
import Image from '@sikundi/app/_component/Image'
import { Input } from '@sikundi/components/ui/input'
import { Select2Async } from '@sikundi/components/ui/Select2Async'
import axios from 'axios'
import { useToast } from '@sikundi/components/ui/use-toast'
import { uploadToLibrary } from '../(collections)/library/actions/upload'
import { photos } from '@sikundi/app/(sikundi)/sikundi-admin/(collections)/library/actions/photos'
import { useDebounce } from 'usehooks-ts'
import { Skeleton } from '@sikundi/components/ui/skeleton'
import exifr from 'exifr'
import { twMerge } from 'tailwind-merge'

interface Props extends ButtonProps {
    onComplete?: (values: {
        id: number
        createdAt?: string
        updatedAt?: string
        createdById?: number
        url: string
        name?: string
        caption?: string | null
        libraryGroupId?: number
    }[]) => void
    disableList?: boolean
    group?: string
}

export default function MediaLibraryModal({onComplete, disableList, group, ...props}: Props) {
    const [files, setFiles] = useState([])
    const [caption, setCaption] = useState("")
    const [tags, setTags] = useState([])
    const [selected, setSelected] = useState<{id: number, url: string, caption?: string | null}[]>([])
    const [active, setActive] = useState(false)
    const [loading, setLoading] = useState(false)
    const [imageLoading, setImageLoading] = useState(false)
    const [rejected, setRejected] = useState([])
    const [page, setPage] = useState(1)
    const [hasPage, setHasPage] = useState(true)
    const [photoList, setPhotoList] = useState<{
        url: string,
        id: number,
        caption?: string | null
    }[]>([])
    const { toast } = useToast()
    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 500)
  
    useEffect(() => {
        (async () => {
            if (!disableList) {
                setImageLoading(true)
                const { data } = await photos(debouncedValue, page)
                data && setPhotoList((p) => ([
                    ...p,
                    ...data.medias
                ]))
                if (data?.current && data?.total) {
                    setHasPage(data?.current < data?.total)
                } else {
                    setHasPage(false)
                }
                setImageLoading(false)
            }
        })()
    }, [page, disableList])

    useEffect(() => {
        setPhotoList([])
        setPage((p)=>p === 1 ? 0 : 1)
    }, [debouncedValue, setPage, setPhotoList])

    useEffect(() => {
        if (active) {
            setPage(1)
        }
    }, [active])

    // @ts-ignore
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        (async () => {
            if (acceptedFiles?.length) {
                let validatedFiles:any[] = []
    
                await Promise.all(acceptedFiles.map(async (file:any) => {
                    const data = await exifr.parse(file, {
                        xmp: true
                    })
                    validatedFiles.push(Object.assign(file, { preview: URL.createObjectURL(file), custom: {
                        name: file.name,
                        tags: [],
                        caption: data?.ImageDescription?.value || data?.description?.value || data?.Headline || data?.description || data?.ImageDescription
                    }}))
                }))
    
                // @ts-ignore
                setFiles((previousFiles) => [
                    ...validatedFiles
                ])
            }
        
            if (rejectedFiles?.length) {
                // @ts-ignore
                setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
            }
        })()
    }, [])
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': []
        },
        // maxSize: 1024 * 4000,
        maxFiles: 5,
        onDrop
    })
  
    useEffect(() => {
        // @ts-ignore
        return () => files.forEach(file => URL.revokeObjectURL(file.preview))
    }, [files])
  
    const removeFile = (name:any) => {
        // @ts-ignore
        setFiles(files => files.filter(file => file.name !== name))
    }
  
    const removeAll = () => {
        setFiles([])
        setRejected([])
        setTags([])
        setCaption("")
    }
  
    const removeRejected = (name:any) => {
        // @ts-ignore
        setRejected(files => files.filter(({ file }) => file.name !== name))
    }
  
    async function action() {
        try {
            setLoading(true)
            const formData = new FormData()
            files.map((file, index) => {
                formData.append(`file_${index}`, file)
                formData.append(`file_${index}_data`, JSON.stringify({
                    // @ts-ignore
                    ...file?.custom,
                    // @ts-ignore
                    caption: file?.custom?.caption?.length > 0 ? file?.custom?.caption : caption,
                    // @ts-ignore
                    tags: file?.custom?.tags?.length > 0 ? file?.custom?.tags : tags
                }))
            })
            formData.append('folder', group || 'uploads')

            const d = await uploadToLibrary(formData)
            if (d.notification) {
                // @ts-ignore
                toast(d.notification)
            }
            setActive(false)
            onComplete && onComplete(d.files)
        } catch (error) {
            // @ts-ignore
            if (error.notification) {
                // @ts-ignore
                toast(error.notification)
            }
        } finally {
            removeAll()
            setTags([])
            setCaption("")
            setLoading(false)
        }
    }

    return (
        <Dialog open={active} onOpenChange={setActive}>
            <DialogTrigger asChild>
                <Button {...props}>{props.children || "Add Item"}</Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-[1000px] max-w-[calc(100vw-16px)]">
                <DialogHeader>
                    <DialogTitle>Media Library</DialogTitle>
                    <DialogDescription>
                        Add files to media library
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue={disableList ? "upload" : "library"}>
                        {!disableList && <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="library">Library</TabsTrigger>
                                <TabsTrigger value="upload">Upload</TabsTrigger>  
                        </TabsList>}
                    <TabsContent value="library">
                        <Input className='mt-2 mb-4 max-w-lg' placeholder='search...' onChange={(event) => {
                            setValue(event.target.value)
                        }} />
                        {!disableList && photoList.length > 0 ? 
                        <Fragment>
                            <ScrollArea className='h-[500px]'>
                                <div className='grid lg:grid-cols-3 grid-cols-2 gap-4'>
                                    {photoList.map((photo, index) => photo.url.length > 0 && (
                                        <button type='button' className={twMerge([
                                            'relative aspect-square col-span-1 rounded-md',
                                            selected.includes(photo) && " border-2 border-primary"
                                        ])} key={index} onClick={() => {
                                            setSelected((s)=>{
                                                if (s.includes(photo)) {
                                                    return [...s.filter((a)=>a!==photo)]
                                                }
                                                return [...s, photo]
                                            })
                                        }}>
                                            <Image
                                                src={photo.url}
                                                alt={photo.url}
                                                cdn={true}
                                                fill
                                                className='h-full w-full rounded-md object-cover'
                                            />
                                        </button>
                                    ))}
                                </div>
                                {hasPage && <Button variant={"secondary"} className='mx-auto my-3 block' onClick={()=>setPage(page+1)}>
                                    {imageLoading ? "loading" : "Load More"}    
                                </Button>}
                            </ScrollArea>
                            {selected.length > 0 && <Button variant={"secondary"} size={"lg"} className='w-full' onClick={() => {
                                onComplete?.(selected.map((item)=>{
                                    return ({
                                        url: item?.url, 
                                        id: item?.id,
                                        caption: item?.caption || null
                                    })
                                }))
                                setSelected([])
                                setActive(false)
                            }}>Add</Button>}
                        </Fragment> :(
                            imageLoading ?
                            <ScrollArea className='h-[500px]'>
                                <div className='grid lg:grid-cols-3 grid-cols-2 gap-4'>
                                    {[1,2,3,4,5,6].map((index) => (
                                        <Skeleton key={index} className="relative aspect-square col-span-1 rounded-md" />
                                    ))}
                                </div>
                            </ScrollArea> :
                            <EmptyPlaceholder data={{
                                slug: "library",
                                name: "library",
                                url: '/sikundi-admin/library',
                                Icon: ImageIcon,
                                permissions: {
                                    create: false,
                                }
                            }} />
                        )}
                    </TabsContent>
                    <TabsContent value="upload">
                        {(files?.length > 0 || rejected?.length > 0) ? <div className='space-y-3'>
                            {files?.length > 0 && <Fragment>
                                <H4>Accepted Files</H4>
                                <div className='grid lg:grid-cols-2 gap-3'>
                                    <Input value={caption} placeholder='caption' onChange={(e) => {
                                        setCaption(e.target.value)
                                    }} />
                                    <Select2Async
                                        isClearable={false}
                                        createAble
                                        isMulti
                                        onChange={(v) => {
                                            // @ts-ignore
                                            setTags(v)
                                        }}
                                        defaultOptions={[{
                                            // @ts-ignore
                                            label: `search for tags`, value: `search for tags`, isDisabled: true
                                        }]}
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
                                    />
                                </div>
                                <ScrollArea className='border px-8 py-4 rounded-lg my-4 list-decimal h-[300px]'>
                                    {files.map((file:any, index) => (
                                        <div key={file.name} className='relative rounded-md border grid lg:grid-cols-3 grid-cols-1 gap-3 mb-4 p-2'>
                                            <div className='relative aspect-video w-full'>
                                                <Image
                                                    // @ts-ignore
                                                    src={file.preview}
                                                    alt={file.name}
                                                    fill
                                                    onLoad={() => {
                                                        URL.revokeObjectURL(file.preview)
                                                    }}
                                                    className='h-full w-full rounded-lg object-cover'
                                                />
                                            </div>
                                            <button
                                                type='button'
                                                className='absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full border border-primary bg-primary transition-colors text-white hover:opacity-75'
                                                onClick={() => removeFile(file.name)}
                                            >
                                                <XIcon className='h-5 w-5 fill-white transition-colors hover:fill-primary' />
                                            </button>
                                            <div className='col-span-2 mt-5'>
                                                <Input value={file.custom.name} placeholder='title' className='mb-3' onChange={(e) => {
                                                    setFiles((f) => {
                                                        let ff = [...f]
                                                        // @ts-ignore
                                                        ff[index].custom.name = e.target.value
                                                        return ff
                                                    })
                                                }} />
                                                <Input value={file.custom.caption?.length > 0 ? file.custom.caption : caption} placeholder='caption' className='mb-3' onChange={(e) => {
                                                    setFiles((f) => {
                                                        let ff = [...f]
                                                        // @ts-ignore
                                                        ff[index].custom.caption = e.target.value
                                                        return ff
                                                    })
                                                }} />
                                                <Select2Async
                                                    isClearable={false}
                                                    createAble
                                                    isMulti
                                                    onChange={(v) => {
                                                        setFiles((f) => {
                                                            let ff = [...f]
                                                            // @ts-ignore
                                                            ff[index].custom.tags = v
                                                            return ff
                                                        })
                                                    }}
                                                    // @ts-ignore
                                                    value={files?.[index]?.custom?.tags?.length > 0 ? files?.[index]?.custom?.tags : tags}
                                                    defaultOptions={[{
                                                        // @ts-ignore
                                                        label: `search for tags`, value: `search for tags`, isDisabled: true
                                                    }]}
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
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </ScrollArea>    
                            </Fragment>}
                            {rejected?.length > 0 && <Fragment>
                                <H4>Rejected Files</H4>
                                <ScrollArea className='border px-8 py-4 rounded-lg my-4 list-decimal h-[300px]'>
                                    {rejected.map(({ file, errors }:any) => (
                                        <div key={file.name} className='flex items-start justify-between'>
                                            <div>
                                                <p className='mt-2 text-sm font-medium text-foreground'>
                                                {file.name}
                                                </p>
                                                <ul className='text-[12px] text-destructive'>
                                                    {errors.map((error:any) => (
                                                        <li key={error.code}>{error.message}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <button
                                                type='button'
                                                className='mt-1 rounded-md border border-primary px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-primary hover:text-white'
                                                onClick={() => removeRejected(file.name)}
                                            >
                                                remove
                                            </button>
                                        </div>
                                    ))}
                                </ScrollArea>    
                            </Fragment>}
                            <div className='flex gap-2 flex-col lg:flex-row'>
                                <Button onClick={() => action()} className='w-full' size={"lg"} disabled={loading}>
                                    {loading ? 
                                        <Fragment>
                                            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                                            {"Loading"}
                                        </Fragment> 
                                    : "Upload"}
                                </Button>
                                <Button className='w-full' onClick={removeAll} size={"lg"} variant={"secondary"} disabled={loading}>
                                    clear
                                </Button>
                            </div>
                        </div> :
                        <div {...getRootProps()} className='aspect-video bg-secondary grid items-center justify-center rounded-lg border border-dashed cursor-pointer'>
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                <P className='text-center'>{"Drop the files here ..."}</P> :
                                <P className='text-center'>{"Drag 'n' drop some files here, or click to select files"}</P>
                            }
                        </div>}
                    </TabsContent>
                </Tabs>
            </DialogContent>
            </Dialog>
    )
}
