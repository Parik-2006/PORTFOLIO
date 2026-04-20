import * as THREE from 'three'

// ─── DEVICE DETECTION ─────────────────────────────────────────────────────
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  || (navigator.maxTouchPoints > 0 && window.innerWidth < 768)
const isTouch = navigator.maxTouchPoints > 0 || 'ontouchstart' in window
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ─── THREE.JS BACKGROUND ──────────────────────────────────────────────────
const canvas = document.getElementById('bg-canvas')
const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x000000, 0)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200)
camera.position.set(0, 0, 28)

// ─── MOUSE / GYRO TRACKING ────────────────────────────────────────────────
const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

if (!isTouch) {
  window.addEventListener('mousemove', e => {
    mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2
    mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2
  })
} else {
  // Subtle gyroscope effect on mobile
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', e => {
      if (e.beta !== null && e.gamma !== null) {
        mouse.targetX = (e.gamma / 30) * 0.5
        mouse.targetY = ((e.beta - 45) / 30) * 0.3
      }
    }, { passive: true })
  }
}

// ─── MATERIALS ────────────────────────────────────────────────────────────
const wireMat = new THREE.MeshBasicMaterial({
  color: 0xC9963A,
  wireframe: true,
  transparent: true,
  opacity: isMobile ? 0.12 : 0.18,
})

const ambientLight = new THREE.AmbientLight(0xFDFAF0, 0.6)
scene.add(ambientLight)
const dirLight = new THREE.DirectionalLight(0xD4A843, 0.8)
dirLight.position.set(10, 15, 10)
scene.add(dirLight)

// ─── FLOATING SHAPES ──────────────────────────────────────────────────────
const shapes = []

function createShape(geometry, x, y, z, rotSpeed, floatAmp, floatSpeed) {
  const group = new THREE.Group()
  const wireMesh = new THREE.Mesh(geometry, wireMat.clone())
  wireMesh.material.opacity = Math.random() * 0.15 + 0.08
  group.add(wireMesh)
  group.position.set(x, y, z)
  scene.add(group)
  shapes.push({ group, rotSpeed, floatAmp, floatSpeed, floatOffset: Math.random() * Math.PI * 2, baseY: y })
  return group
}

if (!prefersReducedMotion) {
  if (isMobile) {
    // Reduced shape set for mobile — 4 shapes only
    createShape(new THREE.IcosahedronGeometry(2.2, 0), -12, 5, -10, { x: 0.003, y: 0.005, z: 0.002 }, 1.0, 0.35)
    createShape(new THREE.OctahedronGeometry(1.6, 0), 12, -3, -12, { x: 0.002, y: -0.004, z: 0.003 }, 0.8, 0.42)
    createShape(new THREE.TetrahedronGeometry(1.4, 0), 2, -9, -8, { x: 0.004, y: 0.005, z: 0.002 }, 1.2, 0.55)
    createShape(new THREE.OctahedronGeometry(1.0, 0), -6, -7, -6, { x: 0.005, y: 0.002, z: -0.003 }, 1.5, 0.6)
  } else {
    // Full shape set for desktop
    createShape(new THREE.IcosahedronGeometry(2.8, 0), -14, 6, -8, { x: 0.003, y: 0.005, z: 0.002 }, 1.2, 0.4)
    createShape(new THREE.IcosahedronGeometry(1.6, 0), 16, -4, -12, { x: -0.004, y: 0.003, z: -0.002 }, 0.9, 0.55)
    createShape(new THREE.IcosahedronGeometry(1.2, 0), 6, 10, -10, { x: 0.005, y: -0.003, z: 0.004 }, 1.5, 0.65)
    createShape(new THREE.OctahedronGeometry(2.2, 0), 12, 8, -6, { x: 0.002, y: -0.005, z: 0.003 }, 1.0, 0.5)
    createShape(new THREE.OctahedronGeometry(1.4, 0), -10, -8, -14, { x: -0.003, y: 0.004, z: 0.002 }, 0.8, 0.45)
    createShape(new THREE.OctahedronGeometry(0.9, 0), -4, -10, -5, { x: 0.006, y: 0.002, z: -0.004 }, 1.8, 0.7)
    createShape(new THREE.TetrahedronGeometry(1.8, 0), 0, -12, -8, { x: 0.004, y: 0.006, z: 0.002 }, 1.3, 0.6)
    createShape(new THREE.TetrahedronGeometry(1.0, 0), -18, 2, -16, { x: -0.005, y: 0.003, z: 0.005 }, 1.0, 0.4)

    const torusGeo = new THREE.TorusGeometry(2.0, 0.3, 8, 20)
    const torusWire = new THREE.Mesh(torusGeo, new THREE.MeshBasicMaterial({
      color: 0xD4A843, wireframe: true, transparent: true, opacity: 0.1
    }))
    torusWire.position.set(18, -8, -10)
    const torusGroup = new THREE.Group()
    torusGroup.add(torusWire)
    scene.add(torusGroup)
    shapes.push({ group: torusGroup, rotSpeed: { x: 0.006, y: 0.002, z: 0.004 }, floatAmp: 1.1, floatSpeed: 0.35, floatOffset: 1.2, baseY: -8 })
  }
}

