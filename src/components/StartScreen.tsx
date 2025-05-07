import { useForm } from "react-hook-form";
import { useEffect } from "react";

type StartScreenProps = {
  initialWord: string;
  setInitialWord: (word: string) => void;
  handleStartGame: (word: string) => void;
  error: string | null;
};

const StartScreen = ({
  initialWord,
  setInitialWord,
  handleStartGame,
  error,
}: StartScreenProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<{ word: string }>({
    mode: "onChange",
    defaultValues: { word: initialWord },
  });

  const watchedWord = watch("word");
  useEffect(() => {
    setInitialWord(watchedWord);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedWord]);

  return (
    <div className="flex items-center justify-center flex-grow">
      <form
        onSubmit={handleSubmit((data) => handleStartGame(data.word))}
        className="flex flex-col items-center w-full max-w-md"
      >
        <div className="relative max-w-2/3">
          <input
            type="text"
            {...register("word")}
            placeholder="例：バナナ🍌"
            className={`p-3 pr-12 bg-white border-2 rounded-md w-full text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
              errors.word ? "border-red-500 font-bold" : "border-yellow-300"
            }`}
            required
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl text-yellow-500 hover:text-yellow-600"
            disabled={!isValid}
          >
            ▶
          </button>
        </div>
        {(errors.word || error) && (
          <div className="text-red-500 font-bold text-sm mt-2 w-full text-center">
            {(errors.word?.message as string) || error}
          </div>
        )}
      </form>
    </div>
  );
};

export default StartScreen;
