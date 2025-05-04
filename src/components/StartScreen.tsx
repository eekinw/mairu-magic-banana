import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { wordFormSchema } from "@/lib/validation";

type StartScreenProps = {
  initialWord: string;
  setInitialWord: (word: string) => void;
  handleStartGame: (word: string) => void;
};

const StartScreen = ({
  initialWord,
  setInitialWord,
  handleStartGame,
}: StartScreenProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<{ word: string }>({
    resolver: zodResolver(wordFormSchema),
    mode: "onChange",
    defaultValues: { word: initialWord },
  });

  const watchedWord = watch("word");
  useEffect(() => {
    setInitialWord(watchedWord);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedWord]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit((data) => handleStartGame(data.word))}
        className="flex flex-col items-center w-full max-w-md"
      >
        <div className="relative w-full">
          <input
            type="text"
            {...register("word")}
            placeholder="例：バナナ🍌"
            className={`p-3 pr-12 border rounded-md w-full text-lg ${
              errors.word ? "border-red-500" : ""
            }`}
            required
            autoComplete="off"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl text-yellow-500 hover:text-yellow-600"
            disabled={!isValid}
          >
            ▶
          </button>
        </div>
        {errors.word && (
          <div className="text-red-500 text-sm mt-2 w-full text-center">
            {errors.word.message as string}
          </div>
        )}
      </form>
    </div>
  );
};

export default StartScreen;
