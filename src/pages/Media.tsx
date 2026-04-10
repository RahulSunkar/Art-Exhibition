import { Link } from 'react-router';
import { useEffect, useState, useRef, useCallback } from 'react';
import Image1 from '../data/EventData/20260310_182202.jpg';
import Image2 from '../data/EventData/poster_page-0001.jpg';
import Image3 from '../data/Prints/_MG_7058.jpg';
import Image4 from '../data/Prints/_MG_7061.jpg';
import Image5 from '../data/Prints/_MG_7064.jpg';
import Image6 from '../data/Prints/_MG_7065.jpg';
import TremorsPoster from '../data/FilmsData/Tremor_Poster.jpg';
import DushorPoster from '../data/FilmsData/Dushor_Poster1.jpg';
import NewsPaperImg from '../data/EventData/NewIndiaExpressNewsPapper.jpeg';
/* ─── Types ─────────────────────────────────────────────── */
interface PressItem {
  id: number;
  source: string;
  sourceShort: string;
  title: string;
  url?: string;
  excerpt?: string;
  accentColor: string;
  img?: string;
}
interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

/* ─── Data ───────────────────────────────────────────────── */
const galleryImages: GalleryImage[] = [
  { id: 1, src: Image1,        alt: 'Exhibition View 1' },
  { id: 2, src: Image2,        alt: 'Exhibition View 2' },
  { id: 3, src: Image3,        alt: 'Exhibition View 3' },
  { id: 4, src: Image4,        alt: 'Exhibition View 4' },
  { id: 5, src: Image5,        alt: 'Exhibition View 5' },
  { id: 6, src: Image6,        alt: 'Exhibition View 6' },
  { id: 7, src: TremorsPoster, alt: 'Tremors — Film Poster' },
  { id: 8, src: DushorPoster,  alt: 'Dushor — Film Poster' },
];

