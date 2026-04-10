import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router';
import { events } from '../data/store';
import { mediaReviews } from '../data/mediaReviews';
import { MediaReviewGrid } from '../components/MediaReviewShowcase';
import { useIsMobile } from '../components/ui/use-mobile';

// ─── Shared design tokens ───────────────────────────────────────────────────
const T = {
  serif: "'Poppins', sans-serif",
  mono: "'DM Mono', monospace",
  white: '#ffffff',
  dim1: 'rgba(255,255,255,0.72)',
  dim2: 'rgba(255,255,255,0.45)',
  dim3: 'rgba(255,255,255,0.18)',
  dim4: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.09)',
  borderHover: '1px solid rgba(255,255,255,0.22)',
};

// ─── Utility function to extract YouTube thumbnail ────────────────────────
function getYouTubeThumbnail(videoUrl: string): string {
  // Extract video ID from various YouTube URL formats
  let videoId = '';
  
  // Match youtube.com/embed/ID
  const embedMatch = videoUrl.match(/embed\/([^?&\s]+)/);
  // Match youtube.com/shorts/ID
  const shortsMatch = videoUrl.match(/shorts\/([^?&\s]+)/);
  // Match youtube.com/watch?v=ID
  const watchMatch = videoUrl.match(/[?&]v=([^&\s]+)/);
  
  if (embedMatch) videoId = embedMatch[1];
  else if (shortsMatch) videoId = shortsMatch[1];
  else if (watchMatch) videoId = watchMatch[1];
  
  if (!videoId) return '';
  
  // Return thumbnail URL (maxresdefault is the highest quality)
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

// ─── CSS injected once ───────────────────────────────────────────────────────
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

  @keyframes scanGrain {
    0%,100% { transform: translate(0,0); }
    10%      { transform: translate(-2%,-3%); }
    30%      { transform: translate(3%,2%); }
    50%      { transform: translate(-1%,4%); }
    70%      { transform: translate(2%,-1%); }
    90%      { transform: translate(-3%,1%); }
  }
  @keyframes softFlicker {
    0%,94%,100% { opacity:1; }
    95% { opacity:.93; }
    97% { opacity:.96; }
  }
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes lineGrow {
    from { transform:scaleX(0); }
    to   { transform:scaleX(1); }
  }

  .ev-root {
    font-family: 'DM Mono', monospace;
    background: #050505;
    color: #fff;
    animation: softFlicker 12s infinite;
    position: relative;
    overflow-x: hidden;
  }
  .ev-root::before {
    content:'';
    position:fixed;
    inset:-50%;
    width:200%;height:200%;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
    animation:scanGrain .5s steps(1) infinite;
    pointer-events:none;
    z-index:9999;
    opacity:.12;
  }

  .label { font-family:'DM Mono',monospace; font-size:9px; font-weight:500; letter-spacing:.42em; text-transform:uppercase; color:rgba(255,255,255,.22); }
  .label-bright { font-family:'DM Mono',monospace; font-size:9px; font-weight:500; letter-spacing:.42em; text-transform:uppercase; color:rgba(255,255,255,.5); }

  .section { padding:7rem 5rem; border-bottom:1px solid rgba(255,255,255,.07); position:relative; }
  @media(max-width:900px){ .section{ padding:4rem 2rem; } }

  .diag-grid {
    position:absolute; inset:0; pointer-events:none;
    background-image: repeating-linear-gradient(-45deg,transparent,transparent 48px,rgba(255,255,255,.012) 48px,rgba(255,255,255,.012) 49px);
  }

  .gallery-img { transition:transform .6s cubic-bezier(.16,1,.3,1), filter .4s; }
  .gallery-img:hover { transform:scale(1.05); filter:brightness(1.08); }

  .pill {
    display:inline-flex; align-items:center; gap:6px;
    border:1px solid rgba(255,255,255,.12); padding:5px 14px;
    font-size:10px; letter-spacing:.18em; text-transform:uppercase;
    color:rgba(255,255,255,.5); font-family:'DM Mono',monospace;
  }

  .pdf-nav-btn {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.6);
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, opacity 0.2s;
  }
  .pdf-nav-btn:not(:disabled):hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.25);
  }
  .pdf-nav-btn:disabled {
    opacity: 0.25;
    cursor: default;
  }

  .video-card:hover .video-play-btn {
    transform: scale(1.12);
    background: rgba(255,255,255,0.18);
    border-color: rgba(255,255,255,0.5);
  }
  .video-play-btn {
    transition: transform 0.3s cubic-bezier(.16,1,.3,1), background 0.25s, border-color 0.25s;
  }

  .catalog-stage {
    position: relative;
    min-height: clamp(420px, 72vh, 860px);
    perspective: 2200px;
  }

  .catalog-stage::before {
    content: '';
    position: absolute;
    inset: 8% 10%;
    border-radius: 28px;
    background: radial-gradient(circle at center, rgba(255,255,255,0.07), transparent 72%);
    filter: blur(24px);
    pointer-events: none;
  }

  .catalog-book {
    position: relative;
    min-height: inherit;
    background: linear-gradient(145deg, rgba(18,18,18,0.98) 0%, rgba(8,8,8,0.94) 100%);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 32px 120px rgba(0,0,0,0.42);
  }

  .catalog-book::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(255,255,255,0.03), transparent 12%, transparent 88%, rgba(255,255,255,0.03));
    pointer-events: none;
  }

  .catalog-page-shell {
    position: absolute;
    inset: clamp(14px, 2vw, 22px);
    border-radius: 20px;
    overflow: hidden;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    box-shadow: 0 26px 60px rgba(0,0,0,0.45);
  }

  .catalog-page-shell img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    background: #f5f0e8;
  }

  .catalog-page-shell::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(0,0,0,0.22), transparent 12%, transparent 88%, rgba(0,0,0,0.18));
    pointer-events: none;
  }

  .catalog-spine {
    position: absolute;
    left: 50%;
    top: 6%;
    bottom: 6%;
    width: 1px;
    transform: translateX(-50%);
    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.14), transparent);
    box-shadow: 0 0 22px rgba(255,255,255,0.08);
    pointer-events: none;
  }

  .catalog-meta-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
  }

  @media (max-width: 900px) {
    .catalog-stage {
      min-height: 420px;
    }
  }
