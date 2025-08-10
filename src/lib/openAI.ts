import OpenAI from "openai";

export const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateQuestions = async (text: string) => {
  //fix prompt, and output format. For now we restrict this to 5 multiple choice questions only
  const response = await client.responses.create({
    model: "gpt-5-mini",
    input: "Write a one-sentence bedtime story about a unicorn.",
  });

  console.log(response.output_text);
};
