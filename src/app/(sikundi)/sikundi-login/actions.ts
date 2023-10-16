"use server"

import { cookies } from "next/headers"

export async function CreateUser(formData: FormData) {
    await new Promise(r => setTimeout(r, 2000));
    return {
        error: {
            title: "Auth error",
            description: "Please try again in a few minutes"
        }
    }
}