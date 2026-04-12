import * as THREE from 'three'

// ─── THREE.JS BACKGROUND ──────────────────────────────────────────────────

const canvas = document.getElementById('bg-canvas')
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x000000, 0)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200)
camera.position.set(0, 0, 28)

// ─── MOUSE TRACKING ───────────────────────────────────────────────────────
const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
window.addEventListener('mousemove', e => {
  mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2
  mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2
})

// ─── MATERIALS ────────────────────────────────────────────────────────────
// Warm gold wireframe material
const wireMat = new THREE.MeshBasicMaterial({
  color: 0xC9963A,
  wireframe: true,
  transparent: true,
  opacity: 0.18,
})

// Subtle fill material
const fillMat = new THREE.MeshPhongMaterial({
  color: 0xF9F3DC,
  transparent: true,
  opacity: 0.12,
  shininess: 20,
})

// Ambient + directional light for phong
const ambientLight = new THREE.AmbientLight(0xFDFAF0, 0.6)
scene.add(ambientLight)
const dirLight = new THREE.DirectionalLight(0xD4A843, 0.8)
dirLight.position.set(10, 15, 10)
scene.add(dirLight)

// ─── FLOATING SHAPES ──────────────────────────────────────────────────────
const shapes = []

function createShape(geometry, x, y, z, rotSpeed, floatAmp, floatSpeed) {
  // Create a group with wireframe + fill
  const group = new THREE.Group()
  const wireMesh = new THREE.Mesh(geometry, wireMat.clone())
  wireMesh.material.opacity = Math.random() * 0.15 + 0.08

  group.add(wireMesh)
  group.position.set(x, y, z)

  scene.add(group)
  shapes.push({
    group,
    rotSpeed,
    floatAmp,
    floatSpeed,
    floatOffset: Math.random() * Math.PI * 2,
    baseY: y,
  })
  return group
}

// Icosahedra — primary shapes
const icosaGeo = new THREE.IcosahedronGeometry(2.8, 0)
createShape(icosaGeo, -14, 6, -8, { x: 0.003, y: 0.005, z: 0.002 }, 1.2, 0.4)
createShape(new THREE.IcosahedronGeometry(1.6, 0), 16, -4, -12, { x: -0.004, y: 0.003, z: -0.002 }, 0.9, 0.55)
createShape(new THREE.IcosahedronGeometry(1.2, 0), 6, 10, -10, { x: 0.005, y: -0.003, z: 0.004 }, 1.5, 0.65)

// Octahedra
const octaGeo = new THREE.OctahedronGeometry(2.2, 0)
createShape(octaGeo, 12, 8, -6, { x: 0.002, y: -0.005, z: 0.003 }, 1.0, 0.5)
createShape(new THREE.OctahedronGeometry(1.4, 0), -10, -8, -14, { x: -0.003, y: 0.004, z: 0.002 }, 0.8, 0.45)
createShape(new THREE.OctahedronGeometry(0.9, 0), -4, -10, -5, { x: 0.006, y: 0.002, z: -0.004 }, 1.8, 0.7)

// Tetrahedra
createShape(new THREE.TetrahedronGeometry(1.8, 0), 0, -12, -8, { x: 0.004, y: 0.006, z: 0.002 }, 1.3, 0.6)
createShape(new THREE.TetrahedronGeometry(1.0, 0), -18, 2, -16, { x: -0.005, y: 0.003, z: 0.005 }, 1.0, 0.4)

// Torus (subtle)
const torusGeo = new THREE.TorusGeometry(2.0, 0.3, 8, 20)
const torusWire = new THREE.Mesh(torusGeo, new THREE.MeshBasicMaterial({ color: 0xD4A843, wireframe: true, transparent: true, opacity: 0.1 }))
torusWire.position.set(18, -8, -10)
const torusGroup = new THREE.Group()
torusGroup.add(torusWire)
scene.add(torusGroup)
shapes.push({
  group: torusGroup,
  rotSpeed: { x: 0.006, y: 0.002, z: 0.004 },
  floatAmp: 1.1,
  floatSpeed: 0.35,
  floatOffset: 1.2,
  baseY: -8,
})

// ─── PARTICLES ────────────────────────────────────────────────────────────
const PARTICLE_COUNT = 120
const particlePositions = new Float32Array(PARTICLE_COUNT * 3)
const particleSizes = new Float32Array(PARTICLE_COUNT)

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particlePositions[i * 3]     = (Math.random() - 0.5) * 60
  particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 40
  particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5
  particleSizes[i] = Math.random() * 2.5 + 0.5
}

const particleGeo = new THREE.BufferGeometry()
particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))

const particleMat = new THREE.PointsMaterial({
  color: 0xD4A843,
  transparent: true,
  opacity: 0.35,
  size: 0.12,
  sizeAttenuation: true,
})

