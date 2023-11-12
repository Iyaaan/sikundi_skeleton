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

export default function DataTable({data}: {data: {[name:string]: string}[]}) {
    return (
        <div className="rounded-md border mb-4">
            <Table>
                <TableHeader className="bg-secondary hidden md:table-header-group">
                    <TableRow>
                        {Object?.keys(data?.[0])?.map((key) => key !== "href" && (
                            <TableHead key={key}>
                                {key}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index} className="border">
                            <Cell row={row} />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

function Cell({row}:{row:any}) {
    const [active, setActive] = React.useState(false)
    return (
        <React.Fragment>
            {Object.entries(row).map(([key, value], subIndex) => key !== "href" && (
                <TableCell key={subIndex} className="p-0 block md:table-cell" data-cell={key}>
                    <div className={twMerge(["flex md:block items-center", subIndex !== 0 && "mr-10"])}>
                        <Link href={row?.href || ""} className={twMerge(["md:p-4 grid grid-cols-5 gap-4 flex-1 md:flex-none", (subIndex !== 0 && !active) && "hidden md:block"])}>
                            <span className="font-bold md:hidden col-span-2 bg-secondary p-4 text-muted-foreground">{key}</span>
                            <span className="col-span-3 p-4 md:p-0">{String(value)}</span>
                        </Link>
                        {subIndex === 0 && <Button
                            onClick={()=>setActive((r)=>!r)}
                            variant="outline"
                            className="h-8 w-8 p-0 flex mr-2 md:hidden"
                        >
                            <ChevronDown className="h-4 w-4" />
                        </Button>}
                    </div>
                </TableCell>
            ))}
        </React.Fragment>
    )
}