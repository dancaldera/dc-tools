import ollama from "ollama";

export async function create_response(content: string) {
  try {
    const response = await ollama.chat({
      model: "dolphin-mistral",
      stream: true,
      messages: [
        // {
        //   role: "system",
        //   content: "Example",
        // },
        {
          role: "user",
          content,
        },
      ],
    });

    for await (const part of response) {
      process.stdout.write(part.message.content);
    }
  } catch (err) {
    console.error(err);
    console.error("Oops, Error!");
  }
}
