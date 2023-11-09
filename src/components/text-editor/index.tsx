"use client"
import './index.css';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import * as React from 'react';

import {SharedHistoryContext} from './context/SharedHistoryContext';
import Editor from './Editor';
import PlaygroundNodes from './nodes/PlaygroundNodes';
import {TableContext} from './plugins/TablePlugin';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
import ModalContext from './context/ModalContext';

export interface RichTextProps {
    value: {
        [name: string]: any
    },
    defaultValue: {
        [name: string]: any
    } | null,
    onChange: (data:{
        [name: string]: any
    }) => void
}

const RichTextEditor = ({ value, defaultValue, onChange }:RichTextProps) => {
    const [editorState, setEditorState] = React.useState<any>();
    const initialConfig = {
        editorState: defaultValue,
        namespace: 'Playground',
        nodes: [...PlaygroundNodes],
        onError: (error: Error) => {
            throw error;
        },
        theme: PlaygroundEditorTheme,
    };

    return (
        // @ts-ignore
        <LexicalComposer initialConfig={initialConfig}>
            <ModalContext>
                <SharedHistoryContext>
                    <TableContext>
                        <div className="editor-shell">
                            <OnChangePlugin onChange={onChange} />
                            <Editor />
                        </div>
                    </TableContext>
                </SharedHistoryContext>
            </ModalContext>
        </LexicalComposer>
    );
}

RichTextEditor.displayName = "RichTextEditor"

export default RichTextEditor
