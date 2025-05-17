import * as React from "react";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChatInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  updateMessageHandler?: (value: string) => void;

  typingHandler: (data: boolean) => void;
  textAreaRef: React.RefObject<HTMLTextAreaElement | null>;
}

export const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({
    typingHandler,
    textAreaRef,
    updateMessageHandler,
    className,
    ...props
  }) => (
    <Textarea
      autoComplete="off"
      name="message"
      ref={textAreaRef}
      onChange={(e) => {
        props.onChange?.(e);

        typingHandler(true);

        updateMessageHandler?.(e.target.value);
      }}
      className={cn(
        "max-h-12 px-4 py-3 bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-md flex items-center h-16 resize-none",
        className
      )}
      {...props}
    />
  )
);
