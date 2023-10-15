import { type NextRequest } from 'next/server'
import { redirect } from 'next/navigation'

export async function POST(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('action')

    if (query === "lostpassword") {
        redirect("/sikundi-login?action=otpverification")
    }
    if (query === "otpverification") {
        redirect("/sikundi-login?action=passwordupdate")
    }
    if (query === "passwordupdate") {
        redirect("/sikundi-login")
    }

    redirect("/sikundi-admin")
}