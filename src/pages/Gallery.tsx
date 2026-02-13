import { motion } from 'motion/react';
import { useState } from 'react';
import { X } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { artworks, photographyProcess } from '../data/store';
import { getIcon } from '../utils/getIcon';

export function Gallery() {
  const [selectedArtwork, setSelectedArtwork] = useState<any>(null);
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Memory', 'Identity', 'Place', 'Space', 'Labor'];

  const filteredArtworks = filter === 'All' 
    ? artworks 
    : artworks.filter(artwork => artwork.theme === filter);

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center grain overflow-hidden mb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-background z-10" />
        
        <div className="absolute inset-0 bg-black">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1660251406411-589fa0b05604?w=1600"
            alt="Photography process"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        <div className="relative z-20 text-center text-white px-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-serif text-6xl md:text-8xl mb-6 tracking-tight"
          >
            Art & Photography
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl leading-relaxed"
          >
            The story of how we create, collaborate, and capture invisible histories
          </motion.p>
        </div>
      </section>

      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        {/* The Story Behind the Photography */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <h2 className="font-serif text-5xl md:text-6xl mb-12 tracking-tight">
            How We Build This Work
          </h2>
          <div className="max-w-4xl space-y-8 text-lg leading-relaxed text-muted-foreground mb-20">
            <p>
              Every photograph in this exhibition is the result of months of collaboration,
              conversation, and careful ethical consideration. We don't capture images—we
              create them together with the communities whose stories we help make visible.
            </p>
            <p>
              This is not documentary photography in the traditional sense. It's collaborative
              art-making that centers agency, consent, and shared decision-making at every stage.
              From concept to final exhibition, participants remain involved and in control.
            </p>
          </div>

          {/* Process Steps */}
          <div className="space-y-24">
            {photographyProcess.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="aspect-[4/3] bg-muted overflow-hidden">
                    <ImageWithFallback
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-16 h-16 bg-accent text-accent-foreground flex items-center justify-center"
                  >
                    {(() => {
                      const Icon = getIcon(step.icon);
                      return <Icon className="w-8 h-8" />;
                    })()}
                  </motion.div>

                  <div>
                    <div className="text-sm text-accent mb-2">Step {step.id}</div>
                    <h3 className="font-serif text-4xl mb-4 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Technical Approach */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32 bg-black text-white p-12 lg:p-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-12 tracking-tight">
            Our Technical Approach
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl mb-4 border-b border-white/20 pb-3">
                Analog & Digital Fusion
              </h3>
              <p className="text-white/70 leading-relaxed">
                We combine traditional film photography with digital techniques, creating
                images that honor historical photographic practices while embracing
                contemporary possibilities.
              </p>
            </div>
            <div>
              <h3 className="text-xl mb-4 border-b border-white/20 pb-3">
                Layered Narratives
              </h3>
              <p className="text-white/70 leading-relaxed">
                Multiple exposures, collage, and composite imaging allow us to show the
                complexity of displacement—the way multiple times and places exist
                simultaneously in memory.
              </p>
            </div>
            <div>
              <h3 className="text-xl mb-4 border-b border-white/20 pb-3">
                Ethical Documentation
              </h3>
              <p className="text-white/70 leading-relaxed">
                Every technical choice serves our ethical framework. Grain and texture
                protect privacy. Shadows allow subjects to control visibility. Blur
                suggests rather than exposes.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Gallery Collection */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-serif text-5xl md:text-6xl mb-8 tracking-tight">
            The Collection
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Over 1000 artworks created through collaborative processes. Filter by theme
            to explore different aspects of the work.
          </p>
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap gap-4 mb-12">
          {filters.map((filterName) => (
            <button
              key={filterName}
              onClick={() => setFilter(filterName)}
              className={`px-6 py-3 transition-all duration-300 ${
                filter === filterName
                  ? 'bg-foreground text-background'
                  : 'bg-muted hover:bg-muted-foreground/20'
              }`}
            >
              {filterName}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {filteredArtworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              onClick={() => setSelectedArtwork(artwork)}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] bg-muted overflow-hidden mb-4">
                <ImageWithFallback
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <h3 className="text-xl mb-1">{artwork.title}</h3>
              <p className="text-sm text-muted-foreground mb-1">{artwork.artist}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{artwork.year}</span>
                <span>•</span>
                <span>{artwork.city}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed View Modal */}
        {selectedArtwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArtwork(null)}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6 overflow-y-auto"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 my-auto"
            >
              <div className="aspect-[3/4] bg-muted">
                <ImageWithFallback
                  src={selectedArtwork.image}
                  alt={selectedArtwork.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-white space-y-6 flex flex-col justify-center">
                <button
                  onClick={() => setSelectedArtwork(null)}
                  className="self-end text-white hover:text-accent transition-colors"
                >
                  <X size={32} />
                </button>

                <div>
                  <h2 className="font-serif text-4xl md:text-5xl mb-4 tracking-tight">
                    {selectedArtwork.title}
                  </h2>
                  <p className="text-xl text-white/60 mb-2">{selectedArtwork.artist}</p>
                  <p className="text-white/60">{selectedArtwork.year}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-white/40 mb-1">Medium</div>
                    <div>{selectedArtwork.medium}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/40 mb-1">Exhibition City</div>
                    <div>{selectedArtwork.city}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/40 mb-1">Theme</div>
                    <div>{selectedArtwork.theme}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <div className="text-sm text-white/40 mb-2">Description</div>
                  <p className="text-lg leading-relaxed text-white/80 mb-4">
                    {selectedArtwork.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <div className="text-sm text-white/40 mb-2">Process</div>
                  <p className="leading-relaxed text-white/70">
                    {selectedArtwork.process}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}