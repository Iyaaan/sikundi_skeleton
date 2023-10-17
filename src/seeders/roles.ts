import { prisma } from "@sikundi/lib/server/prisma"

const roles = [
    {
        name: "Admin",
        permissions: {}
    }
]

export default async function seed() {
    console.table(await Promise.all([roles.forEach(async (role) => prisma.role.upsert({
        // @ts-ignore
        create: role,
        // @ts-ignore
        update: role,
        where: {
            name: role.name
        }
    }))]))

    console.log("Roles Seeded!")
}