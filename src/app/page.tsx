"use client";

import { useState, useEffect } from "react";
import { wordFormSchema } from "@/lib/validation";
import StartScreen from "@/components/StartScreen";
import GameScreen from "@/components/GameScreen";
import Header from "@/components/Header";

export default function Home() {
  const [initialWord, setInitialWord] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialWord) {
      setError(null);
      return;
    }
    const result = wordFormSchema.safeParse(initialWord);
    if (!result.success) {
      setError(result.error.errors[0].message);
    } else {
      setError(null);
    }
  }, [initialWord]);

  const handleStartGame = (word: string) => {
    setInitialWord(word);
    setGameStarted(true);
  };

  const resetGame = () => {
    setInitialWord("");
    setError(null);
    setGameStarted(false);
  };

  if (!gameStarted) {
    return (
      <>
        <Header onTitleClick={resetGame} />
        <div className="flex-1 flex items-center justify-center">
          <StartScreen
            initialWord={initialWord}
            setInitialWord={setInitialWord}
            handleStartGame={handleStartGame}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Header onTitleClick={resetGame} />
      <GameScreen initialWord={initialWord} resetGame={resetGame} />
    </>
  );
}
