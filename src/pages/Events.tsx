import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router';
import { events } from '../data/store';
import { useIsMobile } from '../components/ui/use-mobile';

// ─── Shared design tokens ───────────────────────────────────────────────────
const T = {
  serif: "'Playfair Display', serif",
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
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Mono:wght@300;400;500&display=swap');

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

const Rule = () => (
  <motion.div
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: .9, ease: [.16, 1, .3, 1] }}
    style={{ height: 1, background: 'rgba(255,255,255,.1)', transformOrigin: 'left', marginBottom: '3rem' }}
  />
);

// ─── PDF Catalog Viewer ───────────────────────────────────────────────────────
function CatalogViewer({ catalog }: { catalog: { pdfUrl?: string; image?: string } }) {
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfRef = useRef<any>(null);
  const renderTaskRef = useRef<any>(null);

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
      script.src =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.onload = loadPdf;
      script.onerror = () => {
        setError(true);
        setLoading(false);
      };
      document.head.appendChild(script);
    }
  }, [catalog.pdfUrl]);

  const renderPage = (num: number, pdf?: any) => {
    const doc = pdf ?? pdfRef.current;
    if (!doc || !canvasRef.current) return;

    // Cancel any in-progress render
    if (renderTaskRef.current) {
      renderTaskRef.current.cancel();
    }

    setLoading(true);
    doc.getPage(num).then((page: any) => {
      const container = canvasRef.current!.parentElement!;
      const scale = Math.min(
        container.clientWidth / page.getViewport({ scale: 1 }).width,
        (window.innerHeight * 0.75) / page.getViewport({ scale: 1 }).height
      );
      const viewport = page.getViewport({ scale: Math.max(scale, 1.2) });
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const task = page.render({ canvasContext: ctx, viewport });
      renderTaskRef.current = task;
      task.promise
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    });
  };

  const goTo = (dir: number) => {
    const next = Math.max(1, Math.min(totalPages, pageNum + dir));
    if (next === pageNum) return;
    setPageNum(next);
    renderPage(next);
  };

  // Fallback: image only
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
      {/* ── Controls bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '1.25rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            className="pdf-nav-btn"
            onClick={() => goTo(-1)}
            disabled={pageNum === 1}
            aria-label="Previous page"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <span className="label" style={{ margin: 0, letterSpacing: '.3em' }}>
            {loading ? 'Loading…' : `Page ${pageNum} / ${totalPages}`}
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
              fontSize: 9, color: 'rgba(255,255,255,0.3)',
              letterSpacing: '.25em', textTransform: 'uppercase',
              textDecoration: 'none', transition: 'color .2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
          >
            Download PDF ↓
          </a>
        )}
      </div>

      {/* ── Canvas area ── */}
      <div style={{
        background: '#0e0e0e',
        border: T.border,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '65vh',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {error ? (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', padding: '4rem' }}>
            <div style={{ fontSize: 40, marginBottom: '1rem' }}>⊞</div>
            <p className="label">Unable to load PDF</p>
          </div>
        ) : (
          <>
            {loading && (
              <div style={{
                position: 'absolute', inset: 0, display: 'flex',
                alignItems: 'center', justifyContent: 'center', zIndex: 2,
              }}>
                <span className="label" style={{ color: 'rgba(255,255,255,0.25)' }}>Loading…</span>
              </div>
            )}
            <canvas
              ref={canvasRef}
              style={{
                maxWidth: '100%',
                display: 'block',
                opacity: loading ? 0.3 : 1,
                transition: 'opacity 0.3s',
              }}
            />
          </>
        )}
      </div>

      {/* ── Keyboard hint ── */}
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

// ─── Voice of Audience Grid ─────────────────────────────────────────────────
function VoiceOfAudienceGrid({
  videos,
  activaVideoId,
  onVideoPlay,
}: {
  videos: Array<{ videoUrl: string }>;
  activaVideoId?: string | null;
  onVideoPlay?: () => void;
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
  onVideoPlay?: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const thumbnail = getYouTubeThumbnail(videoUrl);
  const videoId = `audience-${i}-${videoUrl.slice(0, 10)}`;

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
  curatorVideo,
  activaVideoId,
  onVideoPlay,
}: {
  curatorNote: string;
  curatorVideo?: string;
  activaVideoId?: string | null;
  onVideoPlay?: () => void;
}) {
  const isMobile = useIsMobile();

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

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '3rem' : '5rem',
        alignItems: 'start',
      }}>
        {/* Left: curator note text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="label" style={{ display: 'block', marginBottom: '2rem' }}>
            Curator's Note
          </span>

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
            fontSize: 'clamp(1.1rem,1.8vw,1.5rem)',
            lineHeight: 1.7,
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,.85)',
            borderLeft: '2px solid rgba(255,255,255,.18)',
            paddingLeft: '2rem',
            margin: 0,
          }}>
            {curatorNote}
          </blockquote>
        </motion.div>

        {/* Right: curator video with play button */}
        {curatorVideo && (
          <CuratorVideoPlayer
            videoUrl={curatorVideo}
            activaVideoId={activaVideoId}
            onVideoPlay={onVideoPlay}
          />
        )}
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export function Events() {
  const nextEvent = events.find((e) => e.type === 'Exhibition') ?? events[0];
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Video management - only one video plays at a time
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  // Hero reviews carousel - autoplay testimonials
  const [heroCarouselIndex, setHeroCarouselIndex] = useState(0);
  const heroReviews = nextEvent?.reviewsAndPics ?? [];

  // Auto-cycle through reviews every 6 seconds
  useEffect(() => {
    if (heroReviews.length <= 1) return;

    const interval = setInterval(() => {
      setHeroCarouselIndex((prev) => (prev + 1) % heroReviews.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroReviews.length]);

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
          height: '92vh',
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

        {/* Hero carousel - cycling testimonials */}
        {heroReviews.length > 0 && (
          <motion.div
           style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '320px',
              maxHeight: '280px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: T.border,
              zIndex: 2,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
            }}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={heroCarouselIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  flex: 1,
                }}
              >
                {/* Star rating */}
                <div style={{ display: 'flex', gap: '4px' }}>
                  {Array.from({ length: heroReviews[heroCarouselIndex]?.rating || 5 }).map((_, idx) => (
                    <span key={idx} style={{ fontSize: '0.9rem', color: 'rgba(255, 215, 0, 0.9)' }}>
                      ★
                    </span>
                  ))}
                </div>

                {/* Review title */}
                <h4
                  style={{
                    fontFamily: T.serif,
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.95)',
                    margin: 0,
                  }}
                >
                  {heroReviews[heroCarouselIndex]?.title}
                </h4>

                {/* Review text */}
                <p
                  style={{
                    fontSize: '0.8rem',
                    lineHeight: 1.5,
                    color: 'rgba(255,255,255,0.75)',
                    margin: 0,
                    fontStyle: 'italic',
                    flex: 1,
                  }}
                >
                  "{heroReviews[heroCarouselIndex]?.review}"
                </p>

                {/* Author */}
                <p
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.65)',
                    margin: 0,
                    marginTop: '0.5rem',
                  }}
                >
                  — {heroReviews[heroCarouselIndex]?.author}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Indicator dots */}
            <div
              style={{
                display: 'flex',
                gap: '6px',
                marginTop: '1rem',
                justifyContent: 'center',
              }}
            >
              {heroReviews.map((_, idx) => (
                <motion.div
                  key={idx}
                  style={{
                    width: idx === heroCarouselIndex ? '12px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    background:
                      idx === heroCarouselIndex
                        ? 'rgba(255, 215, 0, 0.8)'
                        : 'rgba(255, 255, 255, 0.2)',
                    cursor: 'pointer',
                  }}
                  onClick={() => setHeroCarouselIndex(idx)}
                  animate={{ width: idx === heroCarouselIndex ? '12px' : '6px' }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Hero text */}
        <motion.div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '0 5rem 5rem',
            width: '100%',
            opacity: heroOpacity,
          }}
        >
          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '2.5rem' }}
          >
            <span className="pill"></span>
            {nextEvent?.type && (
              <span className="pill" style={{ marginLeft: 8 }}>
                {nextEvent.type}
              </span>
            )}
          </motion.div>

          <div style={{ maxWidth: '85%' }}>

            {nextEvent?.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{
                  fontFamily: T.serif,
                  fontSize: 'clamp(1.1rem,2.4vw,1.9rem)',
                  fontStyle: 'italic',
                  color: 'rgba(255,255,255,.75)',
                  marginBottom: '1.5rem',
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
                  maxWidth: 540,
                }}
              >
                {nextEvent.summary}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            right: '5rem',
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
          curatorVideo={nextEvent.curatorVideo}
          activaVideoId={playingVideoId}
          onVideoPlay={() => setPlayingVideoId(`curator-${nextEvent.curatorVideo?.slice(0, 10) || ''}`)}
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

          <SectionLabel>Catalog &amp; Publications</SectionLabel>
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

          <SectionLabel>Performance Videos</SectionLabel>

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
           VOICE OF AUDIENCE
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

          <SectionLabel>Voice of Audience</SectionLabel>

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

          <SectionLabel>Visitor Reviews & Testimonials</SectionLabel>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}>
            {nextEvent.reviewsAndPics.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  padding: '2rem',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                  border: T.border,
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                {/* Star rating */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  {Array.from({ length: review.rating || 5 }).map((_, idx) => (
                    <span key={idx} style={{ fontSize: '1.2rem' }}>
                      ★
                    </span>
                  ))}
                </div>

                {/* Review title */}
                <h4
                  style={{
                    fontFamily: T.serif,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.95)',
                    margin: 0,
                  }}
                >
                  {review.title}
                </h4>

                {/* Review text */}
                <p
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.7)',
                    margin: 0,
                    flex: 1,
                    fontStyle: 'italic',
                  }}
                >
                  "{review.review}"
                </p>

                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                  {review.image && (
                    <img
                      src={review.image}
                      alt={review.author}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '1px solid rgba(255,255,255,0.2)',
                      }}
                    />
                  )}
                  <span
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.8)',
                    }}
                  >
                    — {review.author}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
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

        <span className="label" style={{ display: 'block', marginBottom: '1.5rem' }}>
          Connect the Dots
        </span>
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
                  borderColor: 'rgba(255,255,255,.22)',
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
                  fontSize: 10,
                  fontWeight: 500,
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