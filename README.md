# MERN Portfolio Website

## Project Description

A personal portfolio website built with the MERN stack. It presents my profile, technical skills, education, projects, certificates, and a contact form.

## Technologies Used

- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Version control:** Git and GitHub

## Live Deployment

**Live website:** `ADD_YOUR_LIVE_DEPLOYMENT_URL_HERE`

> Replace this placeholder with the real public URL after deploying the frontend. Do not invent a URL.

## Local Setup Instructions

### Prerequisites

- Node.js and npm
- A MongoDB database (MongoDB Atlas or a local MongoDB instance)

### 1. Clone the repository

```bash
git clone https://github.com/jahnavichowdary15/mern-portfolio.git
cd mern-portfolio
```

### 2. Install and configure the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder. Use `.env.example` as a guide and add your own MongoDB connection string. Never commit `.env` or share its credentials.

Example variable names (use your own private values):

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

### 3. Install and run the frontend

Open a **second terminal** in the project root and run:

```bash
cd client
npm install
npm run dev
```

Open the local URL printed by Vite in the terminal (usually `http://localhost:5173`).

## Security

- Keep `.env` files, MongoDB URIs, passwords, and API keys out of GitHub.
- The `.gitignore` file should exclude `.env` and `node_modules`.
