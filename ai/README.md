# ai

You must have dolphin-mistral installed to use this project. You can install it with `ollama run dolphin-mistral`.

To install dependencies:

Create a File named db.sqlite in the root directory of the project.

```bash
bun install
```

To run:

```bash
bun link
bun link ai
```

To use and save a note:

```bash
ai new "Explain this"
```

This project was created using `bun init` in bun v1.0.26. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
