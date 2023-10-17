import { prisma } from "@sikundi/lib/server/prisma"

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
    console.table(await Promise.all([users.forEach(async (user) => prisma.user.upsert({
        // @ts-ignore
        create: user,
        // @ts-ignore
        update: user,
        where: {
            email: user.email
        }
    }))]))

    console.log("Users Seeded!")
}