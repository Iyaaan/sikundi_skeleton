import { prisma } from "@sikundi/lib/server/utils/prisma"
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
    },
    {
        userName: "ޢާލިމް އަބްދުއްލަތީފް",
        email: "aalimabdullatheef133@gmail.com",
        password: "aalimabdullatheef133@sikundi",
        description: "I dont care",
        status: "active",
        role: {
            connect: {
                name: "Editor"
            }
        }
    },
    {
        userName: "އިބްރާހިމް ޝަމްވީލް",
        email: "ibrahimshamwyl@gmail.com",
        password: "ibrahimshamwyl@sikundi",
        description: "I dont care",
        status: "active",
        role: {
            connect: {
                name: "Editor"
            }
        }
    },
    {
        userName: "މުއާވިޔަތު އަންވަރު",
        email: "muaviathz@gmail.com",
        password: "muaviathz@sikundi",
        description: "I dont care",
        status: "active",
        role: {
            connect: {
                name: "Editor"
            }
        }
    },
    {
        userName: "މުހައްމަދު ޔަމީން",
        email: "mohamedyameen590@gmail.com",
        password: "Yameen@123",
        description: "Gadha Lhaaeh",
        status: "active",
        role: {
            connect: {
                name: "Editor"
            }
        }
    },
    {
        userName: "ހުސައިން އަހްމަދު",
        email: "comphusen2340@gmail.com",
        password: "hussain@sikundi",
        description: "CEO of gaafu",
        status: "active",
        role: {
            connect: {
                name: "Editor"
            }
        }
    },
    {
        userName: "އަހްމަދު ސަދޫފް",
        email: "sadhoofmoosa@gmail.com",
        password: "shadhoof@sikundi",
        description: "Journalist tester",
        status: "active",
        role: {
            connect: {
                name: "Editor"
            }
        }
    },
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