# Medivise AI

**AI-Powered Doctor Assistant for Medical Analysis**

Medivise AI is a full-stack web application designed to assist doctors in interpreting lab results more accurately. It combines **AI-powered text analysis** with patient **medical history** to deliver precise and context-aware medical summaries.

By leveraging modern web technologies and artificial intelligence, Medivise AI helps healthcare professionals save time, reduce diagnostic errors, and focus more on patient care.

---

## 🚀 Features

* 🧾 **Upload and analyze lab reports (PDF)**
* 🤖 **AI-based interpretation** that considers the patient’s full medical history
* 🧍‍♂️ **Patient management system** for doctors
* 🧩 **Integrated backend and frontend**
* 🔐 **Authentication and token-based access control**
* 💬 **Smart summaries** highlighting abnormalities and recommendations

---

## 🧩 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* PostgreSQL
* JWT (Authentication)
* pdf-extraction
* Google Generative AI (Gemini API)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Medivise-AI/Full-Project.git
cd Full-Project
```

### 2️⃣ Install dependencies

```bash
npm install
cd client && npm install
cd server && npm install

```

### 3️⃣ Create a `.env` file inside the `server` folder

```
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

### 4️⃣ Run the project

In the main directory:

```bash
npm run dev
```

This will run both the **frontend** and **backend** concurrently.

* Frontend runs on **[http://localhost:3000](http://localhost:3000)**
* Backend runs on **[http://localhost:5000](http://localhost:5000)**

---

## 🧠 How It Works

1. Doctor logs in using secure JWT authentication.
2. Uploads patient lab results (PDF format).
3. AI extracts the text and cross-references it with the patient’s **medical history**.
4. The system generates a **concise, intelligent summary** highlighting key findings and possible next steps.

---


## Team Members
1. Fayez Abu Hajar - Backend Developer (Team leader)
2. Mohammad Alzyoud - Frontend Developer and API Integration
3. Hasan Alqadri - Frontend Developer
