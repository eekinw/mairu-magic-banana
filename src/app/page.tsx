"use client";

import { useState, useEffect } from "react";
import wordSchema from "@/lib/validation";
import StartScreen from "@/components/StartScreen";
import GameScreen from "@/components/GameScreen";
import Header from "@/components/Header";
import Lottie from "lottie-react";
import bananaAnimation from "@/assets/lotties/banana-animation.json";

export default function Home() {
  const [initialWord, setInitialWord] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!initialWord) {
      setError(null);
      return;
    }
    const result = wordSchema.safeParse(initialWord);
    if (!result.success) {
      setError(result.error.errors[0].message);
    } else {
      setError(null);
    }
  }, [initialWord]);

  const handleStartGame = async (word: string) => {
    setIsLoading(true);
    setInitialWord(word);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 理想的な実装ではないが、ユーザーによりスムーズなゲーム体験を提供するためのアニメーション
    setGameStarted(true);
  };

  const resetGame = () => {
    setInitialWord("");
    setError(null);
    setGameStarted(false);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <Lottie
            animationData={bananaAnimation}
            style={{ width: 150, height: 150 }}
          />
        </div>
      )}
      <Header onTitleClick={resetGame} />
      {gameStarted ? (
        <GameScreen initialWord={initialWord} />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <StartScreen
            initialWord={initialWord}
            setInitialWord={setInitialWord}
            handleStartGame={handleStartGame}
            error={error}
          />
        </div>
      )}
    </>
  );
}
