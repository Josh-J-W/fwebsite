import { useState, useEffect } from 'react'
import heroImg from '@/imports/hero.png'

type Page = 'home' | 'about' | 'projects' | 'photography' | 'blog' | 'contact'

const NAV_LINKS: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'About', page: 'about' },
  { label: 'Projects', page: 'projects' },
  { label: 'Photography', page: 'photography' },
  { label: 'Blog', page: 'blog' },
  { label: 'Contact', page: 'contact' },
]

function Navbar({ current, navigate }: { current: Page; navigate: (p: Page) => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = current === 'home'

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled || !isHome ? 'rgba(247,246,244,0.97)' : 'transparent',
        backdropFilter: scrolled || !isHome ? 'blur(12px)' : 'none',
        borderBottom: scrolled || !isHome ? '1px solid #dde4e8' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <button
          onClick={() => navigate('home')}
          className="font-serif text-lg font-medium tracking-wide transition-opacity hover:opacity-70"
          style={{ color: isHome && !scrolled ? '#fff' : '#1a2c36' }}
        >
          Joshua Winkel
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => navigate(page)}
              className="text-sm font-medium tracking-widest uppercase transition-all duration-200 relative"
              style={{
                color: current === page
                  ? '#3a7a8c'
                  : isHome && !scrolled
                  ? 'rgba(255,255,255,0.85)'
                  : '#2b4a5a',
                letterSpacing: '0.08em',
              }}
            >
              {label}
              {current === page && (
                <span
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ backgroundColor: '#3a7a8c' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="block w-5 h-px transition-all"
              style={{ backgroundColor: isHome && !scrolled ? '#fff' : '#1a2c36' }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-stone-50 border-t border-gray-200 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => { navigate(page); setMenuOpen(false) }}
              className="text-left text-sm font-medium tracking-widest uppercase"
              style={{ color: current === page ? '#3a7a8c' : '#2b4a5a' }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

function HomePage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div>
      {/* Full-viewport hero */}
      <section className="relative w-full" style={{ height: '100svh', minHeight: '100vh' }}>
        <img
          src={heroImg}
          alt="Joshua Winkel sitting on coastal cliffs overlooking the ocean"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Gradient overlay — darkens bottom for legibility */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(26,44,54,0.25) 0%, rgba(26,44,54,0.05) 40%, rgba(26,44,54,0.55) 100%)',
          }}
        />
        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-16 max-w-4xl">
          <p
            className="text-sm font-medium tracking-widest uppercase mb-3"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Linguist · Traveler · Creator
          </p>
          <h1
            className="font-serif text-5xl md:text-7xl font-medium leading-tight mb-6"
            style={{ color: '#fff' }}
          >
            Joshua Winkel
          </h1>
          <p
            className="text-lg md:text-xl max-w-md leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 300 }}
          >
            B.A. Linguistics, Iowa State University · Summa Cum Laude · Greater Chicago Area
          </p>
          <div className="mt-8 flex gap-4 flex-wrap">
            <button
              onClick={() => navigate('about')}
              className="px-6 py-3 text-sm font-medium tracking-wide uppercase transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: '#3a7a8c',
                color: '#fff',
                letterSpacing: '0.08em',
              }}
            >
              Learn More
            </button>
            <button
              onClick={() => navigate('contact')}
              className="px-6 py-3 text-sm font-medium tracking-wide uppercase transition-all duration-200"
              style={{
                border: '1px solid rgba(255,255,255,0.6)',
                color: '#fff',
                letterSpacing: '0.08em',
                backgroundColor: 'transparent',
              }}
            >
              Get in Touch
            </button>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          <span className="text-xs tracking-widest uppercase" style={{ writingMode: 'vertical-rl' }}>
            Scroll
          </span>
          <span className="text-lg">↓</span>
        </div>
      </section>

      {/* Brief intro teaser below fold */}
      <section className="max-w-4xl mx-auto px-8 py-24 grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <h2 className="font-serif text-3xl font-medium mb-6" style={{ color: '#1a2c36' }}>
            Language, culture, and the spaces between.
          </h2>
          <p className="text-base leading-relaxed" style={{ color: '#4a6070', fontWeight: 300 }}>
            I study how language shapes thought, culture, and connection. With a background in
            Linguistics, Chinese Studies, and Business, I bring analytical precision and cross-cultural
            curiosity to everything I do — from content creation to data analysis.
          </p>
          <button
            onClick={() => navigate('about')}
            className="mt-8 text-sm font-medium tracking-widest uppercase inline-flex items-center gap-2 transition-opacity hover:opacity-60"
            style={{ color: '#3a7a8c', letterSpacing: '0.08em' }}
          >
            Read more about me <span>→</span>
          </button>
        </div>
        <div className="flex flex-col gap-6">
          {[
            { label: 'Languages', value: 'English · Chinese · Portuguese' },
            { label: 'Based in', value: 'Greater Chicago Area' },
            { label: 'Degree', value: 'B.A. Linguistics, ISU' },
            { label: 'Graduated', value: '2026 · Summa Cum Laude' },
          ].map(({ label, value }) => (
            <div key={label} className="border-l-2 pl-4" style={{ borderColor: '#3a7a8c' }}>
              <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#8a9ea8' }}>{label}</p>
              <p className="text-sm font-medium" style={{ color: '#1a2c36' }}>{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick nav cards */}
      <section className="border-t" style={{ borderColor: '#dde4e8' }}>
        <div className="max-w-6xl mx-auto px-8 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: '#dde4e8' }}>
          {([
            { label: 'Projects', desc: 'Academic & personal work', page: 'projects' as Page },
            { label: 'Photography', desc: 'Moments from the road', page: 'photography' as Page },
            { label: 'Blog', desc: 'Thoughts on language & life', page: 'blog' as Page },
            { label: 'Contact', desc: 'Say hello', page: 'contact' as Page },
          ]).map(({ label, desc, page }) => (
            <button
              key={page}
              onClick={() => navigate(page)}
              className="group flex flex-col justify-between p-8 text-left transition-colors duration-200 hover:bg-ocean-100"
              style={{ backgroundColor: '#f7f6f4' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#d4eaf0')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#f7f6f4')}
            >
              <span className="font-serif text-xl font-medium" style={{ color: '#1a2c36' }}>{label}</span>
              <span className="text-sm mt-2" style={{ color: '#8a9ea8' }}>{desc}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

function PageShell({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="pt-16 min-h-screen">
      <div
        className="px-8 py-20 text-center"
        style={{ backgroundColor: '#edecea', borderBottom: '1px solid #dde4e8' }}
      >
        <h1 className="font-serif text-4xl md:text-5xl font-medium" style={{ color: '#1a2c36' }}>{title}</h1>
        {subtitle && (
          <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: '#4a6070', fontWeight: 300 }}>
            {subtitle}
          </p>
        )}
      </div>
      <div className="max-w-4xl mx-auto px-8 py-16">{children}</div>
    </div>
  )
}

function AboutPage() {
  return (
    <PageShell title="About" subtitle="Linguist, creator, and lifelong learner.">
      <div className="grid md:grid-cols-5 gap-16">
        <div className="md:col-span-3 space-y-6">
          <p className="text-base leading-relaxed" style={{ color: '#4a6070', fontWeight: 300 }}>
            I'm a recent summa cum laude graduate from Iowa State University with a Bachelor of Arts
            in Linguistics and minors in General Business and Chinese Studies: Languages and Cultures
            for Professions.
          </p>
          <p className="text-base leading-relaxed" style={{ color: '#4a6070', fontWeight: 300 }}>
            Language has always fascinated me — not just as a system of grammar and syntax, but as
            the carrier of culture, identity, and meaning. My academic journey brought me across the
            intersection of humanities, business, and technology, where I've developed skills in
            content creation, data analysis, and cross-cultural communication.
          </p>
          <p className="text-base leading-relaxed" style={{ color: '#4a6070', fontWeight: 300 }}>
            Outside of academics, I love to travel and explore the natural world — the photo above
            was taken on a coastal hike that reminded me why curiosity is the best compass.
          </p>

          <div className="pt-4">
            <h3 className="font-serif text-xl font-medium mb-4" style={{ color: '#1a2c36' }}>Experience</h3>
            <div className="space-y-6">
              {[
                {
                  role: 'English Department Content Creator',
                  org: 'Iowa State University — College of Liberal Arts and Sciences',
                  period: 'Feb 2025 – May 2025 · Ames, IA',
                  bullets: [
                    'Developed clear, audience-focused print materials to promote academic programs.',
                    'Collaborated with faculty and department staff to ensure accuracy and consistency.',
                    'Designed graphics using Adobe Creative Cloud and Canva.',
                  ],
                },
                {
                  role: 'Golf Course Groundskeeper',
                  org: 'Black Sheep Golf Club Ltd',
                  period: 'Jun 2023 – Aug 2023 · Sugar Grove, IL',
                  bullets: [
                    'Conducted daily quality inspections and routine maintenance on greens and fairways.',
                    'Operated commercial landscaping equipment in compliance with safety procedures.',
                  ],
                },
              ].map(({ role, org, period, bullets }) => (
                <div key={role} className="border-l-2 pl-5" style={{ borderColor: '#dde4e8' }}>
                  <p className="font-medium text-sm" style={{ color: '#1a2c36' }}>{role}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#3a7a8c' }}>{org}</p>
                  <p className="text-xs mt-0.5 mb-2" style={{ color: '#8a9ea8' }}>{period}</p>
                  <ul className="space-y-1">
                    {bullets.map(b => (
                      <li key={b} className="text-sm leading-relaxed" style={{ color: '#4a6070', fontWeight: 300 }}>
                        · {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <div>
            <h3 className="font-serif text-lg font-medium mb-3" style={{ color: '#1a2c36' }}>Languages</h3>
            {[
              { lang: 'English', level: 'Native' },
              { lang: 'Chinese (Mandarin)', level: 'Elementary' },
              { lang: 'Portuguese', level: 'Elementary' },
            ].map(({ lang, level }) => (
              <div key={lang} className="flex justify-between items-center py-2 border-b" style={{ borderColor: '#edecea' }}>
                <span className="text-sm" style={{ color: '#1a2c36' }}>{lang}</span>
                <span className="text-xs" style={{ color: '#8a9ea8' }}>{level}</span>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-serif text-lg font-medium mb-3" style={{ color: '#1a2c36' }}>Top Skills</h3>
            {['Linguistics', 'Chinese Studies', 'Transcription', 'Content Creation', 'Data Analysis'].map(s => (
              <div key={s} className="py-2 border-b text-sm" style={{ color: '#4a6070', borderColor: '#edecea' }}>
                {s}
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-serif text-lg font-medium mb-3" style={{ color: '#1a2c36' }}>Honors & Awards</h3>
            {[
              'Excellence in Accelerated Portuguese Award',
              'Highest 2% LAS Sophomore Spring 2023',
              "LAS Dean's High Impact Study Abroad Award",
              'Phi Kappa Phi Honor Society',
              'Golden Key International Honour Society',
            ].map(a => (
              <div key={a} className="py-2 border-b text-sm" style={{ color: '#4a6070', borderColor: '#edecea', fontWeight: 300 }}>
                {a}
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-serif text-lg font-medium mb-3" style={{ color: '#1a2c36' }}>Education</h3>
            {[
              { school: 'Iowa State University', degree: 'B.A. Linguistics', years: '2022–2026' },
              { school: 'Marmion Abbey/Academy', degree: 'High School Diploma', years: '2018–2022' },
              { school: 'Waubonsee Community College', degree: 'Dual Enrollment', years: '2020–2022' },
            ].map(({ school, degree, years }) => (
              <div key={school} className="py-2 border-b" style={{ borderColor: '#edecea' }}>
                <p className="text-sm font-medium" style={{ color: '#1a2c36' }}>{school}</p>
                <p className="text-xs" style={{ color: '#8a9ea8' }}>{degree} · {years}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  )
}

function PlaceholderPage({ title, subtitle, message }: { title: string; subtitle?: string; message: string }) {
  return (
    <PageShell title={title} subtitle={subtitle}>
      <div className="text-center py-16">
        <p className="font-serif text-2xl italic" style={{ color: '#8a9ea8' }}>{message}</p>
        <p className="mt-4 text-sm" style={{ color: '#8a9ea8', fontWeight: 300 }}>
          Check back soon — content is on its way.
        </p>
      </div>
    </PageShell>
  )
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  return (
    <PageShell title="Contact" subtitle="I'd love to hear from you.">
      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-6">
          <p className="text-base leading-relaxed" style={{ color: '#4a6070', fontWeight: 300 }}>
            Whether you're interested in collaborating, have a question, or just want to say hello —
            feel free to reach out through any of the channels below.
          </p>
          {[
            { label: 'Email', value: 'joshua.j.winkel@gmail.com', href: 'mailto:joshua.j.winkel@gmail.com' },
            { label: 'Phone', value: '(331) 223-2679', href: 'tel:+13312232679' },
            { label: 'LinkedIn', value: 'linkedin.com/in/joshua-winkel', href: 'https://www.linkedin.com/in/joshua-winkel' },
            { label: 'Location', value: 'Greater Chicago Area', href: undefined },
          ].map(({ label, value, href }) => (
            <div key={label} className="flex items-start gap-4">
              <span className="text-xs tracking-widest uppercase pt-1 w-20 shrink-0" style={{ color: '#8a9ea8' }}>{label}</span>
              {href ? (
                <a href={href} className="text-sm hover:opacity-60 transition-opacity" style={{ color: '#3a7a8c' }}>
                  {value}
                </a>
              ) : (
                <span className="text-sm" style={{ color: '#1a2c36' }}>{value}</span>
              )}
            </div>
          ))}
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center text-center py-12">
            <p className="font-serif text-2xl font-medium mb-2" style={{ color: '#1a2c36' }}>Thanks, {form.name}!</p>
            <p className="text-sm" style={{ color: '#4a6070', fontWeight: 300 }}>I'll be in touch soon.</p>
          </div>
        ) : (
          <form
            className="space-y-4"
            onSubmit={e => { e.preventDefault(); setSubmitted(true) }}
          >
            {[
              { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
              { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label className="block text-xs tracking-widest uppercase mb-1.5" style={{ color: '#8a9ea8' }}>{label}</label>
                <input
                  type={type}
                  required
                  placeholder={placeholder}
                  value={form[id as 'name' | 'email']}
                  onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                  className="w-full px-4 py-3 text-sm border outline-none transition-colors focus:border-ocean-500"
                  style={{
                    border: '1px solid #dde4e8',
                    backgroundColor: '#fff',
                    color: '#1a2c36',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#3a7a8c')}
                  onBlur={e => (e.target.style.borderColor = '#dde4e8')}
                />
              </div>
            ))}
            <div>
              <label className="block text-xs tracking-widest uppercase mb-1.5" style={{ color: '#8a9ea8' }}>Message</label>
              <textarea
                required
                rows={5}
                placeholder="What's on your mind?"
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className="w-full px-4 py-3 text-sm border outline-none transition-colors resize-none"
                style={{
                  border: '1px solid #dde4e8',
                  backgroundColor: '#fff',
                  color: '#1a2c36',
                }}
                onFocus={e => (e.target.style.borderColor = '#3a7a8c')}
                onBlur={e => (e.target.style.borderColor = '#dde4e8')}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 text-sm font-medium tracking-widest uppercase transition-opacity hover:opacity-80"
              style={{ backgroundColor: '#1a2c36', color: '#fff', letterSpacing: '0.1em' }}
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </PageShell>
  )
}

function Footer({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <footer className="border-t mt-0" style={{ borderColor: '#dde4e8', backgroundColor: '#edecea' }}>
      <div className="max-w-6xl mx-auto px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-serif text-base" style={{ color: '#1a2c36' }}>Joshua Winkel</p>
        <div className="flex flex-wrap gap-6">
          {NAV_LINKS.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => navigate(page)}
              className="text-xs tracking-widest uppercase transition-opacity hover:opacity-50"
              style={{ color: '#4a6070', letterSpacing: '0.08em' }}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="text-xs" style={{ color: '#8a9ea8' }}>© {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>('home')

  const navigate = (p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar current={page} navigate={navigate} />

      <main className="flex-1">
        {page === 'home' && <HomePage navigate={navigate} />}
        {page === 'about' && <AboutPage />}
        {page === 'projects' && (
          <PlaceholderPage
            title="Projects"
            subtitle="Academic work, personal experiments, and creative endeavors."
            message="Projects coming soon."
          />
        )}
        {page === 'photography' && (
          <PlaceholderPage
            title="Photography"
            subtitle="Moments captured along the way."
            message="Gallery coming soon."
          />
        )}
        {page === 'blog' && (
          <PlaceholderPage
            title="Blog"
            subtitle="Thoughts on linguistics, travel, and everything in between."
            message="First post coming soon."
          />
        )}
        {page === 'contact' && <ContactPage />}
      </main>

      <Footer navigate={navigate} />
    </div>
  )
}
