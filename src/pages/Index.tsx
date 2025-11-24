import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { CopilotChat } from "@copilotkit/react-ui";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCopilotActions } from "@/hooks/useCopilotActions";
import { useCopilotContext } from "@/hooks/useCopilotContext";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const Index = () => {
  const isMobile = useIsMobile();
  const [chatKey, setChatKey] = useState(0);
  
  // Activer les actions et le contexte CopilotKit
  useCopilotActions();
  useCopilotContext();

  const handleClearChat = () => {
    setChatKey(prev => prev + 1);
    toast.success("Conversation effacée");
  };

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <main className="flex-1 bg-slate-50 overflow-auto">
          <div className="flex h-full items-center justify-center p-6">
            <div className="w-full max-w-5xl relative">
              <div className="absolute top-0 right-0 z-10 mb-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Trash2 className="h-4 w-4" />
                      Effacer
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Effacer la conversation ?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Cette action supprimera tous les messages de la conversation en cours.
                        Cette action est irréversible.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction onClick={handleClearChat}>
                        Confirmer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              
              <CopilotChat
                key={chatKey}
                instructions="Tu es l'assistant IA de Recurmind, une plateforme e-commerce qui gère des agents automatisés. Ton rôle est d'aider l'utilisateur à récupérer des paniers abandonnés, créer des campagnes WhatsApp, gérer le support client, et générer des insights. Les agents disponibles sont : CartAgent (relance paniers), PromoAgent (campagnes promo), SupportAgent (FAQ/tracking), AdvisorAgent (insights). Réponds en français de manière professionnelle et actionnable."
                labels={{
                  title: "Assistant IA Commerce",
                  initial: "Décrivez une situation client ou demandez une action (ex: 'Relance les paniers de plus de 50€')...",
                  placeholder: "Tapez votre message...",
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
