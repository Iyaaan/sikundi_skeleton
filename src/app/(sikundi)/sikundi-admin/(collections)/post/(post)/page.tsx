import React, { Suspense } from 'react'
import Loading from '@sikundi/app/(sikundi)/sikundi-admin/(collections)/post/(post)/loading'
import { DataTableDemo } from '@sikundi/app/(sikundi)/sikundi-admin/_components/DataTable'
import { notFound } from 'next/navigation'
export const dynamic = "force-dynamic"

interface Props {
    params: {}
    searchParams: { 
        [name:string]: string
    }
}

export default async function page({params, searchParams}: Props) {
    return (
        <Suspense key={JSON.stringify(searchParams) + params} fallback={<Loading />} >
            <List getData={invoices} />
        </Suspense>
    )
}

async function List({getData}: {getData: () => Promise<{ [name:string]: string }[]>}) {
    const data = await getData()

    return (
        <div className='relative overflow-x-auto max-w-[calc(100vw-16px-16px)]'>
            <DataTableDemo data={data} />
        </div>
    )
}

const invoices = async () => {
    await new Promise(r => setTimeout(r, 2000))
    // notFound()
    return [
        {
            id: "1",
            title: "Paid",
            totalAmount: "$250.00",
            paymentMethod: "Credit Card",
        },
        {
            id: "2",
            title: "Pending",
            totalAmount: "$150.00",
            paymentMethod: "PayPal",
        },
        {
            id: "3",
            title: "Unpaid",
            totalAmount: "$350.00",
            paymentMethod: "Bank Transfer",
        },
        {
            id: "3",
            title: "Paid",
            totalAmount: "$450.00",
            paymentMethod: "Credit Card",
        },
        {
            id: "4",
            title: "Paid",
            totalAmount: "$550.00",
            paymentMethod: "PayPal",
        },
        {
            id: "5",
            title: "Pending",
            totalAmount: "$200.00",
            paymentMethod: "Bank Transfer",
        },
        {
            id: "6",
            title: "Unpaid",
            totalAmount: "$300.00",
            paymentMethod: "Credit Card",
        },
    ];
}