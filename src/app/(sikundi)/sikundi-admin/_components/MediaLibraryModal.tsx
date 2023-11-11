"use client"

import { Button, ButtonProps } from '@sikundi/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@sikundi/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@sikundi/components/ui/tabs'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import EmptyPlaceholder from './EmptyPlaceHolder'
import { ImageIcon, Loader2Icon, XIcon } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import P from '@sikundi/components/ui/typography/p'
import { ScrollArea } from '@sikundi/components/ui/scroll-area'
import H4 from '@sikundi/components/ui/typography/h4'
import Image from 'next/image'
import { Input } from '@sikundi/components/ui/input'
import { Select2Async } from '@sikundi/components/ui/Select2Async'
import axios from 'axios'
import { useToast } from '@sikundi/components/ui/use-toast'
import { uploadToLibrary } from '../(collections)/library/actions/upload'
import { photos } from '@sikundi/app/(sikundi)/sikundi-admin/(collections)/library/actions/photos'

interface Props extends ButtonProps {
    onComplete?: (values: {
        id: number
        createdAt?: string
        updatedAt?: string
        createdById?: number
        url: string
        name?: string
        libraryGroupId?: number
    }[]) => void
    disableList?: boolean
}

export default function MediaLibraryModal({onComplete, disableList, ...props}: Props) {
    const [files, setFiles] = useState([])
    const [active, setActive] = useState(false)
    const [loading, setLoading] = useState(false)
    const [rejected, setRejected] = useState([])
    const [page, setPage] = useState(1)
    const [photoList, setPhotoList] = useState<{
        url: string,
        id: number
    }[]>([])
    const { toast } = useToast()
  
    useEffect(() => {
        (async () => {
            if (!disableList){
                const { data } = await photos()
                data && setPhotoList((p) => ([
                    ...p,
                    ...data
                ]))
            }
        })()
    }, [page, disableList])

    // @ts-ignore
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (acceptedFiles?.length) {
            // @ts-ignore
            setFiles((previousFiles) => [
                ...acceptedFiles.map((file:any) => Object.assign(file, { preview: URL.createObjectURL(file), custom: {
                    name: file.name,
                    tags: []
                }})
            )])
        }
    
        if (rejectedFiles?.length) {
            // @ts-ignore
            setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
        }
    }, [])
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': []
        },
        maxSize: 1024 * 1000,
        maxFiles: 2,
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
                // @ts-ignore
                formData.append(`file_${index}_data`, JSON.stringify(file.custom))
            })
            formData.append('folder', 'photos')

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
                        {!disableList && photoList.length > 0 ? 
                        <ScrollArea className='h-[500px]'>
                            <div className='grid grid-cols-3 gap-4'>
                                {photoList.map((photo, index) => photo.url.length > 0 && (
                                    <button type='button' className='relative aspect-square col-span-1' key={index} onClick={() => {
                                        onComplete?.([
                                            {url: photo.url, id: photo.id}
                                        ])
                                        setActive(false)
                                    }}>
                                        <Image
                                            src={photo.url}
                                            alt={photo.url}
                                            fill
                                            className='h-full w-full rounded-lg object-cover'
                                        />
                                    </button>
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
                        }} />}
                    </TabsContent>
                    <TabsContent value="upload">
                        {(files?.length > 0 || rejected?.length > 0) ? <div className='space-y-3'>
                            {files?.length > 0 && <Fragment>
                                <H4>Accepted Files</H4>
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
                                                <Input value={file.custom.name} placeholder='name' className='mb-3' onChange={(e) => {
                                                    setFiles((f) => {
                                                        let ff = [...f]
                                                        // @ts-ignore
                                                        ff[index].custom.name = e.target.value
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
