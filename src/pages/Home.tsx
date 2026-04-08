import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router';
import { useRef, useEffect } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { artworks, films, products, locations, events } from '../data/store';
import hero_video from '../data/hero_video.mp4';
import hero_image from '../data/Dhushor_Stills__2.8.1.jpg';


// ─── Press data ───────────────────────────────────────────
const pressItems = [
  { id: 1, source: 'Mint',                sourceShort: 'MINT', url: 'https://www.livemint.com/mint-lounge/art-and-culture/event-planner-art-culture-comedy-womens-day-ramadan-iftar-feast-11772799990027.html excerp meditative journey through cinema and still image, converging at the threshold of memory and permanence.' },
  { id: 2, source: 'Elle India',           sourceShort: 'ELLE', url: 'https://elle.in/life-culture/the-exhibitions-everyones-talking-about-this-month-11180232', excerpt: 'One of the exhibitions everyone is talking about this month — immersive, layered, and deeply poetic.' },
  { id: 3, source: 'Hindustan Times',      sourceShort: 'HT',   url: 'https://share.google/VWlhQvTlmz7gGYsHj', excerpt: 'Purandar Chaudhuris visual universe unfolds across frames, prints, and performance in equal measure.' },
  { id: 4, source: 'Press Trust of India', sourceShort: 'PTI',  url: 'https://www.instagram.com/p/DVlCv7hjbQ_/?img_index=2&igsh=MXBwZG9wOTk1MTk2dQ==', excerpt: 'An ambitious multi-city exhibition bridging experimental cinema with alternative photographic print.' },
  { id: 5, source: 'News Drum',            sourceShort: 'ND',   url: 'https://www.instagram.com/p/DVlCv7hjbQ_/?img_index=2&igsh=MXBwZG9wOTk1MTk2dQ==', excerpt: 'The exhibition draws crowds seeking something beyond the conventional gallery experience.' },
  { id: 6, source: 'Abirpothi',            sourceShort: 'ABP',  url: 'https://www.abirpothi.com/a-voyage-to-permanence-an-immersive-dialogue-between-cinema-and-art-set-to-open-in-delhi/', excerpt: 'An immersive dialogue between cinema and art — set to open across four Indian cities.' },
  { id: 7, source: 'Esquire India',        sourceShort: 'ESQ',  url: 'https://elle.in/life-culture/the-exhibitions-everyones-talking-about-this-month-11180232', excerpt: 'Where film stills become photographs, and photographs become something eternal.' },
];

