// https://soshace.com/automated-postgresql-backups-with-nodejs-and-bash/
// This is a simple script to backup a SQlite database
// By Daniel Caldera
// backup.ts

import { $ } from "bun";
import fs from "fs";

const db_path = process.env.DB_PATH;

const args = process.argv.slice(2);

const date = new Date();
const currentDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}.${date.getHours()}.${date.getMinutes()}`;
const backupFile = `sqlite-backup-${currentDate}`;

const backup = async () => {
  const filename = args[0];
  console.log(`Backing up ${filename} to ${backupFile}`);
  await $`cp ${db_path + "/" + filename} ${backupFile}`;
  const compressed = Bun.gzipSync(fs.readFileSync(backupFile));
  fs.writeFileSync(backupFile + ".gz", compressed);

  fs.unlinkSync(backupFile);

  console.log(`Backup created successfully`);
};

backup();