`;

// ─── Reusable tiny components ────────────────────────────────────────────────
const SectionLabel = ({ children, delay = 0 }: { children: string; delay?: number }) => (
  <motion.p
    className="label"
    initial={{ opacity: 0, x: -32 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: .6, delay }}
    style={{ marginBottom: '3rem' }}
  >
    {children}
  </motion.p>
);

const SectionTitle = ({ children }: { children: string }) => (
  <motion.h2
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    style={{
      fontFamily: T.serif,
      fontSize: 'clamp(2.4rem, 5vw, 4.8rem)',
      lineHeight: 0.95,
      letterSpacing: '-0.04em',
      color: '#ffffff',
      margin: '0 0 2rem',
    }}
  >
    {children}
  </motion.h2>
);

// ─── PDF Catalog Viewer ───────────────────────────────────────────────────────
function CatalogViewer({ catalog }: { catalog: { pdfUrl?: string; image?: string } }) {
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pageImage, setPageImage] = useState<string | null>(null);
  const [turnDirection, setTurnDirection] = useState(1);
  const stageRef = useRef<HTMLDivElement>(null);
  const pdfRef = useRef<any>(null);
  const renderTaskRef = useRef<any>(null);
  const pageRef = useRef(1);

  useEffect(() => {
    pageRef.current = pageNum;
  }, [pageNum]);

  useEffect(() => {
    if (!catalog.pdfUrl) {
      setLoading(false);
      return;
    }

    const loadPdf = () => {
      const pdfjsLib = (window as any)['pdfjs-dist/build/pdf'];
      if (!pdfjsLib) {
        setError(true);
        setLoading(false);
        return;
      }

      pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

      pdfjsLib
        .getDocument(catalog.pdfUrl)
        .promise.then((pdf: any) => {
          pdfRef.current = pdf;
          setTotalPages(pdf.numPages);
          renderPage(1, pdf);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    };

    if ((window as any)['pdfjs-dist/build/pdf']) {
      loadPdf();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.onload = loadPdf;
      script.onerror = () => {
        setError(true);
        setLoading(false);
      };
      document.head.appendChild(script);
    }

    return () => {
      renderTaskRef.current?.cancel?.();
    };
  }, [catalog.pdfUrl]);

  const renderPage = (num: number, pdf?: any) => {
    const doc = pdf ?? pdfRef.current;
    if (!doc || !stageRef.current) return;

    renderTaskRef.current?.cancel?.();
    setLoading(true);

    doc.getPage(num).then((page: any) => {
      const baseViewport = page.getViewport({ scale: 1 });
      const stageWidth = Math.max(stageRef.current!.clientWidth - 48, 280);
      const stageHeight = Math.min(window.innerHeight * 0.7, 880);
      const scale = Math.min(stageWidth / baseViewport.width, stageHeight / baseViewport.height);
      const viewport = page.getViewport({ scale: Math.max(scale, 0.85) });
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        setError(true);
        setLoading(false);
        return;
      }

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const task = page.render({ canvasContext: ctx, viewport });
      renderTaskRef.current = task;

      task.promise
        .then(() => {
          setPageImage(canvas.toDataURL('image/jpeg', 0.96));
          setPageNum(num);
          setLoading(false);
        })
        .catch((renderError: { name?: string }) => {
          if (renderError?.name !== 'RenderingCancelledException') {
            setError(true);
          }
          setLoading(false);
        });
    });
  };

  const goTo = (dir: number) => {
    const next = Math.max(1, Math.min(totalPages, pageRef.current + dir));
    if (next === pageRef.current || loading) return;
    setTurnDirection(dir > 0 ? 1 : -1);
    renderPage(next);
  };

  useEffect(() => {
    if (!pdfRef.current) return;

    const handleResize = () => renderPage(pageRef.current);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pageImage]);

  if (!catalog.pdfUrl && catalog.image) {
    return (
      <div style={{
        background: '#111', border: T.border,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '60vh', overflow: 'hidden',
      }}>
        <img src={catalog.image} alt="Catalog" style={{ maxWidth: '100%', display: 'block' }} />
      </div>
    );
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.4rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            className="pdf-nav-btn"
            onClick={() => goTo(-1)}
            disabled={pageNum === 1 || loading}
            aria-label="Previous page"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <span className="label" style={{ margin: 0, letterSpacing: '.3em' }}>
            {loading ? 'Turning page…' : `Page ${pageNum} / ${totalPages}`}
          </span>

          <button
            className="pdf-nav-btn"
            onClick={() => goTo(1)}
            disabled={pageNum === totalPages || loading}
            aria-label="Next page"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 19l7-7-7-7" />
            </svg>
          </button>
        </div>

        {catalog.pdfUrl && (
          <a
            href={catalog.pdfUrl}
            download
            style={{
              fontSize: 16,
              color: 'rgb(255, 255, 255)',
              letterSpacing: '.25em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color .2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
          >
            Download PDF ↓
          </a>
        )}
      </div>

      <div ref={stageRef} className="catalog-stage">
        <div className="catalog-book">
          <div className="catalog-spine" />
          {error ? (
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', padding: '4rem' }}>
              <div style={{ fontSize: 40, marginBottom: '1rem' }}>⊞</div>
              <p className="label">Unable to load PDF</p>
            </div>
          ) : (
            <>
              <AnimatePresence initial={false} mode="wait" custom={turnDirection}>
                {pageImage && (
                  <motion.div
                    key={pageNum}
                    className="catalog-page-shell"
                    custom={turnDirection}
                    initial={(dir) => ({
                      rotateY: dir > 0 ? -88 : 88,
                      x: dir > 0 ? 40 : -40,
                      opacity: 0.24,
                    })}
                    animate={{
                      rotateY: 0,
                      x: 0,
                      opacity: 1,
                      transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] },
                    }}
                    exit={(dir) => ({
                      rotateY: dir > 0 ? 88 : -88,
                      x: dir > 0 ? -36 : 36,
                      opacity: 0.18,
                      transition: { duration: 0.52, ease: [0.55, 0, 0.2, 1] },
                    })}
                    style={{ transformOrigin: turnDirection > 0 ? 'left center' : 'right center' }}
                  >
                    <img src={pageImage} alt={`Catalog page ${pageNum}`} />
                    <div
                      style={{
                        position: 'absolute',
                        right: 18,
                        bottom: 16,
                        padding: '0.45rem 0.8rem',
                        borderRadius: 999,
                        background: 'rgba(5,5,5,0.56)',
                        color: '#ffffff',
                        fontSize: 10,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      Page {pageNum}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {loading && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 3,
                  }}
                >
                  <span className="label" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    Turning page…
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* <div className="catalog-meta-grid" style={{ marginTop: '1.5rem' }}>
        {[
          { label: 'Format', value: 'Digital exhibition catalog' },
          { label: 'Experience', value: 'Page-turn browsing with keyboard controls' },
          { label: 'Access', value: 'Downloadable PDF archive' },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              padding: '1rem 1.1rem',
              border: T.border,
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            <p className="label" style={{ marginBottom: '0.55rem' }}>{item.label}</p>
            <p
              style={{
                margin: 0,
                color: 'rgba(255,255,255,0.72)',
                lineHeight: 1.7,
                fontSize: 13,
              }}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div> */}

      <div style={{
        display: 'flex', justifyContent: 'center', marginTop: '1rem', gap: '1.5rem',
      }}>
        <span className="label" style={{ color: 'rgba(255,255,255,0.12)' }}>
          ← → to navigate pages
        </span>
      </div>
    </div>
  );
}

// ─── Curator Video Player with Thumbnail ──────────────────────────────────
function CuratorVideoPlayer({
  videoUrl,
  activaVideoId,
  onVideoPlay,
}: {
  videoUrl: string;
  activaVideoId?: string | null;
  onVideoPlay?: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnail = getYouTubeThumbnail(videoUrl);
  const isMobile = useIsMobile();
  const playButtonSize = isMobile ? 60 : 80;
  const playIconSize = isMobile ? 28 : 40;
  const videoId = `curator-${videoUrl.slice(0, 10)}`;

  const handlePlay = () => {
    if (activaVideoId && activaVideoId !== videoId) {
      return; // Another video is playing
    }
    setIsPlaying(true);
    onVideoPlay?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        background: '#000',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        border: T.border,
      }}
    >
      {!isPlaying ? (
        <>
          {/* Thumbnail Image */}
          {thumbnail && (
            <img
              src={thumbnail}
              alt="Curator video"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          )}

          {/* Dark Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%)',
              zIndex: 1,
            }}
          />

          {/* Play Button */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePlay}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              zIndex: 2,
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div
                style={{
                  width: playButtonSize,
                  height: playButtonSize,
                  background: 'rgba(255, 0, 0, 0.8)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 30px rgba(255, 0, 0, 0.4)',
                }}
              >
                <svg
                  width={playIconSize}
                  height={playIconSize}
                  viewBox="0 0 40 40"
                  fill="white"
                  style={{ marginLeft: 6 }}
                >
                  <path d="M12 8l20 12-20 12V8z" />
                </svg>
              </div>
            </motion.div>
          </motion.button>
        </>
      ) : (
        /* YouTube iframe when playing */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 3,
          }}
        >
          <iframe
            src={`${videoUrl}?autoplay=1&controls=1&rel=0&modestbranding=1`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '0.5rem',
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title="Curator testimonial"
          />
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Single Performance Video Item ──────────────────────────────────────────
function VideoItem({
  v,
  i,
  activaVideoId,
  onVideoPlay,
}: {
  v: { videoUrl: string; title: string; artist?: string; poster?: string };
  i: number;
  activaVideoId?: string | null;
  onVideoPlay?: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const thumbnail = getYouTubeThumbnail(v.videoUrl);
  const videoId = `perf-${i}-${v.videoUrl.slice(0, 10)}`;

  const handlePlayClick = () => {
    if (activaVideoId && activaVideoId !== videoId) {
      return; // Another video is playing
    }
    setPlaying(true);
    onVideoPlay?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: i * 0.12 }}
    >
      {/* Video container */}
      <div
        className="video-card"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          overflow: 'hidden',
          border: T.border,
          background: '#111',
          cursor: playing ? 'default' : 'pointer',
          transition: 'border-color 0.3s',
        }}
        onClick={() => !playing && handlePlayClick()}
        onMouseEnter={e => {
          if (!playing)
            (e.currentTarget as HTMLDivElement).style.borderColor =
              'rgba(255,255,255,0.28)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor =
            'rgba(255,255,255,0.09)';
        }}
      >
        {playing ? (
          /* ── YouTube embed with native controls ── */
          <motion.div
            key="iframe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <iframe
              src={`${v.videoUrl}?autoplay=1&controls=1&rel=0&modestbranding=1`}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title={v.title}
            />
          </motion.div>
        ) : (
          /* ── Thumbnail + play button ── */
          <motion.div
            key="poster"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            {/* Poster image - prefer YouTube thumbnail, then fallback to provided poster */}
            {(thumbnail || v.poster) && (
              <img
                src={thumbnail || v.poster}
                alt={v.title}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            )}

            {/* Dark overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: v.poster
                ? 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.1) 100%)'
                : 'rgba(0,0,0,0.4)',
            }} />

            {/* Play button */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div
                className="video-play-btn"
                style={{
                  width: 80,
                  height: 80,
                  background: 'rgba(255,255,255,0.1)',
                  border: '2px solid rgba(255,255,255,0.35)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 40 40"
                  fill="white"
                  style={{ marginLeft: 4 }}
                >
                  <path d="M12 8l20 12-20 12V8z" />
                </svg>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Title & artist */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        padding: '1.25rem 0 0',
      }}>
        <h4 style={{
          fontFamily: T.serif,
          fontSize: 18,
          fontWeight: 700,
          color: T.white,
          margin: 0,
        }}>
          {v.title}
        </h4>
        {v.artist && (
          <span className="label" style={{ color: T.dim2 }}>
            {v.artist}
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ─── Voice of the Audience Grid ─────────────────────────────────────────────────
function VoiceOfAudienceGrid({
  videos,
  activaVideoId,
  onVideoPlay,
}: {
  videos: Array<{ videoUrl: string }>;
  activaVideoId?: string | null;
  onVideoPlay?: (index: number) => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const visibleCount = showAll ? videos.length : 4;
  const visibleVideos = videos.slice(0, visibleCount);
  const hasHidden = videos.length > 4;

  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem',
      }}>
        {visibleVideos.map((item, i) => (
          <AudienceVideoItem
            key={i}
            videoUrl={item.videoUrl}
            i={i}
            activaVideoId={activaVideoId}
            onVideoPlay={onVideoPlay}
          />
        ))}
      </div>

      {hasHidden && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <button
            onClick={() => setShowAll(!showAll)}
            style={{
              padding: '14px 32px',
              background: 'rgba(255,255,255,0.08)',
              border: T.border,
              color: 'rgba(255,255,255,0.7)',
              fontFamily: T.mono,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.22)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.09)';
            }}
          >
            {showAll ? 'Show Less −' : 'Show More +'}
          </button>
        </motion.div>
      )}
    </div>
  );
}

// ─── Single Audience Video Item ──────────────────────────────────────────────
function AudienceVideoItem({
  videoUrl,
  i,
  activaVideoId,
  onVideoPlay,
}: {
  videoUrl: string;
  i: number;
  activaVideoId?: string | null;
  onVideoPlay?: (index: number) => void;
}) {
  const [playing, setPlaying] = useState(false);
  const thumbnail = getYouTubeThumbnail(videoUrl);
  const videoId = `audience-${i}-${videoUrl.slice(0, 10)}`;

  const handlePlayClick = () => {
    if (activaVideoId && activaVideoId !== videoId) {
      return; // Another video is playing
    }
    setPlaying(true);
    onVideoPlay?.(i);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: i * 0.12 }}
    >
      <div
        className="video-card"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '9 / 16',
          overflow: 'hidden',
          border: T.border,
          background: '#111',
          cursor: playing ? 'default' : 'pointer',
          transition: 'border-color 0.3s',
        }}
        onClick={() => !playing && handlePlayClick()}
        onMouseEnter={e => {
          if (!playing)
            (e.currentTarget as HTMLDivElement).style.borderColor =
              'rgba(255,255,255,0.28)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor =
            'rgba(255,255,255,0.09)';
        }}
      >
        {playing ? (
          /* ── YouTube embed when playing ── */
          <motion.div
            key="iframe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <iframe
              src={`${videoUrl}?autoplay=1&rel=0&modestbranding=1&controls=1`}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title="Audience testimonial"
            />
          </motion.div>
        ) : (
          /* ── Play button when not playing ── */
          <motion.div
            key="poster"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            {/* Thumbnail image */}
            {thumbnail && (
              <img
                src={thumbnail}
                alt="Video thumbnail"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            )}

            {/* Dark overlay for play button visibility */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: thumbnail
                ? 'linear-gradient(135deg, rgba(10,10,10,0.4) 0%, rgba(30,30,30,0.3) 100%)'
                : 'linear-gradient(135deg, rgba(10,10,10,0.8) 0%, rgba(30,30,30,0.6) 100%)',
            }} />

            {/* Play button */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div
                className="video-play-btn"
                style={{
                  width: 68,
                  height: 68,
                  background: 'rgba(255,255,255,0.12)',
                  border: '2px solid rgba(255,255,255,0.35)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 40 40"
                  fill="white"
                  style={{ marginLeft: 3 }}
                >
                  <path d="M12 8l20 12-20 12V8z" />
                </svg>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Curator Note Section (Responsive) ─────────────────────────────────────
function CuratorNoteSection({
  curatorNote,
  curatorVideos,
  curatorByline,
  activaVideoId,
  onVideoPlay,
}: {
  curatorNote: string;
  curatorVideos?: string[];
  curatorByline?: string;
  activaVideoId?: string | null;
  onVideoPlay?: (videoUrl: string) => void;
}) {
  const isMobile = useIsMobile();
  const visibleVideos = (curatorVideos ?? []).filter(Boolean);

  return (
    <div className="section" style={{ padding: isMobile ? '3rem 1.5rem 0' : '5rem 5rem 0' }}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: 1,
          background: 'linear-gradient(90deg,rgba(255,255,255,.35),transparent)',
          transformOrigin: 'left',
          marginBottom: '3.5rem',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: visibleVideos.length > 0 ? '2.4rem' : 0 }}
      >
          <SectionTitle>Curator&apos;s Note</SectionTitle>

        <div style={{
          fontFamily: T.serif,
          fontSize: 'clamp(3rem,6vw,5rem)',
          lineHeight: 0.8,
          color: 'rgba(255,255,255,.06)',
          fontWeight: 900,
          marginBottom: '1rem',
          userSelect: 'none',
        }}>
          "
        </div>

        <blockquote style={{
          fontFamily: T.serif,
          fontSize: 'clamp(1.2rem,2vw,1.65rem)',
          lineHeight: 1.7,
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'rgba(255,255,255,.85)',
          borderLeft: '2px solid rgba(255,255,255,.18)',
          paddingLeft: '2rem',
          margin: 0,
          maxWidth: 980,
        }}>
          {curatorNote}
        </blockquote>

        {curatorByline && (
          <p
            style={{
              margin: '1.2rem 0 0',
              fontSize: 16,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgb(255, 255, 255)',
            }}
          >
            — {curatorByline}
          </p>
        )}
      </motion.div>

      {visibleVideos.length > 0 && (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '1.4rem',
      alignItems: 'start',
    }}
  >
    {visibleVideos.map((videoUrl, index) => (
      <div key={`${videoUrl}-${index}`}>
        {/* 16:9 Aspect Ratio Wrapper */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            paddingTop: '56.25%', /* 9/16 = 56.25% */
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
            }}
          >
            <CuratorVideoPlayer
              videoUrl={videoUrl}
              activaVideoId={activaVideoId}
              onVideoPlay={() => onVideoPlay?.(videoUrl)}
            />
          </div>
        </div>
      </div>
    ))}
  </div>
)}
    </div>
  );
}

function HeroReviewSpotlight({
  reviews,
}: {
  reviews: Array<{
    title: string;
    author: string;
    review: string;
  }>;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reviews.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [reviews.length]);

  const activeReview = reviews[activeIndex];

  if (!activeReview) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: 'min(100%, 900px)',
        margin: '0 auto',
        padding: 'clamp(1rem, 2vw, 1.25rem)',
        borderRadius: 30,
        // background: 'rgba(255,255,255,0.03)',
        // border: '1px solid rgba(255,255,255,0.08)',
        // boxShadow: '0 30px 100px rgba(0,0,0,0.32)',
        // backdropFilter: 'blur(18px)',
      }}
    >
      <div
        style={{
          position: 'relative',
          borderRadius: 24,
          padding: 'clamp(1.35rem, 3vw, 2.4rem)',
          // border: '1px solid rgba(255,255,255,0.12)',
          // background: 'linear-gradient(145deg, rgba(10,10,10,0.76) 0%, rgba(26,26,26,0.55) 100%)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 'auto -8% -35% auto',
            width: 220,
            height: 220,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            filter: 'blur(34px)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.9rem 1rem',
            marginBottom: '1.2rem',
          }}
        >
          {/* <span
            style={{
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            Voice of the Audience
          </span> */}
          <span
            style={{
              padding: '0.42rem 0.85rem',
              borderRadius: 999,
              fontSize: 10,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.18)',
              background: 'rgba(255,255,255,0.07)',
            }}
          >
             Voice of the Audience
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5 }}
          >
            <p
              style={{
                fontFamily: T.serif,
                fontSize: 'clamp(1.4rem, 2.6vw, 2.3rem)',
                lineHeight: 1.5,
                color: 'rgba(255,255,255,0.86)',
                fontStyle: 'italic',
                margin: 0,
              }}
            >
              "{activeReview.review}"
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '0.85rem 1rem',
                marginTop: '1.4rem',
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.46)',
                }}
              >
                — {activeReview.author}
              </span>
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.28)',
                }}
              >
                {activeReview.title}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.7rem',
            marginTop: '1.5rem',
          }}
        >
          {reviews.map((review, index) => (
            <button
              key={`${review.author}-${index}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show visitor review ${index + 1}`}
              style={{
                width: index === activeIndex ? 30 : 10,
                height: 10,
                borderRadius: 999,
                border: 'none',
                background: index === activeIndex ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.22)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export function Events() {
  const nextEvent = events.find((e) => e.type === 'Exhibition') ?? events[0];
  const isMobile = useIsMobile();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Video management - only one video plays at a time
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const eventMeta = [
    nextEvent?.type,
    nextEvent?.location,
    nextEvent?.date,
  ].filter(Boolean) as string[];
  const heroReviews = nextEvent?.reviewsAndPics ?? [];
  const visibleReviews = showAllReviews ? heroReviews : heroReviews.slice(0, 4);

  // Keyboard navigation for PDF
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        document.querySelector<HTMLButtonElement>('.pdf-nav-btn:first-of-type')?.click();
      } else if (e.key === 'ArrowRight') {
        document.querySelector<HTMLButtonElement>('.pdf-nav-btn:last-of-type')?.click();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <article className="ev-root">
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />
      <div className="diag-grid" />

      {/* ══════════════════════════════════════════════════════════════════
           HERO
      ══════════════════════════════════════════════════════════════════ */}
      <div
        ref={heroRef}
        style={{
          position: 'relative',
          height: isMobile ? '100svh' : '95vh',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
          borderBottom: T.border,
        }}
      >
        {/* Parallax video */}
        {nextEvent?.bgVideo && (
          <motion.div style={{ position: 'absolute', inset: '-10%', y: videoY }}>
            <video
              src={nextEvent.bgVideo}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(5,5,5,.95) 0%, rgba(5,5,5,.4) 50%, rgba(5,5,5,.25) 100%)',
            }} />
          </motion.div>
        )}

        <div
          style={{
            position: 'absolute',
            top: isMobile ? '30%' : '80%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(92vw, 980px)',
            zIndex: 2,
            pointerEvents: 'auto',
          }}
        >
          <HeroReviewSpotlight reviews={heroReviews} />
        </div>

        {/* Hero text */}
        {/* <motion.div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: isMobile ? '0 1.5rem 2rem' : '0 5rem 4rem',
            width: '100%',
            opacity: heroOpacity,
          }}
        >
          <div style={{ maxWidth: isMobile ? '100%' : '58rem' }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.6rem',
                marginBottom: '1.2rem',
              }}
            >
              {eventMeta.map((item) => (
                <span key={item} className="pill">
                  {item}
                </span>
              ))}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.16 }}
              style={{
                fontFamily: T.serif,
                fontSize: 'clamp(3.4rem, 8vw, 7.2rem)',
                lineHeight: 0.92,
                letterSpacing: '-0.04em',
                color: '#ffffff',
                marginBottom: '1rem',
              }}
            >
              {nextEvent?.title}
            </motion.h1>

            {nextEvent?.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{
                  fontFamily: T.serif,
                  fontSize: 'clamp(1.15rem,2.4vw,1.9rem)',
                  fontStyle: 'italic',
                  color: 'rgba(255,255,255,.82)',
                  marginBottom: '1rem',
                  lineHeight: 1.35,
                }}
              >
                {nextEvent.subtitle}
              </motion.p>
            )}

            {nextEvent?.summary && (
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                style={{
                  fontSize: 13,
                  lineHeight: 1.9,
                  fontWeight: 300,
                  color: T.dim1,
                  maxWidth: 640,
                }}
              >
                {nextEvent.summary}
              </motion.p>
            )}
          </div>
        </motion.div> */}

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: isMobile ? '1.25rem' : '2.5rem',
            right: isMobile ? '1.5rem' : '5rem',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            zIndex: 1,
          }}
        >
          <span className="label" style={{ color: T.dim3 }}>Scroll to explore</span>
          <div style={{
            width: 1,
            height: 48,
            background: 'linear-gradient(to bottom, rgba(255,255,255,.3), transparent)',
          }} />
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          CURATOR'S NOTE
      ══════════════════════════════════════════════════════════════════ */}
      {nextEvent?.curatorNote && (
        <CuratorNoteSection
          curatorNote={nextEvent.curatorNote}
          curatorVideos={nextEvent.curatorVideos ?? (nextEvent.curatorVideo ? [nextEvent.curatorVideo] : [])}
          curatorByline={nextEvent.curatorByline}
          activaVideoId={playingVideoId}
          onVideoPlay={(videoUrl) => setPlayingVideoId(`curator-${videoUrl.slice(0, 10)}`)}
        />
      )}

      {/* ══════════════════════════════════════════════════════════════════
           CATALOG & PUBLICATIONS — PDF.js page-by-page viewer
      ══════════════════════════════════════════════════════════════════ */}
      {nextEvent?.catalog && (
        <motion.div
          className="section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: 1,
              background: 'linear-gradient(90deg,rgba(255,255,255,.35),transparent)',
              transformOrigin: 'left',
              marginBottom: '3.5rem',
            }}
          />

          <SectionTitle>Catalogue</SectionTitle>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <CatalogViewer catalog={nextEvent.catalog} />
          </motion.div>
        </motion.div>
      )}

   

      {/* ══════════════════════════════════════════════════════════════════
           PERFORMANCE VIDEOS — thumbnail → inline YouTube (like Films)
      ══════════════════════════════════════════════════════════════════ */}
      {(nextEvent?.performanceVideos ?? []).length > 0 && (
        <motion.div
          className="section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: 1,
              background: 'linear-gradient(90deg,rgba(255,255,255,.35),transparent)',
              transformOrigin: 'left',
              marginBottom: '3.5rem',
            }}
          />

          <SectionTitle>Live Performance</SectionTitle>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {nextEvent.performanceVideos.map((v, i) => (
              <VideoItem
                key={i}
                v={v}
                i={i}
                activaVideoId={playingVideoId}
                onVideoPlay={() => setPlayingVideoId(`perf-${i}-${v.videoUrl.slice(0, 10)}`)}
              />
            ))}
          </div>
          
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
           Voice of the Audience
      ══════════════════════════════════════════════════════════════════ */}
      {(nextEvent?.voiceOfAudience ?? []).length > 0 && (
        <motion.div
          className="section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: 1,
              background: 'linear-gradient(90deg,rgba(255,255,255,.35),transparent)',
              transformOrigin: 'left',
              marginBottom: '3.5rem',
            }}
          />

          <SectionTitle>Voice of the Audience</SectionTitle>

          <VoiceOfAudienceGrid
            videos={nextEvent.voiceOfAudience}
            activaVideoId={playingVideoId}
            onVideoPlay={(i: number) =>
              setPlayingVideoId(`audience-${i}-${nextEvent.voiceOfAudience[i].videoUrl.slice(0, 10)}`)
            }

            
          />
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
           REVIEWS & TESTIMONIALS
      ══════════════════════════════════════════════════════════════════ */}
      {(nextEvent?.reviewsAndPics ?? []).length > 0 && (
        <motion.div
          className="section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: 1,
              background: 'linear-gradient(90deg,rgba(255,255,255,.35),transparent)',
              transformOrigin: 'left',
              marginBottom: '3.5rem',
            }}
          />

          <SectionTitle>Thoughts & Reviews</SectionTitle>
           
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}>
            {visibleReviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  padding: '1.75rem 0 0',
                  background: 'transparent',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.9rem',
                }}
              >
                <p
                  style={{
                    fontFamily: T.serif,
                    fontSize: 'clamp(1.1rem, 1.8vw, 1.45rem)',
                    lineHeight: 1.75,
                    color: 'rgba(255,255,255,0.78)',
                    margin: 0,
                    flex: 1,
                    fontStyle: 'italic',
                  }}
                >
                  "{review.review}"
                </p>

                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.45)',
                    margin: 0,
                  }}
                >
                  — {review.author}
                </p>
              </motion.div>
            ))}
          </div>

          {heroReviews.length > 4 && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
            >
              <button
                onClick={() => setShowAllReviews((prev) => !prev)}
                style={{
                  padding: '14px 28px',
                  background: 'rgba(255,255,255,0.05)',
                  border: T.border,
                  color: 'rgba(255,255,255,0.78)',
                  fontFamily: T.mono,
                  fontSize: 11,
                  letterSpacing: '.18em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                {showAllReviews ? 'Show Less' : 'Show More'}
              </button>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
           CONNECT THE DOTS
      ══════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ padding: '7rem 5rem', textAlign: 'center' }}
      >
        <div style={{
          fontFamily: T.serif,
          fontSize: 'clamp(5rem,14vw,13rem)',
          fontWeight: 900,
          color: 'rgba(255,255,255,.03)',
          lineHeight: 1,
          letterSpacing: '-.03em',
          marginBottom: '-2rem',
          userSelect: 'none',
          pointerEvents: 'none',
        }}>
          Explore
        </div>

        <div style={{ maxWidth: 720, margin: '0 auto 1.5rem' }}>
          <SectionTitle>Explore</SectionTitle>
        </div>
        <p style={{
          fontFamily: T.serif,
          fontSize: 'clamp(1rem,1.8vw,1.35rem)',
          lineHeight: 1.65,
          fontWeight: 400,
          fontStyle: 'italic',
          color: T.dim2,
          marginBottom: '3.5rem',
          maxWidth: 460,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          Explore other sections where this event and project are documented.
        </p>

        <div style={{
          display: 'inline-flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 1,
        }}>
          {(nextEvent?.relatedPages ?? []).map((page) => (
            <Link key={page.path} to={page.path} style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{
                  background: 'rgba(255,255,255,.06)',
                  borderColor: 'rgb(255, 255, 255)',
                }}
                transition={{ duration: 0.2 }}
                style={{
                  border: T.border,
                  padding: '16px 40px',
                  cursor: 'pointer',
                  transition: 'background .2s, border-color .2s',
                }}
              >
                <span style={{
                  fontSize: 18,
                  fontWeight: 800,
                  letterSpacing: '.25em',
                  textTransform: 'uppercase',
                  color: T.dim2,
                }}>
                  {page.label}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </article>
  );
}
