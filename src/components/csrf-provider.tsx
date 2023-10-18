"use client"

import useCsrfStore from '@sikundi/stores/useCsrfStore'
import React, { FC, Fragment, ReactNode } from 'react'
import { useEffectOnce } from 'usehooks-ts'

interface Props {
    token: string
    children: ReactNode
}

const CsrfProvider:FC<Props> = (props) => {
    const { updateCsrf, csrf } = useCsrfStore()
    
    useEffectOnce(() => {
        updateCsrf(props.token)
    })

    return (
        <Fragment>
            <span id='csrf-token' className='hidden'>{csrf}</span>
            {props.children}
        </Fragment>
    )
}

export default CsrfProvider