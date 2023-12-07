import { toast } from '@sikundi/components/ui/use-toast'
import { customResponse } from '@sikundi/lib/server/utils/ErrorHandler'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function useRealTime(ping: (data: { id: number }) => Promise<customResponse<any>>, model_key?: number, run: boolean = true) {
    const router = useRouter()
    const [error, setError] = useState(false)

    useEffect(() => {
        if(model_key && run && !error) {
            const fetchData = async () => {
                try {
                    const data = await ping({
                        id: model_key
                    })
                    data?.notification && toast({
                        ...data?.notification,
                        duration: 3000
                    })
                    // @ts-ignore
                    data?.error?.details?.data?.redirect && router.push(data?.error?.details?.data?.redirect)
                    if(data?.error?.details) setError(true)
                    console.log(data)
                } catch (error) {
                    console.log(error)
                }
            }
            const id = setInterval(fetchData, 1000)
            fetchData()
            return () => clearTimeout(id)
        }
    }, [model_key, run, error, ping, router])
}