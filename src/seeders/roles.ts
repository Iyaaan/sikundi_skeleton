import { prisma } from "@sikundi/lib/server/utils/prisma"

const roles = [
    {
        name: "Admin",
        permissions: {
            post: [
                { label: "view", value: "view" },
                { label: "draft", value: "draft" },
                { label: "delete", value: "delete" },
                { label: "soft_delete", value: "soft_delete" },
                { label: "publish", value: "publish" },
                { label: "pending", value: "pending" }
            ],
            category: [
                { label: "view", value: "view" },
                { label: "delete", value: "delete" },
                { label: "create", value: "create" },
                { label: "update", value: "update" }
            ],
            tag: [
                { label: "view", value: "view" },
                { label: "delete", value: "delete" },
                { label: "create", value: "create" },
                { label: "update", value: "update" }
            ],
            library: [
                { label: "view", value: "view" },
                { label: "delete", value: "delete" },
                { label: "create", value: "create" }
            ],
            graphic: [
                { label: "view", value: "view" },
                { label: "draft", value: "draft" },
                { label: "delete", value: "delete" },
                { label: "soft_delete", value: "soft_delete" },
                { label: "publish", value: "publish" },
                { label: "pending", value: "pending" }
            ],
            photo: [
                { label: "view", value: "view" },
                { label: "draft", value: "draft" },
                { label: "delete", value: "delete" },
                { label: "soft_delete", value: "soft_delete" },
                { label: "publish", value: "publish" },
                { label: "pending", value: "pending" }
            ],
            video: [
                { label: "view", value: "view" },
                { label: "draft", value: "draft" },
                { label: "delete", value: "delete" },
                { label: "soft_delete", value: "soft_delete" },
                { label: "publish", value: "publish" },
                { label: "pending", value: "pending" }
            ],
            user: [
                { label: "view", value: "view" },
                { label: "block", value: "block" },
                { label: "create", value: "create" },
                { label: "update", value: "update" }
            ],
            role: [
                { label: "view", value: "view" },
                { label: "delete", value: "delete" },
                { label: "create", value: "create" },
                { label: "update", value: "update" }
            ]
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
    return new Promise(async (resolve, reject) => {
        try {
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
            await new Promise(r => setTimeout(r, 2000));
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}