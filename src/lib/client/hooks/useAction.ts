import { toast } from "@sikundi/components/ui/use-toast"
import { customResponse } from "@sikundi/lib/server/utils/ErrorHandler"
import { useCallback, useState } from "react"
import { zodErrorGenerator } from "../utils"
import useCsrfStore from "@sikundi/stores/useCsrfStore"
export default function useAction<OUTPUT>(action: (data:any) => Promise<customResponse<OUTPUT>>, options: OPTIONS<customResponse<OUTPUT>>) {
    const [error, setError] = useState<customResponse<OUTPUT> | undefined>(undefined)
    const [data, setData] = useState<customResponse<OUTPUT> | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    
    const execute = useCallback(async (input: any) => {
        setIsLoading(true)
        
        try {
            const result = await action(input)
            if (!result) return
    
            if ((result?.notification && !options.disableSuccessNotification) || (result?.notification && !options.disableErrorNotification)) {
                toast({
                    ...result?.notification,
                    duration: 1000
                })
            }
            
            if (result?.error) {
                setError({
                    error: result?.error
                })
                options.onError?.({
                    error: result.error
                })
                if(error?.error?.name === "Validation Error" && options?.onValidationError) {
                    // @ts-ignore
                    zodErrorGenerator(error.error, (data) => options?.onValidationError?.(data))
                }
            } else {
                setData({
                    data: result?.data
                })
                options.onSuccess?.({
                    data: result?.data
                })
            }
            
        } catch (e:any) {
            setError({
                error: e?.error
            })
            options.onError?.({
                error: e?.error
            })
            toast({
                title: "undefined error",
                description: "check with sys admin",
                variant: "destructive",
                ...e?.notification
            })
        } finally {
            setIsLoading(false)
        }
    }, [action, options, error?.error])

    return {
        execute,
        error,
        data,
        isLoading
    }
}

interface OPTIONS<OUTPUT> {
    onSuccess?: (data:OUTPUT) => void,
    onError?: (error:OUTPUT) => void,
    onValidationError?: (data: {field:string, message: string}) => void,
    disableSuccessNotification?: boolean,
    disableErrorNotification?: boolean
}