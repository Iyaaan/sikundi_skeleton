"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@sikundi/components/ui/dialog'
import { Button } from '@sikundi/components/ui/button'
import Image from 'next/image'
import { Badge } from '@sikundi/components/ui/badge'

export default function MediaGrid({data}: { data: {[name:string]: any} }) {
    const [active, setActive] = useState<null | {[name:string]:any}>(null)
    return (
        <div className='grid lg:grid-cols-4 grid-cols-2 gap-4'>
            <Dialog>
                {data?.map((media:any, index:number)=>(
                    <DialogTrigger asChild key={index} className='aspect-video' onClick={() => setActive(media)}>
                        <div className='aspect-square relative'>
                            <Image
                                fill
                                className=' object-cover'
                                src={media.url}
                                alt={media.name}
                            />
                        </div>
                    </DialogTrigger>
                ))}
                <DialogContent className="sm:max-w-[750px] w-[calc(100vw-16px)]">
                    <DialogHeader>
                        <DialogTitle>{active?.name}</DialogTitle>
                    <DialogDescription className='pb-2'>
                        {`Created by: ${active?.['created by']}`}
                    </DialogDescription>
                    <div className='flex flex-wrap gap-2'>
                        {active?.tags?.map((tag:any, key:any) => (
                            <Badge variant="secondary" key={key}>
                                {tag?.tag?.name}
                            </Badge>
                        ))}
                    </div>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                        {
                            active?.url && 
                            <div className='relative aspect-video'>
                                <Image
                                    src={active?.url}
                                    alt={active?.name}
                                    fill
                                    className='object-cover'
                                />
                            </div>
                        }
                    </div>
                    <DialogFooter>
                        <Button type="button">
                            delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
