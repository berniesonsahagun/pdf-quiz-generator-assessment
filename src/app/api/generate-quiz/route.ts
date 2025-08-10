import { buildCompactContext, compressPage } from "@/lib/compress";
import { generateQuestions } from "@/lib/openAI";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { text } = body;
  const compressedPages = compressPage(text);
  const context = buildCompactContext(compressedPages);

  try {
    const questions = await generateQuestions(context);
    return NextResponse.json({ questions }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error in generating questions." },
      { status: 500 }
    );
  }
}
