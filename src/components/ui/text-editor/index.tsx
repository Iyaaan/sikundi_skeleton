import React, { Fragment, useState } from 'react'
import { Card, CardContent, CardHeader } from '@sikundi/components/ui/card'
import { Separator } from '@sikundi/components/ui/separator'
import Muted from '@sikundi/components/ui/typography/muted'

// lexical
import {LexicalComposer} from '@lexical/react/LexicalComposer'
import useLexicalEditable from '@lexical/react/useLexicalEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import {ContentEditable} from '@lexical/react/LexicalContentEditable'

// plugins
import ToolBar from '@sikundi/components/ui/text-editor/plugins/toolbarPlugin'
import PlaygroundNodes from '@sikundi/components/ui/text-editor/nodes/PlaygroundNodes'
import PlaygroundEditorTheme from '@sikundi/components/ui/text-editor/themes/PlaygroundEditorTheme'
import { ScrollArea } from '../scroll-area'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'


export default function TextEditor() {
    const initialConfig = {
        editorState: undefined,
        namespace: 'Playground',
        nodes: [...PlaygroundNodes],
        onError: (error: Error) => {
          throw error;
        },
        theme: PlaygroundEditorTheme,
    }

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <Card className="lg:col-span-8 lg:order-4">
                <CardHeader className='pb-2'>
                    <ToolBar />
                    <Separator />
                </CardHeader>
                <CardContent className="block relative">
                    <ScrollArea className="h-[31rem] w-full">
                        <Content />
                    </ScrollArea>
                </CardContent>
            </Card>
        </LexicalComposer>
    )
}

function Content() {

    return (
        <Fragment>
            <AutoFocusPlugin />
            <RichTextPlugin
                contentEditable={
                    <ContentEditable className={'relative text-base border-0 block outline-none min-h-[31rem]'} />
                }
                placeholder={<Muted className='absolute top-0'>Type Here</Muted>}
                ErrorBoundary={LexicalErrorBoundary}
            />
        </Fragment>
    )
}
