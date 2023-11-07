import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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