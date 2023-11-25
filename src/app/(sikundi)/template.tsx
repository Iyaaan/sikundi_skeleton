"use client"

import React, { Fragment, ReactNode, useEffect } from 'react'
import * as NProgress from 'nprogress'
import { useParams, usePathname, useRouter } from 'next/navigation';

export default function Template({children}: {children:ReactNode}) {
    const pathname = usePathname()
    const router = useRouter()
    const params = useParams()

    useEffect(() => {
        NProgress.done();
    }, [pathname, router, params]);

    return (
        <Fragment>
            {children}
        </Fragment>
    )
}
