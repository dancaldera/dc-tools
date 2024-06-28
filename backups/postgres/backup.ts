// https://soshace.com/automated-postgresql-backups-with-nodejs-and-bash/
// This is a simple script to backup a PostgreSQL database
// By Daniel Caldera
// manual-backup.ts

import { $ } from "bun";

const db = process.env.DATABASE_URL;

const date = new Date();
const currentDate = `${date.getFullYear()}.${
  date.getMonth() + 1
}.${date.getDate()}.${date.getHours()}.${date.getMinutes()}`;
const backupFile = `pg-backup-${currentDate}`;

const backup = async () => {
  await $`pg_dump '${db}' -f ${backupFile}`;

  // TODO: Zip file correctly
  console.log(`Backup created successfully`);
};

backup();
