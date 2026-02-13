import { motion } from 'motion/react';
import { events } from '../data/store';

export function EventsTicker() {
  // Create ticker items from events data
  const tickerItems = events.map(event => 
    `${event.title} • ${event.date} • ${event.location}`
  );

  return (
    <div className="bg-accent text-accent-foreground py-3 overflow-hidden border-y border-accent/20">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {[...tickerItems, ...tickerItems].map((item, index) => (
          <div key={index} className="flex items-center gap-12">
            <span className="text-sm tracking-wide uppercase">{item}</span>
            <span className="text-xl">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}