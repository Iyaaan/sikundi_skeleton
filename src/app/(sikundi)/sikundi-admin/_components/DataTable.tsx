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

export function DataTableDemo({data}: {data: {[name:string]: string}[]}) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        {Object.keys(data[0]).map((key) => (
                            <TableHead key={key}>
                                {key}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((invoice, index) => (
                        <TableRow key={index}>
                            {Object.values(invoice).map((value, subIndex) => (
                                <TableCell key={subIndex}>{value}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
