# AURELIA 🖤
### A Luxury Editorial Fashion Experience

AURELIA is a high-end multi-page luxury fashion website built with a minimalist editorial design approach.  
It features a curated storefront, collection showcase, contact page, and an AI-powered concierge built with FastAPI.

---

## ✨ Features

- 🖤 Luxury Minimalist Editorial UI
- 🛍 Shop / Collections Page
- 📖 About (Editorial Style Page)
- 📩 Contact Page
- 🤖 AI Concierge (FastAPI Backend)
- 💎 Limited Quantity Product Highlight
- 📱 Fully Responsive Design
- ⚡ Smooth UI Animations
- 🛒 Shopping Cart UI

---

## 🎨 Design System

- **Primary Color:** Obsidian `#0A0A0A`
- **Accent:** Soft Ivory / Neutral Beige
- **Typography:** Elegant Serif + Modern Sans-serif
- **Layout:** Clean Grid-Based Editorial Structure
- **Style:** Minimal, Luxury, High-Fashion Inspired

---

## 🏗 Project Structure
AURELIA/
│
├── frontend/
│ ├── index.html
│ ├── shop.html
│ ├── about.html
│ ├── contact.html
│ ├── css/
│ └── js/
│
├── backend/
│ ├── main.py (FastAPI)
│ ├── routes/
│ ├── models/
│ └── requirements.txt
│
└── README.md

---

## 🚀 Tech Stack

### Frontend
- HTML5
- CSS3 (Custom Styling / Editorial Layout)
- JavaScript (Vanilla JS / Optional React Version)

### Backend
- Python
- FastAPI
- Uvicorn
- OpenAI API (for AI Concierge)

---

## 🤖 AI Concierge

The AI Concierge helps users:
- Get fashion recommendations
- Ask about product details
- Get styling suggestions
- Navigate collections

### Run Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
