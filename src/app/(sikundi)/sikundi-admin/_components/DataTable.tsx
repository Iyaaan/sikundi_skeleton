"use client"

import * as React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@sikundi/components/ui/table"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Button } from "@sikundi/components/ui/button"
import { twMerge } from "tailwind-merge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@sikundi/components/ui/tooltip"

export default function DataTable({data, edit}: {data: {[name:string]: string}[], edit: boolean}) {
    return (
        <div className="rounded-md border mb-4">
            <Table>
                <TableHeader className="bg-secondary hidden md:table-header-group">
                    <TableRow>
                        {Object?.keys(data?.[0])?.map((key) => (key !== "href" && key !== "_editing") && (
                            <TableHead key={key}>
                                {key}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index} className="border relative">
                            <Cell row={row} edit={edit} />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

function Cell({row, edit}:{row:any, edit: boolean}) {
    const [active, setActive] = React.useState(false)
    return (
        <React.Fragment>
            {Object.entries(row).map(([key, value], subIndex) => (key !== "href" && key !== "_editing") && (
                <TableCell key={subIndex} className="p-0 block md:table-cell" data-cell={key}>
                    <div className={twMerge(["flex md:block items-center", subIndex !== 0 && "mr-16"])}>
                        {edit ?
                            <Link href={row?.href || ""} className={twMerge(["md:p-4 grid grid-cols-5 flex-1 md:flex-none", (subIndex !== 0 && !active) && "hidden md:block"])}>
                                <span className="font-bold md:hidden col-span-2 bg-secondary p-4 text-muted-foreground">{key}</span>
                                <span className="col-span-3 p-4 md:p-0">{String(value)}</span>
                            </Link> :
                            <div className={twMerge(["md:p-4 grid grid-cols-5 flex-1 md:flex-none", (subIndex !== 0 && !active) && "hidden md:block"])}>
                                <span className="font-bold md:hidden col-span-2 bg-secondary p-4 text-muted-foreground">{key}</span>
                                <span className="col-span-3 p-4 md:p-0">{String(value)}</span>
                            </div> 
                        }
                        {subIndex === 0 && <Button
                            onClick={()=>setActive((r)=>!r)}
                            variant="outline"
                            className="h-8 w-8 p-0 flex mr-2 ml-6 md:hidden relative"
                        >
                            <ChevronDown className="h-4 w-4" />
                            {row?.['_editing'] && <span className="absolute top-1/2 -translate-y-1/2 -left-5 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                            </span>}
                        </Button>}
                    </div>
                </TableCell>
            ))}
            {row?.['_editing'] && <React.Fragment>
                <TableCell className="p-0 block md:hidden" data-cell={"Editing"}>
                    <div className={twMerge(["flex md:block items-center mr-16"])}>
                        {edit ?
                            <Link href={row?.href || ""} className={twMerge(["md:p-4 grid grid-cols-5 flex-1 md:flex-none", (!active) && "hidden md:block"])}>
                                <span className="font-bold md:hidden col-span-2 bg-secondary p-4 text-muted-foreground">{"Editing"}</span>
                                <span className="col-span-3 p-4 md:p-0">{String(row?.['_editing'])}</span>
                            </Link> :
                            <div className={twMerge(["md:p-4 grid grid-cols-5 flex-1 md:flex-none", (!active) && "hidden md:block"])}>
                                <span className="font-bold md:hidden col-span-2 bg-secondary p-4 text-muted-foreground">{"Editing"}</span>
                                <span className="col-span-3 p-4 md:p-0">{String(row?.['_editing'])}</span>
                            </div> 
                        }
                    </div>
                </TableCell>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span className="absolute top-1/2 -translate-y-1/2 right-4 h-3 w-3 hidden md:flex">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{String(row?.['_editing'])}</p>
                    </TooltipContent>
                </Tooltip> 
            </React.Fragment>}
        </React.Fragment>
    )
}