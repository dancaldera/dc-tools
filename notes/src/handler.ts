import {
  create_new_note,
  get_all_notes,
  get_note_by_id,
  remove_note_by_id,
  update_note_by_id,
} from "./db";

export function create_note_handler(note: string) {
  try {
    create_new_note(note);
    console.log(`${note} added successfully`);
  } catch (err) {
    console.error(err);
    console.error("Oops, Error!");
  }
}

export function get_all_notes_handler() {
  try {
    const notes = get_all_notes();
    notes.forEach((note: any) => {
      console.log(`${note.note_id}. ${note.note}`);
    });
  } catch (err) {
    console.error(err);
    console.error("Oops, Error!");
  }
}

export function get_note_by_id_handler(note_id: number) {
  try {
    const note: any = get_note_by_id(note_id);
    console.log(
      `${note.note_id}. ${note.note} - created at ${note.created_at}, updated at ${note.updated_at}`,
    );
  } catch (err) {
    console.error(err);
    console.error("Oops, Error!");
  }
}

export function remove_note_handler(note_id: number) {
  try {
    remove_note_by_id(note_id);
    console.log(`Note with id ${note_id} removed successfully`);
  } catch (err) {
    console.error(err);
    console.error("Oops, Error!");
  }
}

export function update_note_handler(note_id: number, note: string) {
  try {
    update_note_by_id(note_id, note);
    console.log(`Note with id ${note_id} updated successfully`);
  } catch (err) {
    console.error(err);
    console.error("Oops, Error!");
  }
}
