"use client"

import React, { Fragment, ReactNode, useEffect } from 'react'
import * as NProgress from 'nprogress'
import { usePathname, useRouter } from 'next/navigation';

export default function template({children}: {children:ReactNode}) {
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        NProgress.done();
    }, [pathname, router]);

    return (
        <Fragment>
            {children}
        </Fragment>
    )
}
