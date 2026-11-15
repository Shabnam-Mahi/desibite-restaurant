# DesiBite Restaurant Website

A vegetarian Punjabi and Gujarati restaurant ordering application.

## Tech Stack

Frontend:
- React
- Vite
- CSS

Backend:
- Node.js
- Express.js
- REST APIs

## Requirements

- Node.js
- npm
- VS Code

## Installation

### Backend

Open terminal:

cd server
npm install

Copy `.env.example` to `.env`.

Start backend:

npm run dev

Backend:
http://localhost:5000

Health check:
http://localhost:5000/api/health

### Frontend

Open another terminal:

cd client
npm install
npm run dev

Frontend:
http://localhost:5173

## Available APIs

GET /api/health
GET /api/foods
POST /api/orders
GET /api/orders/:id
POST /api/ai/chat

## Important

This is a learning/demo starter project.

- Orders are currently stored in server memory.
- Orders disappear when the backend restarts.
- Checkout does not process payments.
- Chatbot currently uses local menu-based responses.
- Tax is a configurable demo estimate.
- Production use requires database persistence,
  authentication, payment processing, validation,
  security controls and deployment configuration.
