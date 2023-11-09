import {
    $createCodeNode,
    $isCodeNode,
    CODE_LANGUAGE_FRIENDLY_NAME_MAP,
    CODE_LANGUAGE_MAP,
    getLanguageFriendlyName,
} from '@lexical/code';
import {$isLinkNode, TOGGLE_LINK_COMMAND} from '@lexical/link';
import {
    $isListNode,
    INSERT_CHECK_LIST_COMMAND,
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
    ListNode,
    REMOVE_LIST_COMMAND,
} from '@lexical/list';
import {INSERT_EMBED_COMMAND} from '@lexical/react/LexicalAutoEmbedPlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {$isDecoratorBlockNode} from '@lexical/react/LexicalDecoratorBlockNode';
import {INSERT_HORIZONTAL_RULE_COMMAND} from '@lexical/react/LexicalHorizontalRuleNode';
import {
    $createHeadingNode,
    $createQuoteNode,
    $isHeadingNode,
    $isQuoteNode,
    HeadingTagType,
} from '@lexical/rich-text';
import {
    $getSelectionStyleValueForProperty,
    $isParentElementRTL,
    $patchStyleText,
    $setBlocksType,
} from '@lexical/selection';
import {$isTableNode} from '@lexical/table';
import {
    $findMatchingParent,
    $getNearestBlockElementAncestorOrThrow,
    $getNearestNodeOfType,
    mergeRegister,
} from '@lexical/utils';
import {
    $createParagraphNode,
    $getNodeByKey,
    $getRoot,
    $getSelection,
    $isElementNode,
    $isRangeSelection,
    $isRootOrShadowRoot,
    $isTextNode,
    CAN_REDO_COMMAND,
    CAN_UNDO_COMMAND,
    COMMAND_PRIORITY_CRITICAL,
    COMMAND_PRIORITY_NORMAL,
    DEPRECATED_$isGridSelection,
    ElementFormatType,
    FORMAT_ELEMENT_COMMAND,
    FORMAT_TEXT_COMMAND,
    INDENT_CONTENT_COMMAND,
    KEY_MODIFIER_COMMAND,
    LexicalEditor,
    NodeKey,
    OUTDENT_CONTENT_COMMAND,
    REDO_COMMAND,
    SELECTION_CHANGE_COMMAND,
    UNDO_COMMAND,
} from 'lexical';
import {Dispatch, useCallback, useEffect, useState} from 'react';
import * as React from 'react';
import {IS_APPLE} from '../../utils/environment';
import { OperateModal } from '../../context/ModalContext'

import useModal from '../../hooks/useModal';
import {$createStickyNode} from '../../nodes/StickyNode';
import DropDown, {DropDownItem} from '../../ui/DropDown';
import {getSelectedNode} from '../../utils/getSelectedNode';
import {sanitizeUrl} from '../../utils/url';
import {EmbedConfigs} from '../AutoEmbedPlugin';
import {INSERT_COLLAPSIBLE_COMMAND} from '../CollapsiblePlugin';
import {InsertEquationDialog} from '../EquationsPlugin';
import {INSERT_EXCALIDRAW_COMMAND} from '../ExcalidrawPlugin';
import {InsertImageDialog} from '../ImagesPlugin';
import {InsertInlineImageDialog} from '../InlineImagePlugin';
import InsertLayoutDialog from '../LayoutPlugin/InsertLayoutDialog';
import {INSERT_PAGE_BREAK} from '../PageBreakPlugin';
import {InsertPollDialog} from '../PollPlugin';
import {InsertNewTableDialog, InsertTableDialog} from '../TablePlugin';
import { Toggle } from '@sikundi/components/ui/toggle';
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ChevronDownIcon, ChevronsDownIcon, Code2Icon, CodeIcon, ContainerIcon, FileTypeIcon, Heading1Icon, Heading2Icon, Heading3Icon, ImageIcon, IndentIcon, ItalicIcon, LayoutIcon, Link2Icon, ListIcon, ListOrderedIcon, ListTodoIcon, OutdentIcon, PencilIcon, PlusIcon, QuoteIcon, Redo2Icon, RulerIcon, ScissorsIcon, SigmaIcon, StrikethroughIcon, SubscriptIcon, SuperscriptIcon, TableIcon, TrashIcon, TypeIcon, UnderlineIcon, Undo2Icon, VoteIcon } from 'lucide-react';
import { Separator } from '@sikundi/components/ui/separator';
import { cn } from "@sikundi/lib/client/utils"
import { Button } from "@sikundi/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@sikundi/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sikundi/components/ui/popover"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@sikundi/components/ui/dialog';

