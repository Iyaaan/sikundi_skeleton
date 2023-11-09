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
import { TextareaProps } from '../ui/textarea';

export interface RichTextProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const RichTextEditor = React.forwardRef<HTMLTextAreaElement, TextareaProps>((({ className, ...props }, ref) => {
    const [editorState, setEditorState] = React.useState<any>();
    const initialConfig = {
        editorState: props.value,
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
                            <OnChangePlugin onChange={(editorState) => {
                                setEditorState(JSON.stringify(editorState))
                            }} />
                            <Editor />
                            <textarea
                                ref={ref}
                                {...{...props, value: editorState, disabled: true, className: "hidden" }}
                            />
                        </div>
                    </TableContext>
                </SharedHistoryContext>
            </ModalContext>
        </LexicalComposer>
    );
}))

export default RichTextEditor