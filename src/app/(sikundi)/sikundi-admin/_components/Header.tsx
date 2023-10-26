"use client"

import React, { FC, Fragment, useEffect, useState } from 'react'
import { Separator } from '@sikundi/components/ui/separator'
import { Button } from '@sikundi/components/ui/button'
import { CalendarIcon, PlusIcon, SlidersHorizontal, TrashIcon } from 'lucide-react'
import { Input } from '@sikundi/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@sikundi/components/ui/popover'
import { Label } from '@sikundi/components/ui/label'
import { Calendar } from '@sikundi/components/ui/calendar'
import { cn } from '@sikundi/lib/client/utils'
import { format } from "date-fns"
import { useDebounce } from 'usehooks-ts'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Select2 from '@sikundi/components/ui/Select2'

interface Props {
    data: {
        url: string;
        name: string;
        slug: string;
        permissions: {
            create?: boolean;
        };
        softDeletable?: boolean;
        hideFiltersOnTrash?: boolean;
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
    const router = useRouter()
    const pathName = usePathname()
    const params = useSearchParams()
    const [filters, setFilters] = useState<{[key: string]: any}>(() => {
        const paramss:any = {}
        params.forEach((value, key)=>{
            paramss[key] = value 
        })
        return paramss
    })
    const [open, setOpen] = useState(false)
    const debouncedValue = useDebounce<{[key: string]: any}>(filters, 500)

    useEffect(() => {
        if (Object.entries(debouncedValue).length > 0) {
            const url = new URL(`${process.env.NEXT_PUBLIC_SITE_NAME}${data.url}`)
            Object.keys(debouncedValue).forEach(key => url.searchParams.append(key, JSON.stringify(debouncedValue[key])?.replaceAll('"', '')))
            router.push(url.toString())
        }
    }, [debouncedValue, router, data.url])

    useEffect(() => {
        setOpen(false)
    }, [filters])

    return (
        <Fragment>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight capitalize">
                    {data.name}
                </h2>
                <div className='flex gap-2'>
                    {data.permissions.create && <Button className='capitalize'>
                        <PlusIcon className='me-2 h-4 w-4' /> {data.slug}
                    </Button>}
                    {data.softDeletable && <Button variant="outline" size="icon" asChild>
                        <Link href={`${data.url}/trash`}><TrashIcon className="h-4 w-4" /></Link>
                    </Button>}
                </div>
            </div>
            <Separator className="my-4" />
            <div className='flex items-center justify-between lg:flex-row flex-col gap-4 mb-4'>
                <Input type="search" placeholder="Search..." className='lg:max-w-sm' onChange={(value) => setFilters((v) => ({ ...v, 'search': value.target.value }))} value={filters?.['search'] || ""} />
                {(!pathName.includes('trash') && data.hideFiltersOnTrash) && <Popover open={open} onOpenChange={setOpen}>
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
                                        {filter.type === "date" && <DateComponent
                                            value={filters[filter.name]}
                                            onChange={(date) => setFilters((v) => ({ ...v, [filter.name]: date }))}
                                        />}
                                        {filter.type === "select" && <Select2
                                            name={filter.name}
                                            isClearable={false}
                                            className='col-span-2 justify-start'
                                            options={filter.options}
                                            value={filters[filter.name]}
                                            onChange={({ value }) => setFilters((v) => ({ ...v, [filter.name]: value }))} 
                                        />}
                                    </div>
                                ))}
                            </div>
                            <Button onClick={() => {
                                setFilters({})
                                router.push(data.url)
                            }}>
                                Clear
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>}
            </div>
        </Fragment>
    )
}

export default Header

function DateComponent(props: {value: string, onChange: (data?:Date) => void}) {
    const [open, setOpen] = useState(false)
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "col-span-2 justify-start text-left font-normal",
                        !props.value && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {props.value ? format(new Date (props.value), "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                    mode="single"
                    selected={new Date (props.value)}
                    onSelect={(data) => {
                        setOpen(false)
                        props.onChange(data)
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}