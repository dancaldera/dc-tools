import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { create_response } from "./handler";

yargs(hideBin(process.argv))
  .command(
    "new <content>",
    "Creates a new Response",
    (yargs) =>
      yargs.positional("content", {
        description: "The content of the response",
        type: "string",
      }),
    (argv) => create_response(argv.content as string),
  )
  .parse();
