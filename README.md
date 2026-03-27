<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/Groq-Cloud-blue?style=for-the-badge" alt="Groq" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</div>

<h1 align="center">🛠️ AI CAD Validator</h1>

<p align="center">
  <strong>An Intelligent, Real-Time 3D CAD Validation platform leveraging AI to automatically inspect models.</strong>
</p>

## 🚀 Overview
**AI CAD Validator** is a high-performance web application designed to automatically inspect, visualize, and validate 3D CAD models. Powered by state-of-the-art WebGL rendering (Three.js) and lightning-fast AI inferencing (Groq Cloud), it provides instant structural insights, detects design anomalies, and generates professional PDF reports for engineers.

---

## ✨ Key Features
- **🌐 Interactive 3D Viewer:** Seamless 3D model visualization directly in the browser using `@react-three/fiber`.
- **🧠 AI-Powered Inspection:** Deep insights and design validation with real-time feedback powered by Groq's high-speed LLM APIs.
- **📄 Instant Reports:** 1-click generation of professional engineering reports in PDF (`jsPDF`) and Presentations (`pptxgenjs`).
- **✨ Fluid UI/UX:** Premium, animated interface powered by `framer-motion`.
- **⚡ Next.js 15+:** Blazing fast rendering and routing.

---

## 💻 Tech Stack
* **Frontend Framework:** Next.js (App Router), React 19
* **Styling & Animations:** Tailwind CSS v4, Framer Motion
* **3D Rendering:** Three.js, React Three Fiber, Drei
* **AI Engine:** Groq SDK
* **Export Utilities:** jsPDF, pptxgenjs, react-markdown

---

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ai-cad-validator.git
cd ai-cad-validator
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory and add your Groq API Key:
```env
GROQ_API_KEY=your_groq_api_key_here
```

### 4. Run the development server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the 3D dashboard in action!

---

## 🤝 Contributing
Contributions are always welcome. Whether fixing a bug, suggesting a feature, or writing documentation — feel free to open an issue or submit a Pull Request.

---

<div align="center">
  <sub>Built for precision and speed.</sub>
</div>
