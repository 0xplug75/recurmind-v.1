import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, CheckCircle2, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EXAMPLE_CONTEXT = {
  name: "Marie",
  email: "marie@test.com",
  cart_value: 79.9,
  products: [
    { index: 1, name: "Sweat Bleu" },
    { index: 2, name: "Pantalon Noir" }
  ],
  last_action: "abandoned_cart"
};

interface AgentOutput {
  action: string;
  reason: string;
  message: string;
  channel: string;
  status: string;
  memory_id: string;
}

const Index = () => {
  const [context, setContext] = useState(JSON.stringify(EXAMPLE_CONTEXT, null, 2));
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<AgentOutput | null>(null);
  const { toast } = useToast();

  const handleRunAgent = async () => {
    try {
      JSON.parse(context);
    } catch {
      toast({
        variant: "destructive",
        title: "Invalid JSON",
        description: "Please enter valid JSON format",
      });
      return;
    }

    setIsLoading(true);
    setOutput(null);

    // Simulate agent processing
    setTimeout(() => {
      const mockOutput: AgentOutput = {
        action: "abandoned_cart_recovery",
        reason: "Client a abandonné un panier de 79.9 euros avec 2 articles",
        message: "Salut Marie ! 👋 Ton panier t'attend avec le Sweat Bleu et le Pantalon Noir. Profite de -15% avec le code COMEBACK15 valable 24h !",
        channel: "email",
        status: "sent",
        memory_id: `qdrant_${Date.now()}_${Math.random().toString(36).substring(7)}`
      };
      
      setOutput(mockOutput);
      setIsLoading(false);
      
      toast({
        title: "Agent executed successfully",
        description: "Action completed and message sent",
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Agent CRM</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Autonomous customer engagement in action
          </p>
        </div>

        {/* Input Section */}
        <Card className="mb-8 border-2">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">
                  Customer Context
                </label>
                <Badge variant="secondary" className="text-xs">JSON</Badge>
              </div>
              <Textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Enter customer context as JSON..."
                className="font-mono text-sm min-h-[240px] resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={handleRunAgent}
            disabled={isLoading}
            size="lg"
            className="px-8 font-semibold text-base h-12 shadow-lg hover:shadow-xl transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Agent Processing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Run Agent
              </>
            )}
          </Button>
        </div>

        {/* Output Section */}
        {output && (
          <Card className="border-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between pb-4 border-b">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      Agent Output
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Autonomous decision and execution
                    </p>
                  </div>
                  <Badge className="bg-success text-success-foreground">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    {output.status}
                  </Badge>
                </div>

                {/* Action & Reason */}
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                      Action
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-sm">
                        {output.action}
                      </Badge>
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{output.channel}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                      Reasoning
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">
                      {output.reason}
                    </p>
                  </div>
                </div>

                {/* Message */}
                <div className="bg-muted/50 rounded-lg p-4 border">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Generated Message
                  </div>
                  <p className="text-foreground leading-relaxed">
                    {output.message}
                  </p>
                </div>

                {/* Proof */}
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Memory ID</span>
                    <code className="px-2 py-1 bg-secondary rounded font-mono text-foreground">
                      {output.memory_id}
                    </code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
