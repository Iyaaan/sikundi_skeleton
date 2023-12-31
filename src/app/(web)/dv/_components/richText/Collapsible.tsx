"use client"

import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import RichText from './RichText'

export default function Collapsible({name, children, open, className}: {name: any, children: any, open: boolean, className: string}) {
    const [active, setActive] = useState(open)
    return (
        <div className={twMerge('bg-web-accent-sub-dark mb-4 shadow-sm border-web-accent border rounded-md', className)}>
            <button onClick={()=>setActive((a)=>!a)}>
                <RichText>{name?.children}</RichText>
            </button>
            {active && <div>
                <RichText>{children?.children?.[0]?.children}</RichText>
            </div>}
        </div>
    )
}
