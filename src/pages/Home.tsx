import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { artworks, films, products, locations, events } from '../data/store';
import hero_video from '../data/hero_video.mp4';
import hero_image from '../data/Dhushor_Stills__2.8.1.jpg';


// ─── Press data (mirrored from Media page) ───────────────
const pressItems = [
  { id: 1, source: 'Mint',               sourceShort: 'MINT', accentColor: '#00A550', url: 'https://www.livemint.com/mint-lounge/art-and-culture/event-planner-art-culture-comedy-womens-day-ramadan-iftar-feast-11772799990027.html' },
  { id: 2, source: 'Elle India',          sourceShort: 'ELLE', accentColor: '#C8102E', url: 'https://elle.in/life-culture/the-exhibitions-everyones-talking-about-this-month-11180232' },
  { id: 3, source: 'Hindustan Times',     sourceShort: 'HT',   accentColor: '#D62728', url: 'https://share.google/VWlhQvTlmz7gGYsHj' },
  { id: 4, source: 'Press Trust of India',sourceShort: 'PTI',  accentColor: '#003087', url: 'https://www.instagram.com/p/DVlCv7hjbQ_/?img_index=2&igsh=MXBwZG9wOTk1MTk2dQ==' },
  { id: 5, source: 'News Drum',           sourceShort: 'ND',   accentColor: '#FF6B00', url: 'https://www.instagram.com/p/DVlCv7hjbQ_/?img_index=2&igsh=MXBwZG9wOTk1MTk2dQ==' },
  { id: 6, source: 'Abirpothi',           sourceShort: 'ABP',  accentColor: '#8B5E3C', url: 'https://www.abirpothi.com/a-voyage-to-permanence-an-immersive-dialogue-between-cinema-and-art-set-to-open-in-delhi/' },
  { id: 7, source: 'Esquire India',       sourceShort: 'ESQ',  accentColor: '#1A1A1A', url: 'https://elle.in/life-culture/the-exhibitions-everyones-talking-about-this-month-11180232' },
];

// ─── BlurImage ───────────────────────────────────────────
function BlurImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <motion.div className="relative overflow-hidden w-full h-full">
      <motion.img src={src} alt={alt} className={`${className} blur-md scale-110 absolute inset-0`}
        initial={{ opacity: 1 }} animate={{ opacity: isLoading ? 1 : 0 }} transition={{ duration: 0.3 }} />
      <motion.img src={src} alt={alt} className={`${className} absolute inset-0`}
        initial={{ opacity: 0 }} animate={{ opacity: isLoading ? 0 : 1 }} transition={{ duration: 0.5 }}
        loading="lazy" decoding="async" />
    </motion.div>
  );
}

