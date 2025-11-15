import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AIAssistantInterface } from "@/components/ui/ai-assistant-interface";

const Index = () => {

  return (
    <SidebarProvider>
      <div className="h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 flex items-center justify-center bg-slate-50">
          <div className="w-full max-w-4xl">
            <AIAssistantInterface />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
