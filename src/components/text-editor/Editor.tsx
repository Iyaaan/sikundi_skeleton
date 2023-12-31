import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
// import {CharacterLimitPlugin} from '@lexical/react/LexicalCharacterLimitPlugin';
import {CheckListPlugin} from '@lexical/react/LexicalCheckListPlugin';
import {ClearEditorPlugin} from '@lexical/react/LexicalClearEditorPlugin';
import LexicalClickableLinkPlugin from '@lexical/react/LexicalClickableLinkPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {HashtagPlugin} from '@lexical/react/LexicalHashtagPlugin';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {HorizontalRulePlugin} from '@lexical/react/LexicalHorizontalRulePlugin';
import {ListPlugin} from '@lexical/react/LexicalListPlugin';
// import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {TabIndentationPlugin} from '@lexical/react/LexicalTabIndentationPlugin';
import {TablePlugin} from '@lexical/react/LexicalTablePlugin';
import useLexicalEditable from '@lexical/react/useLexicalEditable';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {CAN_USE_DOM} from './utils/canUseDOM';

import {useSharedHistoryContext} from './context/SharedHistoryContext';
import TableCellNodes from './nodes/TableCellNodes';
// import ActionsPlugin from './plugins/ActionsPlugin';
import AutoEmbedPlugin from './plugins/AutoEmbedPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import CollapsiblePlugin from './plugins/CollapsiblePlugin';
// import CommentPlugin from './plugins/CommentPlugin';
import ComponentPickerPlugin from './plugins/ComponentPickerPlugin';
import ContextMenuPlugin from './plugins/ContextMenuPlugin';
import DragDropPaste from './plugins/DragDropPastePlugin';
import DraggableBlockPlugin from './plugins/DraggableBlockPlugin';
import EmojiPickerPlugin from './plugins/EmojiPickerPlugin';
import EmojisPlugin from './plugins/EmojisPlugin';
import FigmaPlugin from './plugins/FigmaPlugin';
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin';
import ImagesPlugin from './plugins/ImagesPlugin';
import KeywordsPlugin from './plugins/KeywordsPlugin';
import {LayoutPlugin} from './plugins/LayoutPlugin/LayoutPlugin';
import LinkPlugin from './plugins/LinkPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import MarkdownShortcutPlugin from './plugins/MarkdownShortcutPlugin';
// import {MaxLengthPlugin} from './plugins/MaxLengthPlugin';
import MentionsPlugin from './plugins/MentionsPlugin';
import PageBreakPlugin from './plugins/PageBreakPlugin';
import PollPlugin from './plugins/PollPlugin';
import TabFocusPlugin from './plugins/TabFocusPlugin';
import TableCellActionMenuPlugin from './plugins/TableActionMenuPlugin';
import TableCellResizer from './plugins/TableCellResizer';
// import TableOfContentsPlugin from './plugins/TableOfContentsPlugin';
import {TablePlugin as NewTablePlugin} from './plugins/TablePlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin';
// import TreeViewPlugin from './plugins/TreeViewPlugin';
import TwitterPlugin from './plugins/TwitterPlugin';
import YouTubePlugin from './plugins/YouTubePlugin';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
import ContentEditable from './ui/ContentEditable';
import Placeholder from './ui/Placeholder';
import { ScrollArea } from '../ui/scroll-area';
import FaceBookPlugin from './plugins/FacebookPlugin';

