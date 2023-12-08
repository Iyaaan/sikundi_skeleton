import { prisma } from "@sikundi/lib/server/utils/prisma"
import bcrypt from 'bcrypt'

const users = [
    {
        userName: "ހަސަން އިޔާން",
        userNameEn: "Hassan Iyan",
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
        userNameEn: "Aalim Abdul Latheef",
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
        userName: "ހުސައިން އަހްމަދު",
        userNameEn: "Hussain Ahmed",
        email: "comphusen2340@gmail.com",
        password: "hussain@sikundi",
        description: "CEO of gaafu",
        status: "active",
        role: {
            connect: {
                name: "Admin"
            }
        }
    },
    {
        userName: "އަހްމަދު ސަދޫފް",
        userNameEn: "Ahmed Sadhoof Moosa",
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
    {
        userName: "ދާއިން",
        userNameEn: "Dhaain",
        email: "asneird@gmail.com",
        password: "asneird@sikundi",
        description: "Journalist tester",
        status: "active",
        role: {
            connect: {
                name: "Admin"
            }
        }
    },
]

export default async function seed() {

    return new Promise(async (resolve, reject) => {
        try {
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
            await new Promise(r => setTimeout(r, 2000));
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}