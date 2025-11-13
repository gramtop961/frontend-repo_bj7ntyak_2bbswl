import React, { useMemo } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Instagram, Mail, Menu } from 'lucide-react'

const BRAND = {
  terracotta: '#C97B63',
  clay: '#A66A4C',
  beige: '#F1E4D3',
  olive: '#7A8B74',
  offwhite: '#FAF7F3',
}

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

async function api(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    ...opts,
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--offwhite)] text-[#2b2b2b]">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={useLocation().pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex-1"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

function Navbar() {
  const [open, setOpen] = React.useState(false)
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[var(--offwhite)]/80 border-b border-[var(--beige)]">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="group">
          <div className="text-2xl tracking-wide font-semibold">
            <span className="font-heading">Urban Wheel</span>
            <span className="font-heading text-[var(--terracotta)]"> Pottery</span>
          </div>
          <div className="text-xs text-[#6b6b6b]">Where earth meets elegance.</div>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-gradient-to-b from-[var(--terracotta)] to-[var(--clay)] text-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
            <ShoppingBag size={18} /> Shop Now
          </Link>
        </nav>
        <button className="md:hidden p-2 rounded-lg border border-[var(--beige)]" onClick={() => setOpen(!open)} aria-label="Menu">
          <Menu />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[var(--beige)]">
          <div className="px-4 py-3 flex flex-col gap-3">
            <NavLink to="/shop" onClick={() => setOpen(false)}>Shop</NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
            <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
          </div>
        </div>
      )}
    </header>
  )
}

function NavLink({ to, children, ...rest }) {
  const location = useLocation()
  const active = location.pathname === to
  return (
    <Link
      to={to}
      {...rest}
      className={`text-sm tracking-wide hover:text-[var(--terracotta)] transition-colors ${active ? 'text-[var(--terracotta)]' : 'text-[#3a3a3a]'}`}
    >
      {children}
    </Link>
  )
}

