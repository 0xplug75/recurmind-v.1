import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sparkles, PenTool, BarChart3, Send } from "lucide-react";

type CommandCategory = "recover" | "campaign" | "analyze";

const categories = [
  { id: "recover" as CommandCategory, label: "Récupérer", icon: Sparkles },
  { id: "campaign" as CommandCategory, label: "Campagne", icon: PenTool },
  { id: "analyze" as CommandCategory, label: "Analyser", icon: BarChart3 },
];

const suggestions: Record<CommandCategory, string[]> = {
  recover: [
    "Relance les paniers abandonnés de plus de 50€",
    "Écris un message WhatsApp pour récupérer les paniers d'hier",
    "Propose une réduction de 10% aux clients qui ont abandonné 2 articles ou plus",
    "Priorise les paniers abandonnés avec des clients déjà VIP",
    "Teste deux variantes de messages pour les paniers haut de gamme",
  ],
  campaign: [
    "Crée une campagne WhatsApp pour les nouveaux clients de cette semaine",
    "Segment les clients qui n'ont pas commandé depuis 30 jours",
    "Prépare une campagne de relance avant les soldes",
    "Cible les clients qui ont déjà acheté des sneakers",
    "Planifie une séquence de 3 messages sur 7 jours pour les paniers abandonnés",
  ],
  analyze: [
    "Analyse les performances des relances de paniers sur les 7 derniers jours",
    "Dis-moi combien de chiffre d'affaires les relances ont récupéré ce mois-ci",
    "Identifie les messages WhatsApp qui convertissent le mieux",
    "Montre-moi les heures où les relances fonctionnent le mieux",
    "Liste les segments clients les plus réactifs aux relances",
  ],
};

export function AIAssistantInterface() {
  const [activeCommandCategory, setActiveCommandCategory] = useState<CommandCategory | null>(null);
  const [prompt, setPrompt] = useState("");

  const handleCategoryClick = (category: CommandCategory) => {
    setActiveCommandCategory(activeCommandCategory === category ? null : category);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    // TODO: Handle prompt submission
    console.log("Prompt submitted:", prompt);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-background p-6">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold text-foreground">Assistant IA Commerce</h1>
          <p className="text-muted-foreground">Guidez vos actions CRM avec l'intelligence artificielle</p>
        </div>

        {/* Category Buttons */}
        <div className="w-full grid grid-cols-3 gap-4 mb-4">
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
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Décrivez votre intention ou cliquez sur une suggestion..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!prompt.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>

        {/* Helper Text */}
        <p className="text-xs text-center text-muted-foreground">
          L'assistant analyse votre demande et propose les actions optimales
        </p>
      </div>
    </div>
  );
}
