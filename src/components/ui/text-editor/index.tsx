import React from 'react'
import { Card, CardContent, CardHeader } from '@sikundi/components/ui/card'
import { Separator } from '@sikundi/components/ui/separator'
import ToolBar from './plugins/toolbarPlugin/Index'

export default function TextEditor() {
    return (
        <Card className="lg:col-span-8 lg:order-4">
            <CardHeader className=''>
                <ToolBar />
                <Separator />
            </CardHeader>
            <CardContent className="grid gap-4 aspect-video" contentEditable>

            </CardContent>
        </Card>
    )
}
