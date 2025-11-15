import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AIAssistantInterface } from "@/components/ui/ai-assistant-interface";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4">
            <SidebarTrigger className="-ml-1">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </SidebarTrigger>
            <h1 className="text-lg font-semibold">Recurmind Cockpit</h1>
          </header>
          <main className="flex-1 bg-slate-50 overflow-auto">
            <div className="flex h-full items-center justify-center p-6">
              <div className="w-full max-w-5xl">
                <AIAssistantInterface />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
