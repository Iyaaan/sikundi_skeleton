'use client'

import { useEffect, useState } from "react"

import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table"
import { ListItemNode, ListNode } from "@lexical/list"
import { CodeHighlightNode, CodeNode } from "@lexical/code"
import { AutoLinkNode, LinkNode } from "@lexical/link"
import { TRANSFORMERS } from "@lexical/markdown"

import TreeViewPlugin from "@sikundi/components/ui/editor/plugins/TreeViewPlugin"
import ToolbarPlugin from "@sikundi/components/ui/editor/plugins/ToolbarPlugin"
import AutoLinkPlugin from "@sikundi/components/ui/editor/plugins/AutoLinkPlugin"
import CodeHighlightPlugin from "@sikundi/components/ui/editor/plugins/CodeHighlightPlugin"

import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin"
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin"
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin"

import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import ExampleTheme from "@sikundi/components/ui/editor/themes/ExampleTheme"


function Placeholder() {
    return <div className="editor-placeholder">Enter some rich text...</div>
}

const editorConfig = {
    theme: ExampleTheme,
    namespace: "daily-standup-editor",
    editorState: null,
    onError(error: unknown) {
        throw error
    },
    nodes: [
        HeadingNode,
        ListNode,
        ListItemNode,
        QuoteNode,
        CodeNode,
        CodeHighlightNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        AutoLinkNode,
        LinkNode
    ],
}

export function Editor(): JSX.Element | null {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <LexicalComposer initialConfig={editorConfig}>
            <div className="editor-container">
                <ToolbarPlugin />
                <div className="editor-inner">
                    <RichTextPlugin
                        contentEditable={<ContentEditable className="editor-input" />}
                        placeholder={<Placeholder />}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <ListPlugin />
                    <HistoryPlugin />
                    <AutoFocusPlugin />
                    <CodeHighlightPlugin />
                    <LinkPlugin />
                    <TabIndentationPlugin />
                    <AutoLinkPlugin />
                    <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
                    {/* <TreeViewPlugin /> */}
                </div>
            </div>
        </LexicalComposer>
    )
}
