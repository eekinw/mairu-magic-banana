import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type WordSuggestionsProps = {
  words: string[];
  nodeId: string | null;
  onSelect: (word: string) => void;
};

const WordSuggestions = ({ words, nodeId, onSelect }: WordSuggestionsProps) => {
  if (!nodeId || words.length === 0) return null;

  return (
    <Popover open={!!nodeId}>
      <PopoverTrigger asChild>
        <div className="absolute invisible" />
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0" align="start" sideOffset={5}>
        <div className="flex flex-col">
          {words.map((word) => (
            <Button
              key={word}
              variant="ghost"
              className="justify-start font-normal hover:bg-yellow-50 hover:text-yellow-900"
              onClick={() => onSelect(word)}
            >
              {word}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default WordSuggestions;
