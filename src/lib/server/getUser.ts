import * as jose from 'jose'
import { cookies } from "next/headers"

export default async function getUser() {
    try {
        const token = cookies().get('token')
        const user = await jose.jwtVerify(String(token?.value), new TextEncoder().encode(`${process.env.ACCESS_TOKEN_SECRET}`), {
            issuer: `${process.env.SITE_NAME}`,
            audience: `${process.env.SITE_NAME}/sikundi-admin`,
            algorithms: ["HS256"],
        })
        
        return user
    } catch (error) {
        return null
    }
}