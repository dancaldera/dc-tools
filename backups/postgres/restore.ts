// https://soshace.com/automated-postgresql-backups-with-nodejs-and-bash/
// This is a simple script to restore a PostgreSQL database
// By Daniel Caldera
// restore.ts

import fs from 'fs'
import { $ } from 'bun'

const database_url = process.env.DATABASE_URL

const args = process.argv.slice(2)

async function restore() {
  const compressedBackupFile = args[0]
  if (!compressedBackupFile) {
    console.log('No backup file provided')
    return 1
  }
  const data = fs.readFileSync(compressedBackupFile)

  // comment the line below to restore if file is not compressed
  const decompressed = Bun.gunzipSync(data)

  // uncoment the line below to restore if file is not compressed
  // await $`psql '${database_url}' < ${data}`
  await $`psql '${database_url}' < ${decompressed}`

  console.log('Restored')
}

restore()
