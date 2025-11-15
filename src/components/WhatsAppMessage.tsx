import { CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhatsAppMessageProps {
  from: "agent" | "client";
  content: string;
  timestamp: string;
  isDelivered?: boolean;
}

export const WhatsAppMessage = ({ from, content, timestamp, isDelivered = true }: WhatsAppMessageProps) => {
  const isAgent = from === "agent";
  
  return (
    <div className={cn("flex w-full mb-3 animate-in fade-in slide-in-from-bottom-2 duration-500", 
      isAgent ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "max-w-[75%] rounded-lg px-4 py-2.5 shadow-sm",
        isAgent 
          ? "bg-muted text-foreground rounded-tl-none" 
          : "bg-primary text-primary-foreground rounded-tr-none"
      )}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        <div className={cn(
          "flex items-center gap-1 mt-1 text-xs opacity-70",
          isAgent ? "justify-start" : "justify-end"
        )}>
          <span>{timestamp}</span>
          {!isAgent && isDelivered && (
            <CheckCheck className="w-3 h-3" />
          )}
        </div>
      </div>
    </div>
  );
};