const pressItems: PressItem[] = [
  {
    id: 1,
    source: 'Home Grown',
    sourceShort: 'HG',
    title: "Inside Purandar Chaudhuri's trilogy of displacement and urban life.",
    url: 'https://homegrown.co.in/amp/story/homegrown-creators/a-voyage-to-permanence-inside-purandar-chaudhuris-trilogy-of-displacement-urban-life',
    excerpt: "Inside Purandar Chaudhuri's trilogy of displacement and urban life.",
    accentColor: '#2D6A4F',
  },
  {
    id: 2,
    source: 'ACF India',
    sourceShort: 'ACF',
    title: 'A Voyage to Permanence — featured by Alliance Culturelle Française.',
    url: 'https://www.instagram.com/p/DWOncyFEp2T/',
    excerpt: 'A Voyage to Permanence — featured by Alliance Culturelle Française.',
    accentColor: '#003189',
  },
  {
    id: 3,
    source: 'India Today',
    sourceShort: 'IT',
    title: "At the heart of the exhibition are Chaudhuri's films Dhushor, Tremors, and Impressions of Mingling.",
    url: 'https://www.indiatoday.in/amp/magazine/leisure/story/20260323-melancholic-journey-a-voyage-to-permanence-immersive-exhibition-2881656-2026-03-14',
    excerpt: "At the heart of the exhibition are Chaudhuri's films Dhushor, Tremors, and Impressions of Mingling. Exploring themes of memory, migration, erasure and survival, the works unfold through a contemplative visual language.",
    accentColor: '#C0392B',
  },
  {
    id: 4,
    source: 'Abir Pothi',
    sourceShort: 'ABP',
    title: 'The five-day event reimagines cinema within the context of visual art.',
    url: 'https://www.abirpothi.com/a-voyage-to-permanence-an-immersive-dialogue-between-cinema-and-art-set-to-open-in-delhi/',
    excerpt: 'The five-day event reimagines cinema within the context of visual art. Rather than projecting films as linear narratives, A Voyage to Permanence transforms them into spatial experiences that oscillate between abstraction and figuration, inviting viewers to engage with the moving image as a meditative, almost tactile encounter.',
    accentColor: '#8B5E3C',
  },
  {
    id: 5,
    source: 'Esquire India',
    sourceShort: 'ESQ',
    title: 'A layered dialogue between moving image, still image, sound, and text.',
    url: 'https://www.esquireindia.co.in/culture/art-and-design/art-in-march-2026-the-exhibition-hotlist/amp',
    excerpt: 'A layered dialogue between moving image, still image, sound, and text.',
    accentColor: '#d6c2a1',
  },
  {
    id: 6,
    source: 'Press Trust of India',
    sourceShort: 'PTI',
    title: 'A new multidisciplinary exhibition built around three experimental films by filmmaker Purandar Chaudhuri.',
    url: 'https://www.ptinews.com/story/national/multidisciplinary-exhibition-to-reimagine-act-of-viewing-cinema-within-gallery-context/3443716',
    excerpt: 'A new multidisciplinary exhibition, built around three experimental films by filmmaker Purandar Chaudhuri, will aim to reimagine the act of viewing cinema within a gallery context.',
    accentColor: '#003087',
  },
  {
    id: 7,
    source: 'Hindustan Times',
    sourceShort: 'HT',
    title: 'Multidisciplinary exhibition to reimagine act of viewing cinema within gallery context.',
    url: 'https://www.hindustantimes.com/lifestyle/art-culture/multidisciplinary-exhibition-to-reimagine-act-of-viewing-cinema-within-gallery-context-101772882533082-amp.html',
    excerpt: 'Multidisciplinary exhibition to reimagine act of viewing cinema within gallery context.',
    accentColor: '#E63946',
  },
  {
    id: 8,
    source: 'NewsDrum',
    sourceShort: 'ND',
    title: 'Multidisciplinary exhibition to reimagine act of viewing cinema within gallery context.',
    url: 'https://www.newsdrum.in/national/multidisciplinary-exhibition-to-reimagine-act-of-viewing-cinema-within-gallery-context-11183747',
    excerpt: 'Multidisciplinary exhibition to reimagine act of viewing cinema within gallery context.',
    accentColor: '#457B9D',
  },
  {
    id: 9,
    source: 'Elle India',
    sourceShort: 'ELLE',
    title: 'Transforming cinema into a gallery experience through screenings, photography, installations, and live programming.',
    url: 'https://elle.in/life-culture/the-exhibitions-everyones-talking-about-this-month-11180232',
    excerpt: 'Transforming cinema into a gallery experience through screenings, photography, installations, and live programming.',
    accentColor: '#C8102E',
  },
  {
    id: 10,
    source: 'Live Mint',
    sourceShort: 'MINT',
    title: 'A Voyage to Permanence listed among the top art and culture events of the month.',
    url: 'https://www.livemint.com/mint-lounge/art-and-culture/event-planner-art-culture-comedy-womens-day-ramadan-iftar-feast-11772799990027.html',
    excerpt: 'A Voyage to Permanence listed among the top art and culture events of the month.',
    accentColor: '#1A936F',
  },
  {
    id: 11,
    source: 'Abir Pothi (Reel)',
    sourceShort: 'ABP',
    title: 'A Voyage to Permanence — visual coverage from Abir Pothi.',
    url: 'https://www.instagram.com/reel/DV0muPEiqaG/?igsh=bm55am5jd3prb2Jk',
    excerpt: 'A Voyage to Permanence — visual coverage from Abir Pothi.',
    accentColor: '#8B5E3C',
  },
  {
    id: 12,
    source: 'New india Express',
    sourceShort: 'NIE',
    title: 'Three films, three journeys',
    url: 'https://www.newindianexpress.com/states/delhi/2026/Mar/15/three-films-three-journeys',
    excerpt: 'Three films, three journeys',
    accentColor: '#8f2222',
  }, 
  {
    id: 12,
    source: 'New india Express[News paper]',
    sourceShort: 'NIE',
    title: 'Three films, three journeys',
    img:NewsPaperImg,
    excerpt: 'Three films, three journeys',
    accentColor: '#8f2222',
  },  
];

