import { motion } from 'motion/react';
import { Play, Clock, Calendar } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { films } from '../data/store';
import { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router';

export function Films() {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const filmRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const filmId = location.hash.replace('#film-', '');
      const element = filmRefs.current[Number(filmId)];
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => {
            handlePlay(Number(filmId));
          }, 800);
        }, 100);
      }
    }
  }, [location]);

  const handlePlay = (id: number) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <header className="mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-6xl md:text-8xl mb-8 tracking-tight"
          >
            Films
          </motion.h1>
        </header>

        <div className="space-y-32">
          {!films || films.length === 0 ? (
            <div style={{ color: 'red', fontSize: '24px', padding: '20px' }}>
              No films data found! Films: {JSON.stringify(films)}
            </div>
          ) : (
            films.map((film, filmIndex) => (
              <article
                key={film.id}
                id={`film-${film.id}`}
                ref={(el) => { filmRefs.current[film.id] = el as HTMLDivElement; }}
              >
                {/* Title */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="font-serif text-4xl md:text-6xl mb-2">{film.title}</h2>
                  <p className="text-xl text-muted-foreground font-serif">{film.subtitle}</p>
                </motion.div>

                {/* Video Player */}
                <motion.div
                  className="relative bg-black overflow-hidden rounded-sm group mb-12"
                  style={{ paddingTop: '56.25%' }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="absolute inset-0">
                    {playingId === film.id ? (
                      <motion.div
                        key={`playing-${film.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ width: '100%', height: '100%' }}
                      >
                        <iframe
                          width="100%"
                          height="100%"
                          src={`${film.videoUrl}?autoplay=1&controls=1&rel=0&enablejsapi=1`}
                          title={film.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen={true}
                          style={{ display: 'block', width: '100%', height: '100%' }}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`poster-${film.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ position: 'absolute', inset: 0, cursor: 'pointer' }}
                        onClick={() => handlePlay(film.id)}
                      >
                        <ImageWithFallback
                          src={film.poster}
                          alt={film.title}
                          className="w-full h-full object-cover"
                        />
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <motion.div
                            style={{
                              width: 80,
                              height: 80,
                              borderRadius: '50%',
                              backgroundColor: 'rgba(255,255,255,0.2)',
                              backdropFilter: 'blur(8px)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                          >
                            <Play fill="white" color="white" style={{ marginLeft: 4 }} />
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Grid Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  <motion.div
                    className="lg:col-span-4 space-y-8"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="flex gap-6 text-muted-foreground border-b pb-6">
                      <span className="flex items-center gap-2"><Clock size={18} /> {film.duration}</span>
                      <span className="flex items-center gap-2"><Calendar size={18} /> {film.year}</span>
                    </div>
                    <div className="text-sm">
                      <h3 className="uppercase tracking-widest text-muted-foreground mb-4">Credits</h3>
                      {film.credits?.map((c, i) => (
                        <p key={i} className="mb-1">
                          <span className="opacity-60">{c.role}:</span> {c.name}
                        </p>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    className="lg:col-span-8"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <h3 className="text-2xl mb-6">Synopsis</h3>
                    <p className="text-lg leading-relaxed text-muted-foreground mb-12">{film.synopsis}</p>
                    <h3 className="text-2xl mb-6">Stills</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {film.stills?.map((s, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <ImageWithFallback src={s} className="aspect-[4/3] object-cover" />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {filmIndex < films.length - 1 && (
                  <motion.div
                    className="mt-32 pt-20 border-t border-foreground/10"
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  />
                )}
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}