// ─── PARTICLES ────────────────────────────────────────────────────────────
const PARTICLE_COUNT = isMobile ? 45 : 120
const particlePositions = new Float32Array(PARTICLE_COUNT * 3)

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particlePositions[i * 3]     = (Math.random() - 0.5) * 60
  particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 40
  particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5
}

const particleGeo = new THREE.BufferGeometry()
particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))

const particleMat = new THREE.PointsMaterial({
  color: 0xD4A843,
  transparent: true,
  opacity: isMobile ? 0.22 : 0.35,
  size: isMobile ? 0.09 : 0.12,
  sizeAttenuation: true,
})

const particles = new THREE.Points(particleGeo, particleMat)
scene.add(particles)

// ─── ANIMATION LOOP ───────────────────────────────────────────────────────
const clock = new THREE.Clock()
let frameId
let isPageVisible = true

// Pause animation when tab is hidden (battery saving)
document.addEventListener('visibilitychange', () => {
  isPageVisible = !document.hidden
  if (isPageVisible) clock.getDelta() // flush accumulated time
})

function animate() {
  frameId = requestAnimationFrame(animate)
  if (!isPageVisible || prefersReducedMotion) return

  const elapsed = clock.getElapsedTime()

  // Smooth mouse/gyro lerp — slower on mobile for subtlety
  const lerpFactor = isMobile ? 0.025 : 0.04
  mouse.x += (mouse.targetX - mouse.x) * lerpFactor
  mouse.y += (mouse.targetY - mouse.y) * lerpFactor

  camera.rotation.y = mouse.x * (isMobile ? 0.03 : 0.06)
  camera.rotation.x = mouse.y * (isMobile ? 0.02 : 0.04)

  shapes.forEach(s => {
    s.group.rotation.x += s.rotSpeed.x
    s.group.rotation.y += s.rotSpeed.y
    s.group.rotation.z += s.rotSpeed.z
    s.group.position.y = s.baseY + Math.sin(elapsed * s.floatSpeed + s.floatOffset) * s.floatAmp
  })

  particles.rotation.y = elapsed * (isMobile ? 0.008 : 0.015)
  particles.rotation.x = elapsed * (isMobile ? 0.004 : 0.008)

  renderer.render(scene, camera)
}

animate()

// Resize handler with debounce
let resizeTimeout
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5))
  }, 150)
}, { passive: true })

// ─── NAVBAR SCROLL EFFECT ─────────────────────────────────────────────────
const navbar = document.getElementById('navbar')
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50)
}, { passive: true })