// ─── Marquee ticker ──────────────────────────────────────
function MediaTicker({ dark = true }: { dark?: boolean }) {
  const items = [...pressItems, ...pressItems];
  return (
    <div
      className="overflow-hidden py-4 md:py-5"
      style={{ borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}
    >
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="flex gap-0 whitespace-nowrap"
      >
        {items.map((p, i) => (
          <span key={i} className="flex items-center gap-6 md:gap-10 px-6 md:px-10">
            <span
              className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase"
              style={{ color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}
            >
              {p.source}
            </span>
            <span style={{ color: dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)', fontSize: 10 }}>◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity  = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale    = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y        = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const previewArtworks = artworks.slice(0, 6);
  const previewFilms    = films.slice(0, 2);
  const previewProducts = products.slice(0, 4);
  const nextEvent       = events.find((event) => event.type === 'Exhibition') ?? events[0];
  const cityNames       = locations.map(loc => loc.city);
  const hasArtworkData  = previewArtworks.length > 0;

  useEffect(() => {
    const imagesToPreload = [hero_image, ...previewArtworks.map(a => a.image), ...previewFilms.map(f => f.image)];
    imagesToPreload.forEach(src => { const img = new Image(); img.src = src; });
  }, [previewArtworks, previewFilms]);

  return (
    <div ref={scrollContainerRef} className="min-h-screen" style={{ background: '#ffffff' }}>

      {/* ────────── HERO ───────────────────────── */}
      <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.video
          style={{ opacity, scale }}
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={hero_video} type="video/mp4" />
        </motion.video>

        {/* Grain overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E")`,
            opacity: 0.4,
          }}
        />

        <motion.div style={{ y }} className="relative z-20 text-center text-white px-4 md:px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut', type: 'spring', stiffness: 100, damping: 30 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl mb-6 md:mb-8 tracking-wider leading-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }} className="inline-block">
                A Voyage to
              </motion.span>
              <br />
              <motion.span initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.4, type: 'spring', stiffness: 80 }} className="inline-block">
                Permanence
              </motion.span>
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.5 }} className="mb-8 md:mb-12">
            <motion.p className="text-xl sm:text-2xl md:text-4xl tracking-wide"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.65)' }}
              animate={{ opacity: [0.65, 0.85, 0.65] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
              Celebration of visual poetry
            </motion.p>
          </motion.div>

          <motion.p className="text-xs sm:text-xs md:text-sm tracking-widest uppercase"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: 'rgba(255,255,255,0.45)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
            New Delhi • Goa • Chennai • Bengaluru
          </motion.p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 1.2 }}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20">
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={1} />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          EVENT SECTION — LIGHT GREY
       ══════════════════════════════════════════ */}
      <section style={{ background: '#f9f9f9', position: 'relative', overflow: 'hidden' }} className="py-24 md:py-36 lg:py-48">
        <div className="relative z-10" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(1.5rem, 6vw, 5rem)' }}>

          {/* Title — Slide from left with rotation */}
          <motion.h2
            initial={{ opacity: 0, x: -80, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: '#0a0a0a', lineHeight: 1, letterSpacing: '-0.02em', fontWeight: 600, marginBottom: '1.5rem' }}
          >
            {nextEvent?.title ?? 'Untitled Event'}
          </motion.h2>

          {/* Meta pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem', alignItems: 'center' }}
          >
            {[{ label: 'Location', value: nextEvent?.location }, { label: 'Date', value: nextEvent?.date }]
              .filter(m => m.value)
              .map((meta, i) => (
                <div key={i} style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', padding: '14px 24px' }}>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 6 }}>{meta.label}</p>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 300, color: '#0a0a0a' }}>{meta.value}</p>
                </div>
              ))}
            
            {/* Arrow link to event */}
            <Link to="/events" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ x: 8 }}
                style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 12, marginLeft: 'auto' }}
              >
                <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.6)' }}>Know More</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" color="rgba(0,0,0,0.7)">
                    <path d="M10 5L15 10M15 10L10 15M15 10H5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FILMS — WHITE
       ══════════════════════════════════════════ */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12 max-w-screen-2xl mx-auto" style={{ background: '#ffffff' }}>

        {/* Section label — Fade in with scale */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 md:mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none" style={{ color: '#0a0a0a', marginBottom: '1rem' }}>
            <em className="italic">Films</em>
          </h2>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, color: 'rgba(0,0,0,0.5)', fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', maxWidth: '50ch', lineHeight: 1.7 }}>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {previewFilms.map((film, index) => (
            <Link key={film.id} to={`/films#film-${film.id}`}>
              <motion.div initial={{ opacity: 0, y: 50, rotateX: 10 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                whileHover="hovered" className="group cursor-pointer">

                {/* Film frame — clean minimal border */}
                <motion.div
                  className="relative overflow-hidden mb-4"
                  style={{
                    border: '1px solid rgba(0,0,0,0.12)',
                    aspectRatio: '16/9',
                    background: '#f5f5f5',
                  }}
                  variants={{ hovered: { borderColor: 'rgba(0,0,0,0.25)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' } }}
                  transition={{ duration: 0.3 }}
                >
                  <ImageWithFallback src={film.image} alt={film.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out"
                    style={{ transform: 'scale(1)' }} />
                  <motion.div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0)' }}
                    variants={{ hovered: { background: 'rgba(0,0,0,0.1)' } }} transition={{ duration: 0.4 }} />

                  {/* Play button */}
                  <motion.div className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }} variants={{ hovered: { opacity: 1 } }} transition={{ duration: 0.3 }}>
                    <div className="w-14 h-14 rounded-full border border-white flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)' }}>
                      <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-0.5" />
                    </div>
                  </motion.div>

                  {/* Duration chip */}
                  <div className="absolute top-3 right-3 px-2.5 py-1.5" style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)' }}>
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: '0.05em', color: '#ffffff' }}>{film.duration}</span>
                  </div>
                </motion.div>

                {/* Film info */}
                <div>
                  <motion.h3 className="font-serif" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', color: '#0a0a0a', lineHeight: 1.2, marginBottom: '0.5rem' }}
                    variants={{ hovered: { color: '#333333' } }} transition={{ duration: 0.3 }}>
                    {film.title}
                  </motion.h3>
                  {film.description && (
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 300, color: 'rgba(0,0,0,0.5)', lineHeight: 1.5 }}>
                      {film.description}
                    </p>
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <Link to="/films">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            whileHover={{ x: 8 }} transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2"
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0a0a0a', borderBottom: '1.5px solid #0a0a0a', paddingBottom: 6 }}>
            View All Films
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>→</motion.span>
          </motion.div>
        </Link>
      </section>

      {/* ══════════════════════════════════════════
          PHOTOGRAPHY PRINTS — DARK GREY
       ══════════════════════════════════════════ */}
      <section style={{ background: '#ffffff' }} className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12">
        <div className="max-w-screen-2xl mx-auto">

          <motion.div initial={{ opacity: 0, x: -50, rotateZ: -2 }} whileInView={{ opacity: 1, x: 0, rotateZ: 0 }}
            viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 md:mb-16">
            <h2 className="font-serif tracking-tight leading-none" style={{ fontSize: 'clamp(2.8rem, 7vw, 6.5rem)', color: '#010101', marginBottom: '1rem' }}>
              Alternative<br />
              <em className="italic" style={{ color: '#070404' }}>Prints</em>
            </h2>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', maxWidth: '50ch', lineHeight: 1.7 }}>
            </p>
          </motion.div>

          {hasArtworkData ? (
            <>
              {/* Clean grid — 4 photos */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {previewArtworks.slice(0, 4).map((artwork, index) => (
                  <motion.div
                    key={artwork.id}
                    initial={{ opacity: 0, y: 30, rotateX: -8 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    whileHover="hovered"
                    className="group cursor-pointer"
                  >
                    {/* Simple frame */}
                    <motion.div
                      style={{
                        padding: '8px',
                        background: '#1a1a1a',
                        border: '1px solid rgba(255,255,255,0.1)',
                        marginBottom: '0.75rem',
                      }}
                      variants={{ hovered: { borderColor: 'rgba(255,255,255,0.25)', background: '#252525' } }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="aspect-[3/4] overflow-hidden">
                        <motion.div
                          className="w-full h-full"
                          variants={{ hovered: { scale: 1.03 } }}
                          transition={{ duration: 0.5 }}
                        >
                          <ImageWithFallback
                            src={artwork.image}
                            alt={artwork.title}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h4 className="font-serif" style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)', color: '#ffffff', lineHeight: 1.2, marginBottom: '0.25rem' }}>
                      {artwork.title}
                    </motion.h4>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="py-24 text-center">
              <p style={{ fontFamily: "'Poppins', sans-serif", color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem' }}>
                Our visual archive is being curated.
              </p>
              <p style={{ fontFamily: "'Poppins', sans-serif", color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '0.75rem' }}>Coming Soon</p>
            </div>
          )}

          <Link to="/gallery">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              whileHover={{ x: 8 }} transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ffffff', borderBottom: '1.5px solid rgba(255,255,255,0.5)', paddingBottom: 6 }}>
              View All Prints
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>→</motion.span>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ARTIFACTS — WHITE (Reference model)
       ══════════════════════════════════════════ */}
      <section style={{ background: '#ffffff' }} className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12">
        <div className="max-w-screen-2xl mx-auto">

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16">
            <h2 className="font-serif tracking-tight leading-none" style={{ fontSize: 'clamp(2.8rem, 7vw, 6.5rem)', color: '#0a0a0a' }}>
              <em className="italic">Artifacts</em>
            </h2>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, color: 'rgba(0,0,0,0.5)', fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', marginTop: '1rem', maxWidth: '38ch', lineHeight: 1.7 }}>
              Objects that extend the exhibition beyond gallery walls. Each piece carries memory forward.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {previewProducts.map((product, index) => (
              <Link key={product.id} to={`/products#product-${product.id}`}>
                <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  whileHover="hovered" className="group cursor-pointer">

                  {/* Product frame — clean minimal */}
                  <motion.div
                    style={{
                      padding: '10px',
                      background: '#f8f8f8',
                      border: '1px solid rgba(0,0,0,0.1)',
                      marginBottom: '1rem',
                    }}
                    variants={{ hovered: { border: '1px solid rgba(0,0,0,0.25)', background: '#f0f0f0' } }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="aspect-square overflow-hidden">
                      <motion.div variants={{ hovered: { scale: 1.05 } }} transition={{ duration: 0.5 }} style={{ height: '100%' }}>
                        <ImageWithFallback src={product.image} alt={product.name}
                          className="w-full h-full object-cover"
                          style={{ filter: 'grayscale(0.2) contrast(1.02)' }} />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Product info */}
                  <div>
                    <h4 className="font-serif" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: '#0a0a0a', lineHeight: 1.2, marginBottom: '0.3rem' }}>
                      {product.name}
                    </h4>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 300, color: 'rgba(0,0,0,0.45)', lineHeight: 1.5 }} className="line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-12"
          >
            <Link to="/products">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                whileHover={{ x: 8 }} transition={{ duration: 0.3 }}
                className="inline-flex items-center gap-2"
                style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0a0a0a', borderBottom: '1.5px solid #0a0a0a', paddingBottom: 6 }}>
                View All Artifacts
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>→</motion.span>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRESS & MEDIA — DARK GREY
       ══════════════════════════════════════════ */}
      <section style={{ background: '#1a1a1a' }} className="py-16 md:py-24 lg:py-32 overflow-hidden">

        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-12 mb-10 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: '#ffffff', lineHeight: 1, letterSpacing: '-0.02em', fontWeight: 600, marginBottom: '1rem' }}
          >
            As Seen<br /><em className="italic">In</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.5)', maxWidth: '40ch', lineHeight: 1.7 }}
          >
            Featured across 7 major outlets reaching over 50 million readers across India.
          </motion.p>
        </div>

        {/* Press cards — Simplified */}
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-12">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '1.5rem' }}>

            {/* First item — hero card */}
            {pressItems.slice(0, 1).map((item) => (
              <motion.div key={item.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                style={{
                  background: '#252525',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: 'clamp(2rem, 4vw, 3rem)',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '2rem',
                  alignItems: 'end',
                }}
              >
                <div>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '1.5rem' }}>
                    {item.source}
                  </p>
                  <p className="font-serif" style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)', color: '#ffffff', lineHeight: 1, fontWeight: 600, letterSpacing: '-0.02em' }}>
                    {item.sourceShort}
                  </p>
                </div>
                <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '2rem' }}>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)', fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, fontStyle: 'italic' }}>
                    "{item.excerpt}"
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Remaining items — 2 col grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
              {pressItems.slice(1).map((item, index) => (
                <motion.div key={item.id}
                  initial={{ opacity: 0, y: 24, rotateY: 5 }} whileInView={{ opacity: 1, y: 0, rotateY: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background: '#202020',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    minHeight: 160,
                  }}
                >
                  {/* Source label */}
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
                    {item.source}
                  </p>

                  {/* Short name */}
                  <p className="font-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#ffffff', lineHeight: 1, fontWeight: 600, letterSpacing: '-0.02em' }}>
                    {item.sourceShort}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              marginTop: '1.5rem',
              background: '#0f0f0f',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '2rem 2.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2rem',
            }}
          >
            {[
              { num: '7', label: 'Major Outlets' },
              { num: '50M+', label: 'Readers' },
              { num: '4', label: 'Cities' },
            ].map((stat, i) => (
              <div key={i} style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none', paddingLeft: i > 0 ? '2rem' : 0 }}>
                <p className="font-serif" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#ffffff', fontWeight: 600, lineHeight: 1, marginBottom: '0.5rem' }}>
                  {stat.num}
                </p>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LOCATIONS / THE VOYAGE — LIGHT GREY
       ══════════════════════════════════════════ */}
      <section style={{ background: '#fafafa' }} className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12 max-w-screen-2xl mx-auto">
        <div className="max-w-4xl">
          <motion.h2 initial={{ opacity: 0, x: 60, rotateZ: 3 }} whileInView={{ opacity: 1, x: 0, rotateZ: 0 }} viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif tracking-tight leading-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: '#0a0a0a', marginBottom: '0.5rem' }}>
            The<br /><em className="italic">Voyage</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, color: 'rgba(0,0,0,0.5)', fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', lineHeight: 1.7, maxWidth: '50ch', marginBottom: '3rem' }}
          >
            Exhibition journey across four Indian cities — New Delhi, Goa, Chennai, and Bengaluru.
          </motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
            {cityNames.map((city, index) => (
              <motion.div key={city}
                initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover="hovered"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 0', borderBottom: '1px solid rgba(0,0,0,0.1)', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem' }}>
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)', minWidth: 80 }}>
                    Chapter {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-serif" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#0a0a0a', lineHeight: 1 }}>
                    {city}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          <Link to="/voyage">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              whileHover={{ x: 8 }} transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0a0a0a', borderBottom: '1.5px solid #0a0a0a', paddingBottom: 6 }}>
              Explore All Locations
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>→</motion.span>
            </motion.div>
          </Link>
        </div>
      </section>

    </div>
  );
}
