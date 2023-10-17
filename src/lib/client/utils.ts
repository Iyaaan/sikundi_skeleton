import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
// @ts-ignore
import hexToHsl from 'hex-to-hsl'
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hexToHslString(hex:string):string {
    let convertedHex = "" 
    hexToHsl(hex)?.map((val:string, index:number)=>{
        convertedHex = `${convertedHex} ${val}${index === 0 ? " " : "%"}`
    })

    return convertedHex
}

interface zodErrorGeneratorParams { 
    name: string, 
    details: { 
        issues: {
            path: string[],
            message: string,
            code: string
        }[]
    } 
}
export function zodErrorGenerator({ name, details }:zodErrorGeneratorParams, callback: (data: {field:string, message: string}) => void) {
    if (name === "Validation Error") {
        details.issues.forEach((issue)=>callback({ 
            field: issue.path[0], 
            message: issue.message || issue.code
        }))
    }
}