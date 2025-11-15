import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AIAssistantInterface } from "@/components/ui/ai-assistant-interface";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <main className="flex-1 bg-slate-50 overflow-auto">
          <div className="flex h-full items-center justify-center p-6">
            <div className="w-full max-w-5xl">
              <AIAssistantInterface />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
