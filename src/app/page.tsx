"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

const sampleQuiz = [
  { question: "Q1", choices: ["C1", "C2", "C3"], answer: 2 },
  { question: "Q2", choices: ["C1", "C2", "C3"], answer: 2 },
  { question: "Q3", choices: ["C1", "C2", "C3"], answer: 2 },
  { question: "Q4", choices: ["C1", "C2", "C3"], answer: 2 },
  { question: "Q5", choices: ["C1", "C2", "C3"], answer: 2 },
];

type QuizAnswers = Record<number, number>;

export default function Home() {
  const [questions, setQuestions] = useState(sampleQuiz);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState("");

  //store the answers of the user in a hashmap
  const handleChoiceChange = (qIndex: number, choice: number) => {
    if (!submitted) {
      setAnswers({ ...answers, [qIndex]: choice });
    }
  };

  //check the answers of the user and compute the score
  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });
    setScore(`${correct} / ${questions.length}`);
    setSubmitted(true);
  };

  const resetQuiz = () => {
    setAnswers({});
    setScore("");
    setSubmitted(false);
  };

  const resetAll = () => {
    setAnswers({});
    setScore("");
    setSubmitted(false);
    setQuestions([]);
  };

  const allAnswered =
    questions.length > 0 && Object.keys(answers).length === questions.length;

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
            <Input className="mb-4 cursor-pointer" type="file" />
            <Button className="cursor-pointer">Generate Quiz</Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <div className="py-20 space-y-4">
      {questions.map((q, qIndex) => {
        const isCorrect = answers[qIndex] === q.answer;
        const cardBorder = submitted
          ? isCorrect
            ? "border-green-500"
            : "border-red-500"
          : "border-gray-200";

        return (
          <Card key={qIndex} className={`border-2 ${cardBorder}`}>
            <CardContent className="p-4">
              <p className="font-semibold mb-4">
                {qIndex + 1}. {q.question}
              </p>
              <RadioGroup
                value={
                  answers[qIndex] !== undefined
                    ? answers[qIndex].toString()
                    : ""
                }
                onValueChange={(val) =>
                  handleChoiceChange(qIndex, parseInt(val))
                }
                className="space-y-2"
                disabled={submitted}
              >
                {q.choices.map((choice, cIndex) => {
                  const isCorrectChoice = cIndex === q.answer;
                  const isUserChoice = answers[qIndex] === cIndex;
                  const choiceClass = submitted
                    ? isCorrectChoice
                      ? "text-green-600 font-bold"
                      : isUserChoice
                      ? "text-red-600"
                      : ""
                    : "";
                  return (
                    <div
                      key={`c-${cIndex}`}
                      className={`flex items-center space-x-2 ${choiceClass}`}
                    >
                      <RadioGroupItem
                        value={cIndex.toString()}
                        id={`q${qIndex}-c${cIndex}`}
                      />
                      <Label htmlFor={`q${qIndex}-c${cIndex}`}>{choice}</Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </CardContent>
          </Card>
        );
      })}
      <div className="flex flex-wrap gap-4 mt-6 items-center">
        <Button onClick={handleSubmit} disabled={submitted || !allAnswered}>
          Submit Quiz
        </Button>
        {submitted && (
          <>
            <Button variant="outline" onClick={resetQuiz}>
              Take Quiz Again
            </Button>
            <Button variant="secondary" onClick={resetAll}>
              Upload New File
            </Button>
          </>
        )}
      </div>
      {score && <p className="mt-2 font-bold">Your Score: {score}</p>}
    </div>
  );
}
