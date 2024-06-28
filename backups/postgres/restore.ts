// https://soshace.com/automated-postgresql-backups-with-nodejs-and-bash/
// This is a simple script to restore a PostgreSQL database
// By Daniel Caldera
// restore.ts

import fs from "fs";
import { $ } from "bun";

const database_url = process.env.DATABASE_URL;

const args = process.argv.slice(2);

async function restore() {
  const backupFile = args[0];
  if (!backupFile) {
    console.error("Please provide a backup file");
    return;
  }
  const data = fs.readFileSync(backupFile);

  // uncoment the line below to restore if file is not compressed
  await $`psql '${database_url}' < ${data}`;

  console.log("Restored");
}

restore();
