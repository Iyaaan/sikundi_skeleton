import roles from '@sikundi/seeders/roles'
import users from '@sikundi/seeders/users'

export default async function seed() {
    try {
        console.log("seeding start")
        await Promise.all([roles(), users()])
        console.log("successfully seeded")
    } catch (error) {
        console.log(error)
        console.error("error at seeding")
    }
}