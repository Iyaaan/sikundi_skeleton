import { prisma } from "@sikundi/lib/server/prisma"
import bcrypt from 'bcrypt'

const users = [
    {
        userName: "ހަސަން އިޔާން",
        email: "hassan.iyan.l@gmail.com",
        password: "iyan@sikundi",
        description: "I am the developer of the websote",
        status: "active",
        role: {
            connect: {
                name: "Admin"
            }
        }
    }
]

export default async function seed() {
    await Promise.all([users.forEach(async (user) => console.table(await prisma.user.upsert({
        // @ts-ignore
        create: {...user, password: String(await bcrypt.hash(user.password, 10))},
        // @ts-ignore
        update: {...user, password: String(await bcrypt.hash(user.password, 10))},
        where: {
            email: user.email
        }
    })))])

    console.log("Users Seeded!")
}