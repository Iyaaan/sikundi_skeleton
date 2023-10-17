import axios from 'axios'

export async function PostHandler<T>(url: string, { arg }: { arg: any }) {
    try {
        return await axios.post<T>(url, arg)
    } catch (error) {
        throw error
    }
}