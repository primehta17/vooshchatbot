
## Frontend README.md

# RAG-Chat Frontend

> React + Sass UI for RAG-powered chatbot: chat UI, streaming responses, session history & reset.

---

## Table of Contents

- [Description](#description)  
- [Tech Stack](#tech-stack)  
- [Features](#features)  
- [Setup & Installation](#setup--installation)  
- [Running Locally](#running-locally)  
- [Configuration](#configuration)  
- [Usage](#usage)  
- [Design & Flow](#design--flow)  
- [Known Issues & Future Improvements](#known-issues--future-improvements)  
- [License](#license)

---

## Description

This is the frontend component for the RAG chatbot. Built using React + Sass, it allows users to send messages, receive streaming responses in real time, view session history, and reset the session. It interacts with the backend via API endpoints & SSE.

---

## Tech Stack

- React (v18+)  
- Sass (for styling)  
- EventSource (SSE) for streaming responses  
- LocalStorage for session ID persistence  

---

## Features

- Show existing session history when page loads  
- Send user message → receive assistant streaming reply chunk by chunk  
- Reset session (clear history)  
- Simple, clean UI with message bubbles, loader indicator  

---

## Setup & Installation

### Prerequisites

- Node.js / npm  
- Backend server running, reachable by frontend (correct base URL set)  

### Installation

```bash
git clone https://github.com/primehta17/vooshchatbot.git
cd vooshchatbot
npm install
npm start