/* ─── Hooks ──────────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Big Press Tile ─────────────────────────────────────── */
function PressTile({ item, index }: { item: PressItem; index: number }) {
  const { ref, inView } = useInView(0.08);
  const fromLeft = index % 2 === 0;

  // Inline style for background image if it exists
  const bgImageStyle = item.img ? {
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${item.img})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  } : {};

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : `translateX(${fromLeft ? '-70px' : '70px'})`,
        transition: `opacity 0.75s cubic-bezier(.22,1,.36,1) ${index * 0.09}s, transform 0.75s cubic-bezier(.22,1,.36,1) ${index * 0.09}s`,
      }}
    >
      <a
        href={item.url || '#'} 
        target={item.url ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className="press-tile"
        style={bgImageStyle}
        onClick={(e) => !item.url && e.preventDefault()} // Disable click if no URL
      >
        <div className="tile-bg" />

        <div className="tile-top">
          <span className="tile-source" style={{ '--ac': item.accentColor } as React.CSSProperties}>
            {item.source}
          </span>
          {item.url && <span className="tile-arrow">↗</span>}
        </div>

        <h3 className="tile-title">{item.title}</h3>

        {item.excerpt && <p className="tile-excerpt">{item.excerpt}</p>}

        <div className="tile-bottom">
          <span className="tile-code">{item.sourceShort}</span>
          {item.url && <span className="tile-read">Read Article</span>}
        </div>
      </a>
    </div>
  );
}

/* ─── Gallery Thumb ──────────────────────────────────────── */
function GalleryThumb({ image, index, onClick }: { image: GalleryImage; index: number; onClick: () => void }) {
  const { ref, inView } = useInView(0.08);
  const fromLeft = index % 2 === 0;
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : `translateX(${fromLeft ? '-50px' : '50px'})`,
        transition: `opacity 0.65s cubic-bezier(.22,1,.36,1) ${index * 0.07}s, transform 0.65s cubic-bezier(.22,1,.36,1) ${index * 0.07}s`,
      }}
    >
      <button className="gallery-thumb" onClick={onClick} aria-label={image.alt}>
        <img src={image.src} alt={image.alt} loading="lazy" />
        <div className="thumb-overlay">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <circle cx="15" cy="15" r="14" stroke="white" strokeWidth="1.4"/>
            <path d="M10 15h10M15 10v10" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </div>
      </button>
    </div>
  );
}

