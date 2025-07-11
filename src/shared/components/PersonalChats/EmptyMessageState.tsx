import { MessageSquare, Send } from 'lucide-react';

const EmptyMessagesState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8 text-center ">
      <div className="mb-6 relative">
        {/* Main message bubble */}
        <div className="w-24 h-24  rounded-2xl flex items-center justify-center mb-4 mx-auto border border-border shadow-sm">
          <MessageSquare className="w-12 h-12 text-muted-foreground" />
        </div>
        
        {/* Send icon floating */}
        <div className="absolute -top-1 -right-1 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
          <Send className="w-4 h-4 text-primary" />
        </div>
        
        {/* Dots indicating waiting */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold text-foreground mb-2">
        No messages yet
      </h2>
      
      <p className="text-muted-foreground max-w-md mx-auto leading-relaxed mb-6">
        Start the conversation by sending your first message. Say hello, ask a question, or share what's on your mind.
      </p>
      
 
    </div>
  );
};

export default EmptyMessagesState;