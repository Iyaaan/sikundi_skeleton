import { Skeleton } from '@sikundi/components/ui/skeleton'
import React, { Fragment } from 'react'

const loading = () => {
    return (
        <Fragment>
            <Skeleton className="w-full h-[450px]" />
        </Fragment>
    )
}

export default loading