const blockTypeToBlockName = {
    bullet: 'Bulleted List',
    check: 'Check List',
    code: 'Code Block',
    h1: 'Heading 1',
    h2: 'Heading 2',
    h3: 'Heading 3',
    h4: 'Heading 4',
    h5: 'Heading 5',
    h6: 'Heading 6',
    number: 'Numbered List',
    paragraph: 'Normal',
    quote: 'Quote',
};

const rootTypeToRootName = {
    root: 'Root',
    table: 'Table',
};

function getCodeLanguageOptions(): [string, string][] {
    const options: [string, string][] = [];

    for (const [lang, friendlyName] of Object.entries(
        CODE_LANGUAGE_FRIENDLY_NAME_MAP,
    )) {
        options.push([lang, friendlyName]);
    }

    return options;
}

const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions();

const ELEMENT_FORMAT_OPTIONS: {
    [key in Exclude<ElementFormatType, ''>]: {
        icon: string;
        iconRTL: string;
        name: string;
    };
} = {
    center: {
        icon: 'center-align',
        iconRTL: 'right-align',
        name: 'Center Align',
    },
    end: {
        icon: 'right-align',
        iconRTL: 'left-align',
        name: 'End Align',
    },
    justify: {
        icon: 'justify-align',
        iconRTL: 'justify-align',
        name: 'Justify Align',
    },
    left: {
        icon: 'left-align',
        iconRTL: 'left-align',
        name: 'Left Align',
    },
    right: {
        icon: 'right-align',
        iconRTL: 'left-align',
        name: 'Right Align',
    },
    start: {
        icon: 'left-align',
        iconRTL: 'right-align',
        name: 'Start Align',
    },
};

function dropDownActiveClass(active: boolean) {
    if (active) return 'active dropdown-item-active';
    else return '';
}

