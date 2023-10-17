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
