# TelcoConnect B2B Agent Portal

View your app in AI Studio: [https://ai.studio/apps/339525ce-6c70-4734-8da3-a8310ff84751](https://ai.studio/apps/339525ce-6c70-4734-8da3-a8310ff84751)

## 🛠️ Setup & Execution

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure Environment:**
   Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key.
3. **Run the app:**
   ```bash
   npm run dev
   ```

A professional, enterprise-grade portal designed for telecommunications agents to manage B2B customer accounts, network health, and financial operations.

## 🚀 Key Features

- **Agent Command Center:** A mission-control style landing page with global network statistics.
- **Secure Authentication:** Hardware-verified session authorization simulation.
- **Customer 360 View:** Comprehensive dashboard for data usage, revenue trends, and interaction logs.
- **Subscription Management:** Full lifecycle control over corporate mobile, fiber, and VoIP lines.
- **Unified Financials:** Consolidates billing, payment methods, and transaction ledgers.
- **Proactive Insights:** AI-driven optimization recommendations based on real-time consumption spikes.

## 🛠️ Tech Stack

### Frontend & Core
- **React 19:** Functional components and modern hook-based state management.
- **TypeScript:** Strict typing for robust data modeling and application reliability.
- **Vite 6:** Ultra-fast build tool and development server.

### UI & UX
- **Tailwind CSS 4:** Utility-first styling for high-density enterprise interfaces.
- **Motion (Framer Motion):** Smooth micro-interactions and page transitions.
- **Lucide React:** Consistent architectural and action-based iconography.

### Data & Visualization
- **Recharts:** Composable charts for network usage, asset distribution, and financial trends.
- **Context API:** Global state management for synchronized data across modules.

### Backend & Infrastructure
- **Node.js:** Modern runtime environment.
- **Express:** Integrated for potential API route extensions and server-side logic.

## ⚙️ Technical Implementation

### Dynamic Data Models
- **Customer Context:** Centrally manages customer states, allowing the app to dynamically render insights based on account IDs.
- **Extended Types:** The `Customer` interface now supports `insight` and `insightTitle` fields to power proactive agent recommendations.

### Usage Analytics Engine
- **Usage Distribution:** Refactored from hardware-centric views to service-usage views (Data, Voice, Cloud, IoT) to better align with telco billing logic.
- **Proactive Insights:** Implementation of logic that triggers specific upsell recommendations (like "Infinite Bandwidth+") when consumption spikes are detected in the `mockData` streams.

## 📈 Demo Scenarios

The portal includes pre-configured mock data for various business cases, including a **Critical Usage Spike** scenario for **Nexus Venture Group**, demonstrating how agents can use proactive insights to suggest bandwidth upgrades.
