import { Database } from "bun:sqlite";

const relativePath = import.meta.url;

const db = new Database(`${relativePath}/../db.sqlite`);
db.exec("PRAGMA journal_mode = WAL;");

export const note_table_query = db.prepare(`CREATE TABLE IF NOT EXISTS note (
  note_id INTEGER PRIMARY KEY AUTOINCREMENT,
  note TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

export function create_new_note(note: string): void {
  console.log("Creating new note");
  const query = db.query(`INSERT INTO note (note) VALUES (?)`);
  query.run(note);
}

export function get_all_notes(): unknown[] {
  const query = db.query(`SELECT * FROM note`);
  const data: unknown[] = query.all();
  return data;
}

export function get_note_by_id(note_id: number): unknown {
  const query = db.query(`SELECT * FROM note WHERE note_id = ?`);
  const data: unknown = query.get(note_id);
  return data;
}

export function remove_note_by_id(note_id: number): void {
  const query = db.query(`DELETE FROM note WHERE note_id = ?`);
  query.run(note_id);
}

export function update_note_by_id(note_id: number, note: string): void {
  const query = db.query(
    `UPDATE note SET note = ?, updated_at = CURRENT_TIMESTAMP WHERE note_id = ?`,
  );
  query.run(note, note_id);
}
