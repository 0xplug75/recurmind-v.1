import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Database } from "lucide-react";
import { useState } from "react";

interface AuditEvent {
  type: string;
  label: string;
  value: string;
}

interface AuditTrailProps {
  events: AuditEvent[];
}

export const AuditTrail = ({ events }: AuditTrailProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="border mt-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Audit Trail</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </CardContent>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0 pb-4 space-y-2">
            {events.map((event, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1.5 px-2 rounded bg-muted/30">
                <span className="text-muted-foreground">{event.label}</span>
                <code className="font-mono text-foreground">{event.value}</code>
              </div>
            ))}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
