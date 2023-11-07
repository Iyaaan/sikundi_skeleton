import { toast } from "@sikundi/components/ui/use-toast"
import { response } from "@sikundi/lib/server/utils/ErrorHandler"
import { useCallback, useState } from "react"
import { zodErrorGenerator } from "../utils"

export default function useAction<OUTPUT>(action: (data:unknown) => Promise<response<OUTPUT>>, options: OPTIONS<response<OUTPUT>>) {
    const [error, setError] = useState<response<OUTPUT> | undefined>(undefined)
    const [data, setData] = useState<response<OUTPUT> | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const execute = useCallback(() => {
        async (input: unknown) => {
            setIsLoading(true)
            
            try {
                const result = await action(input)
                if (!result) return
        
                if (result?.notification) {
                    toast(result?.notification)
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
                }

                if (result?.data) {
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
        }
    }, [action, options])

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