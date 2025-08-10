import { buildCompactContext, compressPage } from "@/lib/compress";
import { generateQuestions } from "@/lib/openAI";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    //upload file here
  } catch (error) {
    return NextResponse.json(
      { error: "Error in uploading file." },
      { status: 500 }
    );
  }
  const { text } = body;
  const compressedPages = compressPage(text);
  const context = buildCompactContext(compressedPages);
  console.log(context);
}
