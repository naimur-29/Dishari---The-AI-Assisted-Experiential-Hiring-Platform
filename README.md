# Dishari – AI-Assisted Experiential Hiring Platform

*Dishari* is a web application that revolutionizes entry-level hiring by replacing traditional resumes with skill-based challenges. Companies post real-world tasks, and applicants submit solutions. An integrated AI (LLM) evaluates responses, scores them, and recommends top candidates, promoting fair and skill-driven hiring.


## ✨ Features

👤 Role-based access: Graduate, Company, Admin
📝 Challenge creation by companies
📬 Graduates can browse and submit to challenges
🤖 AI-powered evaluation (Gemma3:4b)
📊 Score and feedback generation
🔐 Secure authentication
🛠 Admin controls: user management, moderation
n


## 🧱 Tech Stack

### Frontend
ReactJS
TailwindCSS


### Backend
php (Laravel)
MySQL


### AI Integration
Gemini Gemma3:4b (for evaluating submissions)


### Tools
Custom Auth


## 🚀 Getting Started

### Prerequisites
Node.js v18+
Gemini Gemma3


### Steps

```bash
git clone https://github.com/naimur-29/Dishari---The-AI-Assisted-Experiential-Hiring-Platform
cd client
npm install

---

```md
## 🤖 AI Evaluation Flow

Applicant submits a challenge response
Backend sends prompt to OpenAI API
AI returns:

   - Score (e.g., out of 100)
   - Strengths & weaknesses
   - Feedback summary
Results stored in DB and displayed to user/company
github.com
