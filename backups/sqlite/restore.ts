// https://soshace.com/automated-postgresql-backups-with-nodejs-and-bash/
// This is a simple script to restore a SQlite database
// By Daniel Caldera
// restore.ts

import fs from "fs";
import { $ } from "bun";

const db_path = process.env.DB_PATH;

const args = process.argv.slice(2);

async function restore() {
  const compressedBackupFile = args[0];
  const newFilename = args[1];
  if (!compressedBackupFile) {
    console.log("No backup file provided");
    return 1;
  } else if (!newFilename) {
    console.log("No new filename provided");
    return 1;
  }
  const data = fs.readFileSync(compressedBackupFile);
  const decompressed = Bun.gunzipSync(data);

  fs.writeFileSync(newFilename, decompressed);

  await $`mv ${newFilename} ${db_path + "/" + newFilename}`;

  console.log("Restored");
}

restore();
