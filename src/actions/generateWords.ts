"use server";

import axios from "axios";

export async function generateWords(word: string): Promise<string[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("API Key is not set!");

  const prompt = `
あなたはマジカルバナナのプレイヤーです。「${word}」という単語から連想される単語を2, 3個返してください。
形式は以下の通りで、JSONのみを出力してください（「\`\`\`json」などのアノテーションは不要です）。

{
  result: [ "単語1", "単語2", "単語3" ]
}
`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const response = await axios.post(
    url,
    {
      contents: [{ parts: [{ text: prompt }] }],
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  try {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON found in Gemini response");
    const json = JSON.parse(match[0]);
    if (Array.isArray(json.result)) {
      return json.result.map((w: string) => w.trim()).filter(Boolean);
    }
    throw new Error("No result array in Gemini response");
  } catch (error) {
    throw new Error("Failed to parse Gemini response: " + error);
  }
}