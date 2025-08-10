"use client";

import Quiz from "@/components/quiz/Quiz";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { parsePDF } from "@/lib/parsePDF";
import { Questions } from "@/types";
import { useState } from "react";

const sampleQuiz = [
  { question: "Q1", choices: ["C1", "C2", "C3"], answer: 2 },
  { question: "Q2", choices: ["C1", "C2", "C3"], answer: 2 },
  { question: "Q3", choices: ["C1", "C2", "C3"], answer: 2 },
  { question: "Q4", choices: ["C1", "C2", "C3"], answer: 2 },
  { question: "Q5", choices: ["C1", "C2", "C3"], answer: 2 },
];

export default function Home() {
  const [questions, setQuestions] = useState<Questions | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");

  const handleGenerateQuiz = async () => {
    if (!file) return;

    const response = await parsePDF(file);
    if (response.success) {
      setText(response.context!);
    }

    const res = await fetch("http://localhost:3000/api/generate-quiz", {
      method: "POST",
    });
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
  };

  if (!questions) {
    return (
      <section className="flex flex-col justify-center gap-20 w-full h-screen">
        <div>
          <h1 className="text-4xl font-bold text-center mb-4">
            PDF Quiz Generator
          </h1>
          <p className="text-center">
            This is part of the assessment exam for Prostrive
          </p>
        </div>
        <Card className="max-w-[560px] mx-auto">
          <CardHeader>
            <CardTitle>Upload your PDF</CardTitle>
            <CardDescription>
              Upload a PDF and get a quiz generated for you!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              className="mb-4 cursor-pointer"
              type="file"
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
            />
            <Button className="cursor-pointer" onClick={handleGenerateQuiz}>
              Generate Quiz
            </Button>
            {text}
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <div className="py-20 space-y-4">
      <Quiz questions={questions} setQuestions={setQuestions} />
    </div>
  );
}