interface BlockFormatDropDownProps {
    blockType: keyof typeof blockTypeToBlockName;
    rootType: keyof typeof rootTypeToRootName;
    editor: LexicalEditor;
    disabled?: boolean;
}
function BlockFormatDropDown({ editor, blockType, rootType, disabled = false }: BlockFormatDropDownProps): JSX.Element {
    const [open, setOpen] = React.useState(false)
    const formatParagraph = () => {
        editor.update(() => {
        const selection = $getSelection();
        if (
            $isRangeSelection(selection) ||
            DEPRECATED_$isGridSelection(selection)
        ) {
            $setBlocksType(selection, () => $createParagraphNode());
        }
        });
    };

    const formatHeading = (headingSize: HeadingTagType) => {
        if (blockType !== headingSize) {
            editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
                    $setBlocksType(selection, () => $createHeadingNode(headingSize));
                }
            });
        }
    };

    const formatBulletList = () => {
        if (blockType !== 'bullet') {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        }
    };

    const formatCheckList = () => {
        if (blockType !== 'check') {
            editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
        } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        }
    };

    const formatNumberedList = () => {
        if (blockType !== 'number') {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        }
    };

    const formatQuote = () => {
        if (blockType !== 'quote') {
            editor.update(() => {
                const selection = $getSelection();
                if (
                $isRangeSelection(selection) ||
                DEPRECATED_$isGridSelection(selection)
                ) {
                $setBlocksType(selection, () => $createQuoteNode());
                }
            });
        }
    };

    const formatCode = () => {
        if (blockType !== 'code') {
            editor.update(() => {
                let selection = $getSelection();

                if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
                    if (selection.isCollapsed()) {
                        $setBlocksType(selection, () => $createCodeNode());
                    } else {
                        const textContent = selection.getTextContent();
                        const codeNode = $createCodeNode();
                        selection.insertNodes([codeNode]);
                        selection = $getSelection();
                        if ($isRangeSelection(selection))
                        selection.insertRawText(textContent);
                    }
                }
            });
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between gap-2"
                    aria-label="Formatting options for text style"
                >
                    {
                        blockTypeToBlockName[blockType] === "Normal" ?
                        <TypeIcon className='h-4 w-4' /> :
                        blockTypeToBlockName[blockType] === "Heading 1" ?
                        <Heading1Icon className='h-4 w-4' /> :
                        blockTypeToBlockName[blockType] === "Heading 2" ?
                        <Heading2Icon className='h-4 w-4' /> :
                        blockTypeToBlockName[blockType] === "Heading 3" ?
                        <Heading3Icon className='h-4 w-4' /> :
                        blockTypeToBlockName[blockType] === "Bulleted List" ?
                        <ListIcon className='h-4 w-4' /> :
                        blockTypeToBlockName[blockType] === "Numbered List" ?
                        <ListOrderedIcon className='h-4 w-4' /> :
                        blockTypeToBlockName[blockType] === "Check List" ?
                        <ListTodoIcon className='h-4 w-4' /> :
                        blockTypeToBlockName[blockType] === "Quote" ?
                        <QuoteIcon className='h-4 w-4' /> :
                        blockTypeToBlockName[blockType] === "Code Block" ?
                        <Code2Icon className='h-4 w-4' /> :
                        null
                    }
                    <span className='hidden md:inline'>{blockTypeToBlockName[blockType]}</span>
                    <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 max-w-[175px]" align='start'>
                <Command>
                    <CommandGroup>
                        <CommandItem value={"Normal"} onSelect={() => {
                            formatParagraph()
                            setOpen(false)
                        }}>
                            <TypeIcon className='h-4 w-4 mr-2' />{"Normal"}
                        </CommandItem>
                        <CommandItem value={"Heading 1"} onSelect={() => {
                            formatHeading('h1')
                            setOpen(false)
                        }}>
                            <Heading1Icon className='h-4 w-4 mr-2' />{"Heading 1"}
                        </CommandItem>
                        <CommandItem value={"Heading 2"} onSelect={() => {
                            formatHeading('h2')
                            setOpen(false)
                        }}>
                            <Heading2Icon className='h-4 w-4 mr-2' />{"Heading 2"}
                        </CommandItem>
                        <CommandItem value={"Heading 3"} onSelect={() => {
                            formatHeading('h3')
                            setOpen(false)
                        }}>
                            <Heading3Icon className='h-4 w-4 mr-2' />{"Heading 3"}
                        </CommandItem>
                        <CommandItem value={"bullet"} onSelect={() => {
                            formatBulletList()
                            setOpen(false)
                        }}>
                            <ListIcon className='h-4 w-4 mr-2' />{"Bullet List"}
                        </CommandItem>
                        <CommandItem value={"number"} onSelect={() => {
                            formatNumberedList()
                            setOpen(false)
                        }}>
                            <ListOrderedIcon className='h-4 w-4 mr-2' />{"Numbered List"}
                        </CommandItem>
                        <CommandItem value={"check"} onSelect={() => {
                            formatCheckList()
                            setOpen(false)
                        }}>
                            <ListTodoIcon className='h-4 w-4 mr-2' />{"Check List"}
                        </CommandItem>
                        <CommandItem value={"quote"} onSelect={() => {
                            formatQuote()
                            setOpen(false)
                        }}>
                            <QuoteIcon className='h-4 w-4 mr-2' />{"Quote"}
                        </CommandItem>
                        <CommandItem value={"code"} onSelect={() => {
                            formatCode()
                            setOpen(false)
                        }}>
                            <Code2Icon className='h-4 w-4 mr-2' />{"Code Block"}
                        </CommandItem>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

interface ElementFormatDropdownProps {
    editor: LexicalEditor;
    value: ElementFormatType;
    isRTL: boolean;
    disabled: boolean;
}

function ElementFormatDropdown({ editor, value, isRTL, disabled = false }: ElementFormatDropdownProps) {
    const formatOption = ELEMENT_FORMAT_OPTIONS[value || 'left'];
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between gap-2"
                    aria-label="Formatting options for text alignment"
                >
                    {
                        formatOption.name === "Left Align" ?
                        <AlignLeftIcon className='h-4 w-4' /> :
                        formatOption.name === "Right Align" ?
                        <AlignRightIcon className='h-4 w-4' /> :
                        formatOption.name === "Center Align" ?
                        <AlignCenterIcon className='h-4 w-4' /> :
                        formatOption.name === "Justify Align" ?
                        <AlignJustifyIcon className='h-4 w-4' /> :
                        formatOption.name === "Start Align" ?
                        (isRTL ? <AlignRightIcon className='h-4 w-4 mr-2' /> : 
                        <AlignLeftIcon className='h-4 w-4 mr-2' />) :
                        formatOption.name === "End Align" ?
                        (isRTL ? <AlignLeftIcon className='h-4 w-4 mr-2' /> : 
                        <AlignRightIcon className='h-4 w-4 mr-2' />) :
                        null
                    }
                    <span className='hidden md:inline'>{formatOption.name}</span>
                    <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 max-w-[175px]" align='end'>
                <Command>
                    <CommandGroup>
                        <CommandItem value={"Left Align"} onSelect={() => {
                            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')
                            setOpen(false)
                        }}>
                            <AlignLeftIcon className='h-4 w-4 mr-2' />{"Left Align"}
                        </CommandItem>
                        <CommandItem value={"Center Align"} onSelect={() => {
                            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')
                            setOpen(false)
                        }}>
                            <AlignCenterIcon className='h-4 w-4 mr-2' />{"Center Align"}
                        </CommandItem>
                        <CommandItem value={"Right Align"} onSelect={() => {
                            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')
                            setOpen(false)
                        }}>
                            <AlignRightIcon className='h-4 w-4 mr-2' />{"Right Align"}
                        </CommandItem>
                        <CommandItem value={"Justify Align"} onSelect={() => {
                            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')
                            setOpen(false)
                        }}>
                            <AlignJustifyIcon className='h-4 w-4 mr-2' />{"Justify Align"}
                        </CommandItem>
                        <CommandItem value={"Start Align"} onSelect={() => {
                            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'start')
                            setOpen(false)
                        }}>
                            {
                                isRTL ? <AlignRightIcon className='h-4 w-4 mr-2' /> :
                                <AlignLeftIcon className='h-4 w-4 mr-2' />
                            }{"Start Align"}
                        </CommandItem>
                        <CommandItem value={"End Align"} onSelect={() => {
                            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'end')
                            setOpen(false)
                        }}>
                            {
                                isRTL ? <AlignLeftIcon className='h-4 w-4 mr-2' /> : 
                                <AlignRightIcon className='h-4 w-4 mr-2' />
                            }{"End Align"}
                        </CommandItem>
                        <Separator />
                        <CommandItem value={"outdent"} onSelect={() => {
                            editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)
                            setOpen(false)
                        }}>
                            <OutdentIcon className='h-4 w-4 mr-2' />{"Outdent"}
                        </CommandItem>
                        <CommandItem value={"indent"} onSelect={() => {
                            editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)
                            setOpen(false)
                        }}>
                            <IndentIcon className='h-4 w-4 mr-2' />{"Indent"}
                        </CommandItem>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default function ToolbarPlugin({ setIsLinkEditMode }: { setIsLinkEditMode: Dispatch<boolean>}): JSX.Element {
    const [editor] = useLexicalComposerContext();
    const { OpenModal, CloseModal } = OperateModal();
    const [activeEditor, setActiveEditor] = useState(editor);
    const [blockType, setBlockType] = useState<keyof typeof blockTypeToBlockName>('paragraph');
    const [rootType, setRootType] = useState<keyof typeof rootTypeToRootName>('root');
    const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(null);
    const [elementFormat, setElementFormat] = useState<ElementFormatType>('left');
    const [isLink, setIsLink] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [isSubscript, setIsSubscript] = useState(false);
    const [isSuperscript, setIsSuperscript] = useState(false);
    const [isCode, setIsCode] = useState(false);
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    const [modal, showModal] = useModal();
    const [isRTL, setIsRTL] = useState(false);
    const [codeLanguage, setCodeLanguage] = useState<string>('');
    const [isEditable, setIsEditable] = useState(() => editor.isEditable());
    const [codeMenu, setCodeMenu] = useState(false);
    const [blockMenu, setBlocksMenu] = useState(false);
    const [TextMenu, setTextMenu] = useState(false);

    const $updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            const anchorNode = selection.anchor.getNode();
            let element = anchorNode.getKey() === 'root' ? anchorNode : $findMatchingParent(anchorNode, (e) => {
                const parent = e.getParent();
                return parent !== null && $isRootOrShadowRoot(parent);
            });

            if (element === null) {
                element = anchorNode.getTopLevelElementOrThrow();
            }

            const elementKey = element.getKey();
            const elementDOM = activeEditor.getElementByKey(elementKey);

            // Update text format
            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));
            setIsUnderline(selection.hasFormat('underline'));
            setIsStrikethrough(selection.hasFormat('strikethrough'));
            setIsSubscript(selection.hasFormat('subscript'));
            setIsSuperscript(selection.hasFormat('superscript'));
            setIsCode(selection.hasFormat('code'));
            setIsRTL($isParentElementRTL(selection));

            // Update links
            const node = getSelectedNode(selection);
            const parent = node.getParent();
            if ($isLinkNode(parent) || $isLinkNode(node)) {
                setIsLink(true);
            } else {
                setIsLink(false);
            }

            const tableNode = $findMatchingParent(node, $isTableNode);
            if ($isTableNode(tableNode)) {
                setRootType('table');
            } else {
                setRootType('root');
            }

            if (elementDOM !== null) {
                setSelectedElementKey(elementKey);
                if ($isListNode(element)) {
                    const parentList = $getNearestNodeOfType<ListNode>(
                        anchorNode,
                        ListNode
                    );
                    const type = parentList ? parentList.getListType() : element.getListType();
                    setBlockType(type);
                } else {
                    const type = $isHeadingNode(element)
                        ? element.getTag()
                        : element.getType();
                    if (type in blockTypeToBlockName) {
                        setBlockType(type as keyof typeof blockTypeToBlockName);
                    }
                    if ($isCodeNode(element)) {
                        const language = element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
                        setCodeLanguage(language ? CODE_LANGUAGE_MAP[language] || language : '');
                        return;
                    }
                }
            }
            setElementFormat(
                ($isElementNode(node)
                ? node.getFormatType()
                : parent?.getFormatType()) || 'left',
            );
        
        }
    }, [activeEditor]);

    useEffect(() => {
        return editor.registerCommand(SELECTION_CHANGE_COMMAND, (_payload, newEditor) => {
            $updateToolbar();
            setActiveEditor(newEditor);
            return false;
        }, COMMAND_PRIORITY_CRITICAL);
    }, [editor, $updateToolbar]);

    useEffect(() => {
        return mergeRegister(
            editor.registerEditableListener((editable) => {
                setIsEditable(editable);
            }),
            activeEditor.registerUpdateListener(({editorState}) => {
                editorState.read(() => {
                    $updateToolbar();
                });
            }),
            activeEditor.registerCommand<boolean>(CAN_UNDO_COMMAND, (payload) => {
                setCanUndo(payload);
                return false;
            }, COMMAND_PRIORITY_CRITICAL),
            activeEditor.registerCommand<boolean>( CAN_REDO_COMMAND, (payload) => {
                setCanRedo(payload);
                return false;
            }, COMMAND_PRIORITY_CRITICAL)
        );
    }, [$updateToolbar, activeEditor, editor]);

    useEffect(() => {
        return activeEditor.registerCommand(KEY_MODIFIER_COMMAND, (payload) => {
            const event: KeyboardEvent = payload;
            const {code, ctrlKey, metaKey} = event;

            if (code === 'KeyK' && (ctrlKey || metaKey)) {
                event.preventDefault();
                if (!isLink) {
                    setIsLinkEditMode(true);
                } else {
                    setIsLinkEditMode(false);
                }
                return activeEditor.dispatchCommand(
                    TOGGLE_LINK_COMMAND,
                    sanitizeUrl('https://'),
                );
            }
            return false;
        }, COMMAND_PRIORITY_NORMAL);
    }, [activeEditor, isLink, setIsLinkEditMode]);

    const clearFormatting = useCallback(() => {
        activeEditor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
            const anchor = selection.anchor;
            const focus = selection.focus;
            const nodes = selection.getNodes();

            if (anchor.key === focus.key && anchor.offset === focus.offset) {
                return;
            }

            nodes.forEach((node, idx) => {
                // We split the first and last node by the selection
                // So that we don't format unselected text inside those nodes
                if ($isTextNode(node)) {
                if (idx === 0 && anchor.offset !== 0) {
                    node = node.splitText(anchor.offset)[1] || node;
                }
                if (idx === nodes.length - 1) {
                    node = node.splitText(focus.offset)[0] || node;
                }

                if (node.__style !== '') {
                    node.setStyle('');
                }
                if (node.__format !== 0) {
                    node.setFormat(0);
                    $getNearestBlockElementAncestorOrThrow(node).setFormat('');
                }
                } else if ($isHeadingNode(node) || $isQuoteNode(node)) {
                node.replace($createParagraphNode(), true);
                } else if ($isDecoratorBlockNode(node)) {
                node.setFormat('');
                }
            });
            }
        });
    }, [activeEditor]);

    const insertLink = useCallback(() => {
        if (!isLink) {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl('https://'));
        } else {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
        }
    }, [editor, isLink]);

    const onCodeLanguageSelect = useCallback((value: string) => {
        activeEditor.update(() => {
            if (selectedElementKey !== null) {
                const node = $getNodeByKey(selectedElementKey);
                if ($isCodeNode(node)) {
                    node.setLanguage(value);
                }
            }
        });
    }, [activeEditor, selectedElementKey]);

    return (
        <div className="toolbar items-center">
            <Toggle
                size={"sm"}
                pressed={false}
                disabled={!canUndo || !isEditable}
                onClick={() => {
                activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
                }}
                title={IS_APPLE ? 'Undo (⌘Z)' : 'Undo (Ctrl+Z)'}
                type="button"
                aria-label="Undo"
            >
                <Undo2Icon className='w-4 h-4' />
            </Toggle>
            <Toggle
                size={"sm"}
                pressed={false}
                disabled={!canRedo || !isEditable}
                onClick={() => {
                activeEditor.dispatchCommand(REDO_COMMAND, undefined);
                }}
                title={IS_APPLE ? 'Redo (⌘Y)' : 'Redo (Ctrl+Y)'}
                type="button"
                aria-label="Redo"
            >
                <Redo2Icon className='w-4 h-4' />
            </Toggle>
            <Separator className='mx-1 h-8' orientation={"vertical"} />
            {blockType in blockTypeToBlockName && activeEditor === editor && (
                <BlockFormatDropDown
                    disabled={!isEditable}
                    blockType={blockType}
                    rootType={rootType}
                    editor={editor}
                />
            )}
            {blockType === 'code' ? (
                <React.Fragment>
                    <Separator className='mx-1 h-8' orientation={"vertical"} />
                    <Popover open={codeMenu} onOpenChange={setCodeMenu}>
                        <PopoverTrigger asChild>
                            <Button
                                disabled={!isEditable}
                                variant="outline"
                                role="combobox"
                                aria-expanded={codeMenu}
                                className="justify-between gap-2"
                                aria-label="Select language"
                            >
                                {getLanguageFriendlyName(codeLanguage)}
                                <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 max-w-[175px]" align='start'>
                            <Command>
                                <CommandGroup>
                                    {CODE_LANGUAGE_OPTIONS.map(([value, name]) => (
                                        <CommandItem key={value} value={value} onSelect={() => {
                                            onCodeLanguageSelect(value)
                                            setCodeMenu(false)
                                        }}>{name}</CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Separator className='mx-1 h-8' orientation={"vertical"} />
                    <Toggle
                        size={"sm"}
                        disabled={!isEditable}
                        onClick={() => {
                        activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
                        }}
                        pressed={isBold}
                        title={IS_APPLE ? 'Bold (⌘B)' : 'Bold (Ctrl+B)'}
                        type="button"
                        aria-label={`Format text as bold. Shortcut: ${
                        IS_APPLE ? '⌘B' : 'Ctrl+B'
                        }`}
                    >
                        <BoldIcon className='h-4 w-4' />
                    </Toggle>
                    <Toggle
                        size={"sm"}
                        disabled={!isEditable}
                        onClick={() => {
                        activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
                        }}
                        pressed={isItalic}
                        title={IS_APPLE ? 'Italic (⌘I)' : 'Italic (Ctrl+I)'}
                        type="button"
                        aria-label={`Format text as italics. Shortcut: ${
                        IS_APPLE ? '⌘I' : 'Ctrl+I'
                        }`}
                    >
                        <ItalicIcon className='h-4 w-4' />
                    </Toggle>
                    <Toggle
                        size={"sm"}
                        disabled={!isEditable}
                        onClick={() => {
                        activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
                        }}
                        pressed={isUnderline}
                        title={IS_APPLE ? 'Underline (⌘U)' : 'Underline (Ctrl+U)'}
                        type="button"
                        aria-label={`Format text to underlined. Shortcut: ${
                        IS_APPLE ? '⌘U' : 'Ctrl+U'
                        }`}
                    >
                        <UnderlineIcon className='h-4 w-4' />
                    </Toggle>
                    <Toggle
                        size={"sm"}
                        disabled={!isEditable}
                        onClick={() => {
                        activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
                        }}
                        pressed={isCode}
                        title="Insert code block"
                        type="button"
                        aria-label="Insert code block"
                    >
                        <CodeIcon className='h-4 w-4' />
                    </Toggle>
                    <Toggle
                        size={"sm"}
                        disabled={!isEditable}
                        onClick={insertLink}
                        pressed={isLink}
                        aria-label="Insert link"
                        title="Insert link"
                        type="button"
                    >
                        <Link2Icon className='h-4 w-4' />
                    </Toggle>
                    <Separator className='mx-1 h-8' orientation={"vertical"} />
                    <Popover open={TextMenu} onOpenChange={setTextMenu}>
                        <PopoverTrigger asChild>
                            <Button
                                disabled={!isEditable}
                                variant="outline"
                                role="combobox"
                                aria-expanded={TextMenu}
                                className="justify-between gap-2"
                                aria-label="Formatting options for additional text styles"
                            >
                                {isStrikethrough ? <StrikethroughIcon className='w-4 h-4' /> : 
                                isSubscript ? <StrikethroughIcon className='w-4 h-4' /> : 
                                isSuperscript ? <SuperscriptIcon className='w-4 h-4' /> : 
                                <FileTypeIcon className='w-4 h-4' />}
                                <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 max-w-[175px]" align='center'>
                            <Command>
                                <CommandGroup>
                                    <CommandItem value={"Strikethrough"} title="Strikethrough" aria-label="Format text with a strikethrough" 
                                        onSelect={() => {
                                            activeEditor.dispatchCommand(
                                                FORMAT_TEXT_COMMAND,
                                                'strikethrough',
                                            );
                                            setTextMenu(false)
                                        }}
                                    >
                                        <StrikethroughIcon className='w-4 h-4' />
                                        <span className='ml-2'>{"Strikethrough"}</span>
                                    </CommandItem>
                                    <CommandItem value={"Subscript"} title="Subscript" aria-label="Format text with a subscript" 
                                        onSelect={() => {
                                            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript');
                                            setTextMenu(false)
                                        }}
                                    >
                                        <SubscriptIcon className='w-4 h-4' />
                                        <span className='ml-2'>{"Subscript"}</span>
                                    </CommandItem>
                                    <CommandItem value={"Superscript"} title="Superscript" aria-label="Format text with a superscript" 
                                        onSelect={() => {
                                            activeEditor.dispatchCommand(
                                                FORMAT_TEXT_COMMAND,
                                                'superscript',
                                            );
                                            setTextMenu(false)
                                        }}
                                    >
                                        <SuperscriptIcon className='w-4 h-4' />
                                        <span className='ml-2'>{"Superscript"}</span>
                                    </CommandItem>
                                    <CommandItem value={"Clear formatting"} title="Clear text formatting" aria-label="Clear all text formatting" 
                                        onSelect={() => {
                                            clearFormatting();
                                            setTextMenu(false)
                                        }}
                                    >
                                        <TrashIcon className='w-4 h-4' />
                                        <span className='ml-2'>{"Clear Formatting"}</span>
                                    </CommandItem>
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <Separator className='mx-1 h-8' orientation={"vertical"} />
                    <Popover open={blockMenu} onOpenChange={setBlocksMenu}>
                        <PopoverTrigger asChild>
                            <Button
                                disabled={!isEditable}
                                variant="outline"
                                role="combobox"
                                aria-expanded={blockMenu}
                                className="justify-between gap-2"
                                aria-label="Insert specialized editor node"
                            >
                                <span className='hidden md:inline mr-2'>{"Insert"}</span>
                                <PlusIcon className="h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 max-w-[175px]" align='end'>
                            <Command>
                                <CommandGroup>
                                    <CommandItem value={"Horizontal Rule"} title="Horizontal Rule" onSelect={() => {
                                        activeEditor.dispatchCommand(
                                            INSERT_HORIZONTAL_RULE_COMMAND,
                                            undefined,
                                        );
                                        setBlocksMenu(false)
                                    }}>
                                        <RulerIcon className='w-4 h-4' />
                                        <span className='ml-2'>{"Horizontal Rule"}</span>
                                    </CommandItem>
                                    <CommandItem value={"Page Break"} title="Page Break" onSelect={() => {
                                        activeEditor.dispatchCommand(INSERT_PAGE_BREAK, undefined);
                                        setBlocksMenu(false)
                                    }}>
                                        <ScissorsIcon className='w-4 h-4' />
                                        <span className='ml-2'>{"Page Break"}</span>
                                    </CommandItem>
                                    <CommandItem value={"Image"} title="Image" onSelect={() => {
                                        OpenModal(
                                            <DialogContent className="max-w-[425px] w-[calc(100vw-16px)]">
                                                <DialogHeader>
                                                    <DialogTitle>Add a Photo</DialogTitle>
                                                    <DialogDescription>
                                                        Choose a option
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <InsertImageDialog
                                                    activeEditor={activeEditor}
                                                    onClose={() => CloseModal()}
                                                />
                                            </DialogContent>
                                        )
                                        setBlocksMenu(false)
                                    }}>
                                        <ImageIcon className='w-4 h-4' />
                                        <span className='ml-2'>{"Image"}</span>
                                    </CommandItem>
                                    {/* <CommandItem value={"Excalidraw"} title="Excalidraw" onSelect={() => {
                                        activeEditor.dispatchCommand(
                                            INSERT_EXCALIDRAW_COMMAND,
                                            undefined,
                                        );
                                        setBlocksMenu(false)
                                    }}>
                                        <PencilIcon className='w-4 h-4' />
                                        <span className='ml-2'>{"Excalidraw"}</span>
                                    </CommandItem> */}
                                    <CommandItem value={"Table"} title="Table" onSelect={() => {
                                        OpenModal(
                                            <DialogContent className="max-w-[425px] w-[calc(100vw-16px)]">
                                                <DialogHeader>
                                                    <DialogTitle>Insert Table</DialogTitle>
                                                    <DialogDescription>
                                                        Customize Your Table
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <InsertTableDialog
                                                    activeEditor={activeEditor}
                                                    onClose={() => CloseModal()}
                                                />
                                            </DialogContent>
                                        )
                                        setBlocksMenu(false)
                                    }}>
                                        <TableIcon className='w-4 h-4' />
                                        <span className='ml-2'>{"Table"}</span>
                                    </CommandItem>
                                    <CommandItem value={"Poll"} title="Poll" onSelect={() => {
                                        OpenModal(
                                            <DialogContent className="max-w-[425px] w-[calc(100vw-16px)]">
                                                <DialogHeader>
                                                    <DialogTitle>Insert Poll</DialogTitle>
                                                    <DialogDescription>
                                                        Customize Your Poll
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <InsertPollDialog
                                                    activeEditor={activeEditor}
                                                    onClose={() => CloseModal()}
                                                />
                                            </DialogContent>
                                        )
                                        setBlocksMenu(false)
                                    }}>
                                        <VoteIcon className='w-4 h-4' />
                                        <span className='ml-2'>{"Poll"}</span>
                                    </CommandItem>
                                    <CommandItem value={"Columns Layout"} title="Columns Layout" onSelect={() => {
                                        OpenModal(
                                            <DialogContent className="max-w-[425px] w-[calc(100vw-16px)]">
                                                <DialogHeader>
                                                    <DialogTitle>Insert Columns Layout</DialogTitle>
                                                    <DialogDescription>
                                                        Customize Your Layout
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <InsertLayoutDialog
                                                    activeEditor={activeEditor}
                                                    onClose={() => CloseModal()}
                                                />
                                            </DialogContent>
                                        )
                                        setBlocksMenu(false)
                                    }}>
                                        <LayoutIcon className='w-4 h-4' />
                                        <span className='ml-2'>{"Columns Layout"}</span>
                                    </CommandItem>
                                    {/* <CommandItem value={"Equation"} title="Equation" onSelect={() => {
                                        OpenModal(
                                            <DialogContent className="max-w-[425px] w-[calc(100vw-16px)]">
                                                <DialogHeader>
                                                    <DialogTitle>Insert Equation</DialogTitle>
                                                    <DialogDescription>
                                                        Customize Your Equation
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <InsertEquationDialog
                                                    activeEditor={activeEditor}
                                                    onClose={() => CloseModal()}
                                                />
                                            </DialogContent>
                                        )
                                        setBlocksMenu(false)
                                    }}>
                                        <SigmaIcon className='w-4 h-4' />
                                        <span className='ml-2'>{"Equation"}</span>
                                    </CommandItem> */}
                                    <CommandItem value={"Collapsible container"} title="Collapsible container" onSelect={() => {
                                        editor.dispatchCommand(INSERT_COLLAPSIBLE_COMMAND, undefined);
                                        setBlocksMenu(false)
                                    }}>
                                        <ContainerIcon className='w-4 h-4' />
                                        <span className='ml-2'>{"Collapsible"}</span>
                                    </CommandItem>
                                    {EmbedConfigs.map((embedConfig) => (
                                        <CommandItem key={embedConfig.type} value={embedConfig.contentName} title={embedConfig.contentName} onSelect={() => {
                                            activeEditor.dispatchCommand(
                                                INSERT_EMBED_COMMAND,
                                                embedConfig.type,
                                            );
                                            setBlocksMenu(false)
                                        }}>
                                            {embedConfig.icon}
                                            {embedConfig.contentName}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </React.Fragment>
            )}
            <Separator className='mx-1 h-8' orientation={"vertical"} />
            <ElementFormatDropdown
                disabled={!isEditable}
                value={elementFormat}
                editor={editor}
                isRTL={isRTL}
            />

            {modal}
        </div>
    );
}
