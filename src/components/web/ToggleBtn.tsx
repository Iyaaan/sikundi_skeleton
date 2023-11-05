"use client"

import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {

}

const ToggleBtn = (props: Props) => {
    return (
        <button {...props} className={twMerge([
            "p-4 rounded-xl flex flex-col items-center justify-center hover:scale-95 active:scale-105 transition-all",
            props.className
        ])}>

        </button>
    )
}

export default ToggleBtn