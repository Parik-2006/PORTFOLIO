# Parikshith's Portfolio

A **full-stack portfolio website** built with modern web technologies, featuring an AI-powered contact form with MongoDB backend integration.

**Live:** [parikshith.dev](https://parikshith.dev)  
**Repo:** [github.com/Parik-2006/PORTFOLIO](https://github.com/Parik-2006/PORTFOLIO)

---

## 🛠️ Tech Stack

### Frontend
- **Vite** - Lightning-fast build tool
- **React** (vanilla JS) - Rich interactivity
- **Tailwind CSS** - Utility-first styling
- **Three.js** - 3D background animations
- **PostCSS** - CSS processing

### Backend
- **Node.js + Express** - REST API server
- **MongoDB** - Document database for contact messages
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

---

## 📋 Project Structure

```
PORTFOLIO/
├── index.html              # Home page
├── projects.html           # Projects showcase
├── public/                 # Static assets
├── src/
│   ├── main.js            # Frontend logic & contact form
│   ├── style.css          # Main styles
│   └── ...
├── backend/               # Express + MongoDB API
│   ├── server.js          # REST endpoints
│   ├── package.json       # Dependencies
│   ├── .env               # (local only, not in git)
│   └── README.md          # Backend setup guide
├── .gitignore             # Clean repo (no lock files, .env)
└── vite.config.js         # Vite configuration
```

---

## 🚀 Quick Start

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