function Home() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full bg-[var(--beige)] blur-3xl opacity-60" />
        <div className="absolute -bottom-24 -right-24 w-[520px] h-[520px] rounded-full bg-[var(--olive)] blur-3xl opacity-20" />
      </div>
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-20 grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-heading text-5xl md:text-6xl leading-tight text-[#2b2b2b]">
            Where earth meets <span className="text-[var(--terracotta)]">elegance</span>
          </h1>
          <p className="mt-6 text-[#555] max-w-lg">
            Minimal, handcrafted ceramics designed for calm, modern spaces. Each piece is shaped by hand and fired with intention.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link to="/shop" className="inline-flex items-center gap-2 bg-gradient-to-b from-[var(--terracotta)] to-[var(--clay)] text-white px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all">
              <ShoppingBag size={18} /> Shop the Collection
            </Link>
            <a href="#story" className="text-sm underline underline-offset-4 text-[#6b6b6b] hover:text-[#2b2b2b]">Our story</a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="relative">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl ring-1 ring-[var(--beige)] bg-[var(--offwhite)]">
            <img src="https://images.unsplash.com/photo-1704481235083-b70ae2ffee2b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxDZXJhbWljJTIwdmFzZXN8ZW58MHwwfHx8MTc2MzA0MzUxM3ww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="Ceramic vases" className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </div>
      <div id="story" className="max-w-5xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Handcrafted', desc: 'Thrown, trimmed, and glazed by hand in small batches.' },
            { title: 'Sustainable', desc: 'Natural clays, mindful firing, and low-impact packaging.' },
            { title: 'Timeless', desc: 'Warm, minimal forms that outlast trends.' },
          ].map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl p-6 bg-white/60 ring-1 ring-[var(--beige)]">
              <div className="font-heading text-lg text-[var(--clay)]">{f.title}</div>
              <div className="text-sm text-[#565656] mt-2">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Shop() {
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [type, setType] = React.useState('')
  const [minPrice, setMinPrice] = React.useState('')
  const [maxPrice, setMaxPrice] = React.useState('')

  const query = useMemo(() => {
    const q = new URLSearchParams()
    if (type) q.set('type', type)
    if (minPrice) q.set('min_price', minPrice)
    if (maxPrice) q.set('max_price', maxPrice)
    return q.toString() ? `?${q.toString()}` : ''
  }, [type, minPrice, maxPrice])

  React.useEffect(() => {
    setLoading(true)
    api(`/products${query}`)
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [query])

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
        <div>
          <h2 className="font-heading text-3xl">The Collection</h2>
          <p className="text-[#666]">Minimal forms, earthy glazes.</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <select value={type} onChange={e => setType(e.target.value)} className="border rounded-lg px-3 py-2 bg-white">
            <option value="">All types</option>
            <option value="mug">Mugs</option>
            <option value="bowl">Bowls</option>
            <option value="plate">Plates</option>
            <option value="vase">Vases</option>
          </select>
          <input value={minPrice} onChange={e => setMinPrice(e.target.value)} type="number" placeholder="Min" className="w-24 border rounded-lg px-3 py-2 bg-white" />
          <input value={maxPrice} onChange={e => setMaxPrice(e.target.value)} type="number" placeholder="Max" className="w-24 border rounded-lg px-3 py-2 bg-white" />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-[#777]">Loading products…</div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((p, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}

function ProductCard({ product }) {
  return (
    <Link to={`/product/${encodeURIComponent(product.name)}`} state={{ product }} className="group block">
      <div className="aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-[var(--beige)] bg-[var(--offwhite)]">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <div className="font-medium">{product.name}</div>
          <div className="text-xs text-[#777] capitalize">{product.type}</div>
        </div>
        <div className="font-semibold">${product.price.toFixed(2)}</div>
      </div>
    </Link>
  )
}

function ProductPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const product = state?.product

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <button onClick={() => navigate(-1)} className="text-sm text-[#666] hover:text-[#2b2b2b]">← Back</button>
      {product ? (
        <div className="mt-6 grid md:grid-cols-2 gap-8 items-start">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden ring-1 ring-[var(--beige)] bg-[var(--offwhite)]">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-heading text-3xl">{product.name}</h1>
            <div className="mt-2 text-[#777] capitalize">{product.type}</div>
            <div className="mt-4 font-semibold text-2xl">${product.price.toFixed(2)}</div>
            <p className="mt-6 text-[#555]">{product.description}</p>
            <AddToCart product={product} />
          </div>
        </div>
      ) : (
        <div className="py-20 text-center text-[#777]">Product details unavailable. Please go back to the shop.</div>
      )}
    </section>
  )
}

function AddToCart({ product }) {
  const [qty, setQty] = React.useState(1)
  const [status, setStatus] = React.useState('')

  async function handleAdd() {
    setStatus('Adding…')
    try {
      await api('/cart/add', { method: 'POST', body: JSON.stringify({ product_id: product.id || 'temp', quantity: qty }) })
      setStatus('Added to cart (demo).')
    } catch (e) {
      setStatus('Added locally (demo).')
    }
  }

  return (
    <div className="mt-8 flex items-center gap-3">
      <input type="number" min={1} max={10} value={qty} onChange={e => setQty(parseInt(e.target.value || '1'))} className="w-20 border rounded-lg px-3 py-2 bg-white" />
      <button onClick={handleAdd} className="inline-flex items-center gap-2 bg-gradient-to-b from-[var(--terracotta)] to-[var(--clay)] text-white px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all">
        <ShoppingBag size={18} /> Add to Cart
      </button>
      <span className="text-sm text-[#777]">{status}</span>
    </div>
  )
}

function About() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <h2 className="font-heading text-4xl">Our Story</h2>
      <p className="mt-6 text-[#555] leading-relaxed">
        Urban Wheel Pottery began with a simple rhythm: clay, water, and the turning wheel. We craft in small batches using natural materials, focusing on calm forms and earthy textures. Our process embraces sustainability—from sourcing regional clays to mindful firing and plastic-free packaging.
      </p>
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <img className="rounded-2xl ring-1 ring-[var(--beige)]" src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1400&auto=format&fit=crop" alt="Studio" />
        <img className="rounded-2xl ring-1 ring-[var(--beige)]" src="https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1400&auto=format&fit=crop" alt="Hands shaping clay" />
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = React.useState({ name: '', email: '', message: '' })
  const [sent, setSent] = React.useState(false)
  const [error, setError] = React.useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await api('/contact', { method: 'POST', body: JSON.stringify(form) })
      setSent(true)
    } catch (e) {
      setError('Something went wrong. Please try again later.')
    }
  }

  if (sent) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="font-heading text-3xl">Thank you</h2>
        <p className="mt-2 text-[#555]">We received your message and will get back soon.</p>
        <Link to="/" className="mt-6 inline-block underline underline-offset-4">Back to Home</Link>
      </section>
    )
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="font-heading text-3xl">Get in touch</h2>
      <p className="text-[#666] mt-2">We'd love to hear from you.</p>
      <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
        <input required placeholder="Your name" className="border rounded-lg px-4 py-3 bg-white" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <input required type="email" placeholder="Email" className="border rounded-lg px-4 py-3 bg-white" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        <textarea required placeholder="Message" rows={5} className="border rounded-lg px-4 py-3 bg-white" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} />
        <button className="justify-self-start inline-flex items-center gap-2 bg-gradient-to-b from-[var(--terracotta)] to-[var(--clay)] text-white px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all">
          <Mail size={18} /> Send
        </button>
        {error && <div className="text-sm text-red-600">{error}</div>}
      </form>
      <div className="mt-12 grid md:grid-cols-2 gap-6 items-start">
        <iframe title="Map" className="w-full h-72 rounded-2xl ring-1 ring-[var(--beige)]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509315!2d144.9537353159047!3d-37.81627974201185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ5JzAwLjYiUyAxNDTCsDU3JzI0LjQiRQ!5e0!3m2!1sen!2s!4v1614035325923!5m2!1sen!2s"></iframe>
        <div>
          <div className="font-medium">Follow along</div>
          <a className="mt-2 flex items-center gap-2 text-[#444] hover:text-[var(--terracotta)]" href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={18}/> @urbanwheelpottery</a>
          <a className="mt-2 flex items-center gap-2 text-[#444] hover:text-[var(--terracotta)]" href="mailto:hello@urbanwheel.com"><Mail size={18}/> hello@urbanwheel.com</a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-[var(--beige)] bg-white/70">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6 text-sm">
        <div>
          <div className="font-heading font-semibold">Urban Wheel Pottery</div>
          <div className="text-[#666] mt-1">Handmade in small batches.</div>
        </div>
        <div className="flex gap-6">
          <div className="space-y-2">
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/shop">Shop</FooterLink>
          </div>
          <div className="space-y-2">
            <FooterLink to="/about">About</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
          </div>
        </div>
        <div className="md:text-right text-[#888]">© {new Date().getFullYear()} Urban Wheel Pottery</div>
      </div>
    </footer>
  )
}

function FooterLink({ to, children }) {
  return (
    <Link to={to} className="block hover:text-[var(--terracotta)] transition-colors">{children}</Link>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
