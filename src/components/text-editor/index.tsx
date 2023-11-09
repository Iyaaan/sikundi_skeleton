"use client"
import './index.css';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import * as React from 'react';

import {SharedHistoryContext} from './context/SharedHistoryContext';
import Editor from './Editor';
import PlaygroundNodes from './nodes/PlaygroundNodes';
import {TableContext} from './plugins/TablePlugin';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';

export default function App(): JSX.Element {
    const initialConfig = {
        editorState: undefined,
        namespace: 'Playground',
        nodes: [...PlaygroundNodes],
        onError: (error: Error) => {
            throw error;
        },
        theme: PlaygroundEditorTheme,
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <SharedHistoryContext>
                <TableContext>
                    <div className="editor-shell">
                        <Editor />
                    </div>
                </TableContext>
            </SharedHistoryContext>
        </LexicalComposer>
    );
}