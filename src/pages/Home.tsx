import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useState, useRef, useEffect } from 'react';
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
          style={{ opacity, scale, filter: 'brightness(0.6) grayscale(1)' }}
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
          EVENT SECTION — BLACK
       ══════════════════════════════════════════ */}
      <section style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden' }} className="py-24 md:py-36 lg:py-48">

        {/* Left vertical rule */}
        <motion.div
          style={{
            position: 'absolute', left: 'clamp(1rem, 4vw, 4rem)', top: 0, bottom: 0, width: 1,
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.12) 25%, rgba(255,255,255,0.12) 75%, transparent)',
          }}
          initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="relative z-10" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(1.5rem, 6vw, 5rem)' }}>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: '#ffffff', lineHeight: 1, letterSpacing: '-0.02em', fontWeight: 600, marginBottom: '2.5rem' }}
          >
            {nextEvent?.title ?? 'Untitled Event'}
          </motion.h2>

          {/* Meta pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginBottom: '4rem' }}
          >
            {[{ label: 'Location', value: nextEvent?.location }, { label: 'Date', value: nextEvent?.date }]
              .filter(m => m.value)
              .map((meta, i) => (
                <div key={i} style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 24px', minWidth: 180 }}>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>{meta.label}</p>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.8)' }}>{meta.value}</p>
                </div>
              ))}
          </motion.div>

          {/* Highlights */}
          {nextEvent?.keyHighlights && nextEvent.keyHighlights.length > 0 && (
            <div style={{ marginBottom: '5rem' }}>
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                style={{ fontFamily: "'Poppins', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', marginBottom: '1.25rem' }}
              >
                Highlights
              </motion.p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 2 }}>
                {nextEvent.keyHighlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    whileHover="hovered"
                    style={{ position: 'relative', overflow: 'hidden', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <motion.div style={{ position: 'absolute', inset: 0, background: '#ffffff', transformOrigin: 'bottom', zIndex: 0 }}
                      initial={{ scaleY: 0 }} variants={{ hovered: { scaleY: 1 } }} transition={{ duration: 0.4 }} />
                    <div style={{ position: 'relative', zIndex: 1, padding: '2rem 2rem 2.5rem' }}>
                      <motion.p className="font-serif"
                        style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)', color: '#ffffff', lineHeight: 1, marginBottom: '1.25rem', fontWeight: 600, letterSpacing: '-0.02em' }}
                        variants={{ hovered: { color: '#0a0a0a' } }} transition={{ duration: 0.28 }}>
                        {String(index + 1).padStart(2, '0')}
                      </motion.p>
                      <motion.div style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: '1.25rem' }}
                        variants={{ hovered: { background: 'rgba(0,0,0,0.15)' } }} transition={{ duration: 0.3 }} />
                      <motion.p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, lineHeight: 1.75, fontWeight: 300, color: 'rgba(255,255,255,0.6)' }}
                        variants={{ hovered: { color: 'rgba(0,0,0,0.7)' } }} transition={{ duration: 0.28 }}>
                        {highlight}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}>
            <Link to="/events">
              <motion.div
                style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.25)', padding: '16px 36px', display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
                whileHover="hovered"
              >
                <motion.div style={{ position: 'absolute', inset: 0, background: '#ffffff', transformOrigin: 'bottom', zIndex: 0 }}
                  initial={{ scaleY: 0 }} variants={{ hovered: { scaleY: 1 } }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }} />
                <motion.span style={{ position: 'relative', zIndex: 1, fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}
                  variants={{ hovered: { color: '#0a0a0a' } }} transition={{ duration: 0.2 }}>
                  Explore Event Story
                </motion.span>
                {/* <motion.span style={{ position: 'relative', zIndex: 1, color: 'rgba(255,255,255,0.5)', fontSize: 14 }}
                  variants={{ hovered: { color: '#0a0a0a', x: 4 } }} transition={{ duration: 0.2 }}>
                  →
                </motion.span> */}
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FILMS — WHITE
       ══════════════════════════════════════════ */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12 max-w-screen-2xl mx-auto" style={{ background: '#ffffff' }}>

        {/* Section label */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none" style={{ color: '#0a0a0a' }}>
            <em className="italic">Films</em>
          </h2>
          
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {previewFilms.map((film, index) => (
            <Link key={film.id} to={`/films#film-${film.id}`}>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                whileHover="hovered" className="group cursor-pointer">

                {/* Film frame — thick black border like a cinema frame */}
                <motion.div
                  className="relative overflow-hidden"
                  style={{
                    border: '3px solid #0a0a0a',
                    aspectRatio: '16/9',
                    background: '#0a0a0a',
                  }}
                  variants={{ hovered: { borderColor: '#000000' } }}
                >
                  <ImageWithFallback src={film.image} alt={film.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
                    style={{ filter: 'grayscale(1) contrast(1.05)', transform: 'scale(1)' }} />
                  <motion.div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.35)' }}
                    variants={{ hovered: { background: 'rgba(0,0,0,0.15)' } }} transition={{ duration: 0.4 }} />

                  {/* Play button */}
                  <motion.div className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }} variants={{ hovered: { opacity: 1 } }} transition={{ duration: 0.3 }}>
                    <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}>
                      <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                    </div>
                  </motion.div>

                  {/* Duration chip */}
                  <div className="absolute top-4 right-4 px-3 py-1" style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: '#ffffff' }}>{film.duration}</span>
                  </div>

                  {/* Frame corners
                  <div style={{ position: 'absolute', top: 8, left: 8, width: 16, height: 16, borderTop: '2px solid rgba(255,255,255,0.5)', borderLeft: '2px solid rgba(255,255,255,0.5)' }} />
                  <div style={{ position: 'absolute', top: 8, right: 8, width: 16, height: 16, borderTop: '2px solid rgba(255,255,255,0.5)', borderRight: '2px solid rgba(255,255,255,0.5)' }} />
                  <div style={{ position: 'absolute', bottom: 8, left: 8, width: 16, height: 16, borderBottom: '2px solid rgba(255,255,255,0.5)', borderLeft: '2px solid rgba(255,255,255,0.5)' }} />
                  <div style={{ position: 'absolute', bottom: 8, right: 8, width: 16, height: 16, borderBottom: '2px solid rgba(255,255,255,0.5)', borderRight: '2px solid rgba(255,255,255,0.5)' }} /> */}
                </motion.div>

                {/* Film info strip */}
                <div style={{ padding: '1.25rem 0', borderBottom: '1px solid rgba(0,0,0,0.1)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                  <div>
                    <h3 className="font-serif" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', color: '#0a0a0a', lineHeight: 1.1, marginBottom: '0.5rem' }}>
                      {film.title}
                    </h3>
                  
                  </div>
                  {/* <motion.span style={{ fontSize: 20, color: 'rgba(0,0,0,0.25)', flexShrink: 0, marginTop: 4 }}
                    variants={{ hovered: { color: '#0a0a0a', x: 4 } }} transition={{ duration: 0.2 }}>
                    →
                  </motion.span> */}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <Link to="/films">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            whileHover={{ x: 8 }} transition={{ duration: 0.3 }}
            className="mt-10 inline-flex items-center gap-2"
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0a0a0a', borderBottom: '2px solid #0a0a0a', paddingBottom: 6 }}>
            Explore the Films
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>→</motion.span>
          </motion.div>
        </Link>
      </section>

      {/* ══════════════════════════════════════════
          PHOTOGRAPHY PRINTS — BLACK
       ══════════════════════════════════════════ */}
      <section style={{ background: '#000000' }} className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12">
        <div className="max-w-screen-2xl mx-auto">

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16">
            <h2 className="font-serif tracking-tight leading-none" style={{ fontSize: 'clamp(2.8rem, 7vw, 6.5rem)', color: '#ffffff' }}>
              Alternative<br />
              <em className="italic" style={{ color: '#ffffff' }}>Photography Prints</em>
            </h2>
            
          </motion.div>

          {hasArtworkData ? (
            <>
              {/* FRAMED grid — 4 photos, natural color, 2x2 */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
  {previewArtworks.slice(0, 4).map((artwork, index) => (
    <motion.div
      key={artwork.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover="hovered"
      className="group cursor-pointer"
    >
      {/* Frame (same system as artifacts but darker) */}
      <motion.div
        className="p-2 bg-[#1c1c1c] border border-white/10 mb-2"
        variants={{ hovered: { borderColor: 'rgba(255,255,255,0.3)' } }}
        transition={{ duration: 0.3 }}
      >
        <div style={{ padding: '8px', background: '#6c3203', border: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="p-1.5 bg-[#141414] border border-white/5">
          <div className="aspect-[3/4] overflow-hidden">
            <motion.div
              className="w-full h-full"
              variants={{ hovered: { scale: 1.05 } }}
              transition={{ duration: 0.5 }}
            >
              <ImageWithFallback
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
         </div>
        </div>
      </motion.div>

      {/* Caption (like artifacts) */}
      {/* <div className="flex items-center justify-between">
        <p className="text-[11px] text-white/60 font-light leading-tight">
          {artwork.title}
        </p>

        <motion.span
          className="text-white/20 text-sm"
          variants={{ hovered: { color: '#ffffff', x: 3 } }}
          transition={{ duration: 0.2 }}
        >
          →
        </motion.span>
      </div> */}
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
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffffff', borderBottom: '2px solid rgba(255,255,255,0.4)', paddingBottom: 6 }}>
              Explore the Prints
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>→</motion.span>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ARTIFACTS — WHITE
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {previewProducts.map((product, index) => (
              <Link key={product.id} to={`/products#product-${product.id}`}>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  whileHover="hovered" className="group cursor-pointer">

                  {/* Product frame — matches photo section */}
                  <motion.div
                    style={{
                      padding: '10px',
                      background: '#f5f5f5',
                      border: '1px solid rgba(0,0,0,0.1)',
                      marginBottom: '0.75rem',
                    }}
                    variants={{ hovered: { border: '1px solid rgba(0,0,0,0.4)', background: '#efefef' } }}
                    transition={{ duration: 0.3 }}
                  >
                    
                      <div className="aspect-square overflow-hidden">
                        <motion.div variants={{ hovered: { scale: 1.05 } }} transition={{ duration: 0.5 }} style={{ height: '100%' }}>
                          <ImageWithFallback src={product.image} alt={product.name}
                            className="w-full h-full object-cover"
                            style={{ filter: 'grayscale(0.3) contrast(1.05)' }} />
                        </motion.div>
                      </div>
                    
                  </motion.div>

                  {/* Product info */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                    <div>
                      <h4 className="font-serif" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: '#0a0a0a', lineHeight: 1.2, marginBottom: '0.25rem' }}>
                        {product.name}
                      </h4>
                      <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 300, color: 'rgba(0,0,0,0.45)', lineHeight: 1.6 }} className="line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    {/* <motion.span style={{ fontSize: 16, color: 'rgba(0,0,0,0.2)', flexShrink: 0, marginTop: 2 }}
                      variants={{ hovered: { color: '#0a0a0a', x: 3 } }} transition={{ duration: 0.2 }}>
                      →
                    </motion.span> */}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <Link to="/products">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              whileHover={{ x: 8 }} transition={{ duration: 0.3 }}
              className="mt-10 inline-flex items-center gap-2"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0a0a0a', borderBottom: '2px solid #0a0a0a', paddingBottom: 6 }}>
              View All Artifacts
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>→</motion.span>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRESS & MEDIA — BLACK
       ══════════════════════════════════════════ */}
      <section style={{ background: '#0a0a0a' }} className="py-16 md:py-24 lg:py-32 overflow-hidden">

        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-12 mb-10 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-serif"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: '#ffffff', lineHeight: 1, letterSpacing: '-0.02em', fontWeight: 600, marginBottom: '1rem' }}
          >
            As Seen<br /><em className="italic">In</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.4)', maxWidth: '40ch', lineHeight: 1.7 }}
          >
            Featured across 7 major outlets reaching over 50 million readers across India.
          </motion.p>
        </div>

        {/* Ticker */}
        {/* <MediaTicker dark={true} /> */}

        {/* Press overview cards — NO links, just showcase */}
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-12 mt-2">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 2 }}>

            {/* First item spans full width — hero card */}
            {pressItems.slice(0, 1).map((item) => (
              <motion.div key={item.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                style={{
                  background: '#161616',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: 'clamp(2rem, 4vw, 3rem)',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '2rem',
                  alignItems: 'end',
                }}
              >
                <div>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1.5rem' }}>
                    {item.source}
                  </p>
                  <p className="font-serif" style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)', color: '#ffffff', lineHeight: 1, fontWeight: 600, letterSpacing: '-0.02em' }}>
                    {item.sourceShort}
                  </p>
                </div>
                <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '2rem' }}>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)', fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, fontStyle: 'italic' }}>
                    "{item.excerpt}"
                  </p>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginTop: '1.25rem' }}>
                    — {item.source}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Remaining items — 2 col grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
              {pressItems.slice(1).map((item, index) => (
                <motion.div key={item.id}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.06 }}
                  style={{
                    background: '#141414',
                    border: '1px solid rgba(255,255,255,0.06)',
                    padding: '2rem 2.25rem 2.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '1.5rem',
                    minHeight: 200,
                  }}
                >
                  {/* Source label */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
                      {item.source}
                    </p>
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.1)', fontFamily: "'Poppins', sans-serif" }}>
                      PRESS
                    </span>
                  </div>

                  {/* Short name */}
                  <p className="font-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#ffffff', lineHeight: 1, fontWeight: 600, letterSpacing: '-0.02em' }}>
                    {item.sourceShort}
                  </p>

                  {/* Divider + excerpt */}
                  <div>
                    <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: '1rem' }} />
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 12, fontWeight: 300, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, fontStyle: 'italic' }}>
                      "{item.excerpt.length > 90 ? item.excerpt.slice(0, 90) + '…' : item.excerpt}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              marginTop: 2,
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '2rem 2.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2rem',
            }}
          >
            {[
              { num: '7', label: 'Major Outlets' },
              { num: '50M+', label: 'Readers Reached' },
              { num: '4', label: 'Cities Covered' },
            ].map((stat, i) => (
              <div key={i} style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none', paddingLeft: i > 0 ? '2rem' : 0 }}>
                <p className="font-serif" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#ffffff', fontWeight: 600, lineHeight: 1, marginBottom: '0.5rem' }}>
                  {stat.num}
                </p>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LOCATIONS / THE VOYAGE — WHITE
       ══════════════════════════════════════════ */}
      <section style={{ background: '#ffffff' }} className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12 max-w-screen-2xl mx-auto">
        <div className="max-w-4xl">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-serif tracking-tight leading-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: '#0a0a0a', marginBottom: '2rem' }}>
            The<br /><em className="italic">Voyage</em>
          </motion.h2>

          {/* <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, color: 'rgba(0,0,0,0.55)', fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', lineHeight: 1.8, maxWidth: '52ch', marginBottom: '3rem' }}>
            This exhibition <em style={{ fontStyle: 'italic', color: '#0a0a0a' }}>moves</em>. It{' '}
            <em style={{ fontStyle: 'italic', color: '#0a0a0a' }}>transforms</em>.
            It adapts to each city it inhabits, creating new dialogues between place, memory, and the communities that hold them.
          </motion.p> */}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 2, marginBottom: '3rem' }}>
            {cityNames.map((city, index) => (
              <motion.div key={city}
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover="hovered"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 0', borderBottom: '1px solid rgba(0,0,0,0.1)', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem' }}>
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)', minWidth: 80 }}>
                    Chapter {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-serif" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#0a0a0a', lineHeight: 1 }}>
                    {city}
                  </h3>
                </div>
                {/* <motion.span style={{ fontSize: 20, color: 'rgba(0,0,0,0.2)' }}
                  variants={{ hovered: { color: '#0a0a0a', x: 6 } }} transition={{ duration: 0.2 }}>
                  →
                </motion.span> */}
              </motion.div>
            ))}
          </div>

          <Link to="/voyage">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              whileHover={{ x: 8 }} transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0a0a0a', borderBottom: '2px solid #0a0a0a', paddingBottom: 6 }}>
              Explore All Locations
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>→</motion.span>
            </motion.div>
          </Link>
        </div>
      </section>

    </div>
  );
}