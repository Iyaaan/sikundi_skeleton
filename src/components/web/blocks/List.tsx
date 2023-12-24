import React from 'react'
import RichText from './RichText'

export default function List({type, children}: {type: string, children: any}) {
    if(type == "bullet") {
        return (
            <ol className='list-decimal list-inside'>
                {children?.map((item:any, index:any)=>(
                    <li key={index}>
                        <RichText>{item.children}</RichText>
                    </li>
                ))}
            </ol>
        )
    }
    if(type == "check") {
        return (
            <div>
                {children?.map((item:any, index:any)=>(
                    <div key={index} className='flex gap-2'>
                        <input disabled type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                        <label htmlFor={index}><RichText>{item.children}</RichText></label>
                    </div>
                ))}
            </div>
        )
    }
    return (
        <ul className='list-disc list-inside'>
            {children?.map((item:any, index:any)=>(
                <li key={index}>
                    <RichText>{item.children}</RichText>
                </li>
            ))}
        </ul>
    )
}
