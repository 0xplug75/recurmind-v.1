Recurmind — Agentic Commerce Platform (MVP v0.1)

Autonomous cart-recovery agent powered by LLM reasoning and tokenized payments.

🚀 Introduction

Recurmind is an Agentic Commerce Platform that replaces manual e-commerce tasks with autonomous agents.
This MVP delivers the first working agent:

🟢 Cart · Rescue Agent

An AI agent that detects abandoned carts, reasons about customer intent, generates personalized WhatsApp-style recovery messages, obtains consent, and completes payments using tokenized agentic checkout.

A first working demo has already been shared with 30 e-commerce merchants, validating the concept.

🎯 Problem

Merchants lose revenue because:

Over 70% of carts are abandoned

They can’t message every customer in real time

CRM automations are rigid and generic

Tools require humans to babysit workflows

Recurmind introduces something new:

An autonomous agent capable of thinking, deciding, and completing the checkout.

💡 Solution — The Cart · Rescue Agent

The MVP implements a full autonomous loop:

Context extraction

name, items, total price, customer intent

LLM reasoning

selects the correct action: abandoned_cart_recovery

Message generation

human-like WhatsApp recovery message

Messaging simulation via n8n

Customer consent (simulated “yes”)

Tokenized payment execution

Crossmint agentic flow

Basis Theory tokenization

Order confirmation

Vector memory logging (Qdrant)

This chain delivers:
intent → reasoning → action → payment → result.

🧠 Agentic Architecture
1. LLM Reasoning

Extracts structured context

Selects optimal action

Generates recovery messages

2. Agent State Machine

States include:
thinking → message_ready → waiting_for_consent → processing_payment → success

3. Invisible Interface

Built with Next.js + shadcn/ui:

Sidebar with agent status

AUTO / REVIEW mode

Logs + confidence indicators

Chat with pre-filled messages

4. Payment Layer

Crossmint tokenized credit card checkout

Basis Theory card tokenization

Purchase intent → verification → payment intent

5. Memory Layer

Qdrant vector database

Stores every action for traceability and future learning

🧪 Demo Flow

User pastes abandoned-cart scenario

Agent extracts → reasons → selects action

Agent proposes a ready-to-send message

Simulated WhatsApp send via n8n

Customer replies “yes” (simulated)

Tokenized payment executed via Crossmint

Success confirmation displayed

Action logged in Qdrant

Clear, autonomous, end-to-end.

🛠️ Technologies Used (Real)
AI

OpenAI GPT (reasoning + generation)

Frontend

Next.js

React

Tailwind CSS

shadcn/ui

Framer Motion

Agent Logic

Context engineering

Custom state machine

Automation

n8n (WhatsApp simulation)

Payments

Crossmint Agentic Flow

Basis Theory tokenization

Memory

Qdrant vector DB

Dev & Hosting

Local dev via Vercel

HTTPS via ngrok (required for Crossmint)

📈 Why It Matters

Recurmind demonstrates that an autonomous agent can:

Understand a cart abandonment scenario

Message a customer

Negotiate consent

Trigger a secure tokenized payment

Close the order

All without human intervention.

This is the foundation of autonomous e-commerce.

🔮 Roadmap

Real WhatsApp Business integration

Shopify MCP + Checkout Kit integration

New agents: PromoAgent, SupportAgent, AdvisorAgent

Self-evaluating agent behaviors

Merchant dashboard (N8N + Metabase)

👤 Author

Pierre-Louis Sow — Solo Builder

Responsible for:

LLM reasoning & action design

Next.js + shadcn UI

Agent messaging simulation via n8n

Crossmint agentic payment integration

Basis Theory tokenization

Qdrant memory

MVP demo shared with 30 merchants

📄 License

MIT License.
