# Portfolio Website - Setup Instructions

## 📁 Files Included

- `index.html` - Main portfolio page
- `projects.html` - Projects showcase page
- `styles.css` - Complete stylesheet with 3D background effects
- `script.js` - Main JavaScript for navigation and interactions
- `projects.js` - JavaScript for project filtering functionality

## 🖼️ Profile Image Setup

**IMPORTANT:** Save your profile photo as `PASSPORT_SIZE_PHOTO.jpg` in the same directory as the HTML files.

The image should be:
- Named exactly: `PASSPORT_SIZE_PHOTO.jpg`
- Placed in the root folder alongside `index.html`
- Recommended dimensions: 500x500px or larger (square format works best)

## 🚀 Quick Start

1. Extract all files to a folder
2. Save your profile photo as `PASSPORT_SIZE_PHOTO.jpg` in the same folder
3. Open `index.html` in your web browser

## ✨ Features Implemented

### Main Page (index.html)
- ✅ Hero section with integrated profile image
- ✅ Removed trailing cursor from "View My Work" button
- ✅ Bio section with corrected line order:
  - Diploma → CSE → Lateral Entry
  - Embedded Root (immediately following)
- ✅ Updated graduation year to RVCE '28
- ✅ Contact email set to raptorparik2006@gmail.com
- ✅ IEEE Access paper section (ready for content)
- ✅ Projects section removed from main page
- ✅ Navigation updated to route to projects.html

### Projects Page (projects.html)
- ✅ Standalone page with matching light/cream 3D background
- ✅ Secondary sub-navbar with three categories:
  - AI-Security
  - Systems Optimization
  - Edge/Privacy-Preserving Tech
- ✅ Project cards with category filtering
- ✅ Seamless theme consistency
- ✅ Active filtering with smooth animations

### Design Features
- ✅ Light/cream 3D background with animated grid
- ✅ Smooth transitions between pages
- ✅ Responsive design for mobile, tablet, and desktop
- ✅ Sticky navigation with scroll effects
- ✅ Category-based project filtering
- ✅ Professional card-based layouts
- ✅ Fade-in animations on scroll

## 🎨 Customization

### Adding New Projects

In `projects.html`, add new project cards following this structure:

```html
<div class="project-card" data-category="ai-security">
    <div class="project-header">
        <div class="project-tag ai-security">AI-Security</div>
        <h3 class="project-title">Your Project Name</h3>
    </div>
    <p class="project-description">
        Your project description here.
    </p>
    <div class="project-tech">
        <span class="tech-tag">Technology 1</span>
        <span class="tech-tag">Technology 2</span>
    </div>
    <div class="project-status">
        <span class="status-indicator active"></span>
        <span>Status</span>
    </div>
</div>
```

**Available categories:** `ai-security`, `systems`, `edge`

**Available status indicators:** `active`, `research`, `planning`

### Updating Colors

Edit the CSS variables in `styles.css` (lines 7-25):

```css
:root {
    --bg-primary: #faf8f5;
    --accent-primary: #4a90e2;
    /* etc. */
}
```

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
