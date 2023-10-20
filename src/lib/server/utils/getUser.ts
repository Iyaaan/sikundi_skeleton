import { User } from '@prisma/client'
import * as jose from 'jose'
import { cookies } from "next/headers"

interface payloadType extends jose.JWTPayload, Omit<User, 'password'> {

}
interface UserType extends jose.JWTVerifyResult {
    payload: payloadType
}

export default async function getUser():Promise<UserType | null> {
    try {
        const token = cookies().get('token')
        // @ts-ignore
        return (await jose.jwtVerify(String(token?.value), new TextEncoder().encode(`${process.env.ACCESS_TOKEN_SECRET}`), {
            issuer: `${process.env.SITE_NAME}`,
            audience: `${process.env.SITE_NAME}/sikundi-admin`,
            algorithms: ["HS256"],
        }))
    } catch (error) {
        return null
    }
}