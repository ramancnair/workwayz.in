# Workwayz.in Website & Showcase Portal

Official marketing showcase, product portal, and interactive user documentation for **Workwayz** — the open, intelligent project and portfolio management operating system for engineering teams.

---

## 🌟 What's Included

- **`index.html`**: The high-converting, modern SaaS landing page featuring:
  - Dynamic interactive Quickstart terminal switcher (`npx`, `docker`, `docker compose`, `git clone`)
  - Real-time product mockup showcase embedding actual high-resolution UI views
  - Problem & Solution engineering comparison (Legacy PPM vs Issue Trackers vs Workwayz)
  - Interactive Feature Tabs (AI Scoping & Estimation, Architectural Agile, Fixed-Bid & T&M Financials, QA Governance & Defect Leakage, RAID & BCP Vault, Resource Availability)
  - Head-to-Head Comparison Matrix (Workwayz vs Jira vs Linear vs ClickUp vs Spreadsheets)
  - 3-Minute Setup Wizard Visual Guide
  - Full-resolution screenshot lightbox dialog
  - Interactive FAQ Accordion
  - Responsive mobile navigation drawer
- **`docs.html`**: Online interactive reference manual covering all 6 core modules from the 57-page user manual:
  - 1. Setup Wizard (Supabase, Firebase, SuperAdmin, Pluggable AI: Gemini, Claude, ChatGPT, Ollama)
  - 2. User Lifecycle, Resource Pools, Utilization Heatmaps & Leave Reflections
  - 3. AI Scoping (Tech Stack Blueprints, Agile Horizontals, Benchmark Effort Estimator)
  - 4. Project Execution (PM Dashboard, Capacity Planning, Release Trains, Story Point-to-Hour Converter, Sub-Tasks Matrix, Grooming Board, Dual Kanban)
  - 5. QA & Testing (SIT/UAT/Prod Test Plans, Defect Leakage & Story Coverage, Defect Triage Board)
  - 6. Financials & Billing (Fixed-Bid Milestones & Invoicing, Time & Material Monthly Ledgers)
  - 7. Governance (RAID Dashboard, PMO Document Gateways, BCP Disaster Recovery Vault, 6-Role RBAC Matrix, 30-Day Trash Restoration)
- **`assets/`**:
  - `logo-horizontal.png` & `logo-horizontal-white.png`: Official Workwayz logo variants
  - `logo-icon.png` & `logo-symbol.png`: Standalone brand marks
  - `favicon.ico`, `favicon-32x32.png`, `apple-touch-icon.png`: Retina browser icons
  - `ui/`: 70+ crystal-clear, extracted high-definition UI screenshots of Workwayz
- **`CNAME`**: Configured for `workwayz.in` for instant one-click GitHub Pages deployment.

---

## 🚀 Local Development & Preview

You can preview the site immediately with any local HTTP server:

```bash
# Option 1: Python built-in server
python -m http.server 8080

# Option 2: Node / NPX
npx serve .
```

Then visit: `http://localhost:8080` (or the port specified).

---

## 🔗 Customizing Your Links

When you are ready to publish your app to GitHub, Docker Hub, and NPM, simply update the URLs in `index.html` and `docs.html`:

| Service | Current Placeholder | Update In |
| :--- | :--- | :--- |
| **GitHub Repo** | `https://github.com/ramancnair/Workwayz` | `index.html` (lines 48, 86, 280, 420) & `docs.html` |
| **Docker Hub** | `workwayz/app:latest` | `assets/js/main.js` (line 21) & `index.html` |
| **NPM Package** | `npx workwayz@latest` | `assets/js/main.js` (line 15) & `index.html` |
| **Support / Email** | `contact@workwayz.in` | Footer section |

---

## 🌐 Deploying to Workwayz.in

### Method 1: GitHub Pages (Recommended & Free)
1. Initialize git in this directory:
   ```bash
   git init
   git add .
   git commit -m "Initial Workwayz website launch"
   ```
2. Create a repository on GitHub (e.g. `your-username/workwayz.in` or as the `gh-pages` branch of your main repo).
3. Push to GitHub and go to **Settings &rarr; Pages**.
4. Set source to `main` branch.
5. In your domain registrar (where you bought `Workwayz.in`), add the DNS records for GitHub Pages:
   - **A Records** pointing to:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **CNAME Record**: `www` &rarr; `<your-github-username>.github.io`

### Method 2: Vercel / Cloudflare Pages / Netlify
1. Connect your repository to Vercel or Cloudflare Pages.
2. Framework Preset: **Other / Static HTML**.
3. Output Directory: `.` (root).
4. Add custom domain `workwayz.in`.

---

&copy; 2026 Workwayz. All rights reserved.
