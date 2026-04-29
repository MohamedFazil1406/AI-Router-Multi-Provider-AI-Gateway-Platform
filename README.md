# OpenRouter

OpenRouter is a full-stack AI model routing platform built with a **Turborepo monorepo architecture**. It allows users to authenticate, manage API keys, access AI models, generate content, and handle payments through a scalable multi-service system.

## 🚀 Project Architecture

This project is structured using **Turborepo** and contains three main applications:

### 1. Primary Backend
Responsible for core platform features such as:

- User Authentication (Sign In / Sign Up)
- Model Management
- Payment Integration
- API Key Management
- Database Operations

### 2. API Backend
Handles communication with AI models and content generation.

Built using:

- Elysia.js
- REST APIs / Backend Services

Main Responsibilities:

- Connect with AI models
- Generate AI responses/content
- Process user requests

### 3. Frontend Dashboard
User interface of OpenRouter platform.

Built using:

- React
- Tailwind CSS
- Eden (Elysia client)
- TypeScript

Main Features:

- Clean Dashboard UI
- Model Access Interface
- API Key Management
- Authentication Pages
- Billing / Payment Pages

---

## 🛠️ Tech Stack

### Frontend
- React
- Tailwind CSS
- TypeScript
- Eden Client

### Backend
- Elysia.js
- Node.js / Bun Runtime

### Database
- Neon DB (Serverless PostgreSQL)

### ORM
- Prisma ORM

### Monorepo Tooling
- Turborepo

---

### create .env file 

DATABASE_URL=your_neon_database_url
JWT_SECRET_KEY=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key

---

### Install dependencies

bun install
