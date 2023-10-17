import { prisma } from "@sikundi/lib/server/prisma"
import bcrypt from 'bcrypt'

const users = [
    {
        userName: "ހަސަން އިޔާން",
        email: "hassan.iyan.l@gmail.com",
        password: "hassan.iyan.l@gmail.com",
        description: "",
        status: "active"
    }
]

async function seed() {
    try {

        // USERS
        await Promise.all([users.forEach(async (user) => {
            console.table(await prisma.user.upsert({
                create: {
                    userName: user.userName,
                    email: user.email,
                    password: await bcrypt.hash(user.password, 10),
                    description: user.description,
                    status: "active"
                },
                update: {
                    userName: user.userName,
                    email: user.email,
                    password: await bcrypt.hash(user.password, 10),
                    description: user.description,
                    status: "active"
                },
                where: {
                    email: user.email
                }
            }))
        })])
    } catch (error) {
        console.error(error)
    } finally {
        console.log("seeded!!")
    }
}

seed()