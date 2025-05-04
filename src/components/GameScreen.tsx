type GameScreenProps = {
  initialWord: string;
  resetGame?: () => void;
};

const GameScreen = ({ initialWord, resetGame }: GameScreenProps) => (
  <div className="flex flex-col h-[80vh]">
    <div className="flex justify-between mb-4">
      <button className="bg-gray-200 p-2 rounded-md cursor-pointer">
        戻る
      </button>
      <button className="bg-gray-200 p-2 rounded-md">進む</button>
    </div>
    <div className="flex-1 border rounded-md">
      {/* Node Behaviour */}
      <div className="h-full flex items-center justify-center">
        <p>React Flow Canvas (Word: {initialWord})</p>
      </div>
    </div>
    {resetGame && (
      <button
        onClick={resetGame}
        className="mt-4 text-blue-600 underline self-center"
      >
        最初からやり直す
      </button>
    )}
  </div>
);

export default GameScreen;
