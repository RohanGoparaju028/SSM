# SSM (Smart System Management) 

SSM is an intelligent grocery and inventory management system designed to eliminate the guesswork from household management. By tracking your purchases, consumption patterns, and expiration dates, SSM ensures you never run out of essentials or let food go to waste.

---

##  Architecture Overview

The system is built using a modern, distributed architecture:

- **Backend API**: Built with **NestJS** and **TypeScript**, providing a robust and scalable RESTful API.
- **Database**: **PostgreSQL** managed via **Prisma ORM** for type-safe database interactions.
- **Intelligence Engine**: A dedicated **Go** microservice for high-performance Machine Learning tasks, including recommendation algorithms and predictive analytics.
- **Communications**: Integrated **Email Service** for automated user notifications.

---

## ✅ Achievements So Far

### 🔐 User & Security
- **Secure Authentication**: Implemented complete Signup and Login flows with password hashing and validation.
- **User Profiles**: Structured data model to support personalized grocery tracking for individual users.

### 🍎 Inventory Management
- **Product Tracking**: System can add, update, and remove products with details like barcodes, brands, and quantities.
- **Usage History**: Automatic logging of when items are used or updated, creating a rich dataset for ML analysis.
- **Expiration Tracking**: Capability to store and monitor expiry dates for perishable items.

### ✉️ Automated Notifications
- **Email Service**: Set up a dedicated service to notify users when items are nearing their expiration date or stock levels are low.
- **Threshold Alerts**: Logic to trigger communications based on real-time inventory status.

### 🤖 Machine Learning Service (In Development)
- **Go-based Service Scaffold**: Initialized a high-performance Go microservice to eventually handle heavy computational tasks.
- **Data Syncing Architecture**: Defined a communication structure using dynamic reflection in Go to map incoming data, though the network connection to the backend is currently pending.
- **Algorithm Scaffolding**: 
    - **Apriori Algorithm**: Research phase (skeleton file created in `apori.go`).
    - **Linear Regression**: Preliminary utility functions for data splitting implemented in `buildML.go`.

---

## 🛠️ Data Model (Prisma)

The core logic revolves around three primary entities:
- **User**: Stores profile and authentication data.
- **Product**: Tracks current inventory items, barcodes, and quantities.
- **UsageHistory**: Logs every interaction with a product to build consumption patterns.

---

## 🚀 Future Goals & Roadmap

### 1. Advanced Recommendation Engine (Phase 2)
- Fully integrate the **Apriori Algorithm** into the user dashboard to provide real-time grocery suggestions based on individual shopping habits.
- Implement collaborative filtering to suggest products based on similar user profiles.

### 2. Predictive Replenishment
- Refine **Linear Regression** models to accurately predict the exact date an item will run out.
- Implement "Auto-List" features that generate shopping lists based on predicted needs.

### 3. Frontend Excellence
- Develop a premium **React/Next.js** dashboard featuring:
  - Real-time inventory visualizations.
  - Expiry countdowns.
  - Smart shopping list generator.

### 4. Barcode & OCR Integration
- Implement a mobile-friendly feature to scan barcodes or receipts to automatically populate inventory, reducing manual data entry.

### 5. Multi-Store Integration
- Allow users to compare prices across different stores and track where they get the best value for their frequent purchases.

---

## ⚙️ Setup & Development

- **Backend**: `cd backend && npm install && npm run start:dev`
- **Database**: `npx prisma migrate dev`
- **ML Engine**: `cd Recommandation && go run main.go`

---

> **Vision**: SSM aims to become the "OS for your Kitchen," turning mundane grocery shopping into a data-driven, effortless experience.
