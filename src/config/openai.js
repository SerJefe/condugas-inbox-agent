import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function classify(content) {
  const prompt = `
  Eres asistente de bandeja de entrada. Resume y clasifica este contenido:
  ###
  ${content}
  ###
  Devuelve un JSON con: action(responder|delegar|leer_luego|archivar), priority(1-4), title, due (YYYY-MM-DD).
  `;
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" }
  });
  return JSON.parse(completion.choices[0].message.content);
}
