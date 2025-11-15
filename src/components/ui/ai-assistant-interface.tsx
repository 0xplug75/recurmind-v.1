import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, PenTool, Send } from "lucide-react";

type CommandCategory = "recover" | "campaign";

interface AgentDecision {
  action: string;
  reasoning: string;
  message: string;
}

const categories = [
  { id: "recover" as CommandCategory, label: "Récupérer", icon: Sparkles },
  { id: "campaign" as CommandCategory, label: "Campagne", icon: PenTool },
];

const suggestions: Record<CommandCategory, string[]> = {
  recover: [
    "Relance les paniers abandonnés de plus de 50€",
    "Écris un message WhatsApp pour récupérer les paniers d'hier",
    "Priorise les paniers abandonnés avec des clients déjà VIP",
  ],
  campaign: [
    "Crée une campagne WhatsApp pour les nouveaux clients de cette semaine",
    "Prépare une séquence de relance avant les soldes",
    "Cible les clients qui n'ont pas acheté depuis 30 jours",
  ],
};

export function AIAssistantInterface() {
  const [activeCommandCategory, setActiveCommandCategory] = useState<CommandCategory | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [agentDecision, setAgentDecision] = useState<AgentDecision | null>(null);

  const handleCategoryClick = (category: CommandCategory) => {
    setActiveCommandCategory(activeCommandCategory === category ? null : category);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Demo behavior - simulate agent decision
    const reasoning = "Contexte analysé : cliente Marie, panier abandonné hier soir (79,90€). Produits identifiés : Sweat Bleu + Pantalon Noir. Intention détectée : récupération de panier abandonné. Action optimale : relance personnalisée avec ton amical et légère urgence.";
    const message = "Salut Marie 👋 J'ai vu que tu as abandonné ton panier avec le Sweat Bleu et le Pantalon Noir (79,90€).\n\nTu veux que je te le commande directement ici ?";
    
    setAgentDecision({
      action: "abandoned_cart_recovery",
      reasoning,
      message,
    });
    
    setInputValue("");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white p-10 rounded-2xl shadow-sm">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold text-foreground">Assistant IA Commerce</h1>
          <p className="text-muted-foreground">
            Décrivez une situation client ou choisissez une intention. L'agent analyse, décide et rédige pour vous.
          </p>
        </div>

        {/* Category Buttons - Only 2 now */}
        <div className="w-full grid grid-cols-2 gap-4 mb-6">
          {categories.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={activeCommandCategory === id ? "default" : "outline"}
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => handleCategoryClick(id)}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{label}</span>
            </Button>
          ))}
        </div>

        {/* Suggestions */}
        {activeCommandCategory && (
          <Card className="p-4 animate-in fade-in duration-300">
            <div className="space-y-2">
              {suggestions[activeCommandCategory].map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-4 py-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Décrivez la situation client ou cliquez sur une suggestion…"
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!inputValue.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>

        {/* Agent Decision Display */}
        {agentDecision && (
          <div className="space-y-4 mt-6 animate-in fade-in duration-300">
            {/* Reasoning Block */}
            <div className="bg-white border border-border rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-semibold text-foreground">Raisonnement de l'agent</h3>
                <Badge variant="secondary" className="text-xs">
                  Action : {agentDecision.action}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {agentDecision.reasoning}
              </p>
            </div>

            {/* WhatsApp Preview Block */}
            <div className="bg-[#f5f7ff] border border-blue-100 rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-foreground mb-3">
                Conversation WhatsApp (prévisualisation)
              </h3>
              <div className="bg-white rounded-lg px-3 py-2 text-sm text-gray-800 shadow-sm max-w-md whitespace-pre-line">
                {agentDecision.message}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Ce message sera envoyé via le flow WhatsApp (n8n) lorsque vous connecterez le compte réel.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
