import { generateQuestions } from "@/lib/openAI";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    //upload file here
  } catch (error) {
    return NextResponse.json(
      { error: "Error in uploading file." },
      { status: 500 }
    );
  }

  try {
    generateQuestions("test");
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate questions." },
      { status: 500 }
    );
  }
}
