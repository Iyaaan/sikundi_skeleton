import { prisma } from "@sikundi/lib/server/utils/prisma"

const roles = [
    {
        name: "Admin",
        permissions: {
            
        }
    },
    {
        name: "Editor",
        permissions: {

        }
    },
    {
        name: "Author",
        permissions: {

        }
    }
]

export default async function seed() {
    await Promise.all([roles.forEach(async (role) => console.table(await prisma.role.upsert({
        // @ts-ignore
        create: role,
        // @ts-ignore
        update: role,
        where: {
            name: role.name
        }
    })))])

    console.log("Roles Seeded!")
}