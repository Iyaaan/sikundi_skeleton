import Image from '@sikundi/app/_component/Image'
import Link from 'next/link'
import React, { Fragment } from 'react'
import Paragraph from './Paragraph'

export default function RichText({children}: {children:{
    detail: number,
    format: number,
    mode: string,
    style: string,
    text: string,
    type: string,
    src?: string,
    caption?: any,
    alt?: string,
    version: number,
    url?: string,
    children:{
        detail: number,
        format: number,
        mode: string,
        style: string,
        text: string,
        type: string,
        src?: string,
        caption?: any,
        alt?: string,
        version: number,
        url?: string
    }[]
}[]}) {
    return (
        <Fragment>
            {children?.map((block, index:number) => {
                if(block.type === "text") {
                    if (block.format === 1) return <b key={index} className='font-bold'>{block.text}</b>
                    if (block.format === 2) return <i key={index} className='italic'>{block.text}</i>
                    if (block.format === 8) return <u key={index} className='underline'>{block.text}</u>
                    if (block.format === 4) return <s key={index} className='line-through'>{block.text}</s>
                    if (block.format === 64) return <span key={index} className=' text-xs align-super'>{block.text}</span>
                    if (block.format === 32) return <span key={index} className=' text-xs align-sub'>{block.text}</span>
                    if (block.format === 16) return <code key={index} className='bg-web-accent dark:bg-web-accent-dark text-web-accent-dark dark:text-web-accent-dark px-3 py-1 text-xs'>{block.text}</code>
                }
                if(block.type === "link") {
                    return (
                        <Link href={`${block.url}`} key={index} className='text-web-primary dark:text-web-primary-dark underline font-bold'>
                            {block?.children?.map((block, index:number) => {
                                if(block.type === "text") {
                                    if (block.format === 1) return <b key={index} className='font-bold'>{block.text}</b>
                                    if (block.format === 2) return <i key={index} className='italic'>{block.text}</i>
                                    if (block.format === 8) return <u key={index} className='underline'>{block.text}</u>
                                    if (block.format === 16) return <code key={index} className='bg-web-accent dark:bg-web-accent-dark text-web-accent-dark dark:text-web-accent-dark px-3 py-1 text-xs'>{block.text}</code>
                                }
                                return <Fragment key={index}>{block.text}</Fragment>
                            })}
                        </Link>
                    )
                }
                if(block.type == "image") {
                    return (
                        <span key={index}>
                            <span className='aspect-video w-full bg-web-accent-dark dark:bg-web-accent relative block'>
                                <Image src={`${block.src}`} alt={`${block?.alt}`} fill className='object-cover' cdn={true} />
                            </span>
                            <p className='w-full text-sm mt-2 mb-3'>
                                {block?.caption?.editorState?.root?.children?.[0]?.children?.map((block:any, index:number) => {
                                    if(block.type === "text") {
                                        if (block.format === 1) return <b key={index} className='font-bold'>{block.text}</b>
                                        if (block.format === 2) return <i key={index} className='italic'>{block.text}</i>
                                        if (block.format === 8) return <u key={index} className='underline'>{block.text}</u>
                                        if (block.format === 16) return <code key={index} className='bg-web-accent dark:bg-web-accent-dark text-web-accent-dark dark:text-web-accent-dark px-3 py-1 text-xs'>{block.text}</code>
                                    }
                                    return <Fragment key={index}>{block.text}</Fragment>
                                })}
                            </p>
                        </span>
                    )
                }
                
                return <Fragment key={index}>{block.type}</Fragment>
            })}
        </Fragment>
    )
}
