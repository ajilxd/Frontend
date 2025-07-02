import data from "@emoji-mart/data";

interface EmojiPickerProps {
  onChange: (value: string) => void;
}

import { SmileIcon } from "lucide-react";
import Picker from "@emoji-mart/react";

import {
  PopoverContent,
  PopoverTrigger,
  Popover,
} from "@/components/ui/popover";

export const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <SmileIcon className="h-5 w-5 text-muted-foreground hover:text-foreground transition" />
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <Picker
          emojiSize={18}
          data={data}
          maxFrequentRows={1}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  );
};