/* ─── Lightbox ───────────────────────────────────────────── */
function Lightbox({ images, index, onClose, onNav }: {
  images: GalleryImage[]; index: number;
  onClose: () => void; onNav: (i: number) => void;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav((index + 1) % images.length);
      if (e.key === 'ArrowLeft') onNav((index - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [index, images.length, onClose, onNav]);

  return (
    <div className="lb-backdrop" onClick={onClose}>
      <button className="lb-close" onClick={onClose}>✕</button>
      <button className="lb-nav lb-prev" onClick={e => { e.stopPropagation(); onNav((index - 1 + images.length) % images.length); }}>←</button>
      <div className="lb-frame" onClick={e => e.stopPropagation()}>
        <img src={images[index].src} alt={images[index].alt} className="lb-img" />
        <p className="lb-caption">{images[index].alt}</p>
      </div>
      <button className="lb-nav lb-next" onClick={e => { e.stopPropagation(); onNav((index + 1) % images.length); }}>→</button>
      <div className="lb-dots">
        {images.map((_, i) => (
          <button key={i} className={`lb-dot${i === index ? ' active' : ''}`}
            onClick={e => { e.stopPropagation(); onNav(i); }} />
        ))}
      </div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────── */
export function Media() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Media – A Voyage to Permanence';
    const t = setTimeout(() => setHeroLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const navLightbox = useCallback((i: number) => setLightboxIndex(i), []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 20; }

        :root {
          --cream: #F4F0E8;
          --ink:   #181818;
          --muted: #7A7268;
          --rule:  #DDD7CC;
        }

        .media-page {
          min-height: 1vh;
          background: var(--cream);
          color: var(--ink);
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
        }

        /* ══════════════════════════════
           HERO
        ══════════════════════════════ */
        .hero {
          position: relative;
          height: 70svh;
          min-height: 400px;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background-image: url(${Image1});
          background-size: cover;
          background-position: center;
          filter: blur(14px) brightness(0.38) saturate(0.7);
          transform: scale(1.08);
          opacity: 0;
          transition: opacity 1.2s ease;
        }
        .hero-bg.loaded { opacity: 1; }

        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(24,24,24,0.15) 0%, transparent 40%, rgba(24,24,24,0.82) 100%);
        }

        .hero-content {
          position: relative; z-index: 2;
          width: 100%; padding: 0 48px 64px;
          max-width: 1200px; margin: 0 auto;
          opacity: 0; transform: translateY(32px);
          transition: opacity 1s 0.35s cubic-bezier(.22,1,.36,1), transform 1s 0.35s cubic-bezier(.22,1,.36,1);
        }
        .hero-content.loaded { opacity: 1; transform: none; }

        .hero-eyebrow {
          font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase;
          color: rgba(255,255,255,0.5); font-weight: 500; margin-bottom: 14px;
        }

        .hero-title {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(3.2rem, 9vw, 7rem);
          font-weight: 600; color: #fff;
          line-height: 1.0; letter-spacing: -0.02em; margin-bottom: 52px;
        }
        .hero-title em { font-style: italic; font-weight: 400; }

        .hero-stats {
          display: flex; gap: 0;
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(20px);
          background: rgba(255,255,255,0.07);
          width: fit-content; border-radius: 3px; overflow: hidden;
        }
        .hero-stat {
          padding: 22px 38px;
          border-right: 1px solid rgba(255,255,255,0.15);
          text-align: center; min-width: 130px;
        }
        .hero-stat:last-child { border-right: none; }
        .hero-stat-val {
          font-family: 'Poppins', sans-serif;
          font-size: 2.8rem; font-weight: 700; color: #fff; line-height: 1; margin-bottom: 6px;
        }
        .hero-stat-lbl {
          font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.48); font-weight: 500;
        }

        .scroll-hint {
          position: absolute; bottom: 28px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          color: rgba(255,255,255,0.32); font-size: 10px;
          letter-spacing: 0.22em; text-transform: uppercase;
          animation: shBounce 2.6s ease-in-out infinite; z-index: 2;
        }
        @keyframes shBounce {
          0%,100% { transform: translateX(-50%) translateY(0); }
          55%      { transform: translateX(-50%) translateY(8px); }
        }

        /* ══════════════════════════════
           SECTION HEADS
        ══════════════════════════════ */
        .sec-head {
          max-width: 1200px; margin: 0 auto;
          padding: 80px 48px 20px;
          display: flex; align-items: center; gap: 18px;
        }
        .sec-eyebrow {
          font-size: 10.5px; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--muted); font-weight: 600; white-space: nowrap;
        }
        .sec-rule { flex: 1; height: 1px; background: var(--rule); }
        .sec-title {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 600;
          max-width: 1200px; margin: 0 auto; padding: 12px 48px 44px;
          line-height: 1.15; color: var(--ink);
        }

        /* ══════════════════════════════
           PRESS TILES — big full-cover cards
           white bg → black fill on hover, all text flips to white
        ══════════════════════════════ */
        .press-grid {
          max-width: 1200px; margin: 0 auto;
          padding: 0 48px 88px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3px;
        }

        /* First tile spans full width */
        .press-grid > div:first-child { grid-column: 1 / -1; }

        .press-tile {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 260px;
          padding: 36px 40px 32px;
          background: #fff;
          text-decoration: none;
          color: var(--ink);
          position: relative;
          overflow: hidden;
          cursor: pointer;
          gap: 16px;
        }

        /* The black fill that slides up from bottom on hover */
        .tile-bg {
          position: absolute; inset: 0;
          background: #181818;
          transform: translateY(100%);
          transition: transform 0.48s cubic-bezier(.22,1,.36,1);
          z-index: 0;
        }
        .press-tile:hover .tile-bg { transform: translateY(0); }

        /* All content sits above the bg */
        .tile-top, .tile-title, .tile-excerpt, .tile-bottom { position: relative; z-index: 1; }

        .tile-top {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 12px;
        }

        .tile-source {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--ac, var(--ink));
          transition: color 0.35s ease;
        }
        .press-tile:hover .tile-source { color: rgba(255,255,255,0.55); }

        .tile-arrow {
          font-size: 1.5rem; line-height: 1;
          color: var(--muted);
          opacity: 0;
          transform: translate(-6px, 6px);
          transition: opacity 0.3s ease, transform 0.3s ease, color 0.3s ease;
        }
        .press-tile:hover .tile-arrow {
          opacity: 1; transform: none; color: #fff;
        }

        .tile-title {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(1.4rem, 2.8vw, 2rem);
          font-weight: 600; line-height: 1.2;
          color: var(--ink);
          transition: color 0.35s ease;
          flex: 1;
        }
        .press-tile:hover .tile-title { color: #fff; }

        /* first tile gets bigger title */
        .press-grid > div:first-child .tile-title {
          font-size: clamp(1.8rem, 4vw, 2.8rem);
        }

        .tile-excerpt {
          font-size: 0.875rem; line-height: 1.7;
          color: var(--muted); max-width: 560px;
          transition: color 0.35s ease;
        }
        .press-tile:hover .tile-excerpt { color: rgba(255,255,255,0.55); }

        .tile-bottom {
          display: flex; align-items: center;
          justify-content: space-between; gap: 12px;
          border-top: 1px solid var(--rule);
          padding-top: 20px;
          transition: border-color 0.35s ease;
        }
        .press-tile:hover .tile-bottom { border-color: rgba(255,255,255,0.15); }

        .tile-code {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--muted);
          transition: color 0.35s ease;
        }
        .press-tile:hover .tile-code { color: rgba(255,255,255,0.4); }

        .tile-read {
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--ink);
          opacity: 0; transform: translateX(-8px);
          transition: opacity 0.3s 0.08s ease, transform 0.3s 0.08s ease, color 0.3s ease;
        }
        .press-tile:hover .tile-read { opacity: 1; transform: none; color: #fff; }

        /* ══════════════════════════════
           GALLERY
        ══════════════════════════════ */
        .gallery-grid {
          max-width: 1200px; margin: 0 auto;
          padding: 0 48px 100px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
          gap: 4px;
        }

        .gallery-thumb {
          position: relative; aspect-ratio: 3/4;
          overflow: hidden; background: #e0d8cd;
          border: none; padding: 0; cursor: pointer;
          display: block; width: 100%;
        }
        .gallery-thumb img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.5s cubic-bezier(.22,1,.36,1), filter 0.4s ease;
        }
        .gallery-thumb:hover img { transform: scale(1.07); filter: brightness(0.65); }

        .thumb-overlay {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.3s ease;
        }
        .gallery-thumb:hover .thumb-overlay { opacity: 1; }

        /* ══════════════════════════════
           LIGHTBOX
        ══════════════════════════════ */
        .lb-backdrop {
          position: fixed; inset: 0;
          background: rgba(16,12,8,0.97); z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          animation: lbIn 0.28s cubic-bezier(.22,1,.36,1);
        }
        @keyframes lbIn { from { opacity: 0; } to { opacity: 1; } }

        .lb-frame {
          max-width: min(88vw, 800px); max-height: 88svh;
          display: flex; flex-direction: column; align-items: center; gap: 16px;
          animation: lbSlide 0.35s cubic-bezier(.22,1,.36,1);
        }
        @keyframes lbSlide {
          from { opacity: 0; transform: scale(0.93) translateY(18px); }
          to   { opacity: 1; transform: none; }
        }

        .lb-img { max-width: 100%; max-height: 78svh; object-fit: contain; display: block; border-radius: 2px; }
        .lb-caption { font-size: 0.78rem; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.38); font-weight: 500; }

        .lb-close {
          position: fixed; top: 24px; right: 28px;
          background: none; border: 1.5px solid rgba(255,255,255,0.22);
          color: rgba(255,255,255,0.65); width: 44px; height: 44px;
          border-radius: 50%; cursor: pointer; font-size: 1rem;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; z-index: 10;
        }
        .lb-close:hover { background: rgba(255,255,255,0.1); color: #fff; }

        .lb-nav {
          position: fixed; top: 50%; transform: translateY(-50%);
          background: none; border: 1.5px solid rgba(255,255,255,0.18);
          color: rgba(255,255,255,0.65); width: 52px; height: 52px;
          border-radius: 50%; cursor: pointer; font-size: 1.3rem;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; z-index: 10;
        }
        .lb-nav:hover { background: rgba(255,255,255,0.1); color: #fff; border-color: rgba(255,255,255,0.5); }
        .lb-prev { left: 24px; }
        .lb-next { right: 24px; }

        .lb-dots { position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; z-index: 10; }
        .lb-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.28); border: none; cursor: pointer; transition: all 0.2s; padding: 0; }
        .lb-dot.active { background: #fff; transform: scale(1.5); }

        /* ══════════════════════════════
           FOOTER
        ══════════════════════════════ */
        .media-footer {
          max-width: 1200px; margin: 0 auto;
          padding: 40px 48px 80px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 20px; border-top: 1px solid var(--rule);
        }
        .back-link {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 0.82rem; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--muted); text-decoration: none; font-weight: 600;
          transition: color 0.2s, gap 0.2s;
        }
        .back-link:hover { color: var(--ink); gap: 14px; }
        .mint-cta {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 0.82rem; letter-spacing: 0.16em; text-transform: uppercase;
          color: #00A550; text-decoration: none; font-weight: 600;
          border: 1.5px solid #00A550; padding: 10px 22px; border-radius: 2px;
          transition: all 0.2s;
        }
        .mint-cta:hover { background: #00A550; color: #fff; }

        /* ══════════════════════════════
           RESPONSIVE
        ══════════════════════════════ */
        @media (max-width: 768px) {
          .hero-content, .press-grid, .gallery-grid,
          .sec-head, .sec-title, .media-footer { padding-left: 20px; padding-right: 20px; }
          .press-grid { grid-template-columns: 1fr; }
          .press-grid > div:first-child { grid-column: 1; }
          .hero-stats { flex-wrap: wrap; }
          .hero-stat { min-width: 100px; padding: 14px 18px; }
          .press-tile { min-height: 200px; padding: 24px 24px 20px; }
          .lb-prev { left: 8px; }
          .lb-next { right: 8px; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <div className="media-page">

        {/* ── HERO ── */}
        <section className="hero">
          <div className={`hero-bg${heroLoaded ? ' loaded' : ''}`} />
          <div className="hero-overlay" />
          <div className={`hero-content${heroLoaded ? ' loaded' : ''}`}>
            <p className="hero-eyebrow">Press &amp; Media Coverage</p>
            <h1 className="hero-title">A Voyage to<br /><em>Permanence</em></h1>
            <div className="hero-stats">

              <div className="hero-stat">
                <div className="hero-stat-val">5+</div>
                <div className="hero-stat-lbl">Press Mentions</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-val">12+</div>
                <div className="hero-stat-lbl">Media Images</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-val">50M+</div>
                <div className="hero-stat-lbl">Coverage Reach</div>
              </div>
            </div>
          </div>
          <div className="scroll-hint">
            <span>Scroll</span>
            <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
              <rect x="1" y="1" width="12" height="20" rx="6" stroke="currentColor" strokeWidth="1.2"/>
              <rect x="6" y="5" width="2" height="4" rx="1" fill="currentColor"/>
            </svg>
          </div>
        </section>

        {/* ── PRESS & MEDIA ── */}
        <div className="sec-head">
          <span className="sec-eyebrow">Press &amp; Media</span>
          <div className="sec-rule" />
        </div>
        <h2 className="sec-title">As Seen In</h2>

        <div className="press-grid">
          {pressItems.map((item, i) => (
            <PressTile key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox images={galleryImages} index={lightboxIndex} onClose={closeLightbox} onNav={navLightbox} />
      )}
    </>
  );
}
