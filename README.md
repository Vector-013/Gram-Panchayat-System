# Gram Panchayat Management System - Developer Setup

This README covers the installation and configuration steps needed for developers working on the Gram Panchayat Management System. Follow these instructions to set up the FastAPI backend and the React (Vite + TypeScript) frontend.

---

## Prerequisites

### Backend
- **Python 3.10+**
- **PostgreSQL** (installed and running)
- Virtual environment (recommended)

### Frontend
- **Node.js** (v22.14.0 or later)
- **npm** (v11+)
- **Vite** with React + TypeScript

*Tip: Use [nvm](https://github.com/nvm-sh/nvm) to manage and update your Node.js version.*

---

## Backend Setup

1. **Clone the Repository & Navigate:**
   ```bash
   git clone https://github.com/yourusername/gram-panchayat-system.git
   cd gram-panchayat-system/backend
   ```

2. **Create & Activate a Virtual Environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies:**
   ```bash
   pip3 install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv
   ```

4. **Configure Database:**
   Edit database.py or create a `.env` file with your PostgreSQL credentials.
   ```ini
   DB_HOST=your_db_host
   DB_PORT=5432
   DB_NAME=your_db_name
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   ```

5. **Run the Backend Server:**
   ```bash
   python3 main.py
   ```

   The backend will be available at http://localhost:8000/.

## Frontend Setup

1. **Clean Up Old React App (if present):**
   ```bash
   rm -rf gram-panchayat-frontend
   ```

2. **Upgrade Node and npm:**
   
   Check your versions:
   ```bash
   node -v
   npm -v
   ```
   
   If necessary, install the latest LTS version using nvm:
   ```bash
   nvm install --lts
   nvm use --lts
   ```
   
   Update npm to the latest version:
   ```bash
   npm install -g npm@latest
   ```

3. **Create a New React App with Vite (TypeScript Template):**
   ```bash
   npm create vite@latest gram-panchayat-frontend --template react-ts
   cd gram-panchayat-frontend
   npm install
   ```

4. **Configure Vite Proxy (Optional but Recommended):**
   
   Edit vite.config.ts to forward API requests to your backend:
   ```ts
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';

   export default defineConfig({
     plugins: [react()],
     server: {
       proxy: {
         '/api': {
           target: 'http://localhost:8000',
           changeOrigin: true,
           rewrite: (path) => path.replace(/^\/api/, '')
         }
       }
     }
   });
   ```

5. **Start the Frontend Development Server:**
   ```bash
   npm run dev
   ```
   
   Your React app will run at http://localhost:5173/.

## Additional Notes

- **Temporary Changes in Backend:**
  The POST endpoints currently use a rollback strategy (i.e., `db.rollback()`) for testing. To persist changes, replace `db.rollback()` with `db.commit()` in your CRUD functions.

- **Clearing npm Cache (if needed):**
  ```bash
  npm cache clean --force
  ```

- **Verify:**
  - Backend API Docs: http://localhost:8000/docs
  - Frontend App: http://localhost:5173

Happy hacking and enjoy building the Gram Panchayat Management System!
