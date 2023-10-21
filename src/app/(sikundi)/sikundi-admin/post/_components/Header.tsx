import React, { Fragment } from 'react'
import { TabsList, TabsTrigger, Tabs } from "@sikundi/components/ui/tabs"
import Link from "next/link"
import { Separator } from '@sikundi/components/ui/separator'
import { Button } from '@sikundi/components/ui/button'
import { PlusIcon } from 'lucide-react'

export default function Header() {
    return (
        <Fragment>
            <Tabs defaultValue="post" className="h-full space-y-6 mb-4">
                <div className="space-between flex items-center">
                    <TabsList>
                        <TabsTrigger asChild value="post" className="relative">
                            <Link href={"/sikundi-admin/post"}>Post</Link>
                        </TabsTrigger>
                        <TabsTrigger value="category" disabled>
                            <Link href={"/sikundi-admin/post/category"}>Category</Link>
                        </TabsTrigger>
                        <TabsTrigger value="tag" disabled>
                            <Link href={"/sikundi-admin/post/tag"}>Tags</Link>
                        </TabsTrigger>
                    </TabsList>
                </div>
            </Tabs>
            <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Posts
                    </h2>
                    <Button>
                        <PlusIcon className='me-2 h-4 w-4' /> Post
                        {/* <Link href={"/sikundi-admin/post/create"}><PlusIcon className='me-2 h-4 w-4' /> Post</Link> */}
                    </Button>
            </div>
            <Separator className="my-4" />
        </Fragment>
    )
}
