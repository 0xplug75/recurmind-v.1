import { LayoutDashboard, MessageCircle, Activity, Settings, MoreVertical, User, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mainNavItems = [
  { label: "Cockpit", icon: LayoutDashboard, href: "#cockpit" },
  { label: "Conversations", icon: MessageCircle, href: "#conversations" },
  { label: "Actions & Résultats", icon: Activity, href: "#actions" },
  { label: "Paramètres", icon: Settings, href: "#settings" },
];

const activeAgents = [
  {
    name: "CartAgent",
    label: "CartAgent · WhatsApp",
    channel: "WhatsApp",
    role: "Récupère les paniers abandonnés",
    status: "AUTO",
    confidence: 92,
  },
];

const betaAgents = [
  { name: "PromoAgent", label: "PromoAgent", role: "Codes promo dynamiques", status: "BETA" },
  { name: "SupportAgent", label: "SupportAgent", role: "FAQ & suivi colis", status: "BETA" },
  { name: "AdvisorAgent", label: "AdvisorAgent", role: "Insights & recommandations", status: "BETA" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r">
      {/* Identity Block */}
      <SidebarHeader className="border-b px-3 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            R
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Recurmind</span>
              <span className="text-xs text-muted-foreground">Agentic Commerce Cockpit</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          {!isCollapsed && <SidebarGroupLabel>Navigation</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a href={item.href} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Active Agents */}
        <SidebarGroup>
          {!isCollapsed && <SidebarGroupLabel>Agents actifs</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {activeAgents.map((agent) => (
                <SidebarMenuItem key={agent.name}>
                  <SidebarMenuButton asChild className="h-auto py-2">
                    <button className="flex items-center justify-between w-full group">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
                        {!isCollapsed && (
                          <div className="flex flex-col items-start gap-0.5 flex-1 min-w-0">
                            <span className="text-xs font-medium truncate w-full">{agent.label}</span>
                            <span className="text-xs text-muted-foreground truncate w-full">{agent.role}</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <Badge variant="secondary" className="text-xs px-1.5 py-0">
                                {agent.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{agent.confidence}%</span>
                            </div>
                          </div>
                        )}
                      </div>
                      {!isCollapsed && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreVertical className="h-3 w-3" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Basculer AUTO/REVIEW</DropdownMenuItem>
                            <DropdownMenuItem>Désactiver l'agent</DropdownMenuItem>
                            <DropdownMenuItem>Voir les logs récents</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Beta Agents */}
        <SidebarGroup>
          {!isCollapsed && <SidebarGroupLabel>En bêta</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {betaAgents.map((agent) => (
                <SidebarMenuItem key={agent.name}>
                  <SidebarMenuButton asChild className="h-auto py-2 opacity-60">
                    <button className="flex items-center gap-2 w-full">
                      <div className="h-2 w-2 rounded-full bg-muted flex-shrink-0" />
                      {!isCollapsed && (
                        <div className="flex flex-col items-start gap-0.5 flex-1 min-w-0">
                          <span className="text-xs font-medium truncate w-full">{agent.label}</span>
                          <span className="text-xs text-muted-foreground truncate w-full">{agent.role}</span>
                          <Badge variant="outline" className="text-xs px-1.5 py-0 mt-0.5">
                            {agent.status}
                          </Badge>
                        </div>
                      )}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Profile Block */}
      <SidebarFooter className="border-t p-3">
        <div className="flex items-center justify-between mb-2">
          <SidebarTrigger className="flex items-center justify-center h-8 w-8 rounded-md border bg-muted hover:bg-muted/80">
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </SidebarTrigger>
          {!isCollapsed && (
            <span className="text-xs text-muted-foreground">
              Réduire
            </span>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 w-full hover:bg-accent rounded-lg p-2 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  BD
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="flex flex-col items-start flex-1 min-w-0">
                  <span className="text-sm font-medium truncate w-full">Boutique Demo</span>
                  <span className="text-xs text-muted-foreground">Pilote</span>
                </div>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>Passer en mode manuel</DropdownMenuItem>
            <DropdownMenuItem>Pause des agents</DropdownMenuItem>
            <DropdownMenuItem>Déconnexion</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
