import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WhatsAppMessage } from "@/components/WhatsAppMessage";
import { AuditTrail } from "@/components/AuditTrail";

const EXAMPLE_CONTEXT = "Marie a laissé un panier hier soir avec un Sweat Bleu (39,90€) et un Pantalon Noir (40€). Elle a quitté la page sans finaliser.";

interface ChatMessage {
  from: "agent" | "client";
  content: string;
  timestamp: string;
}

interface AgentOutput {
  reasoning: string;
  action: string;
  messages: ChatMessage[];
  auditEvents: Array<{ type: string; label: string; value: string }>;
}

const Index = () => {
  const [context, setContext] = useState(EXAMPLE_CONTEXT);
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<AgentOutput | null>(null);
  const { toast } = useToast();

  const handleRunAgent = async () => {
    if (!context.trim()) {
      toast({
        variant: "destructive",
        title: "Contexte vide",
        description: "Veuillez décrire le contexte client",
      });
      return;
    }

    setIsLoading(true);
    setOutput(null);

    // Simulate progressive WhatsApp conversation
    setTimeout(() => {
      const mockMessages: ChatMessage[] = [
        {
          from: "agent",
          content: "Salut Marie ! 👋 J'ai vu que tu as abandonné ton panier avec le Sweat Bleu et le Pantalon Noir (79.90€).\n\nProfite de -15% avec le code COMEBACK15, valable 24h ! 🎁",
          timestamp: "14:32"
        },
        {
          from: "client",
          content: "Ah super ! Je peux passer commande maintenant ?",
          timestamp: "14:35"
        },
        {
          from: "agent",
          content: "Oui bien sûr ! Je valide ta commande avec le code promo appliqué. Total : 67.92€\n\nTu confirmes ? ✅",
          timestamp: "14:35"
        },
        {
          from: "client",
          content: "Oui je confirme !",
          timestamp: "14:36"
        },
        {
          from: "agent",
          content: "Parfait ! ✨\n\nCommande validée et payée.\nNuméro de commande : #1234\n\nTu recevras ton colis sous 48h. Merci Marie ! 🙏",
          timestamp: "14:36"
        }
      ];

      const mockOutput: AgentOutput = {
        reasoning: "Contexte analysé : Cliente Marie, panier abandonné hier soir (79,90€). Produits identifiés : Sweat Bleu + Pantalon Noir. Intention détectée : récupération panier. Confiance : 0.94. Action optimale : relance personnalisée avec code promo -15% limité 24h pour créer urgence.",
        action: "abandoned_cart_recovery",
        messages: mockMessages,
        auditEvents: [
          { type: "action", label: "Action", value: "abandoned_cart_recovery" },
          { type: "payment", label: "Paiement", value: "succeeded" },
          { type: "order", label: "Commande", value: "created_order_1234" },
          { type: "memory", label: "Mémoire Qdrant", value: `qdrant_${Date.now()}_${Math.random().toString(36).substring(7)}` }
        ]
      };
      
      setOutput(mockOutput);
      setIsLoading(false);
      
      toast({
        title: "Agent exécuté avec succès",
        description: "Conversation WhatsApp terminée",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Recurmind · WhatsApp CRM Agent
          </h1>
          <p className="text-muted-foreground text-sm">
            Outcome-first autonomous agent
          </p>
        </div>

        {/* Input Section */}
        <Card className="mb-6 border">
          <CardContent className="pt-4 pb-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Contexte client (langage naturel)
              </label>
              <Textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Ex: Marie a laissé un panier hier soir avec un Sweat Bleu et un Pantalon Noir..."
                className="text-sm min-h-[100px] resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Décrivez la situation client en langage naturel
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={handleRunAgent}
            disabled={isLoading}
            size="lg"
            className="px-6 font-semibold gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Agent en cours...
              </>
            ) : (
              <>
                <MessageCircle className="w-4 h-4" />
                Déclencher l'agent WhatsApp
              </>
            )}
          </Button>
        </div>

        {/* Agent Output */}
        {output && (
          <div className="space-y-4 animate-in fade-in duration-500">
            {/* Reasoning Section */}
            <Card className="border">
              <CardContent className="pt-4 pb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Raisonnement de l'agent
                    </span>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {output.reasoning}
                  </p>
                  <div className="mt-3 pt-3 border-t">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      Action : {output.action}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp Chat */}
            <Card className="border-2">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">
                    Conversation WhatsApp
                  </h3>
                </div>
                
                <div className="space-y-1">
                  {output.messages.map((msg, idx) => (
                    <WhatsAppMessage
                      key={idx}
                      from={msg.from}
                      content={msg.content}
                      timestamp={msg.timestamp}
                      isDelivered={true}
                    />
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t">
                  <p className="text-xs text-muted-foreground text-center">
                    💾 Memory stored in Qdrant
                  </p>
                </div>
              </CardContent>
            </Card>

            <AuditTrail events={output.auditEvents} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
