# 🛡️ DDR AI — Intelligent Diagnostic Report Generation

An award-winning, premium, AI-powered diagnostic and thermal analysis platform. DDR AI simplifies property inspection workflows by automatically parsing structural, mechanical, and thermal PDF reports, extracting findings with GPT-4, assessing risk severity, and generating client-ready interactive dashboards and downloadable files (PDF, Excel, JSON).

---

## ✨ Features

- **📂 Multi-Format Ingestion:** Seamless drag-and-drop ingestion of inspection reports (PDF, CSV, TXT, DOCX) with precise multi-column text extraction.
- **🧠 Advanced AI Diagnostic Engine:** Integrates with OpenAI GPT-4o-mini to automatically synthesize observations, root-cause assessments, and risk ratings.
- **🔥 Deep Thermal Mapping:** Dedicated thermal imaging support that extracts infrared anomalies, identifies extreme temperatures, and rates structural risks.
- **📊 Real-time Executive Summaries:** Instant, intuitive metrics (Risk Score, Action Priorities, Technical Observations).
- **📋 Dual-Mode Client Exports:** One-click, beautiful file exports including fully-styled Excel worksheets, vector-based PDFs, or pure structured JSON.
- **✨ Immersive Visual Interface:** Ultra-modern 3D-perspective mouse-rotation cards, interactive radial tracking spotlight borders, and magnetic physical hover elements wrapped in an absolute pitch-black SaaS dark mode.

---

## 🛠️ Technical Architecture

### **Backend (Async FastAPI Service)**
- **Framework:** `FastAPI` (Python 3.10+) with `Uvicorn` for high-throughput, async non-blocking operations.
- **ORMs & Storage:** Async `SQLAlchemy` (v2.0+) + `aiosqlite` / `asyncpg` (SQLite/PostgreSQL drivers) for lightweight local sandbox or enterprise databases.
- **Extraction Pipelines:** `PyMuPDF` (fitz) + `pdfplumber` + `Pillow` for precise document parsing.
- **Export Engines:** `ReportLab` (PDF canvas building) + `openpyxl` (Excel sheet layouts).

### **Frontend (Next.js App Router)**
- **Framework:** `Next.js 14` with Server Components and static-route optimizations.
- **Aesthetics & Motion:** `TailwindCSS` (design tokens) + `Framer Motion` (GPU-accelerated vector transitions & 3D coordinate rigging).
- **Icons:** `Lucide React`.

---

## 🚀 Installation & Local Development

### 1. Prerequisites
- [Python 3.10+](https://python.org/)
- [Node.js 18+](https://nodejs.org/)
- [Git](https://git-scm.com/)

---

### 2. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   # Windows (PowerShell)
   python -m venv venv
   .\venv\Scripts\Activate.ps1

   # macOS / Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the `backend` folder:
   ```env
   # Storage path for uploaded reports
   STORAGE_PATH=./storage

   # SQLite local database connection
   DATABASE_URL=sqlite+aiosqlite:///./ddr_reports.db

   # OpenAI API Key (leave empty to run in sandbox simulation mode)
   OPENAI_API_KEY=your_openai_api_key_here
   ```

5. Run the async API backend server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   *Your backend API documentation will be available at [http://localhost:8000/docs](http://localhost:8000/docs).*

---

### 3. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` configuration file inside the `frontend` folder:
   ```env
   # API endpoint of the FastAPI backend
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

4. Spin up the modern Next.js hot-reloaded dev server:
   ```bash
   npm run dev
   ```
   *Open [http://localhost:3000](http://localhost:3000) to view your new premium site.*

---

## 🗺️ Key API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status check. |
| `POST` | `/api/upload` | Ingests PDF/docx, parses text, runs OpenAI analysis, and saves SQLite report. |
| `GET` | `/api/reports` | Fetches list of all generated diagnostic reports. |
| `GET` | `/api/reports/{id}` | Fetches detailed findings, thermal anomalies, and risk score for a single report. |
| `GET` | `/api/export/json/{id}` | Download report as structural JSON. |
| `GET` | `/api/export/pdf/{id}` | Generate and download vector-based ReportLab PDF. |
| `GET` | `/api/export/excel/{id}` | Generate and download styled OpenPyXL spreadsheet. |

---

## 🌍 Production Deployment

### **Backend (FastAPI)**
- Can be deployed directly to [Render](https://render.com/), [Fly.io](https://fly.io/), or inside a [Docker](https://www.docker.com/) container.
- Make sure to mount a persistent disk volume for `STORAGE_PATH` to prevent uploaded PDF loss across container cycles, and use a production Postgres database URL in `DATABASE_URL`.

### **Frontend (Next.js)**
- Best deployed to [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).
- Ensure the production URL of your backend is set in the `NEXT_PUBLIC_API_URL` environment variable during the build step.

---

## 🔒 Security & Performance Guidelines
- **GPU Acceleration:** All 3D vector animations utilize native CSS layers and lightweight Framer Motion physics to guarantee solid 60fps on mobile.
- **Upload Guards:** Multi-level file constraints block empty payloads or files exceeding `50MB` to avoid backend resource starvation.
- **Sanitization Pipeline:** Files are automatically renamed through regular expression utilities to prevent path traversal attacks during disk write.

---

*Crafted with 🖤 for engineers and modern inspectors. Enjoy the beautiful, highly-responsive DDR AI diagnostic experience!*
