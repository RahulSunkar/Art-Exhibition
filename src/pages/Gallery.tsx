import { motion } from 'motion/react';
import { useState } from 'react';
import { X } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { artworks } from '../data/store';

export function Gallery() {
  const [selectedArtwork, setSelectedArtwork] = useState<any>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - Minimal */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden pt-20">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10"
        >
          <motion.h1
            className="font-serif text-6xl md:text-7xl lg:text-8xl mb-4 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Gallery
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white/60 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Visual explorations
          </motion.p>
        </motion.div>

        {/* Gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
      </section>

      {/* Simple Gallery Grid - All Images */}
      <section className="px-4 md:px-6 lg:px-12 py-16 md:py-20 lg:py-24">
        <div className="max-w-screen-2xl mx-auto">
          {/* Grid with smooth staggered animations */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.05, delayChildren: 0.2 }}
          >
            {artworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.04,
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => setSelectedArtwork(artwork)}
                className="group cursor-pointer aspect-[3/4] overflow-hidden rounded-sm relative"
              >
                {/* Image container */}
                <motion.div
                  className="w-full h-full relative"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <ImageWithFallback
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-700"
                  />
                </motion.div>

                {/* Overlay with title on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex items-end p-4"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h3
                    className="text-white font-serif text-sm md:text-base lg:text-lg line-clamp-2"
                    initial={{ y: 10, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {artwork.title}
                  </motion.h3>
                </motion.div>
              </motion.div>
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
          transition={{ duration: 0.3 }}
          onClick={() => setSelectedArtwork(null)}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl"
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedArtwork(null)}
              className="absolute -top-12 right-0 text-white hover:text-accent transition-colors z-10"
            >
              <X size={32} strokeWidth={1.5} />
            </motion.button>

            {/* Image */}
            <motion.div
              className="aspect-[3/4] md:aspect-auto max-h-[80vh] bg-black overflow-hidden rounded-sm"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <ImageWithFallback
                src={selectedArtwork.image}
                alt={selectedArtwork.title}
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* Title below image */}
            <motion.div
              className="mt-6 md:mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
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