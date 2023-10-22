import { Skeleton } from "@sikundi/components/ui/skeleton"
import { Fragment } from "react"

export default function Loading() {
    return (
        <Fragment>
            <Skeleton className="w-full h-20 mb-4" />
            <Skeleton className="w-full h-20 mb-4" />
            <Skeleton className="w-full h-20" />
        </Fragment>
    )
}