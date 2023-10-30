import React, { Suspense } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@sikundi/components/ui/table"
import Loading from '@sikundi/app/(sikundi)/sikundi-admin/(collections)/post/(post)/loading'
import { Card, CardContent } from '@sikundi/components/ui/card'

interface Props {
    params: {}
    searchParams: { 
        [name:string]: string
    }

}

export default async function page({params, searchParams}: Props) {
    return (
        <Suspense key={JSON.stringify(searchParams)} fallback={<Loading />}>
            <List searchParams={searchParams} />
        </Suspense>
    )
}

export const dynamic = "force-dynamic"


async function List(props: {searchParams: {[name:string]: string}}) {
    await new Promise(r => setTimeout(r, 2000));

    return (
        <Card>
            <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        {Object.keys(invoices[0]).map((key) => (
                            <TableHead key={key}>{key}</TableHead>
                        ))}
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice, index) => (
                            <TableRow key={index}>
                                {Object.values(invoice).map((value, subIndex) => (
                                    <TableCell key={subIndex}>{value}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}



const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
]

