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
                            {Object.entries(row).map(([key, value], subIndex) => key !== "href" && (
                                <TableCell key={subIndex} className="p-0 block md:table-cell" data-cell={key}>
                                    <Link href={row?.href || ""} className="md:p-4 grid grid-cols-5 gap-4">
                                        <span className="font-bold md:hidden col-span-2 bg-secondary p-4 text-muted-foreground">{key}</span>
                                        <span className="col-span-3 p-4 md:p-0">{value}</span>
                                    </Link>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
