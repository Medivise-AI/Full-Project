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

### Install Docker

1. Download Docker Desktop: [https://www.docker.com/get-started](https://www.docker.com/get-started)
2. Install and **open Docker Desktop**. Make sure the Docker icon is running in your system tray.

> Docker is required to run the PostgreSQL database easily.


### Start PostgreSQL using Docker

```bash
docker compose up -d
```

> This will start PostgreSQL at `localhost:5432` 



### 2️⃣ Install dependencies

```bash
npm install
cd client
npm install
cd ..
cd server
npm install
cd ..


```

### 3️⃣ Create a `.env` file inside the `server` folder

```
from .env.example
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
2. Mohammad Alzyoud - Frontend Developer
3. Hasan Alqadri - Frontend Developer
