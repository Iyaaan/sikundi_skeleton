"use client"

import React, { FC, Fragment, useEffect, useState } from 'react'
import { Separator } from '@sikundi/components/ui/separator'
import { Button } from '@sikundi/components/ui/button'
import { CalendarIcon, Check, ChevronsUpDown, PlusIcon, SlidersHorizontal } from 'lucide-react'
import { Input } from '@sikundi/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@sikundi/components/ui/popover'
import { Label } from '@sikundi/components/ui/label'
import { Calendar } from '@sikundi/components/ui/calendar'
import { cn } from '@sikundi/lib/client/utils'
import { format } from "date-fns"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@sikundi/components/ui/command'
import { useUpdateEffect } from 'usehooks-ts'
import { useRouter } from 'next/navigation'

interface Props {
    data: {
        url: string;
        name: string;
        slug: string;
        permissions: {
            create: boolean;
        };
        filters: {
            type: "select" | "date";
            name: string;
            label?: string;
            options?: {
                value: string;
                label: string;
            }[];
        }[]
    }
}

const Header:FC<Props> = ({ data }) => {
    const [filters, setFilters] = useState<{[key: string]: any}>({})
    const router = useRouter()

    useUpdateEffect(() => {
        const url = new URL(`${process.env.NEXT_PUBLIC_SITE_NAME}${data.url}`)
        Object.keys(filters).forEach(key => url.searchParams.append(key, filters[key]))
        router.push(url.toString())
        router.refresh()
    }, [filters])

    return (
        <Fragment>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight capitalize">
                    {data.name}
                </h2>
                {data.permissions.create && <Button className='capitalize'>
                    <PlusIcon className='me-2 h-4 w-4' /> {data.slug}
                </Button>}
            </div>
            <Separator className="my-4" />
            <div className='flex items-center justify-between lg:flex-row flex-col gap-4 mb-4'>
                <Input type="search" placeholder="Search..." className='lg:max-w-sm' />
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className='w-full lg:w-auto'>Filter <SlidersHorizontal className='ms-3 w-3' /></Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full" align="end">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">Filters</h4>
                                <p className="text-sm text-muted-foreground">
                                    Select Filters From Below
                                </p>
                            </div>
                            <div className="grid gap-2">
                                {data.filters.map((filter, index)=>(
                                    <div className="grid grid-cols-3 items-center gap-4" key={index}>
                                        <Label htmlFor={filter.name} className='capitalize'>{filter.label || filter.name}</Label>
                                        {filter.type === "date" &&  <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "col-span-2 justify-start text-left font-normal",
                                                        !filters[filter.name] && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {filters[filter.name] ? format(filters[filter.name], "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="end">
                                                <Calendar
                                                    mode="single"
                                                    selected={filters[filter.name]}
                                                    onSelect={(date) => setFilters((v) => ({ ...v, [filter.name]: date }))}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>}
                                        {filter.type === "select" && <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className="col-span-2 justify-between"
                                                >
                                                    {filters[filter.name]
                                                        ? filter.options?.find((option) => option.value === filters[filter.name])?.label
                                                        : "Select..."}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="col-span-2 p-0" align="end">
                                                <Command>
                                                    <CommandInput placeholder="Search framework..." />
                                                    <CommandEmpty>No framework found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {filter.options?.map((option) => (
                                                            <CommandItem
                                                                key={option.value}
                                                                value={option.value}
                                                                onSelect={(value) => setFilters((v) => ({ ...v, [filter.name]: value }))}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        filters[filter.name] === option.value ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {option.label}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>}
                                    </div>
                                ))}
                            </div>
                            <Button onClick={() => setFilters({})}>Clear</Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </Fragment>
    )
}

export default Header