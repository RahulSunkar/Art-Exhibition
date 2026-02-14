import { motion } from 'motion/react';
import { MapPin, Calendar } from 'lucide-react';
import poster from '../data/EventData/AVTP_Invite_ND_003 (1).jpg'

export function Voyage() {
  const locations = [
    {
      id: 1,
      city: 'New Delhi',
      country: 'India',
      chapter: 'Chapter One',
      status: 'Upcoming',
      date: '10 March - 14 March 2026',
      description:
        '',
      venues: ['The Visual Art Gallery - India Habitat Centre'],
      artworks: 'TBA',
      poster: poster, 
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-6xl md:text-8xl mb-8 tracking-tight">
            The Voyage
          </h1>
          {/* <p className="text-xl text-muted-foreground max-w-3xl mb-20 leading-relaxed">
            An exhibition that moves, transforms, and adapts. Each city becomes a new chapter
            in an ongoing story of memory, displacement, and the vertices where lives intersect.
          </p> */}
        </motion.div>

        <div className="space-y-32">
          {locations.map((location, index) => (
            <motion.article
              key={location.id}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-foreground/10 pt-16"
            >

              {/* LEFT COLUMN */}
              <div className="lg:col-span-4 space-y-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {location.chapter}
                  </div>
                  <h2 className="font-serif text-5xl tracking-tight mb-2">
                    {location.city}
                  </h2>
                  <p className="text-muted-foreground">
                    {location.country}
                  </p>
                </div>

                {/* Status */}
                <div
                  className={`inline-flex px-4 py-2 text-sm ${
                    location.status === 'Current'
                      ? 'bg-accent text-accent-foreground'
                      : location.status === 'Completed'
                      ? 'bg-foreground/10 text-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {location.status}
                </div>

                {/* Date + Venue */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 mt-1 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Exhibition Period
                      </div>
                      <div>{location.date}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-1 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Venues
                      </div>
                      <div>{location.venues.join(', ')}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="lg:col-span-8 space-y-10">

                {/* Poster Section */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="relative w-full max-w-md"
                >
                  <div className="overflow-hidden shadow-2xl">
                    <img
                      src={location.poster}
                      alt={`${location.city} Exhibition Poster`}
                      className="w-full h-auto object-cover"
                      style={{ aspectRatio: '5 / 7' }}  // 🔥 Keeps 2552x3579 ratio
                    />
                  </div>
                </motion.div>

                {/* Description */}
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {location.description}
                </p>

                {/* Artworks */}
                {/* <div className="border-l-2 border-foreground/10 pl-6">
                  <div className="text-sm text-muted-foreground mb-1">
                    Artworks
                  </div>
                  <div className="text-3xl font-serif">
                    {location.artworks}
                  </div>
                </div> */}

                {/* CTA */}
                {/* <motion.button
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-2 text-accent border-b border-accent pb-1 mt-8"
                >
                  Learn More
                </motion.button> */}

              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 pt-20 border-t border-foreground/10"
        >
          {/* <h2 className="font-serif text-4xl md:text-5xl mb-8 tracking-tight">
            Bring the Exhibition to Your City
          </h2> */}
          {/* <p className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed">
            A Voyage to Permanence is designed to adapt and transform. We work with local
            communities, artists, and institutions to create unique iterations that
            respond to each city's specific histories and contexts.
          </p> */}
          {/* <motion.a
            href="/contact"
            whileHover={{ x: 10 }}
            className="inline-flex items-center gap-2 text-accent border-b border-accent pb-1"
          >
            Contact Us About Hosting
          </motion.a> */}
        </motion.section>
      </div>
    </div>
  );
}