// ─── Marquee ticker ──────────────────────────────────────
function MediaTicker() {
  const items = [...pressItems, ...pressItems]; // doubled for seamless loop
  return (
    <div className="overflow-hidden border-y border-white/10 py-4 md:py-5">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="flex gap-0 whitespace-nowrap"
      >
        {items.map((p, i) => (
          <span key={i} className="flex items-center gap-6 md:gap-10 px-6 md:px-10">
            <span
              className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase"
              style={{ color: p.accentColor }}
            >
              {p.source}
            </span>
            <span className="text-white/20 text-xs">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity  = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale    = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y        = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const navigate = useNavigate();
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
    <div
      ref={scrollContainerRef}
      className="min-h-screen"
      onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
    >

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.video
          style={{ opacity, scale, filter: 'brightness(1.15)' }}
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={hero_video} type="video/mp4" />
        </motion.video>

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
            <motion.p className="text-xl sm:text-2xl md:text-4xl tracking-wide opacity-70"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
              animate={{ opacity: [0.7, 0.85, 0.7] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
              Celebration of visual poetry
            </motion.p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.7 }} className="space-y-4 md:space-y-6">
            <motion.p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-4xl mx-auto"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }}>
              An immersive experience of{' '}
              <motion.em className="italic" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                audio visual frames
              </motion.em>
              , alternative prints, and performances on three experimental films of Purandar Chaudhuri
            </motion.p>
            <motion.p className="text-xs sm:text-xs md:text-sm tracking-widest uppercase text-white/60"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
              New Delhi • Goa • Chennai • Bengaluru
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 1.2 }}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20">
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} className="relative">
            <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={1} />
            <motion.div animate={{ opacity: [1, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="absolute inset-0">
              <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={1} />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── EXHIBITION CONCEPT ───────────────────────────────── */}
      <section className="relative h-screen overflow-hidden">
        <motion.div initial={{ opacity: 0, scale: 1.05 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full">
          <ImageWithFallback src={hero_image} alt="Exhibition Background" className="w-full h-full object-cover"
            style={{ filter: 'brightness(1.1)' }} loading="eager" decoding="async" />
        </motion.div>
        <div className="relative z-10 h-full flex items-center justify-center px-6 pt-[18vh]">
          <motion.div className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 1, ease: 'easeOut' }}>
            <motion.p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed text-white font-light italic"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}>
              <motion.span
                animate={{ textShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 20px rgba(255,255,255,0.3)', '0 0 0px rgba(255,255,255,0)'] }}
                transition={{ duration: 3, repeat: Infinity }}>
                "The greyness is a philosophy as much as a colour – a world of ambiguity, where life and death, past and present, memory and imagination mingle like smoke over a river at dawn."
              </motion.span>
            </motion.p>
          </motion.div>
        </div>
      </section>
      {/* ══════════════════════════════════════════════════════════
              EVENT SECTION
          ══════════════════════════════════════════════════════════ */}
       {/* ══════════════════════════════════════════════════════════
    EVENT SECTION — fully dark, matches site theme
══════════════════════════════════════════════════════════ */}
<section
  style={{ background: '#0C0B09', position: 'relative', overflow: 'hidden' }}
  className="py-24 md:py-36 lg:py-48"
>

  {/* ── Ambient glow ── */}
  <div
    className="pointer-events-none absolute inset-0"
    style={{
      background:
        'radial-gradient(ellipse 60% 50% at 75% 20%, rgba(105,70,51,0.10) 0%, transparent 70%), ' +
        'radial-gradient(ellipse 40% 55% at 15% 85%, rgba(105,70,51,0.06) 0%, transparent 60%)',
    }}
  />

  {/* ── Decorative left vertical rule ── */}
  <motion.div
    style={{
      position: 'absolute',
      left: 'clamp(1rem, 4vw, 4rem)',
      top: 0,
      bottom: 0,
      width: 1,
      background: 'linear-gradient(to bottom, transparent, rgba(105,70,51,0.35) 25%, rgba(105,70,51,0.35) 75%, transparent)',
    }}
    initial={{ scaleY: 0 }}
    whileInView={{ scaleY: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
  />

  <div
    className="relative z-10"
    style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(1.5rem, 6vw, 5rem)' }}
  >

    {/* ── Eyebrow label ── */}
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.22)',
        marginBottom: '2.5rem',
      }}
    >
      Current Exhibition
    </motion.p>

    {/* ── Title + meta row ── */}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '2.5rem',
        marginBottom: '4rem',
      }}
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="font-serif"
        style={{
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          color: '#ffffff',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          fontWeight: 600,
        }}
      >
        {nextEvent?.title ?? 'Untitled Event'}
      </motion.h2>

      {/* Summary */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.12 }}
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)',
          fontWeight: 300,
          lineHeight: 1.75,
          color: 'rgba(255,255,255,0.4)',
          maxWidth: '640px',
        }}
      >
        {nextEvent?.summary ?? 'Join us to experience the latest chapter in our exhibition journey.'}
      </motion.p>

      {/* Meta pills — horizontal row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}
      >
        {[
          { label: 'Location', value: nextEvent?.location },
          { label: 'Date',     value: nextEvent?.date },
          { label: 'Type',     value: nextEvent?.type },
        ]
          .filter((m) => m.value)
          .map((meta, i) => (
            <div
              key={i}
              style={{
                background: '#181510',
                border: '1px solid rgba(105,70,51,0.22)',
                padding: '14px 24px',
                minWidth: 180,
              }}
            >
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: '#694633',
                  marginBottom: 6,
                }}
              >
                {meta.label}
              </p>
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 13,
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                {meta.value}
              </p>
            </div>
          ))}
      </motion.div>
    </div>

    {/* ── Highlights ── */}
    {nextEvent?.keyHighlights && nextEvent.keyHighlights.length > 0 && (
      <div style={{ marginBottom: '5rem' }}>

        {/* Sub-label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.18)',
            marginBottom: '1.25rem',
          }}
        >
          Highlights
        </motion.p>

        {/* Highlight grid — 1px gap, dark tiles */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 2,
          }}
        >
          {nextEvent.keyHighlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover="hovered"
              style={{ position: 'relative', overflow: 'hidden', background: '#181510' }}
            >
              {/* Hover brown fill from bottom */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(105,70,51,0.12)',
                  transformOrigin: 'bottom',
                  zIndex: 0,
                }}
                initial={{ scaleY: 0 }}
                variants={{ hovered: { scaleY: 1 } }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />

              <div style={{ position: 'relative', zIndex: 1, padding: '2rem 2rem 2.5rem' }}>
                {/* Large muted number */}
                <p
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)',
                    color: 'rgb(251, 251, 251)',
                    lineHeight: 1,
                    marginBottom: '1.25rem',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </p>

                {/* Divider */}
                <motion.div
                  style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: '1.25rem' }}
                  variants={{ hovered: { background: 'rgba(105,70,51,0.3)' } }}
                  transition={{ duration: 0.3 }}
                />

                {/* Highlight text */}
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 13,
                    lineHeight: 1.75,
                    fontWeight: 300,
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  {highlight}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )}

    {/* ── CTA row ── */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.15 }}
      style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2px' }}
    >
      {/* Ghost CTA — brown border, fills on hover */}
      <Link to="/events">
        <motion.div
          style={{
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(206, 80, 12, 0.4)',
            padding: '16px 36px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
          }}
          whileHover="hovered"
        >
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: '#844523',
              transformOrigin: 'bottom',
              zIndex: 0,
            }}
            initial={{ scaleY: 0 }}
            variants={{ hovered: { scaleY: 1 } }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            style={{
              position: 'relative',
              zIndex: 1,
              fontFamily: "'Poppins', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
            }}
            variants={{ hovered: { color: '#ffffff' } }}
            transition={{ duration: 0.2 }}
          >
            Explore Event Story
          </motion.span>
          <motion.span
            style={{ position: 'relative', zIndex: 1, color: '#694633', fontSize: 14 }}
            variants={{ hovered: { color: '#ffffff', x: 4 } }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
        </motion.div>
      </Link>

      {/* Solid white CTA */}
      <Link to="/events">
        <motion.div
          style={{
            background: '#ffffff',
            padding: '16px 36px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
          }}
          whileHover={{ backgroundColor: 'rgba(255,255,255,0.88)' }}
          transition={{ duration: 0.2 }}
        >
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#0C0B09',
            }}
          >
            Go to Event Page
          </span>
        </motion.div>
      </Link>
    </motion.div>

  </div>
