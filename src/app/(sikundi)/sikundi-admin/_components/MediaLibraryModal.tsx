import { Button, ButtonProps } from '@sikundi/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@sikundi/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@sikundi/components/ui/tabs'
import React, { useCallback, useState } from 'react'
import EmptyPlaceholder from './EmptyPlaceHolder'
import { Image } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import P from '@sikundi/components/ui/typography/p'
import { ScrollArea } from '@sikundi/components/ui/scroll-area'

interface Props extends ButtonProps {

}

export default function MediaLibraryModal({...props}: ButtonProps) {
    const [myFiles, setMyFiles] = useState<any>([])
    const onDrop = useCallback((acceptedFiles:any) => {
        setMyFiles([...myFiles, ...acceptedFiles])
    }, [myFiles])
    const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button {...props}>{props.children || "Add Item"}</Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-[750px] max-w-[calc(100vw-16px)]">
                <DialogHeader>
                    <DialogTitle>Media Library</DialogTitle>
                    <DialogDescription>
                        Add files to media library
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="library">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="library">Library</TabsTrigger>
                        <TabsTrigger value="upload">Upload</TabsTrigger>
                    </TabsList>
                    <TabsContent value="library">
                        <EmptyPlaceholder data={{
                            slug: "library",
                            name: "library",
                            url: '/sikundi-admin/library',
                            Icon: Image,
                            permissions: {
                                create: false,
                            }
                        }} />
                    </TabsContent>
                    <TabsContent value="upload">
                        {myFiles?.length > 0 ? <div className=' space-y-3'>
                            <ScrollArea className='border px-8 py-4 rounded-lg my-4 list-decimal h-[300px]'>
                                {myFiles.map((file:any) => (
                                    <li key={file.path}>
                                        {file.path} - {file.size} bytes
                                    </li>
                                ))}
                            </ScrollArea>
                            <Button className='w-full' size={"lg"}>Upload</Button>
                            <Button className='w-full' onClick={() => setMyFiles([])} size={"lg"} variant={"secondary"}>clear</Button>
                        </div> :
                        <div {...getRootProps()} className='aspect-video bg-secondary grid items-center justify-center rounded-lg border border-dashed cursor-pointer'>
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                <P>{"Drop the files here ..."}</P> :
                                <P>{"Drag 'n' drop some files here, or click to select files"}</P>
                            }
                        </div>}
                    </TabsContent>
                </Tabs>
            </DialogContent>
            </Dialog>
    )
}
