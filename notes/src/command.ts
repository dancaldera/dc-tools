import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import {
  create_note_handler,
  get_all_notes_handler,
  get_note_by_id_handler,
  remove_note_handler,
  update_note_handler,
} from "./handler";

yargs(hideBin(process.argv))
  .command("ls", "List all notes", () => get_all_notes_handler())
  .command(
    "get <note_id>",
    "Get a note by id",
    (yargs) =>
      yargs.positional("note_id", {
        description: "The id of the note",
        type: "number",
      }),
    (argv) => get_note_by_id_handler(argv.note_id as number),
  )
  .command(
    "new <note>",
    "Creates a new Note",
    (yargs) =>
      yargs.positional("note", {
        description: "The content of the note",
        type: "string",
      }),
    (argv) => create_note_handler(argv.note as string),
  )
  .command(
    "rm <note_id>",
    "Removes a note",
    (yargs) =>
      yargs.positional("note_id", {
        description: "The id of the note",
        type: "number",
      }),
    (argv) => remove_note_handler(argv.note_id as number),
  )
  .command(
    "put <note_id> <note>",
    "Updates a note",
    (yargs) =>
      yargs
        .positional("note_id", {
          description: "The id of the note",
          type: "number",
        })
        .positional("note", {
          description: "The content of the note",
          type: "string",
        }),
    (argv) => update_note_handler(argv.note_id as number, argv.note as string),
  )
  .parse();
