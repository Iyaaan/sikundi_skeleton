import { Button } from '@sikundi/components/ui/button'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export default function Paginator({ current, total, searchParams, url, className }:{current: number, searchParams: {[name:string]: string}, total: number, url: string, className?: string}) {
    return (
        <div className={twMerge("flex items-center space-x-2 lg:justify-end", className)}>
            <Button
                variant="outline"
                className="h-8 w-8 p-0 flex"
                asChild
            >
                <Link href={{
                    pathname: url,
                    query: {
                        ...searchParams,
                        page: 1
                    }
                }}>
                    <span className="sr-only">Go to first page</span>
                    <ChevronsLeft className="h-4 w-4" />
                </Link>
            </Button>
            <Button
                variant="outline"
                className="h-8 w-8 p-0"
                asChild
            >
                <Link href={{
                    pathname: url,
                    query: {
                        ...searchParams,
                        page: (current - 1) > 0 ? (current - 1) : 1
                    }
                }}>
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeft className="h-4 w-4" />
                </Link>
            </Button>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium flex-1 lg:flex-none">
                {`Page ${current} of ${total}`}
            </div>
            <Button
                variant="outline"
                className="h-8 w-8 p-0"
            
                asChild
            >
                <Link href={{
                    pathname: url,
                    query: {
                        ...searchParams,
                        page: (current + 1) < total ? (current + 1) : total
                    }
                }}>
                    <span className="sr-only">Go to next page</span>
                    <ChevronRight className="h-4 w-4" />
                </Link>
            </Button>
            <Button
                variant="outline"
                className="h-8 w-8 p-0 flex"
            
                asChild
            >
                <Link href={{
                    pathname: url,
                    query: {
                        ...searchParams,
                        page: total
                    }
                }}>
                    <span className="sr-only">Go to last page</span>
                    <ChevronsRight className="h-4 w-4" />
                </Link>
            </Button>
        </div>
    )
}
