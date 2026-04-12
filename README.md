# Parikshith's Portfolio — Full-Stack Developer Platform

> **A Production-Ready Full-Stack Portfolio Website.**
> *Built with Modern Web Technologies, Real-Time Contact Management, and Professional Monorepo Architecture.*

---

**📍 Live Demo:** [devportfolio-livid-three.vercel.app](https://devportfolio-livid-three.vercel.app/)  
**🔗 Repository:** [github.com/Parik-2006/PORTFOLIO](https://github.com/Parik-2006/PORTFOLIO)  
**📊 Backend API:** [portfolio-1zzj.onrender.com](https://portfolio-1zzj.onrender.com)

---

## 📖 Project Objective

Modern developers need more than a static portfolio—they need a **working platform** that demonstrates:
- ✅ **Full-Stack Expertise** (Frontend + Backend + Database)
- ✅ **Production-Ready Code** (Deployed & Live)
- ✅ **Real-World Integration** (Contact Form with Message Management)
- ✅ **Modern Architecture** (Monorepo, Microservices Pattern)

**The Solution:**  
A **full-stack portfolio website** that serves as both a personal brand and a functional application. Every visitor interaction is saved to a **persistent MongoDB database**, demonstrating real backend competency.

---

## 🛠️ Complete Tech Stack Breakdown

### **Frontend Architecture**
| Technology | Purpose | Role |
|-----------|---------|------|
| **Vite** | Lightning-fast ES module bundler | Build optimization & HMR |
| **Vanilla JavaScript** | Core interactivity (ES6+) | No framework overhead |
| **HTML5 + CSS3** | Semantic markup & styling | Accessibility & SEO |
| **Tailwind CSS** | Utility-first CSS framework | Responsive design system |
| **PostCSS** | CSS transformations | Cross-browser compatibility |
| **Three.js** | WebGL 3D library | Animated background geometries |
| **Fetch API** | Async HTTP requests | Real-time form submissions |
| **Chart.js (optional)** | Data visualization | Analytics dashboard ready |

**Frontend Deployment:** Vercel (Automatic CI/CD from GitHub)

---

### **Backend Architecture**
| Technology | Purpose | Role |
|-----------|---------|------|
| **Node.js** | JavaScript runtime | Server execution environment |
| **Express.js** | Minimalist web framework | REST API routing & middleware |
| **MongoDB** | NoSQL document database | Persistent message storage |
| **Mongoose (optional)** | Object modeling library | Data schema validation |
| **CORS (express-cors)** | Cross-origin middleware | Frontend-backend communication |
| **dotenv** | Environment variable manager | Secure credential handling |
| **morgan (optional)** | HTTP request logger | Debugging & monitoring |

**Backend Deployment:** Render (Free tier with auto-redeploy)

---

### **DevOps & Infrastructure**
| Service | Function | Tier |
|---------|----------|------|
| **GitHub** | Version control & CI/CD trigger | Free (Public Repo) |
| **Vercel** | Frontend hosting & deployment | Free (Auto-deploy on push) |
| **Render** | Backend hosting & deployment | Free ($5/month credits) |
| **MongoDB Atlas** | Cloud database | Free (M0 - 512MB) |

---

## 🏗️ Monorepo Architecture

```
PORTFOLIO/                          Root Directory
│
├── frontend/                       📱 Frontend Application
│   ├── src/
│   │   ├── main.js                 Main app logic & contact form handler
│   │   ├── projects.js             Project filtering & navigation
│   │   ├── script.js               Utility functions
│   │   ├── style.css               Global styles
│   │   └── styles.css              Component-specific styles
│   ├── index.html                  Home page (hero, about, skills)
│   ├── projects.html               Projects showcase (filterable)
│   ├── package.json                Frontend dependencies & scripts
│   ├── vite.config.js              Vite build configuration
│   ├── tailwind.config.js          Tailwind CSS customization
│   ├── postcss.config.js           PostCSS plugins
│   └── PASSPORT_SIZE_PHOTO.jpg     Profile image asset
│
├── backend/                        🔧 Backend API Server
│   ├── server.js                   Express server & API routes
│   ├── package.json                Backend dependencies & scripts
│   ├── .env.example                Environment variables template
│   ├── .gitignore                  Git ignore rules
│   └── README.md                   Backend setup documentation
│
├── README.md                       📚 This file (Project docs)
├── .gitignore                      🚫 Global git ignore
└── .git/                           📦 Git repository
```

---

## 🌍 Real-World Use Cases

| Scenario | The Challenge | The Portfolio Solution |
| :--- | :--- | :--- |
| **Hiring Manager Reviews Portfolio** | Static portfolio shows past work, not live capability | **Live Form:** Submit message → Saved to MongoDB in real-time |
| **Developer Demonstrates Skills** | "I know both frontend & backend" | **Proof:** Same repo deploys frontend on Vercel + backend on Render |
| **Scalability Concern** | Can this handle production? | **Answer:** Yes—follows microservices pattern, deployed on industry-standard platforms |
| **Data Persistence** | How do you manage user data? | **MongoDB Integration:** All submissions stored, queryable, analyzable |

---

## 📊 Data Flow Architecture

```
┌─────────────────────────────────────────────────┐
│  User's Browser                                 │
│  https://devportfolio-livid-three.vercel.app/  │
└────────────┬────────────────────────────────────┘
             │
             │ 1. User fills contact form
             │ 2. Client-side validation (email format, required fields)
             │
┌────────────▼────────────────────────────────────┐
│  Frontend (Vercel)                              │
│  - Vite build optimized                         │
│  - Three.js animations                          │
│  - Fetch API → POST /api/contact                │
└────────────┬────────────────────────────────────┘
             │
             │ 3. CORS-enabled HTTP POST request
             │
┌────────────▼────────────────────────────────────┐
│  Backend API (Render)                           │
│  https://portfolio-1zzj.onrender.com            │
│  - Express.js routing                           │
│  - Request validation & sanitization            │
│  - MongoDB insert operation                     │
└────────────┬────────────────────────────────────┘
             │
             │ 4. Save to document store
             │
┌────────────▼────────────────────────────────────┐
│  MongoDB Atlas (Cloud Database)                 │
│  Database: portfolio                            │
│  Collection: messages                           │
│  ✅ Message persisted with timestamp            │
└─────────────────────────────────────────────────┘
```

---

## 🚀 How to Run Locally

### **Prerequisites**
- Node.js 18+ (from [nodejs.org](https://nodejs.org/))
- Git (from [git-scm.com](https://git-scm.com/))
- MongoDB URI (from [mongodb.com/atlas](https://mongodb.com/cloud/atlas) - free account)

### **Step 1: Clone Repository**
```bash
git clone https://github.com/Parik-2006/PORTFOLIO.git
cd PORTFOLIO
```

### **Step 2: Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```
**Frontend runs on:** `http://localhost:5173`

### **Step 3: Backend Setup** (New Terminal)
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your MongoDB URI:
# MONGODB_URI=mongodb+srv://username:password@cluster...
npm start
```
**Backend runs on:** `http://localhost:5000`

### **Step 4: Test Contact Form**
1. Open `http://localhost:5173`
2. Scroll to "Contact" section
3. Fill in name, email, message
4. Click "Send Message"
5. Check MongoDB Atlas → Collections → `messages` to see your submission ✅

---

## ☁️ Production Deployment

### **Frontend on Vercel**
1. Push code to GitHub
2. Import repository into [vercel.com](https://vercel.com)
3. Set **Root Directory** to: `frontend`
4. Auto-deploys on every push ✅

### **Backend on Render**
1. Create new Web Service on [render.com](https://render.com)
2. Connect GitHub repository
3. Set environment variables:
   - `MONGODB_URI` = Your MongoDB connection string
4. Build Command: `cd backend && npm install`
5. Start Command: `cd backend && npm start`
6. Deploy ✅

### **Database on MongoDB Atlas**
1. Create free cluster at [mongodb.com/atlas](https://mongodb.com/cloud/atlas)
2. Create database user with credentials
3. Whitelist all IPs (0.0.0.0/0) for development
4. Get connection string → Add to `.env` ✅

---

## 📚 API Documentation

### **POST** `/api/contact`
Submit a contact form message.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, great portfolio!"
}
```

**Response (201):**
```json
{
  "success": true,
  "messageId": "507f1f77bcf86cd799439011",
  "message": "Thanks, John Doe! I'll get back to you soon."
}
```

**Errors:**
```json
{
  "error": "Invalid email address"
}
```

---

### **GET** `/api/messages`
Retrieve all contact form submissions.

**Response:**
```json
{
  "count": 5,
  "messages": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Hello!",
      "submittedAt": "2026-04-12T14:30:00.000Z",
      "status": "new"
    }
  ]
}
```

---

### **GET** `/api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "server": "portfolio-backend"
}
```

---

## 🔒 Security & Best Practices

✅ **Environment Variables:** Secrets in `.env` (never in git)  
✅ **CORS Protection:** Only whitelisted origins allowed  
✅ **Input Validation:** Email format, required field checks  
✅ **No Lock Files:** `package-lock.json` in `.gitignore` for cleaner repo  
✅ **Monorepo Pattern:** Separation of concerns (frontend ≠ backend)  
✅ **Deployment Separation:** Frontend managed by Vercel, Backend by Render  

---

## 📦 Git Repository Strategy

**What's Tracked:**
- ✅ Source code (`.js`, `.html`, `.css`)
- ✅ Configuration files (`package.json`, `vite.config.js`)
- ✅ Documentation (`README.md`, `.env.example`)

**What's NOT Tracked (`.gitignore`):**
- ❌ `node_modules/` (generated by `npm install`)
- ❌ `package-lock.json` (reproducible via `package.json`)
- ❌ `.env` (contains secrets)
- ❌ `dist/` (generated build output)

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| `Failed to connect to MongoDB` | Check `.env` MONGODB_URI is correct |
| `CORS error in browser console` | Ensure backend is running on port 5000 |
| `Form says "Connection error"` | Start backend: `cd backend && npm start` |
| `Vercel build fails` | Ensure Root Directory is set to `frontend` |
| `Render build fails` | Ensure Build Command is `cd backend && npm install` |
| `Port 5000 already in use` | Kill process or change PORT in `.env` |

---

## 📄 License

This project is for personal portfolio purposes. Feel free to learn from the architecture!

---

## 🤝 Contributing & Issues

This is a **personal project** but contributions are welcome!

- **🐛 Found a bug?** [Open an Issue](https://github.com/Parik-2006/PORTFOLIO/issues/new)
- **💡 Improvement idea?** [Create a Discussion](https://github.com/Parik-2006/PORTFOLIO/discussions)
- **🔧 Want to contribute?** Fork → Create feature branch → Submit PR

---

## 📞 Contact & Connect

- **Portfolio:** [devportfolio-livid-three.vercel.app](https://devportfolio-livid-three.vercel.app/)
- **Email:** raptorparik2006@gmail.com
- **GitHub:** [@Parik-2006](https://github.com/Parik-2006)
- **LinkedIn:** [parikshith](https://linkedin.com/in/parikshith)
- **Instagram:** [@parik_2006](https://instagram.com/parik_2006)

---

## 🎓 Built By

**Parikshith** — CSE Student @ R.V. College of Engineering (Class of 2028)

*"Building production-grade systems that solve real problems."*

---

**⭐ If you found this helpful, consider starring the repo!**

### 1. Clone Repository
```bash
git clone https://github.com/Parik-2006/PORTFOLIO.git
cd PORTFOLIO
```

### 2. Frontend Setup
```bash
npm install
npm run dev
```
Runs on **http://localhost:5173**

### 3. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# ← Edit .env with your MongoDB URI
npm start
```
Runs on **http://localhost:5000**

### 4. Test Contact Form
1. Fill contact form on portfolio
2. Submit message
3. Check MongoDB Atlas → Collections → `messages`

---

## 📚 Documentation

### Backend API
See [backend/README.md](backend/README.md) for:
- API endpoints
- MongoDB setup (Atlas)
- Deployment options
- Environment variables

### Key Scripts

**Frontend:**
```bash
npm run dev      # Development server with hot reload
npm run build    # Production build → dist/
npm run preview  # Preview production build
```

**Backend:**
```bash
npm start        # Production server
npm run dev      # Development with nodemon auto-reload
```

---

## 🔐 Environment Variables

**Frontend:** No env vars needed (client-side only)

**Backend:** Create `backend/.env`
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=YourApp
PORT=5000
```

**Never commit `.env`** — it's in `.gitignore` for security! ✅

---

## 📝 Contact Form Flow

```
User fills form (frontend)
    ↓
Validations (email format, required fields)
    ↓
POST request to http://localhost:5000/api/contact
    ↓
Backend validates & sanitizes
    ↓
Inserts into MongoDB collection 'portfolio.messages'
    ↓
Returns success response to frontend
    ↓
Success message shown to user ✅
```

**View all messages:**
```bash
curl http://localhost:5000/api/messages
```

---

## 🚢 Deployment

### Frontend (Vercel, Netlify, GitHub Pages)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Railway, Render, Heroku)
1. Connect GitHub repo
2. Set `MONGODB_URI` environment variable
3. Deploy!

---

## 📦 Dependencies

**Why no lock files in git?**
- `package.json` uniquely identifies versions
- Lock files cause merge conflicts
- Reproducible installs with just `npm install`
- Cleaner repository

---

## 🎯 Features

✅ **Full-stack contact form** with MongoDB  
✅ **Clean git repository** (no lock files, .env)  
✅ **Responsive design** (mobile-first)  
✅ **3D background animations** (Three.js)  
✅ **Real-time form validation**  
✅ **Error handling** (connection failures, validation)  
✅ **Secure credentials** (never in git)  

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| `Failed to connect to MongoDB` | Check `.env` has correct URI |
| `CORS error` | Backend must be running on port 5000 |
| `Form says "Connection error"` | Start backend with `npm start` in `backend/` |
| `Messages not saving` | Verify MongoDB cluster is active & network access allowed |
| `Port 5000 already in use` | Kill process or change PORT in `.env` |

---

## 📞 Contact

- **Email:** raptorparik2006@gmail.com
- **Instagram:** [@parik_2006](https://instagram.com/parik_2006)
- **LinkedIn:** [parikshith](https://linkedin.com/in/parikshith)

---

## 📄 License

Open source — feel free to fork & learn!

**Built with ❤️ by Parikshith**

## 📱 Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## 🔗 Navigation Structure

```
index.html (Main Portfolio)
├── Home
├── About
├── Research
├── Contact
└── Projects → projects.html

projects.html (Projects Showcase)
├── All Projects (default)
├── AI-Security
├── Systems Optimization
└── Edge/Privacy-Preserving Tech
```

## 🎯 Key Implementation Details

1. **No trailing cursor**: The "View My Work" button uses standard button styling without cursor effects
2. **Bio ordering**: "Embedded Root" now appears directly after "Diploma → CSE → Lateral Entry"
3. **Seamless transitions**: Both pages share the same 3D background and color scheme
4. **Category filtering**: Smooth animations when switching between project categories
5. **Responsive**: Fully functional on all device sizes

## 📝 Notes

- The IEEE Access paper section is included but left blank as requested
- All navigation links are functional and properly routed
- The 3D background effect animates subtly for a modern feel
- Project cards include status indicators (active, research, planning)

## 🛠️ Future Enhancements

You can easily add:
- Links to live project demos
- GitHub repository links
- Project images/screenshots
- More detailed project pages
- Blog section
- Skills visualization

---

**Built with:** HTML5, CSS3, Vanilla JavaScript  
**Theme:** Light/Cream 3D Modern Design  
**Responsive:** Mobile-first approach
