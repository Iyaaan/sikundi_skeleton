import roles from '@sikundi/seeders/roles'
import users from '@sikundi/seeders/users'

export default function seed() {
    try {
        roles()
        users()
        console.log("successfully seeded")
    } catch (error) {
        console.log(error)
        console.error("error at seeding")
    }
}