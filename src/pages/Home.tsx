import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router';
import { useRef, useEffect, useState } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { MediaReviewGrid } from '../components/MediaReviewShowcase';
import { mediaReviews } from '../data/mediaReviews';
import { artworks, films, products, locations, events } from '../data/store';
import hero_video from '../data/hero_video.mp4';
import hero_image from '../data/Dhushor_Stills__2.8.1.jpg';

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
  const [heroMediaIndex, setHeroMediaIndex] = useState(0);

  useEffect(() => {
    if (mediaReviews.length <= 1) return;

    const timer = window.setInterval(() => {
      setHeroMediaIndex((prev) => (prev + 1) % mediaReviews.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const activeMediaReview = mediaReviews[heroMediaIndex];

  useEffect(() => {
    const imagesToPreload = [hero_image, ...previewArtworks.map(a => a.image), ...previewFilms.map(f => f.image)];
    imagesToPreload.forEach(src => { const img = new Image(); img.src = src; });
  }, [previewArtworks, previewFilms]);

  return (
    <div ref={scrollContainerRef} className="min-h-screen" style={{ background: '#ffffff' }}>

      {/* ────────── HERO ───────────────────────── */}
      <section ref={containerRef} className="relative h-screen flex items-end justify-center overflow-hidden">
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

  {/* Bottom gradient fade */}
  <div
    className="absolute inset-0 z-10 pointer-events-none"
    style={{
      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)',
    }}
  />

  {/* ✅ Text block — pinned to bottom */}
  <motion.div
    style={{ y }}
    className="relative z-20 w-full px-6 md:px-12"
    style={{ paddingBottom: 'clamp(3rem, 6vh, 5rem)' }}
  >
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMediaReview.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5 }}
        >
          {/* ✅ Media source name — with border pill */}
          <div style={{ marginBottom: '1rem' }}>
            <span
              style={{
                display: 'inline-block',
                fontFamily: "'Poppins', sans-serif",
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.9)',
                border: '1px solid rgba(255,255,255,0.45)',
                padding: '5px 14px',
                borderRadius: 2,
              }}
            >
              {activeMediaReview.source}
            </span>
          </div>

          {/* ✅ Quote text */}
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(1.15rem, 2.2vw, 2rem)',
              fontWeight: 400,
              lineHeight: 1.6,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.88)',
              margin: 0,
              maxWidth: '70ch',
            }}
          >
            "{activeMediaReview.excerpt}"
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div
        style={{
          display: 'flex',
          gap: '0.6rem',
          marginTop: '1.5rem',
        }}
      >
        {mediaReviews.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setHeroMediaIndex(index)}
            aria-label={`Show media quote ${index + 1}`}
            style={{
              width: index === heroMediaIndex ? 28 : 8,
              height: 8,
              borderRadius: 999,
              border: 'none',
              background: index === heroMediaIndex ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.28)',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  </motion.div>

  {/* Scroll indicator */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.2, delay: 1.2 }}
    className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20"
  >
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
                <div key={i} style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', padding: '16px 28px' }}>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 16, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 6 }}>{meta.label}</p>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 15, fontWeight: 300, color: '#0a0a0a' }}>{meta.value}</p>
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
                  <motion.h3 className="font-serif" style={{ fontSize: '28px', color: '#0a0a0a', lineHeight: 1.2, marginBottom: '0.5rem' }}
                    variants={{ hovered: { color: '#333333' } }} transition={{ duration: 0.3 }}>
                    {film.title}
                  </motion.h3>
                  {film.description && (
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 18, fontWeight: 300, color: 'rgba(0, 0, 0, 0.98)', lineHeight: 1.5 }}>
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

    <motion.div
      initial={{ opacity: 0, x: -50, rotateZ: -2 }}
      whileInView={{ opacity: 1, x: 0, rotateZ: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 md:mb-16"
    >
      <h2
        className="font-serif tracking-tight leading-none"
        style={{ fontSize: 'clamp(2.8rem, 7vw, 6.5rem)', color: '#010101', marginBottom: '1rem' }}
      >
        Alternative<br />
        <em className="italic" style={{ color: '#070404' }}>Prints</em>
      </h2>
    </motion.div>

    {/* Clean grid — first 4 photos */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      {artworks.slice(0, 4).map((src, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30, rotateX: -8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          whileHover="hovered"
          className="group cursor-pointer"
        >
          <motion.div
            style={{
              padding: '8px',
              background: '#1a1a1a',
              border: '1px solid rgba(255,255,255,0.1)',
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
                  src={src}
                  alt={`Print ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>

    <Link to="/gallery">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        whileHover={{ x: 8 }}
        transition={{ duration: 0.3 }}
        className="inline-flex items-center gap-2"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#030000',
          borderBottom: '1.5px solid rgba(0,0,0,0.3)',
          paddingBottom: 6,
        }}
      >
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

      <MediaReviewGrid
        items={mediaReviews}
        dark
        eyebrow="Press & Media"
        title="Media Review"
        description=""
        footerLink={{ label: 'Go to Media Page', path: '/media' }}
      />

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
