"use server"

import { cookies } from "next/headers"

export async function CreateUser(prevState: any, formData: FormData) {
    await new Promise(r => setTimeout(r, 2000));
    return "Hahah keeke dho"
}