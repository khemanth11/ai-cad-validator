# CAD Copilot AI - Real-Time Design Intelligence

**Transforming CAD validation from a reactive bottleneck into a proactive AI assistant.**

CAD Copilot AI is a web-based, AI-driven CAD validation platform originally built as a prototype for the Varroc Eureka 3.0 Hackathon. It integrates rule-based physical checking (clearances, constraints) with pure AI-powered report generation to catch manufacturing flaws instantly.

## 🚀 Features

* **Real-Time 3D Model Viewer:** Powered by `@react-three/fiber` and `three-stdlib`. Spin, pan, and visually inspect 3D models right in your browser.
* **Real File Uploads (New in Phase 1!):** Upload actual `.stl` or `.glb` files and see them rendered instantly in metallic shaders dynamically tracking bounds. 
* **Hybrid Validation Engine:** 
  * **Rule-Based:** Hard deterministic checks natively handle naming conventions, constraints (Degrees of Freedom), and minimum geometric clearance gaps.
  * **AI Analysis:** Uses ultra-fast `Groq-sdk` LLM routing to break down rule failures and output actionable, human-readable engineering suggestions.
* **Automated PDF Reporting:** One-click generation of professional engineering reports including component metrics and AI evaluation via `jsPDF`.
* **Sleek Premium Dashboard:** Built natively on Next.js leveraging custom CSS variables, glassmorphism, and a high-end dark design system.

## 🛠️ Tech Stack
* **Frontend Framework:** Next.js (App Router)
* **3D Rendering:** Three.js, React Three Fiber, React Three Drei
* **Intelligence / AI:** Groq API (Llama-3 model)
* **Styling:** Custom Vanilla CSS (Dark Engineering UI)
* **Exports:** jsPDF

## 💻 Running the Project Locally

### 1. Install Dependencies
Make sure you have Node installed. Clone the repository and run:
```bash
npm install
```

### 2. Configure the Environment
To use the AI-powered reporting tools, you need a Groq API Key. 
Create a file named `.env.local` in the root of the project:
```bash
GROQ_API_KEY=your_actual_groq_api_key_here
```

### 3. Start the Development Server
```bash
npm run dev
```

Navigate to `http://localhost:3000` in your web browser. 

---

## 🗺️ Future Roadmap

* **Phase 1 (In Progress):** Upgrading from dummy bounding boxes to extracting actual coordinate bounds directly from uploaded mesh geometries.
* **Phase 2:** Native CAD plugin extensions (Fusion 360 / SolidWorks / AutoCAD).
* **Phase 3:** Custom validation-rule editor for enterprise-specific manufacturing thresholds.
* **Phase 4:** Cloud database structures for team collaboration and longitudinal history analytics.