const particles = new THREE.Points(particleGeo, particleMat)
scene.add(particles)

// ─── ANIMATION LOOP ───────────────────────────────────────────────────────
let clock = new THREE.Clock()
let frameId

function animate() {
  frameId = requestAnimationFrame(animate)
  const elapsed = clock.getElapsedTime()

  // Smooth mouse lerp for camera tilt
  mouse.x += (mouse.targetX - mouse.x) * 0.04
  mouse.y += (mouse.targetY - mouse.y) * 0.04

  camera.rotation.y = mouse.x * 0.06
  camera.rotation.x = mouse.y * 0.04

  // Animate shapes
  shapes.forEach(s => {
    s.group.rotation.x += s.rotSpeed.x
    s.group.rotation.y += s.rotSpeed.y
    s.group.rotation.z += s.rotSpeed.z

    // Floating
    const floatY = Math.sin(elapsed * s.floatSpeed + s.floatOffset) * s.floatAmp
    s.group.position.y = s.baseY + floatY
  })

  // Slowly rotate particle field
  particles.rotation.y = elapsed * 0.015
  particles.rotation.x = elapsed * 0.008

  renderer.render(scene, camera)
}

animate()

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
})

// ─── NAVBAR SCROLL EFFECT ─────────────────────────────────────────────────
const navbar = document.getElementById('navbar')
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled')
  } else {
    navbar.classList.remove('scrolled')
  }
}, { passive: true })

// ─── MOBILE MENU ──────────────────────────────────────────────────────────
const menuBtn = document.getElementById('menu-btn')
const mobileMenu = document.getElementById('mobile-menu')

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden')
  const bars = menuBtn.querySelectorAll('.menu-bar')
  if (!mobileMenu.classList.contains('hidden')) {
    bars[0].style.transform = 'translateY(6px) rotate(45deg)'
    bars[1].style.opacity = '0'
    bars[2].style.transform = 'translateY(-6px) rotate(-45deg)'
  } else {
    bars.forEach(b => { b.style.transform = ''; b.style.opacity = '' })
  }
})

window.closeMobileMenu = () => {
  mobileMenu.classList.add('hidden')
  const bars = menuBtn.querySelectorAll('.menu-bar')
  bars.forEach(b => { b.style.transform = ''; b.style.opacity = '' })
}

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────
const revealElements = document.querySelectorAll('.scroll-reveal')

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
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
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
)

// Assign staggered delays within each section
document.querySelectorAll('section').forEach(section => {
  const items = section.querySelectorAll('.scroll-reveal')
  items.forEach((item, idx) => {
    item.dataset.delay = (idx * 0.12).toFixed(2)
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
  const current = phrases[phraseIndex]

  if (isDeleting) {
    charIndex--
  } else {
    charIndex++
  }

  typeEl.textContent = current.slice(0, charIndex)

  let delay = isDeleting ? 45 : 80

  if (!isDeleting && charIndex === current.length) {
    delay = 1800
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    phraseIndex = (phraseIndex + 1) % phrases.length
    delay = 300
  }

  typeTimeout = setTimeout(type, delay)
}

// Start after hero animations settle
setTimeout(type, 1400)

// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────
function initCursor() {
  // Only on non-touch devices
  if (window.matchMedia('(hover: none)').matches) return

  const dot = document.createElement('div')
  dot.className = 'cursor-dot'
  const ring = document.createElement('div')
  ring.className = 'cursor-ring'
  document.body.append(dot, ring)

  let ringX = 0, ringY = 0
  let curX = 0, curY = 0

  window.addEventListener('mousemove', e => {
    curX = e.clientX
    curY = e.clientY
    dot.style.left = curX + 'px'
    dot.style.top  = curY + 'px'
  })

  // Smooth ring follow
  function animateRing() {
    ringX += (curX - ringX) * 0.12
    ringY += (curY - ringY) * 0.12
    ring.style.left = ringX + 'px'
    ring.style.top  = ringY + 'px'
    requestAnimationFrame(animateRing)
  }
  animateRing()

  // Scale on hover
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

// ─── 3D PROJECT CARD TILT ─────────────────────────────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    card.style.transform = `
      translateY(-6px)
      rotateX(${-y * 8}deg)
      rotateY(${x * 8}deg)
      scale(1.01)
    `
  })

  card.addEventListener('mouseleave', () => {
    card.style.transform = ''
  })
})

// ─── CONTACT FORM ─────────────────────────────────────────────────────────
document.getElementById('send-btn').addEventListener('click', async () => {
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
    // Send to Render backend API
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
    console.error('Form submission error:', error)
  } finally {
    btn.textContent = 'Send Message →'
    btn.disabled = false
  }
})
