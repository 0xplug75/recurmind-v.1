import { useCopilotAction } from "@copilotkit/react-core";
import { toast } from "sonner";

export function useCopilotActions() {
  
  // 🛒 Action 1 : Récupérer un panier abandonné
  useCopilotAction({
    name: "recover_abandoned_cart",
    description: "Relance un client avec un panier abandonné via WhatsApp. Utilise cette action quand l'utilisateur veut récupérer des paniers abandonnés.",
    parameters: [
      {
        name: "customerName",
        type: "string",
        description: "Nom du client à relancer",
        required: true,
      },
      {
        name: "cartValue",
        type: "number",
        description: "Valeur du panier en euros (€)",
        required: true,
      },
      {
        name: "products",
        type: "string",
        description: "Liste des produits dans le panier (séparés par des virgules)",
        required: true,
      },
      {
        name: "abandonedDays",
        type: "number",
        description: "Nombre de jours depuis l'abandon du panier",
        required: false,
      },
    ],
    handler: async ({ customerName, cartValue, products, abandonedDays }) => {
      console.log("🛒 CartAgent - Récupération panier:", {
        customerName,
        cartValue,
        products,
        abandonedDays,
      });

      toast.success(
        `Message WhatsApp préparé pour ${customerName} (${cartValue}€)`
      );

      // TODO : Appeler l'API n8n pour envoyer le message WhatsApp
      // const response = await fetch('https://your-n8n-webhook.com/cart-recovery', {
      //   method: 'POST',
      //   body: JSON.stringify({ customerName, cartValue, products }),
      // });

      return `✅ Message WhatsApp envoyé à ${customerName} pour récupérer un panier de ${cartValue}€ (${products}). ${abandonedDays ? `Panier abandonné depuis ${abandonedDays} jours.` : ""}`;
    },
  });

  // 📢 Action 2 : Créer une campagne promo
  useCopilotAction({
    name: "create_promo_campaign",
    description: "Crée et lance une campagne promotionnelle WhatsApp ciblée. Utilise cette action pour créer des campagnes marketing.",
    parameters: [
      {
        name: "campaignName",
        type: "string",
        description: "Nom de la campagne",
        required: true,
      },
      {
        name: "targetAudience",
        type: "string",
        description: "Audience cible (ex: 'clients inactifs depuis 30 jours', 'top clients')",
        required: true,
      },
      {
        name: "promoCode",
        type: "string",
        description: "Code promo à partager (ex: 'WINTER20')",
        required: false,
      },
      {
        name: "message",
        type: "string",
        description: "Message personnalisé à envoyer",
        required: true,
      },
    ],
    handler: async ({ campaignName, targetAudience, promoCode, message }) => {
      console.log("📢 PromoAgent - Création campagne:", {
        campaignName,
        targetAudience,
        promoCode,
        message,
      });

      toast.success(`Campagne "${campaignName}" créée avec succès !`);

      // TODO : Appeler l'API n8n pour créer la campagne
      
      return `✅ Campagne "${campaignName}" créée pour ${targetAudience}. ${promoCode ? `Code promo : ${promoCode}.` : ""} Message : "${message}"`;
    },
  });

  // 💬 Action 3 : Gérer une demande support
  useCopilotAction({
    name: "handle_support_query",
    description: "Répond à une question support client (FAQ, suivi de commande, retours). Utilise cette action pour le support client.",
    parameters: [
      {
        name: "customerQuestion",
        type: "string",
        description: "Question du client",
        required: true,
      },
      {
        name: "queryType",
        type: "string",
        description: "Type de demande : 'faq', 'tracking', 'return', 'other'",
        required: true,
      },
      {
        name: "orderNumber",
        type: "string",
        description: "Numéro de commande (si applicable)",
        required: false,
      },
    ],
    handler: async ({ customerQuestion, queryType, orderNumber }) => {
      console.log("💬 SupportAgent - Support:", {
        customerQuestion,
        queryType,
        orderNumber,
      });

      let response = "";
      
      if (queryType === "tracking" && orderNumber) {
        response = `📦 Votre commande ${orderNumber} est en cours de livraison. Livraison estimée : 2-3 jours.`;
      } else if (queryType === "faq") {
        response = `💡 Réponse FAQ : ${customerQuestion} - Consultez notre centre d'aide pour plus d'infos.`;
      } else if (queryType === "return") {
        response = `🔄 Retour autorisé pour la commande ${orderNumber}. Envoyez-nous le produit avec le bon de retour.`;
      } else {
        response = `✅ Votre demande "${customerQuestion}" a été enregistrée. Notre équipe vous répondra sous 24h.`;
      }

      toast.info("Réponse support générée");

      return response;
    },
  });

  // 📊 Action 4 : Générer des insights
  useCopilotAction({
    name: "generate_business_insights",
    description: "Analyse les données e-commerce et génère des recommandations stratégiques. Utilise cette action pour obtenir des insights.",
    parameters: [
      {
        name: "metricType",
        type: "string",
        description: "Type d'analyse : 'sales', 'cart_abandonment', 'customer_retention', 'campaign_performance'",
        required: true,
      },
      {
        name: "timePeriod",
        type: "string",
        description: "Période d'analyse (ex: '7 jours', '30 jours', 'ce mois')",
        required: true,
      },
    ],
    handler: async ({ metricType, timePeriod }) => {
      console.log("📊 AdvisorAgent - Insights:", { metricType, timePeriod });

      let insight = "";
      
      if (metricType === "cart_abandonment") {
        insight = `📈 Analyse paniers abandonnés (${timePeriod}) : Taux d'abandon : 68% (+5% vs période précédente). Valeur moyenne : 87€. Recommandation : Activer les relances automatiques pour paniers >50€.`;
      } else if (metricType === "sales") {
        insight = `💰 Analyse ventes (${timePeriod}) : CA : 45 320€ (+12%). Panier moyen : 73€. Top produit : Sneakers Classic. Recommandation : Créer une campagne upsell pour ce produit.`;
      } else if (metricType === "customer_retention") {
        insight = `👥 Analyse rétention (${timePeriod}) : Taux de retour : 34% (-3%). Clients inactifs : 127. Recommandation : Campagne de réactivation avec code promo -15%.`;
      } else {
        insight = `📊 Analyse ${metricType} (${timePeriod}) : Données en cours d'agrégation. Rapport complet disponible dans 2h.`;
      }

      toast.success("Insights générés !");

      return insight;
    },
  });
}
