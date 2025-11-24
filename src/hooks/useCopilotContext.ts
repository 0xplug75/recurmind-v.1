import { useCopilotReadable } from "@copilotkit/react-core";

export function useCopilotContext() {
  // Données sur les agents disponibles
  const agentsStatus = {
    CartAgent: {
      name: "CartAgent",
      status: "AUTO",
      confidence: 92,
      channel: "WhatsApp",
      description: "Récupération automatique des paniers abandonnés",
      enabled: true,
    },
    PromoAgent: {
      name: "PromoAgent",
      status: "BETA",
      confidence: 0,
      channel: "WhatsApp",
      description: "Création de campagnes promotionnelles ciblées",
      enabled: false,
    },
    SupportAgent: {
      name: "SupportAgent",
      status: "BETA",
      confidence: 0,
      channel: "WhatsApp",
      description: "Gestion automatisée du support client (FAQ, tracking)",
      enabled: false,
    },
    AdvisorAgent: {
      name: "AdvisorAgent",
      status: "BETA",
      confidence: 0,
      channel: "Dashboard",
      description: "Génération d'insights et recommandations stratégiques",
      enabled: false,
    },
  };

  // Rendre le contexte accessible à l'IA
  useCopilotReadable({
    description: "État actuel des agents automatisés dans Recurmind. CartAgent est actif en mode AUTO avec 92% de confiance. Les autres agents (PromoAgent, SupportAgent, AdvisorAgent) sont en BETA et désactivés.",
    value: JSON.stringify(agentsStatus, null, 2),
  });

  // Statistiques de l'utilisateur (exemple)
  const userStats = {
    totalCarts: 45,
    abandonedCarts: 31,
    totalRevenue: "45320€",
    averageCartValue: "87€",
    activeCampaigns: 2,
  };

  useCopilotReadable({
    description: "Statistiques e-commerce de l'utilisateur : paniers totaux, paniers abandonnés, revenus, panier moyen, campagnes actives",
    value: JSON.stringify(userStats, null, 2),
  });
}
