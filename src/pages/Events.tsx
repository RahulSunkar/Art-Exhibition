import { Link } from 'react-router';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { events } from '../data/store';

const mediaPressItems = [
  { id: 1, source: 'Mint', title: "A Voyage to Permanence featured in top cultural picks", excerpt: 'Major national media cover the Delhi exhibition opening.', accentColor: '#00A550', url: 'https://www.livemint.com/mint-lounge/art-and-culture/event-planner-art-culture-comedy-womens-day-ramadan-iftar-feast-11772799990027.html' },
  { id: 2, source: 'Elle India', title: 'Selected as one of the most talked-about exhibitions', excerpt: 'Recognized for immersive curatorial practice and community stories.', accentColor: '#C8102E', url: 'https://elle.in/life-culture/the-exhibitions-everyones-talking-about-this-month-11180232' },
  { id: 3, source: 'PTI', title: 'A.V.T.P. opens in Delhi', excerpt: 'National wire highlights critical themes of migration and memory.', accentColor: '#003087', url: 'https://www.instagram.com/p/DVlCv7hjbQ_/?img_index=2&igsh=MXBwZG9wOTk1MTk2dQ==' },
];

export function Events() {
  const primary = events.find((event) => event.id === 1) ?? events[0];
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <style>{`
        .event-hero { background: radial-gradient(circle at 15% 0%, #27374d 0%, #09121d 55%, #050707 100%); }
        .event-hero-inner { min-height: 65vh; display: flex; align-items: center; justify-content: center; padding: 96px 24px; position: relative; overflow: hidden; }
        .event-hero::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15) 0%, transparent 60%); opacity: 0; transform: scale(0.95); transition: opacity 0.8s ease, transform 0.8s ease; }
        .event-hero.loaded::after { opacity: 1; transform: scale(1.05); }
        .event-hero-title { text-align: center; color: #fff; }
        .event-tag { letter-spacing: 0.3em; font-size: 0.75rem; color: rgba(255,255,255,0.65); text-transform: uppercase; margin-bottom: 20px; }
        .event-card { border: 1px solid rgba(255,255,255,0.1); background: rgba(14,16,19,0.48); backdrop-filter: blur(9px); }
        .event-press-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 1rem; }
        .event-press-card { background: #111318; border-radius: 10px; padding: 18px; cursor: pointer; transition: transform 0.32s cubic-bezier(.22,1,.36,1), box-shadow 0.32s ease; border: 1px solid rgba(255,255,255,0.06); }
        .event-press-card:hover { transform: translateY(-5px); box-shadow: 0 8px 28px rgba(0,0,0,0.32); }
        .event-press-source { font-size: 0.72rem; text-transform: uppercase; color: var(--ac); font-weight: 700; letter-spacing: 0.18em; }
        .event-press-title { margin: 10px 0 8px; font-size: 1rem; color: #fff; line-height: 1.35; }
        .event-press-excerpt { color: rgba(255,255,255,0.64); font-size: 0.9rem; line-height: 1.5; margin-bottom: 12px; }
        .event-press-link { font-size: 0.75rem; letter-spacing: 0.15em; color: rgba(120,210,255,0.92); text-transform: uppercase; }
        @keyframes floatPulse {0%,100%{transform: translateY(0);}50%{transform: translateY(-10px);} }
        .event-hero-graphic { animation: floatPulse 4s ease-in-out infinite; }
     `}</style>

      <section className={`event-hero ${heroLoaded ? 'loaded' : ''}`}>
        <div className="event-hero-inner">
          <div className="max-w-screen-lg text-center event-hero-title">
            <p className="event-tag">Event Story / Live Recap</p>
            <motion.h1 className="font-serif text-5xl md:text-7xl leading-tight" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}> {primary.title} </motion.h1>
            {primary.subtitle && <motion.p className="text-base md:text-xl text-muted-foreground mt-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>{primary.subtitle}</motion.p>}
            <motion.p className="text-sm text-muted-foreground mt-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>{primary.date} / {primary.location}</motion.p>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.45 }} className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/media" className="px-5 py-2 bg-accent rounded-md text-sm font-semibold hover:opacity-90">Explore Media</Link>
              <Link to="/gallery" className="px-5 py-2 border border-white/20 rounded-md text-sm hover:bg-white/10">View Gallery</Link>
              <Link to="/films" className="px-5 py-2 border border-white/20 rounded-md text-sm hover:bg-white/10">Watch Films</Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl mb-8">About The Event</h2>
          {primary.summary && <p className="text-muted-foreground mb-8 max-w-2xl">{primary.summary}</p>}
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl mb-8">Key Highlights</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {primary.keyHighlights?.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-muted/50 border border-white/10 p-4 rounded-sm"
              >
                <p className="text-sm md:text-base">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-black/10">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl mb-8">Performances</h2>
          <div className="space-y-6">
            {primary.performances?.map((performance, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white/5 border border-white/10 p-6 rounded-xl"
              >
                <h3 className="text-xl md:text-2xl font-semibold">{performance.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{performance.artist}</p>
                <p className="leading-relaxed">{performance.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl mb-8">Curator's Note</h2>
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">{primary.curatorNote}</p>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-black/10">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl mb-8">Event Highlights in Bite-sized Stories</h2>
          <ul className="grid gap-3 md:grid-cols-2 list-disc list-inside">
            {primary.eventBites?.map((bite, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="text-base leading-relaxed"
              >
                {bite}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-gradient-to-tr from-[#060809] via-[#0c1018] to-[#0b1016]">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl mb-6">Media Coverage</h2>
          <p className="text-muted-foreground mb-8">Recent articles and voice from the press about this event. Explore more on <Link to="/media" className="text-accent underline">Media page</Link>.</p>
          <div className="event-press-grid">
            {mediaPressItems.map((item, index) => (
              <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="event-press-card" style={{ '--ac': item.accentColor } as any}>
                <span className="event-press-source">{item.source}</span>
                <h3 className="event-press-title">{item.title}</h3>
                <p className="event-press-excerpt">{item.excerpt}</p>
                <span className="event-press-link">Read full story ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl mb-8">Chief Guests & Contributors</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {primary.chiefGuests?.map((guest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="border border-white/10 p-5 rounded-lg"
              >
                <h3 className="font-semibold text-lg">{guest.name}</h3>
                <p className="text-muted-foreground mb-2">{guest.role}</p>
                <p className="text-sm leading-relaxed">{guest.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-gradient-to-b from-[#0a0806] to-[#070604]">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-5xl mb-4">Connect the dots</h2>
          <p className="text-muted-foreground mb-8">Explore other sections where this event and project are documented.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {(primary.relatedPages ?? []).map((page) => (
              <Link key={page.path} to={page.path} className="px-5 py-2 border border-accent text-sm rounded-md hover:bg-accent/10">
                {page.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
