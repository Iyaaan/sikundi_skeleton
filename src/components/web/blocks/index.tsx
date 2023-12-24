'use client'

import React, { Fragment } from 'react'
import Paragraph from "@sikundi/components/web/blocks/Paragraph"
import Heading from "@sikundi/components/web/blocks/Heading"
import Quote from "@sikundi/components/web/blocks/Quote"
import Tweet from "@sikundi/components/web/blocks/Tweet"
import Youtube from "@sikundi/components/web/blocks/Youtube"
import Facebook from "@sikundi/components/web/blocks/Facebook"
import Collapsible from "@sikundi/components/web/blocks/Collapsible"
import RichText from "@sikundi/components/web/blocks/RichText"
import List from "@sikundi/components/web/blocks/List"

export default function index({ block, className }: { block: any, className?: string }) {
    if(block?.type === "paragraph") return <Paragraph style={{
        paddingRight: block?.direction === "ltr" ? (block?.indent*16) : "",
        paddingLeft: block?.direction === "rtl" ? (block?.indent*16) : "",
        textAlign: block?.format
    }}>
        <RichText className={className}>{block?.children}</RichText>
    </Paragraph>
    
    // @ts-ignore
    if(block?.type === "heading") return <Heading level={parseInt(block?.tag?.replace("h", ""))} style={{
        paddingRight: block?.direction === "ltr" ? (block?.indent*16) : "",
        paddingLeft: block?.direction === "rtl" ? (block?.indent*16) : "",
        textAlign: block?.format
    }}>
        <RichText className={className}>{block?.children}</RichText>  
    </Heading>
    if(block?.type === "list") return <List type={block?.listType}>
        {block?.children}
    </List>
    if(block?.type === "quote") return <Quote>{
        <RichText className={className}>{block?.children}</RichText> 
    }</Quote>
    if(block?.type === "horizontalrule" || block?.type === "page-break") return <hr className="h-[2px] bg-web-tertiary text-web-tertiary mb-8" />
    if(block?.type === "layout-container") return <div className="flex">
        {
            block?.children?.map((text:any, index:any) => {
                return <Fragment key={index}>{text.children?.map((t:any, index:any) => {
                    return <Paragraph key={index} className="border flex-1 p-4">{t?.children?.map(({text}:any, index:any) => {
                        return <Fragment key={index}>{text}</Fragment>
                    })}</Paragraph>
                })}</Fragment>
            })    
        }
    </div>
    if(block?.type === "tweet") return <Tweet id={block?.id} />
        
    if(block?.type === "youtube") return <Youtube id={block?.videoID} />
    if(block?.type === "facebook") return <Facebook id={block.postID} />
    if(block?.type === "collapsible-container") return <Collapsible name={block?.children?.[0]} open={false}>
        {block?.children?.[1]}
    </Collapsible>
}
