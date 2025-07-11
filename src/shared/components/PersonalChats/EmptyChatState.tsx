
import { MessageCircle } from 'lucide-react';

const EmptyChatState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8 text-center bg-background">
      <div className="mb-6 relative">
      
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4 mx-auto border border-border">
          <MessageCircle className="w-12 h-12 text-muted-foreground" />
        </div>

        <div className="absolute -top-2 -right-2 w-6 h-6 bg-muted/60 rounded-full flex items-center justify-center border border-border">
          <MessageCircle className="w-3 h-3 text-muted-foreground/60" />
        </div>
        <div className="absolute -bottom-1 -left-3 w-4 h-4 bg-muted/60 rounded-full flex items-center justify-center border border-border">
          <MessageCircle className="w-2 h-2 text-muted-foreground/60" />
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold text-foreground mb-2">
        No chats yet
      </h2>
      
      <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
        Select a chat from the sidebar to start messaging, or create a new conversation to get started.
      </p>
      
     
    </div>
  );
};

export default EmptyChatState;