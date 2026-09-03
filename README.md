<p align="center">
  <img src="public/app-icon.png" width="120" height="120" alt="Dayboxd Logo" />
</p>

<h1 align="center">Dayboxd — Showcase & Download Website</h1>

<p align="center">
  <strong>The official product showcase, interactive preview, and APK download portal for Dayboxd.</strong><br>
  <em>Designed with a refined minimalist aesthetic, 56px typography hierarchy, and restrained accents.</em>
</p>

<p align="center">
  <a href="https://github.com/parthpatyl/dayboxd-web/releases/latest">
    <img src="https://img.shields.io/github/v/release/parthpatyl/dayboxd-web?color=00e054&label=Download%20APK&logo=android" alt="Download APK" />
  </a>
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT" />
</p>

---

## 🎨 Design Philosophy

The Dayboxd showcase website is crafted around intentionality and restraint:
1. **56px Typography Scale:** Clean, expressive headers with generous vertical rhythm and breathing room.
2. **Color Restraint:** Pure grayscale surface layering (`#14181c`, `#1c222b`) with neon emerald (`#00e054`) reserved strictly for interactive highlights.
3. **Intentional Grid Structure:**
   - **How it Works (2-Column):** 3-step walk-through paired with an interactive 2:3 day card mockup.
   - **Designed for Cinephiles (3-Column):** Clean feature highlights for rating precision, poster galleries, and analytics.
   - **Privacy First (Centered):** Direct commitment to on-device zero-telemetry storage.
4. **Dual Themes:** Seamless toggle between *Cinema Dark* and *Editorial Light*.

---

## 📱 Standalone APK Distribution

This repository packages and serves the latest compiled **Dayboxd Android APK** directly:
- **Direct Download:** [`public/downloads/dayboxd-app.apk`](public/downloads/dayboxd-app.apk)
- **GitHub Releases:** [Download from Releases](https://github.com/parthpatyl/dayboxd-web/releases/latest)

---

## 🛠️ Project Structure

```
dayboxd-web/
├── public/
│   ├── app-icon.png       # 3D Squircle Logo
│   └── downloads/
│       └── dayboxd-app.apk# Bundled Android installation package
├── src/
│   ├── App.tsx            # Minimalist landing view & APK download trigger
│   ├── index.css          # Tailwind CSS v4 design tokens & theme layers
│   └── main.tsx           # React DOM root entry
├── index.html             # Clean metadata & favicon configuration
├── vite.config.ts         # Vite build configuration (Port 5174)
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/parthpatyl/dayboxd-web.git
cd dayboxd-web
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The site will run at `http://localhost:5174`.

### 4. Build for Production
```bash
npm run build
```
The static build will be generated in `dist/`, ready for zero-config deployment to Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

---

## 🌐 Deploy to Cloud Providers

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
