import { motion, AnimatePresence } from 'motion/react';
import { useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { artworks } from '../data/store';

export function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  const openImage = useCallback((i: number) => setSelected(i), []);
  const close = useCallback(() => setSelected(null), []);
  const prev = useCallback(() =>
    setSelected(i => i !== null ? (i - 1 + artworks.length) % artworks.length : null), []);
  const next = useCallback(() =>
    setSelected(i => i !== null ? (i + 1) % artworks.length : null), []);

  const handleKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape') close();
  }, [prev, next, close]);

  // Even column distribution
  const numCols = 4;
  const perCol = Math.ceil(artworks.length / numCols);
  const cols = Array.from({ length: numCols }, (_, i) =>
    artworks.slice(i * perCol, (i + 1) * perCol)
  );

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Header */}
      <section className="pt-32 pb-16 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-serif text-7xl md:text-8xl tracking-tight mb-4"
        >
          Prints
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/40 text-sm tracking-[0.2em] uppercase"
        >
          {artworks.length} works
        </motion.p>
      </section>

      {/* Masonry Grid — Desktop 4 cols */}
      <section className="px-3 md:px-6 pb-24">
        <div className="hidden md:flex gap-3 md:gap-4 items-start">
          {cols.map((colImages, colIdx) => (
            <div key={colIdx} className="flex-1 flex flex-col gap-3 md:gap-4">
              {colImages.map((src, rowIdx) => {
                const globalIdx = colIdx * perCol + rowIdx;
                return (
                  <motion.div
                    key={globalIdx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: colIdx * 0.05 }}
                    onClick={() => openImage(globalIdx)}
                    className="cursor-pointer overflow-hidden group relative"
                  >
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                      <ImageWithFallback
                        src={src}
                        alt={`Print ${globalIdx + 1}`}
                        className="w-full h-auto block"
                        loading="lazy"
                      />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-black/40"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Masonry Grid — Mobile 2 cols */}
        <div className="flex md:hidden gap-3 items-start">
          {Array.from({ length: 2 }, (_, i) =>
            artworks.slice(
              i * Math.ceil(artworks.length / 2),
              (i + 1) * Math.ceil(artworks.length / 2)
            )
          ).map((colImages, colIdx) => (
            <div key={colIdx} className="flex-1 flex flex-col gap-3">
              {colImages.map((src, rowIdx) => {
                const globalIdx = colIdx * Math.ceil(artworks.length / 2) + rowIdx;
                return (
                  <motion.div
                    key={globalIdx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: colIdx * 0.05 }}
                    onClick={() => openImage(globalIdx)}
                    className="cursor-pointer overflow-hidden group relative"
                  >
                    <ImageWithFallback
                      src={src}
                      alt={`Print ${globalIdx + 1}`}
                      className="w-full h-auto block"
                      loading="lazy"
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/40"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.97)' }}
            onClick={close}
            onKeyDown={handleKey}
            tabIndex={0}
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 md:left-6 z-10 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}
            >
            
            </button>

            {/* Image */}
            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '860px',
                padding: '0 64px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div style={{
                maxHeight: '85vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <ImageWithFallback
                  src={artworks[selected]}
                  alt={`Print ${selected + 1}`}
                  style={{
                    maxHeight: '85vh',
                    maxWidth: '100%',
                    width: 'auto',
                    height: 'auto',
                    display: 'block',
                  }}
                />
              </div>
              <p style={{
                color: 'rgba(255,255,255,0.3)',
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginTop: '1rem',
              }}>
                {selected + 1} / {artworks.length}
              </p>
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 md:right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}
            >
        
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}