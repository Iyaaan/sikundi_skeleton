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
        <div className="rounded-md border">
            <Table>
                <TableHeader className="bg-secondary">
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
                        <TableRow key={index}>
                            {Object.entries(row).map(([key, value], subIndex) => key !== "href" && (
                                <TableCell key={subIndex} className="p-0">
                                    <Link href={row?.href || ""} className="p-4 block">{value}</Link>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
