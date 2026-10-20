# Jahanavi's MERN Portfolio

## Live Demo

**Portfolio Website:** https://mern-portfolio-dusky-delta.vercel.app

**GitHub Repository:** https://github.com/jahnavichowdary15/mern-portfolio

## Project Description

A personal portfolio website developed using the MERN stack to showcase my profile, technical skills, education, projects, certifications, and contact information. The website includes a contact form and CV download options.

## Technologies Used

- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Version Control:** Git and GitHub
- **Frontend Hosting:** Vercel
- **Backend Hosting:** Render

## Features

- Personal introduction and profile photo
- Technical skills section
- Education details
- Projects showcase
- Certifications and hackathon participation
- CV download options
- Contact form connected to the backend API
- Responsive portfolio interface

## Project Structure

```text
mern-portfolio/
├── client/          # React frontend
├── server/          # Express backend and API
├── .gitignore
└── README.md
```

## Local Setup Instructions

### Prerequisites

- Node.js and npm
- A MongoDB Atlas account or MongoDB instance
- Git

### 1. Clone the repository

```bash
git clone https://github.com/jahnavichowdary15/mern-portfolio.git
cd mern-portfolio
```

### 2. Configure and start the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder using `.env.example` as a reference.

Configure the following environment variables with your own values:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

The backend should run at `http://localhost:5000`.

### 3. Configure and start the frontend

Open a second terminal in the project root:

```bash
cd client
npm install
```

Create a `.env` file inside `client` with:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually `http://localhost:5173`.

## Deployment

- **Frontend:** Deployed on Vercel
- **Backend:** Deployed on Render
- **Database:** MongoDB Atlas

## Security

- Never commit `.env` files, database passwords, or other secret credentials.
- Configure environment variables separately in the hosting platforms.
- Use `.env.example` to document required variables without including real secrets.

## Author

**Doddapuneni Jahanavi**

B.Tech Computer Science and Engineering (AI & ML)  
JK Lakshmipat University, Jaipur, Rajasthan

- **Email:** jahnavichowdary180@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/jahnavi-chowdary-21708034a
- **GitHub:** https://github.com/jahnavichowdary15
