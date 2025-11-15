---

# **Recurmind — Agentic Commerce Platform (MVP v0.1)**

### *Autonomous cart-recovery agent powered by LLM reasoning + tokenized payments*

---

## 🚀 **Overview**

Recurmind is an **Agentic Commerce Platform** that turns e-commerce workflows into autonomous processes.
This MVP delivers the first working agent:

### **🟢 Cart · Rescue Agent**

It detects abandoned carts, understands customer context, generates personalized WhatsApp-style messages, obtains consent, and completes payments using tokenized agentic checkout.

A first demo has already been shared with **30 e-commerce merchants**, confirming strong interest.

---

## 🧩 **Problem**

E-commerce merchants lose massive revenue because:

*   70%+ of carts are abandoned
*   They cannot message customers in real time
*   CRM tools are rigid and rule-based
*   Humans must supervise every step

Recurmind introduces something new:

> **A fully autonomous agent that thinks, decides, interacts, and completes the checkout.**

---

## 💡 **Solution — The Cart · Rescue Agent**

The MVP implements an autonomous end-to-end loop:

1.  **Extract customer + cart context**
2.  **LLM reasoning** (action selection: `abandoned_cart_recovery`)
3.  **Generate personalized recovery message**
4.  **Send message via simulated WhatsApp (n8n)**
5.  **Receive consent** (“yes”)
6.  **Execute tokenized payment**
    *   Crossmint agentic flow
    *   Basis Theory tokenization
7.  **Confirm order**
8.  **Store actions as vectors in Qdrant**

This delivers a full chain:
**intent → reasoning → action → payment → result**

---

## 🧠 **Agentic Architecture**

### **1. LLM Reasoning Engine**

*   Extracts structured context
*   Determines the correct CRM action
*   Generates human-like messaging

### **2. Agent State Machine**

Core states:
`thinking → message_ready → waiting_for_consent → payment_processing → success`

### **3. Invisible Interface (UI)**

Built with Next.js + shadcn/ui:

*   Sidebar with agent status
*   AUTO / REVIEW modes
*   Logs + confidence indicators
*   Chat with pre-generated messages

### **4. Tokenized Payments**

*   Crossmint agentic checkout flow
*   Basis Theory card tokenization
*   Purchase intent → verification → payment intent

### **5. Memory Layer**

*   All actions stored in **Qdrant vector database**
*   Enables traceability & future agent self-improvement

---

## 🔁 **Demo Flow**

1.  Merchant pastes an abandoned-cart scenario
2.  Agent extracts → reasons → selects action
3.  Agent generates ready-to-send message
4.  Message sent via simulated WhatsApp (n8n)
5.  Customer replies “yes” (simulated)
6.  Crossmint tokenized payment succeeds
7.  Agent confirms order
8.  Qdrant logs the interaction

---

## 🛠️ **Technologies Used**

### **AI**

*   OpenAI GPT (reasoning + messaging)

### **Frontend**

*   Next.js
*   React
*   Tailwind CSS
*   shadcn/ui
*   Framer Motion

### **Agent Logic**

*   Custom LLM-driven context engine
*   State machine for autonomous flows

### **Automation**

*   n8n (WhatsApp simulation)

### **Payments**

*   Crossmint **agentic credit-card flow**
*   Basis Theory **tokenization**

### **Memory**

*   Qdrant vector database

### **Dev & Hosting**

*   Vercel (local + preview)
*   ngrok HTTPS (required for Crossmint)

---

## 📈 **Why This MVP Matters**

Recurmind proves that an autonomous agent can:

*   **Understand** a customer scenario
*   **Decide** which action to take
*   **Interact** naturally through messaging
*   **Execute** a secure tokenized payment
*   **Close** an order fully on its own

This is a foundational building block for autonomous e-commerce systems.

---

## 🔮 **Roadmap (Next Steps)**

*   Real WhatsApp Business integration
*   Shopify MCP + Checkout Kit automation
*   New agents: PromoAgent, SupportAgent, AdvisorAgent
*   Multi-agent orchestration
*   Merchant dashboard (N8N + Metabase)
*   Error recovery + self-evaluation loops

---

## 👤 **Author**

### **Pierre-Louis Sow — Solo Builder**

Responsible for:

*   LLM reasoning + agent architecture
*   Next.js + shadcn UI
*   n8n messaging simulation
*   Crossmint & Basis Theory payment integration
*   Qdrant memory
*   First demo shared with **30 e-commerce merchants**

https://www.loom.com/share/696b08b3636945ee805a249ff72b37b5 
---

## 📄 **License**

MIT License.

---
