import { motion } from 'motion/react';
import { useState, useMemo, useCallback, memo } from 'react';
import { X } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { artworks } from '../data/store';

// Memoized Gallery Item Component
const GalleryItem = memo(({ artwork, index, onSelectArtwork }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.4,
      delay: Math.min(index * 0.03, 0.3), // Cap delay to avoid excessive stagger
      ease: "easeOut"
    }}
    whileHover={{ scale: 1.04, y: -3 }}
    onClick={() => onSelectArtwork(artwork)}
    className="group cursor-pointer aspect-[3/4] overflow-hidden rounded-sm relative"
  >
    <motion.div
      className="w-full h-full relative bg-gray-900"
      whileHover={{ scale: 1.06 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <ImageWithFallback
        src={artwork.image}
        alt={artwork.title}
        className="w-full h-full object-cover group-hover:brightness-105 transition-all duration-500"
        loading="lazy"
      />
    </motion.div>

    {/* Overlay with title on hover */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent flex items-end p-4"
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <motion.h3
        className="text-white font-serif text-sm md:text-base lg:text-lg line-clamp-2"
        initial={{ y: 10, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        {artwork.title}
      </motion.h3>
    </motion.div>
  </motion.div>
));

GalleryItem.displayName = 'GalleryItem';

export function Gallery() {
  const [selectedArtwork, setSelectedArtwork] = useState<any>(null);
  const handleSelectArtwork = useCallback((artwork: any) => {
    setSelectedArtwork(artwork);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - Minimal */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden pt-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center z-10"
        >
          <motion.h1
            className="font-serif text-6xl md:text-7xl lg:text-8xl mb-4 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Gallery
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white/60 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Visual explorations
          </motion.p>
        </motion.div>

        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black -z-10" />
      </section>

      {/* Simple Gallery Grid - All Images */}
      <section className="px-4 md:px-6 lg:px-12 py-16 md:py-20 lg:py-24">
        <div className="max-w-screen-2xl mx-auto">
          {/* Grid with optimized animations */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delayChildren: 0.1, staggerChildren: 0.02 }}
          >
            {artworks.map((artwork, index) => (
              <GalleryItem
                key={artwork.id}
                artwork={artwork}
                index={index}
                onSelectArtwork={handleSelectArtwork}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedArtwork && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setSelectedArtwork(null)}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-6"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl"
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedArtwork(null)}
              className="absolute -top-12 right-0 text-white hover:text-accent transition-colors z-10"
            >
              <X size={32} strokeWidth={1.5} />
            </motion.button>

            {/* Image */}
            <div className="aspect-[3/4] md:aspect-auto max-h-[80vh] bg-black overflow-hidden rounded-sm">
              <ImageWithFallback
                src={selectedArtwork.image}
                alt={selectedArtwork.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Title below image */}
            <motion.div
              className="mt-6 md:mt-8 text-center"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-2">
                {selectedArtwork.title}
              </h2>
              <p className="text-white/60 text-sm md:text-base">
                {selectedArtwork.year} • {selectedArtwork.city}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}