// ─── MOBILE DRAWER NAVIGATION ─────────────────────────────────────────────
function setupMobileDrawer() {
  // Create drawer element
  const drawer = document.createElement('div')
  drawer.id = 'mobile-drawer'
  drawer.setAttribute('role', 'dialog')
  drawer.setAttribute('aria-label', 'Navigation menu')
  drawer.innerHTML = `
    <div class="drawer-header">
      <span class="drawer-logo">P<span>.</span></span>
      <button class="drawer-close" id="drawer-close-btn" aria-label="Close menu">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
    <nav class="drawer-nav">
      <a href="#about" class="drawer-nav-link">
        <span class="nav-num">01</span>About
      </a>
      <a href="#skills" class="drawer-nav-link">
        <span class="nav-num">02</span>Skills
      </a>
      <a href="/projects.html" class="drawer-nav-link page-transition">
        <span class="nav-num">03</span>Projects
      </a>
      <a href="#contact" class="drawer-nav-link">
        <span class="nav-num">04</span>Contact
      </a>
    </nav>
    <div class="drawer-socials">
      <a href="https://github.com/Parik-2006" target="_blank" rel="noopener" class="drawer-social-btn" aria-label="GitHub">
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
      </a>
      <a href="https://linkedin.com/in/parikshith" target="_blank" rel="noopener" class="drawer-social-btn" aria-label="LinkedIn">
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z"/></svg>
      </a>
      <a href="https://instagram.com/parik_2006" target="_blank" rel="noopener" class="drawer-social-btn" aria-label="Instagram">
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.204-.012 3.584-.07 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.057 1.28-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.057-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.28-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/></svg>
      </a>
      <a href="mailto:raptorparik2006@gmail.com" class="drawer-social-btn" aria-label="Email">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
      </a>
    </div>
  `

  // Create overlay
  const overlay = document.createElement('div')
  overlay.id = 'drawer-overlay'

  document.body.appendChild(overlay)
  document.body.appendChild(drawer)

  const menuBtn = document.getElementById('menu-btn')

  function openDrawer() {
    drawer.classList.add('open')
    overlay.classList.add('visible')
    menuBtn.classList.add('is-open')
    menuBtn.setAttribute('aria-expanded', 'true')
    document.body.style.overflow = 'hidden'
    // Trap focus
    setTimeout(() => {
      const firstLink = drawer.querySelector('.drawer-nav-link')
      if (firstLink) firstLink.focus()
    }, 450)
  }

  function closeDrawer() {
    drawer.classList.remove('open')
    overlay.classList.remove('visible')
    menuBtn.classList.remove('is-open')
    menuBtn.setAttribute('aria-expanded', 'false')
    document.body.style.overflow = ''
    menuBtn.focus()
  }

  menuBtn.setAttribute('aria-expanded', 'false')
  menuBtn.setAttribute('aria-controls', 'mobile-drawer')

  menuBtn.addEventListener('click', () => {
    if (drawer.classList.contains('open')) {
      closeDrawer()
    } else {
      openDrawer()
    }
  })

  overlay.addEventListener('click', closeDrawer)

  document.getElementById('drawer-close-btn').addEventListener('click', closeDrawer)

  // Close on nav link click (anchor links)
  drawer.querySelectorAll('.drawer-nav-link').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href')
      if (href && href.startsWith('#')) {
        closeDrawer()
        // Smooth scroll
        const target = document.querySelector(href)
        if (target) {
          e.preventDefault()
          setTimeout(() => {
            const navH = navbar ? navbar.offsetHeight : 72
            window.scrollTo({ top: target.offsetTop - navH - 20, behavior: 'smooth' })
          }, 350)
        }
      }
    })
  })

  // Keyboard: Escape closes drawer
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer()
    }
  })

  // Touch swipe to close (swipe right)
  let touchStartX = 0
  drawer.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX
  }, { passive: true })

  drawer.addEventListener('touchend', e => {
    const deltaX = e.changedTouches[0].clientX - touchStartX
    if (deltaX > 60) closeDrawer()
  }, { passive: true })
}

// Only set up drawer on mobile (hamburger visible)
// It's always set up but hidden via CSS on desktop
setupMobileDrawer()

// ─── MOBILE MENU (legacy — hide it since we have drawer) ──────────────────
const mobileMenu = document.getElementById('mobile-menu')
if (mobileMenu) mobileMenu.style.display = 'none'

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────
const revealElements = document.querySelectorAll('.scroll-reveal')

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target
        const delay = parseFloat(el.dataset.delay || 0)
        setTimeout(() => {
          el.classList.add('visible')
        }, delay * 1000)
        revealObserver.unobserve(el)
      }
    })
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
)

document.querySelectorAll('section').forEach(section => {
  const items = section.querySelectorAll('.scroll-reveal')
  items.forEach((item, idx) => {
    item.dataset.delay = (idx * 0.1).toFixed(2)
  })
})

revealElements.forEach(el => revealObserver.observe(el))

// ─── TYPEWRITER EFFECT ────────────────────────────────────────────────────
const typeEl = document.getElementById('typewriter')
const phrases = [
  'systems & security.',
  'cryptography.',
  'embedded kernels.',
  'distributed systems.',
  'network defense.',
]
let phraseIndex = 0
let charIndex = 0
let isDeleting = false
let typeTimeout

function type() {
  if (prefersReducedMotion) {
    typeEl.textContent = phrases[0]
    return
  }
  const current = phrases[phraseIndex]
  if (isDeleting) { charIndex-- } else { charIndex++ }
  typeEl.textContent = current.slice(0, charIndex)

  let delay = isDeleting ? 45 : 80
  if (!isDeleting && charIndex === current.length) { delay = 1800; isDeleting = true }
  else if (isDeleting && charIndex === 0) {
    isDeleting = false
    phraseIndex = (phraseIndex + 1) % phrases.length
    delay = 300
  }
  typeTimeout = setTimeout(type, delay)
}

setTimeout(type, 1400)

