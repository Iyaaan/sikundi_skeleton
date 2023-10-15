'use server'
import { redirect } from 'next/navigation'

export async function login() {
    redirect("/sikundi-admin")
}

export async function reset() {
    redirect("/sikundi-login?action=otpverification")
}

export async function otpVerify() {
    redirect("/sikundi-login?action=passwordupdate")
}

export async function passwordUpdate() {
    redirect("/sikundi-login")
}