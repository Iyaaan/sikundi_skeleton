import React, { useCallback, useEffect, useState } from 'react'
import { Toggle } from '@sikundi/components/ui/toggle'
import { AlignCenter, AlignLeft, AlignRight, BoldIcon, ChevronDownIcon, FacebookIcon, Heading1Icon, Heading2Icon, Heading3Icon, ImageIcon, ItalicIcon, LinkIcon, ListIcon, ListOrderedIcon, QuoteIcon, Redo2Icon, Scissors, Table2Icon, TwitterIcon, TypeIcon, UnderlineIcon, Undo2Icon, YoutubeIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@sikundi/components/ui/popover'
import { Button } from '@sikundi/components/ui/button'
import { Command, CommandGroup, CommandItem } from '@sikundi/components/ui/command'
import { Separator } from '@sikundi/components/ui/separator'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getSelection, $isRangeSelection, $isRootOrShadowRoot, CAN_REDO_COMMAND, CAN_UNDO_COMMAND, COMMAND_PRIORITY_CRITICAL, NodeKey, REDO_COMMAND, SELECTION_CHANGE_COMMAND, UNDO_COMMAND } from 'lexical'
import { $findMatchingParent, mergeRegister } from '@lexical/utils'
import { getSelectedNode } from '../../utils/getSelectedNode'
import { $isLinkNode } from '@lexical/link'
import { $isTableNode } from '@lexical/table'

export default function ToolBar() {
    const [open, setOpen] = useState(false)
    const [editor] = useLexicalComposerContext()
    const [rootType, setRootType] = useState<"root" | "table">('root')
    const [activeEditor, setActiveEditor] = useState(editor)
    const [active, setActive] = useState<string[]>([])
    const [disabled, setDisabled] = useState<string[]>([])

    const components = [
        {
            Icon: TypeIcon,
            onClick: () => {},
            name: "paragraph"
        },
        {
            Icon: Heading1Icon,
            onClick: () => {},
            name: "headingOne"
        },
        {
            Icon: Heading2Icon,
            onClick: () => {},
            name: "headingTwo"
        },
        {
            Icon: Heading3Icon,
            onClick: () => {},
            name: "headingThree"
        },
        {
            Icon: ImageIcon,
            onClick: () => {},
            name: "image"
        },
        {
            Icon: Scissors,
            onClick: () => {},
            name: "pageBreak"
        },
        {
            Icon: YoutubeIcon,
            onClick: () => {},
            name: "youtube"
        },
        {
            Icon: FacebookIcon,
            onClick: () => {},
            name: "facebook"
        },
        {
            Icon: TwitterIcon,
            onClick: () => {},
            name: "twitter"
        },
        {
            Icon: Table2Icon,
            onClick: () => {},
            name: "table"
        },
    ]
    
    const toolBarItems = [
        {
            Icon: Undo2Icon,
            onClick: () => activeEditor.dispatchCommand(UNDO_COMMAND, undefined),
            name: "undo"
        },
        {
            Icon: Redo2Icon,
            onClick: () => activeEditor.dispatchCommand(REDO_COMMAND, undefined),
            name: "redo"
        },
        {
            separator: true
        },
        {
            Icon: BoldIcon,
            onClick: () => {},
            name: "bold"
        },
        {
            Icon: ItalicIcon,
            onClick: () => {},
            name: "italic"
        },
        {
            Icon: UnderlineIcon,
            onClick: () => {},
            name: "underline"
        },
        {
            Icon: LinkIcon,
            onClick: () => {},
            name: "link"
        },
        {
            separator: true
        },
        {
            Icon: ListIcon,
            onClick: () => {},
            name: "list"
        },
        {
            Icon: ListOrderedIcon,
            onClick: () => {},
            name: "orderedList"
        },
        {
            Icon: QuoteIcon,
            onClick: () => {},
            name: "quote"
        },
        {
            separator: true
        },
        {
            Icon: AlignLeft,
            onClick: () => {},
            name: "alignLeft"
        },
        {
            Icon: AlignCenter,
            onClick: () => {},
            name: "AlighnCenter"
        },
        {
            Icon: AlignRight,
            onClick: () => {},
            name: "AlignRight"
        }
    ]

    const $updateToolbar = useCallback(() => {
        const activeClasses:string[] = []
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            const anchorNode = selection.anchor.getNode()
            let element = anchorNode.getKey() === 'root'
                ? anchorNode
                : $findMatchingParent(anchorNode, (e) => {
                    const parent = e.getParent();
                    return parent !== null && $isRootOrShadowRoot(parent);
                })
    
            if (element === null) element = anchorNode.getTopLevelElementOrThrow()
    
            const elementKey = element.getKey()
            const elementDOM = activeEditor.getElementByKey(elementKey)
    
            // Update text format
            selection.hasFormat('bold') && activeClasses.push('bold')
            selection.hasFormat('italic') && activeClasses.push('italic')
            selection.hasFormat('underline') && activeClasses.push('underline')
    
            // Update links
            const node = getSelectedNode(selection)
            const parent = node.getParent()
            if ($isLinkNode(parent) || $isLinkNode(node)) activeClasses.push('link')
    
            const tableNode = $findMatchingParent(node, $isTableNode)
            if ($isTableNode(tableNode)) setRootType('table')
            else setRootType('root')
        }
        setActive(activeClasses)
    }, [activeEditor]);

    useEffect(() => {
        return editor.registerCommand(
            SELECTION_CHANGE_COMMAND,
            (_payload, newEditor) => {
                $updateToolbar();
                setActiveEditor(newEditor);
                return false;
            },
            COMMAND_PRIORITY_CRITICAL,
        );
    }, [editor, $updateToolbar]);

    useEffect(() => {
        const disabledItems:string[] = []
        return mergeRegister(
            editor.registerEditableListener((editable) => {
                alert(editable)
            }),
            activeEditor.registerUpdateListener(({editorState}) => {
                editorState.read(() => {
                    $updateToolbar();
                });
            }),
            activeEditor.registerCommand<boolean>(
                CAN_UNDO_COMMAND,
                (payload) => {
                    !payload && disabledItems.push('undo')
                    return false;
                },
                COMMAND_PRIORITY_CRITICAL,
            ),
            activeEditor.registerCommand<boolean>(
                CAN_REDO_COMMAND,
                (payload) => {
                    !payload && disabledItems.push('redo')
                    return false;
                },
                COMMAND_PRIORITY_CRITICAL,
            ),
            () => {
                setDisabled(disabledItems)
            }
        )
    }, [$updateToolbar, activeEditor, editor]);

    return (
        <div className='flex gap-1 items-center flex-wrap'>
            {toolBarItems.map(({ separator, ...Item }, index) => separator ? (
                <Separator orientation={"vertical"} className='h-7 mx-2' key={index} />
            ) : (
                <Toggle size={"sm"} variant={"outline"} key={index} 
                    pressed={active.includes(String(Item.name))} 
                    disabled={disabled.includes(String(Item.name))} 
                    onPressedChange={Item.onClick}
                >
                    {Item.Icon && <Item.Icon className='h-4 w-4' />}
                </Toggle>
            ))}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className='lg:ml-auto w-full lg:w-auto'>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="justify-between"
                    >
                    {"Components"}
                    <ChevronDownIcon className="ml-3 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="end">
                    <Command>
                        <CommandGroup>
                            {components.map((component, index) => (
                                <CommandItem key={index}
                                    value={component.name}
                                    onSelect={(v) => {
                                        setOpen(false)
                                        component.onClick()
                                    }}
                                    className='flex items-center gap-3'
                                >
                                    <component.Icon />
                                    {component.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}