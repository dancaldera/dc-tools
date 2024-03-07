// Using Bun Version 1.0.25
// change-pg-password.ts
// Change the password of a PostgreSQL user
// Developed by Daniel Caldera
import { $ } from 'bun'

const main = async () => {
  const password = process.argv[2]
  const db = process.env.DATABASE_URL // DATABASE_URL is an environment variable
  // wich contains the connection string of the database to be used
  // Example: postgres://user:password@localhost:5432/dbname
  const user = db?.split('://')[1].split(':')[0] // Extract the username from the connection string

  if (!password || !db || !user) {
    console.error('Please provide a username, password and DATABASE_URL')
    process.exit(1)
  }

  console.log('Changing password...')

  await $`psql ${db} -c "ALTER USER "${user}" WITH PASSWORD '${password}'"`

  console.log('Password changed')
}

main()