export default function Editor(): JSX.Element {
    const {historyState} = useSharedHistoryContext();
    const isEditable = useLexicalEditable();
    const text = "Type '/' for commands";
    const placeholder = <Placeholder>{text}</Placeholder>;
    const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);
    const [isSmallWidthViewport, setIsSmallWidthViewport] = useState<boolean>(false);
    const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

    const onRef = (_floatingAnchorElem: HTMLDivElement) => {
        if (_floatingAnchorElem !== null) {
            setFloatingAnchorElem(_floatingAnchorElem);
        }
    };

    const cellEditorConfig = {
        namespace: 'Playground',
        nodes: [...TableCellNodes],
        onError: (error: Error) => {
            throw error;
        },
        theme: PlaygroundEditorTheme,
    };

    useEffect(() => {
        const updateViewPortWidth = () => {
            const isNextSmallWidthViewport =
                CAN_USE_DOM && window.matchMedia('(max-width: 1025px)').matches;

            if (isNextSmallWidthViewport !== isSmallWidthViewport) {
                setIsSmallWidthViewport(isNextSmallWidthViewport);
            }
        };
        updateViewPortWidth();
        window.addEventListener('resize', updateViewPortWidth);

        return () => {
            window.removeEventListener('resize', updateViewPortWidth);
        };
    }, [isSmallWidthViewport]);

    return (
        <React.Fragment>
            <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
            <div
                className={`editor-container`}>
                {/* <MaxLengthPlugin maxLength={30} /> */}
                {/* <DragDropPaste /> */}
                {/* <AutoFocusPlugin /> */}
                <ClearEditorPlugin />
                <ComponentPickerPlugin />
                <EmojiPickerPlugin />
                <AutoEmbedPlugin />

                <MentionsPlugin />
                <EmojisPlugin />
                <HashtagPlugin />
                <KeywordsPlugin />
                <AutoLinkPlugin />
                {/* <CommentPlugin /> */}
                
                <HistoryPlugin externalHistoryState={historyState} />
                <RichTextPlugin
                    contentEditable={
                        <ScrollArea className='h-[550px]'>
                        <div className="relative editor-scroller">
                            <div className="editor" ref={onRef}>
                                <ContentEditable />
                            </div>
                        </div>
                        </ScrollArea>
                    }
                    placeholder={placeholder}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <MarkdownShortcutPlugin />
                <CodeHighlightPlugin />
                <ListPlugin />
                <CheckListPlugin />
                <ListMaxIndentLevelPlugin maxDepth={7} />
                <TablePlugin
                    hasCellMerge={true}
                    hasCellBackgroundColor={true}
                />
                <TableCellResizer />
                <NewTablePlugin cellEditorConfig={cellEditorConfig}>
                    {/* <AutoFocusPlugin /> */}
                    <RichTextPlugin
                        contentEditable={
                        <ContentEditable className="TableNode__contentEditable" />
                        }
                        placeholder={null}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    {/* <MentionsPlugin /> */}
                    <HistoryPlugin />
                    <ImagesPlugin captionsEnabled={false} />
                    <LinkPlugin />
                    <LexicalClickableLinkPlugin />
                </NewTablePlugin>
                <ImagesPlugin />
                <LinkPlugin />
                {/* <PollPlugin /> */}
                <TwitterPlugin />
                <FaceBookPlugin />
                <YouTubePlugin />
                {/* <FigmaPlugin /> */}
                {!isEditable && <LexicalClickableLinkPlugin />}
                <HorizontalRulePlugin />
                <TabFocusPlugin />
                <TabIndentationPlugin />
                <CollapsiblePlugin />
                <PageBreakPlugin />
                <LayoutPlugin />
                {
                    floatingAnchorElem &&
                    <FloatingLinkEditorPlugin
                    anchorElem={floatingAnchorElem}
                    isLinkEditMode={isLinkEditMode}
                    setIsLinkEditMode={setIsLinkEditMode}
                    />
                }
                {floatingAnchorElem && !isSmallWidthViewport && (
                    <React.Fragment>
                        <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
                        <TableCellActionMenuPlugin
                            anchorElem={floatingAnchorElem}
                            cellMerge={true}
                        />
                    </React.Fragment>
                )}
                {/* <CharacterLimitPlugin
                    charset={'UTF-16' || 'UTF-8'}
                    maxLength={5}
                /> */}
                {/* <ContextMenuPlugin /> */}
                {/* <ActionsPlugin isRichText={true} /> */}
            </div>
            {/* <TreeViewPlugin /> */}
        </React.Fragment>
    );
}