</section>
    
      {/* ── ART PREVIEW GRID ─────────────────────────────────── */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12 bg-black text-white">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-12 md:mb-16">
            <motion.h2 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-4 md:mb-6 tracking-tight"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 }}>
              Alternative<br />
              <motion.em className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl italic block" style={{ color: '#704c36' }}
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}>
                Photography Prints
              </motion.em>
            </motion.h2>
          </motion.div>

          {hasArtworkData ? (
            <>
              <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 lg:gap-8 mb-8 md:mb-12"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}>
                {previewArtworks.map((artwork, index) => (
                  <motion.div key={artwork.id}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
                    whileHover={{ y: -10 }}
                    className="aspect-[3/4] relative overflow-hidden group cursor-pointer rounded-sm">
                    <ImageWithFallback src={artwork.image} alt={artwork.title} className="w-full h-full object-cover transition-all duration-700" />
                    <motion.div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
                      initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.4 }} />
                    <motion.div className="absolute inset-0 flex items-end p-3 md:p-6"
                      initial={{ y: 10, opacity: 0 }} whileHover={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
                      <motion.p className="text-white font-serif text-base md:text-xl lg:text-2xl"
                        animate={{ letterSpacing: [0, 2, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                        {artwork.title}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }} className="py-24 md:py-32 text-center">
              <p className="text-white/70 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-4">
                Our visual archive is currently being <span className="text-white font-serif">curated</span>,{' '}
                <span className="text-white font-serif">developed</span>, and <span className="text-white font-serif">composed</span>.
              </p>
              <motion.p animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
                className="text-white/50 text-sm sm:text-base md:text-lg tracking-widest uppercase">Coming Soon</motion.p>
            </motion.div>
          )}

          <Link to="/gallery">
            <motion.button initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} whileHover={{ x: 8 }} transition={{ duration: 0.3 }}
              className="mt-8 md:mt-12 flex items-center gap-2 text-white border-b-2 border-accent pb-2 text-sm md:text-lg hover:text-accent transition-colors">
              Explore the Prints
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>→</motion.span>
            </motion.button>
          </Link>
        </div>
      </section>

      {/* ── FILMS ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12 max-w-screen-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8 md:mb-16">
          <motion.h2 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-4 md:mb-6 tracking-tight leading-tight"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}>
            <motion.em className="italic text-[#694633]"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}>
              Films
            </motion.em>
          </motion.h2>
          <motion.p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}>
            Cinematic journeys weaving fragmented narratives, layered voices, and the poetry of displacement.
          </motion.p>
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ staggerChildren: 0.2, delayChildren: 0.1 }}>
          {previewFilms.map((film, index) => (
            <Link key={film.id} to={`/films#film-${film.id}`}>
              <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, delay: index * 0.2, ease: 'easeOut' }}
                whileHover={{ y: -10 }} className="group cursor-pointer">
                <motion.div className="aspect-[16/9] relative overflow-hidden mb-4 md:mb-6 rounded-sm"
                  whileHover={{ scale: 1.02 }} transition={{ duration: 0.5 }}>
                  <ImageWithFallback src={film.image} alt={film.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                  <motion.div className="absolute inset-0 bg-black/40 group-hover:bg-black/20"
                    initial={{ opacity: 0.4 }} whileHover={{ opacity: 0.2 }} transition={{ duration: 0.3 }} />
                  <motion.div className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }} whileHover={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                    <motion.div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center backdrop-blur-sm bg-white/10"
                      animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                      <motion.div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"
                        animate={{ x: [0, 2, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
                    </motion.div>
                  </motion.div>
                  <motion.div className="absolute top-4 md:top-6 right-4 md:right-6 bg-white/10 backdrop-blur-sm px-3 py-1 md:px-4 md:py-2 text-white text-xs md:text-sm border border-white/20 rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}>
                    {film.duration}
                  </motion.div>
                </motion.div>
                <motion.h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 md:mb-3 leading-tight group-hover:text-[#694633] transition-colors"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}>
                  {film.title}
                </motion.h3>
                <motion.p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}>
                  {film.description}
                </motion.p>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        <Link to="/films">
          <motion.button initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} whileHover={{ x: 8 }} transition={{ duration: 0.3 }}
            className="mt-8 md:mt-12 flex items-center gap-2 text-[#694633] border-b-2 border-[#694633] pb-2 text-sm md:text-lg hover:text-[#694633] transition-colors">
            Explore the Films
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>→</motion.span>
          </motion.button>
        </Link>
      </section>

      {/* ── PRODUCTS / ARTIFACTS ─────────────────────────────── */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12 bg-muted/30">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-12 md:mb-16">
            <motion.h2 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-4 md:mb-6 tracking-tight"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 }}>
              <motion.em className="italic text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-[#694633]"
                initial={{ opacity: 0, y: 30 }} style={{ color: '#08172f' }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}>
                Artifacts
              </motion.em>
            </motion.h2>
            <motion.p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}>
              Objects that extend the exhibition beyond gallery walls. Each piece carries memory forward.
            </motion.p>
          </motion.div>

          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ staggerChildren: 0.08, delayChildren: 0.15 }}>
            {previewProducts.map((product, index) => (
              <Link key={product.id} to={`/products#product-${product.id}`}>
                <motion.div initial={{ opacity: 0, y: 30, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
                  whileHover={{ y: -8, scale: 1.05 }} className="group cursor-pointer">
                  <motion.div className="aspect-square bg-white mb-3 md:mb-4 overflow-hidden shadow-lg rounded-sm"
                    whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }}>
                    <ImageWithFallback src={product.image} alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 ease-out" />
                  </motion.div>
                  <motion.h4 className="mb-1 text-sm md:text-base lg:text-lg font-serif group-hover:text-[#694633] transition-colors"
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}>
                    {product.name}
                  </motion.h4>
                  <motion.p className="text-xs md:text-sm text-muted-foreground line-clamp-2"
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}>
                    {product.description}
                  </motion.p>
                </motion.div>
              </Link>
            ))}
          </motion.div>

          <Link to="/products">
            <motion.button initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} whileHover={{ x: 8 }} transition={{ duration: 0.3 }}
              className="mt-8 md:mt-12 flex items-center gap-2 text-[#694633] border-b-2 border-[#694633] pb-2 text-sm md:text-lg hover:text-[#694633] transition-colors">
              View All Artifacts
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>→</motion.span>
            </motion.button>
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PRESS & MEDIA SECTION
      ════════════════════════════════════════════════════════ */}
      <section style={{ background: '#0C0B09' }} className="py-16 md:py-24 lg:py-32 overflow-hidden">

        {/* Header */}
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-12 mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.p
              className="font-medium mb-5"
              style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.05 }}
            >
              Press &amp; Media
            </motion.p>
            <motion.h2
              className="font-serif tracking-tight text-white leading-none"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 }}
            >
              As Seen<br />
              <em className="italic" style={{ color: '#694633' }}>In</em>
            </motion.h2>
          </motion.div>
        </div>

        {/* Scrolling ticker */}
        <MediaTicker />

        {/* Grid of outlet tiles — each is a Link to /media */}
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-12 mt-px">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
            {pressItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                style={index === 0 ? { gridColumn: '1 / -1' } : {}}
                whileHover="hovered"
              >
                <Link to="/media" style={{ textDecoration: 'none', display: 'block' }}>
                  <motion.div
                    className="relative overflow-hidden cursor-pointer"
                    style={{
                      background: '#181510',
                      minHeight: index === 0 ? 240 : 200,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '36px 40px 32px',
                    }}
                    whileHover="hovered"
                  >
                    {/* White fill slides up from bottom on hover */}
                    <motion.div
                      style={{
                        position: 'absolute', inset: 0,
                        background: '#ffffff',
                        transformOrigin: 'bottom',
                        zIndex: 0,
                      }}
                      initial={{ scaleY: 0 }}
                      variants={{ hovered: { scaleY: 1 } }}
                      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Content */}
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%', gap: 20 }}>

                      {/* Top row: outlet name + arrow */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                        <motion.span
                          style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: item.accentColor }}
                          variants={{ hovered: { opacity: 0.6 } }}
                        >
                          {item.source}
                        </motion.span>
                        <motion.span
                          style={{ fontSize: 22, lineHeight: 1, color: 'rgba(255,255,255,0.25)' }}
                          variants={{ hovered: { color: '#181818', opacity: 1 } }}
                          initial={{ opacity: 0, x: -4, y: 4 }}
                          transition={{ duration: 0.2, delay: 0.06 }}
                        >
                          ↗
                        </motion.span>
                      </div>

                      {/* BIG source short name */}
                      <motion.p
                        className="font-serif"
                        style={{
                          fontSize: index === 0 ? 'clamp(3rem, 9vw, 6.5rem)' : 'clamp(2.2rem, 5vw, 4rem)',
                          lineHeight: 1,
                          fontWeight: 600,
                          letterSpacing: '-0.02em',
                          color: '#ffffff',
                          flex: 1,
                          display: 'flex',
                          alignItems: 'flex-end',
                        }}
                        variants={{ hovered: { color: '#181818' } }}
                        transition={{ duration: 0.28 }}
                      >
                        {item.sourceShort}
                      </motion.p>

                      {/* Bottom: divider + full name */}
                      <div>
                        <motion.div
                          style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 14 }}
                          variants={{ hovered: { background: 'rgba(0,0,0,0.1)' } }}
                        />
                        <motion.p
                          style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}
                          variants={{ hovered: { color: 'rgba(0,0,0,0.4)' } }}
                          transition={{ duration: 0.28 }}
                        >
                          {item.source}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{
              marginTop: 2,
              background: '#181510',
              padding: '28px 40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 20,
            }}
          >
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', maxWidth: 400, lineHeight: 1.6 }}>
              Featured across{' '}
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>7 major outlets</span>{' '}
              reaching over{' '}
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>50+ million readers</span>.
            </p>
            <Link to="/media">
              <motion.div
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 12, fontWeight: 600, letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
                  borderBottom: '1px solid rgba(255,255,255,0.15)',
                  paddingBottom: 6, cursor: 'pointer',
                  textDecoration: 'none',
                }}
                className="hover:text-white transition-colors"
              >
                View all press coverage
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>→</motion.span>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── LOCATIONS ────────────────────────────────────────── */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12 max-w-screen-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl">
          <motion.h2 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-8 md:mb-12 tracking-tight leading-tight"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}>
            The<br />
            <motion.em className="italic text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-[#694633]"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}>
              Voyage
            </motion.em>
          </motion.h2>

          <motion.p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed mb-8 md:mb-12"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}>
            This exhibition <em className="font-serif not-italic text-foreground">moves</em>. It{' '}
            <em className="font-serif not-italic text-foreground">transforms</em>.
            It adapts to each city it inhabits, creating new dialogues between place, memory, and the communities that hold them.
          </motion.p>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.15 }}>
            {cityNames.map((city, index) => (
              <motion.div key={city}
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="py-4 md:py-6 border-b-2 border-foreground/10 cursor-pointer hover:border-foreground/30 transition-all group">
                <motion.span className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest"
                  animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity }}>
                  Chapter {index + 1}
                </motion.span>
                <motion.h3 className="text-2xl sm:text-3xl font-serif mt-2 group-hover:text-[#694633] transition-colors"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}>
                  {city}
                </motion.h3>
              </motion.div>
            ))}
          </motion.div>

          <Link to="/voyage">
            <motion.button initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} whileHover={{ x: 8 }} transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-[#694633] border-b-2 border-[#694633] pb-2 text-sm md:text-lg hover:text-[#694633] transition-colors">
              Explore All Locations
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>→</motion.span>
            </motion.button>
          </Link>
        </motion.div>
      </section>

    </div>
  );
}