// ─── CUSTOM CURSOR (desktop only) ─────────────────────────────────────────
function initCursor() {
  if (isTouch || window.matchMedia('(hover: none)').matches) return

  const dot = document.createElement('div')
  dot.className = 'cursor-dot'
  const ring = document.createElement('div')
  ring.className = 'cursor-ring'
  document.body.append(dot, ring)

  let ringX = 0, ringY = 0, curX = 0, curY = 0

  window.addEventListener('mousemove', e => {
    curX = e.clientX
    curY = e.clientY
    dot.style.left = curX + 'px'
    dot.style.top  = curY + 'px'
  })

  function animateRing() {
    ringX += (curX - ringX) * 0.12
    ringY += (curY - ringY) * 0.12
    ring.style.left = ringX + 'px'
    ring.style.top  = ringY + 'px'
    requestAnimationFrame(animateRing)
  }
  animateRing()

  document.querySelectorAll('a, button, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.transform = 'translate(-50%, -50%) scale(2.5)'
      dot.style.opacity = '0.6'
      ring.style.width = '54px'
      ring.style.height = '54px'
      ring.style.borderColor = 'rgba(201,150,58,0.8)'
    })
    el.addEventListener('mouseleave', () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1)'
      dot.style.opacity = '1'
      ring.style.width = '36px'
      ring.style.height = '36px'
      ring.style.borderColor = 'rgba(201,150,58,0.5)'
    })
  })
}

initCursor()

// ─── 3D PROJECT CARD TILT (desktop only) ──────────────────────────────────
if (!isTouch) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      card.style.transform = `translateY(-6px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale(1.01)`
    })
    card.addEventListener('mouseleave', () => { card.style.transform = '' })
  })
}

// ─── CONTACT FORM ─────────────────────────────────────────────────────────
const sendBtn = document.getElementById('send-btn')
if (sendBtn) {
  sendBtn.addEventListener('click', async () => {
    const name    = document.getElementById('f-name').value.trim()
    const email   = document.getElementById('f-email').value.trim()
    const message = document.getElementById('f-message').value.trim()
    const msgEl   = document.getElementById('form-message')
    const btn     = document.getElementById('send-btn')

    if (!name || !email || !message) {
      msgEl.textContent = 'Please fill in all fields.'
      msgEl.className = 'mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm'
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msgEl.textContent = 'Please enter a valid email address.'
      msgEl.className = 'mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm'
      return
    }

    btn.textContent = 'Sending…'
    btn.disabled = true

    try {
      const response = await fetch('https://portfolio-1zzj.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      })

      const data = await response.json()

      if (response.ok) {
        msgEl.textContent = data.message
        msgEl.className = 'mb-6 p-4 rounded-xl bg-gold-400/10 border border-gold-400/30 text-ink-700 text-sm'
        document.getElementById('f-name').value = ''
        document.getElementById('f-email').value = ''
        document.getElementById('f-message').value = ''
      } else {
        msgEl.textContent = data.error || 'Failed to send message. Try again.'
        msgEl.className = 'mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm'
      }
    } catch (error) {
      msgEl.textContent = 'Connection error. Make sure the backend is running.'
      msgEl.className = 'mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm'
    } finally {
      btn.textContent = 'Send Message →'
      btn.disabled = false
    }
  })
}

// ─── PAGE TRANSITION ──────────────────────────────────────────────────────
document.querySelectorAll('a.page-transition').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href')
    if (!href || href.startsWith('#')) return
    e.preventDefault()
    const isProjects = window.location.pathname.includes('projects.html')
    const fadeOverlay = document.createElement('div')
    Object.assign(fadeOverlay.style, {
      position: 'fixed', inset: '0',
      background: isProjects ? '#1A1A19' : '#FDFAF0',
      zIndex: '9999', opacity: '0',
      transition: 'opacity 0.4s ease-in',
      pointerEvents: 'none', willChange: 'opacity'
    })
    document.body.appendChild(fadeOverlay)
    requestAnimationFrame(() => { fadeOverlay.style.opacity = '1' })
    setTimeout(() => { window.location.href = href }, 400)
  })
})

// ─── PAGE ENTER ANIMATION ─────────────────────────────────────────────────
window.addEventListener('load', () => {
  const isProjects = window.location.pathname.includes('projects.html')
  const entryOverlay = document.createElement('div')
  Object.assign(entryOverlay.style, {
    position: 'fixed', inset: '0',
    background: isProjects ? '#1A1A19' : '#FDFAF0',
    zIndex: '9998', opacity: '1',
    transition: 'opacity 0.45s ease-out',
    pointerEvents: 'none', willChange: 'opacity'
  })
  document.body.appendChild(entryOverlay)
  setTimeout(() => {
    entryOverlay.style.opacity = '0'
    setTimeout(() => entryOverlay.remove(), 450)
  }, 60)
  document.body.classList.add('loaded')
})
