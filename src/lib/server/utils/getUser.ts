import { User } from '@prisma/client'
import * as jose from 'jose'
import { cookies } from "next/headers"
import { prisma } from "@sikundi/lib/server/utils/prisma"
import { redis } from "@sikundi/lib/server/utils/redis"

interface payloadType extends jose.JWTPayload, Omit<User, 'password'> {

}

export interface UserType extends jose.JWTVerifyResult {
    payload: payloadType
}

export default async function getUser():Promise<Omit<User, 'password'> | null> {
    try {
        const token = cookies().get('token')
        // @ts-ignore
        const user:UserType|null = await jose.jwtVerify(String(token?.value), new TextEncoder().encode(`${process.env.ACCESS_TOKEN_SECRET}`), {
            issuer: `${process.env.SITE_NAME}`,
            audience: `${process.env.SITE_NAME}/sikundi-admin`,
            algorithms: ["HS256"],
        })

        // @ts-ignore
        return (await prisma.user.findUnique({
            select: {
                id: true,
                userName: true,
                userNameEn: true,
                email: true,
                status: true,
                roleId: true
            },
            where: {
                id: user?.payload.id,
                status: "active"
            }
        }))

    } catch (error) {
        return null
    }
}