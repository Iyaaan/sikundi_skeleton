import React from 'react'
import { Card, CardContent, CardHeader } from '../card'
import { Separator } from '../separator'
import { Toggle } from '../toggle'
import { AlignCenter, AlignLeft, AlignRight, BoldIcon, ChevronDownIcon, ItalicIcon, LinkIcon, ListIcon, ListOrderedIcon, QuoteIcon, Redo2Icon, UnderlineIcon, Undo2Icon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { Button } from '../button'
import { Command, CommandGroup, CommandItem } from '../command'

export default function TextEditor() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <Card className="lg:col-span-8 lg:order-4">
            <CardHeader className=''>
                <div className='flex lg:gap-2 gap-1 items-center flex-wrap'>
                    <Toggle size={"sm"} variant={"outline"}>
                        <Undo2Icon className='h-4 w-4' />
                    </Toggle>
                    <Toggle size={"sm"} variant={"outline"}>
                        <Redo2Icon className='h-4 w-4' />
                    </Toggle>
                    <Separator orientation={"vertical"} className='h-7 lg:mx-3 mx-2' />
                    <Toggle size={"sm"} variant={"outline"}>
                        <BoldIcon className='h-4 w-4' />
                    </Toggle>
                    <Toggle size={"sm"} variant={"outline"}>
                        <ItalicIcon className='h-4 w-4' />
                    </Toggle>
                    <Toggle size={"sm"} variant={"outline"}>
                        <UnderlineIcon className='h-4 w-4' />
                    </Toggle>
                    <Toggle size={"sm"} variant={"outline"}>
                        <LinkIcon className='h-4 w-4' />
                    </Toggle>
                    <Separator orientation={"vertical"} className='h-7 lg:mx-3 mx-2' />
                    <Toggle size={"sm"} variant={"outline"}>
                        <ListIcon className='h-4 w-4' />
                    </Toggle>
                    <Toggle size={"sm"} variant={"outline"}>
                        <ListOrderedIcon className='h-4 w-4' />
                    </Toggle>
                    <Toggle size={"sm"} variant={"outline"}>
                        <QuoteIcon className='h-4 w-4' />
                    </Toggle>
                    <Separator orientation={"vertical"} className='h-7 lg:mx-3 mx-2' />
                    <Toggle size={"sm"} variant={"outline"}>
                        <AlignLeft className='h-4 w-4' />
                    </Toggle>
                    <Toggle size={"sm"} variant={"outline"}>
                        <AlignCenter className='h-4 w-4' />
                    </Toggle>
                    <Toggle size={"sm"} variant={"outline"}>
                        <AlignRight className='h-4 w-4' />
                    </Toggle>
                    <Separator orientation={"vertical"} className='h-1 lg:mx-3 mx-2' />
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild className='ml-auto'>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="justify-between"
                            >
                            {"Blocks"}
                            <ChevronDownIcon className="ml-3 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" align="end">
                            <Command>
                            <CommandGroup>
                                <CommandItem
                                    value={"block"}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    
                                </CommandItem>
                            </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <Separator />
            </CardHeader>
            <CardContent className="grid gap-4 aspect-video" contentEditable>

            </CardContent>
        </Card>
    )
}
