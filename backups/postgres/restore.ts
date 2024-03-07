// https://soshace.com/automated-postgresql-backups-with-nodejs-and-bash/
// This is a simple script to restore a PostgreSQL database
// By Daniel Caldera
// restore.ts

import fs from "fs";
import { $ } from "bun";

const database_url = process.env.DATABASE_URL;

const args = process.argv.slice(2);

async function restore() {
  const compressedBackupFile = args[0];
  if (!compressedBackupFile) {
    console.log("No backup file provided");
    return 1;
  }
  const data = fs.readFileSync(compressedBackupFile);
  const decompressed = Bun.gunzipSync(data);

  await $`psql '${database_url}' < ${decompressed}`;

  console.log("Restored");
}

restore();
