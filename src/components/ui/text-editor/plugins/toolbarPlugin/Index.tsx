import React, { useState } from 'react'
import { Toggle } from '@sikundi/components/ui/toggle'
import { AlignCenter, AlignLeft, AlignRight, BoldIcon, ChevronDownIcon, FacebookIcon, Heading1Icon, Heading2Icon, Heading3Icon, ImageIcon, ItalicIcon, LinkIcon, ListIcon, ListOrderedIcon, QuoteIcon, Redo2Icon, Scissors, Table2Icon, TwitterIcon, TypeIcon, UnderlineIcon, Undo2Icon, YoutubeIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@sikundi/components/ui/popover'
import { Button } from '@sikundi/components/ui/button'
import { Command, CommandGroup, CommandItem } from '@sikundi/components/ui/command'
import { Separator } from '@sikundi/components/ui/separator'

export default function ToolBar() {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [active, setActive] = useState<string[]>([])
    const [disabled, setDisabled] = useState<string[]>([])

    return (
        <div className='flex gap-1 items-center flex-wrap'>
            {toolBarItems.map(({ separator, ...Item }, index) => separator ? (
                <Separator orientation={"vertical"} className='h-7 mx-2' />
            ) : (
                <Toggle size={"sm"} variant={"outline"} key={index} 
                    pressed={active.includes(String(Item.name))} 
                    disabled={active.includes(String(Item.name))} 
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
        onClick: () => {},
        name: "undo"
    },
    {
        Icon: Redo2Icon,
        onClick: () => {},
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
        name: "underLine"
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