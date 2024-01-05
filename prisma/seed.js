const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { Roles, Users } = require('./data.js');
const prisma = new PrismaClient();

const load = async () => {
    try {
        await prisma.role.createMany({
            data: Roles
        })
        console.log("Roles created")
        await prisma.user.createMany({
            data: Users.map((user) => ({
                ...user,
                password: bcrypt.hashSync(user.password, 10),
            }))
        })
        console.log("Users created")
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

load();