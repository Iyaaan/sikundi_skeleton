import axios from 'axios'

export async function PostHandler<T>(url: string, { arg }: { arg: any }) {
    try {
        const csrf = document.getElementById("csrf-token")?.textContent
        axios.defaults.headers.common = {
            "X-CSRF-Token": csrf
        }
        return await axios.post<T>(url, arg)
    } catch (error) {
        throw error
    }
}