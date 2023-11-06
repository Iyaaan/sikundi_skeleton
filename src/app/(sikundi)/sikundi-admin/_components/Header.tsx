"use client"

import React, { FC, Fragment, useEffect, useState } from 'react'
import { Separator } from '@sikundi/components/ui/separator'
import { Button } from '@sikundi/components/ui/button'
import { CalendarIcon, CopyCheck, PlusIcon, SlidersHorizontal, TrashIcon } from 'lucide-react'
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
import { Select2Async } from '@sikundi/components/ui/Select2Async'
import axios from 'axios'

interface Props {
    data: {
        url: string;
        name: string;
        slug: string;
        permissions: {
            create?: boolean;
        };
        softDeletable?: boolean;
        publishable?: boolean;
        hideFiltersOnTrash?: boolean;
        filters: {
            type: "select" | "date";
            name: string;
            label?: string;
            options?: {
                value: string;
                label: string;
            }[];
            url?: string
        }[]
    }
}

const Header:FC<Props> = ({ data }) => {
    const router = useRouter()
    const pathName = usePathname()
    const params = useSearchParams()
    const [filters, setFilters] = useState<{[key: string]: any}>({})
    const [open, setOpen] = useState(false)
    const debouncedValue = useDebounce<{[key: string]: any}>(filters, 500)

    useEffect(() => {
        if (Object.entries(debouncedValue).length > 0) {
            const url = new URL(`${process.env.NEXT_PUBLIC_SITE_NAME}${data.url}`)
            Object.keys(debouncedValue).forEach((key) => {
                const value = JSON.stringify(debouncedValue[key])?.replaceAll('"', '')
                if (value.length > 0) {
                    url.searchParams.append(key, JSON.stringify(debouncedValue[key])?.replaceAll('"', ''))
                }
            })
            router.push(url.toString())
        }
    }, [debouncedValue, router, data.url])

    useEffect(() => {
        const p:any = {}
        params.forEach((value, key)=>{
            p[key] = value 
        })
        setFilters(p)
    }, [params])

    useEffect(() => {
        setOpen(false)
    }, [filters])

    return (
        <Fragment>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight capitalize break-all">
                    {data.name}
                </h2>
                {((`${data.url}/trash` !== pathName) && (`${data.url}/create` !== pathName)) && <div className='flex gap-2'>
                    {data.permissions.create && <Button className='capitalize' asChild>
                        <Link href={`${data.url}/create`}><PlusIcon className='me-2 h-4 w-4' /> {data.slug}</Link>
                    </Button>}
                    {data.softDeletable && <Button variant="outline" size="icon" asChild>
                        <Link href={`${data.url}/trash`}><TrashIcon className="h-4 w-4" /></Link>
                    </Button>}
                    {data.publishable && <Button variant="outline" size="icon" asChild>
                        <Link href={`${data.url}/copydesk`}><CopyCheck className="h-4 w-4" /></Link>
                    </Button>}
                </div>}
            </div>
            <Separator className="my-4" />
            {((`${data.url}/create` !== pathName)) && <div className='flex items-center justify-between flex-row gap-4 mb-4'>
                <Input type="search" placeholder="Search..." className='lg:max-w-sm' onChange={(value) => setFilters((v) => ({ ...v, 'query': value.target.value }))} value={filters?.['query'] || ""} />
                {((`${data.url}/trash` !== pathName) && data.hideFiltersOnTrash) && <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className='lg:w-auto'><span className='hidden lg:block me-3'>Filter</span> <SlidersHorizontal className='w-3' /></Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full" align="end">
                        <div className="grid gap-4 md:w-[350px] w-[calc(100vw-4rem)]">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">Filters</h4>
                                <p className="text-sm text-muted-foreground">
                                    Select Filters From Below
                                </p>
                            </div>
                            <div className="grid gap-4">
                                {data.filters.map((filter, index)=>(
                                    <div className="flex flex-col gap-2" key={index}>
                                        <Label htmlFor={filter.name} className='capitalize'>{filter.label || filter.name}</Label>
                                        {filter.type === "date" && <DateComponent
                                            value={filters[filter.name]}
                                            onChange={(date) => setFilters((v) => ({ ...v, [filter.name]: date }))}
                                        />}
                                        {filter.type === "select" && (
                                            filter.url ? <Select2Async
                                                name={filter.name}
                                                isClearable={false}
                                                className='col-span-2 justify-start'
                                                defaultOptions={filter.options || [{
                                                    // @ts-ignore
                                                    label: `search for ${filter.label}`, value: `search for ${filter.label}`, isDisabled: true
                                                }]}
                                                loadOptions={(inputValue: string) => new Promise(async (resolve) => {
                                                    resolve((await axios.get(`${filter.url}?query=${inputValue}`))?.data?.data || [])
                                                })}
                                                value={filter.options?.filter(({value})=> value === filters[filter.name])}
                                                onChange={(value:any) => setFilters((v) => ({ ...v, [filter.name]: value?.value }))} 
                                            /> : <Select2
                                                name={filter.name}
                                                isClearable={false}
                                                className='col-span-2 justify-start'
                                                options={filter.options}
                                                value={filter.options?.filter(({value})=> value === filters[filter.name])}
                                                onChange={(value) => setFilters((v) => ({ ...v, [filter.name]: value?.value }))} 
                                            />
                                        )}
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
            </div>}
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