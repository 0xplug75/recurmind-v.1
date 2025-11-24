import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { CopilotChat } from "@copilotkit/react-ui";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCopilotActions } from "@/hooks/useCopilotActions";
import { useCopilotContext } from "@/hooks/useCopilotContext";

const Index = () => {
  const isMobile = useIsMobile();
  
  // Activer les actions et le contexte CopilotKit
  useCopilotActions();
  useCopilotContext();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <main className="flex-1 bg-slate-50 overflow-auto">
          <div className="flex h-full items-center justify-center p-6">
            <div className="w-full max-w-5xl">
              <CopilotChat
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
