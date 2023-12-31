"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@sikundi/components/ui/dialog'
import { Button } from '@sikundi/components/ui/button'
import Image from 'next/image'
import { Badge } from '@sikundi/components/ui/badge'
import useAction from '@sikundi/lib/client/hooks/useAction'
import { deleteLibrary } from '@sikundi/app/(sikundi)/sikundi-admin/(collections)/library/_actions/delete'

export default function MediaGrid({data, permission}: { data: {[name:string]: any}, permission: {[name:string]: boolean} }) {
    const [active, setActive] = useState<null | {[name:string]:any}>(null)
    const [open, setOpen] = useState(false)

    const { isLoading, execute } = useAction(deleteLibrary, {
        onSuccess: () => {
            setActive(null)
            setOpen(false)
        },
        onError: ({ error }) => console.error(error)
    })

    return (
        <div className='grid lg:grid-cols-4 grid-cols-2 gap-4'>
            <Dialog open={open} onOpenChange={setOpen}>
                {data?.map((media:any, index:number)=>(
                    <DialogTrigger asChild key={index} className='aspect-video' onClick={() => setActive(media)}>
                        <div className='aspect-square relative rounded-lg overflow-hidden bg-accent'>
                            <Image
                                fill
                                sizes="75vw"
                                className='object-cover'
                                src={media.url}
                                alt={media.name}
                            />
                        </div>
                    </DialogTrigger>
                ))}
                <DialogContent className="sm:max-w-[750px] w-[calc(100vw-16px)]">
                    <DialogHeader>
                        <DialogTitle className='break-all'>{active?.name}</DialogTitle>
                    <DialogDescription className='pb-2'>
                        {active?.caption}
                    </DialogDescription>
                    <div className='flex flex-wrap gap-2'>
                        {active?.tags?.map((tag:any, key:any) => (
                            <Badge variant="secondary" key={key}>
                                {tag?.tag?.name}
                            </Badge>
                        ))}
                    </div>
                    <DialogDescription className=' text-end'>{`Created by: ${active?.['created by']}`}</DialogDescription>
                    </DialogHeader>
                    <div className="grid py-2">
                        {
                            active?.url && 
                            <div className='relative aspect-video rounded-lg overflow-hidden'>
                                <Image
                                    src={active?.url}
                                    alt={active?.name}
                                    sizes="75vw"
                                    fill
                                    className='object-cover'
                                />
                            </div>
                        }
                    </div>
                    <DialogFooter>
                        {permission?.delete &&
                        <Button type="button" onClick={()=>execute([active?.url])}>
                            {isLoading ? "loading" : "delete"}
                        </Button>}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
