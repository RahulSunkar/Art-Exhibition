import { motion } from 'motion/react';
import { Link } from 'react-router';
import { events } from '../data/store';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Mono:wght@300;400;500&display=swap');

  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes flicker {
    0%, 100% { opacity: 1; }
    92% { opacity: 1; }
    93% { opacity: 0.85; }
    94% { opacity: 1; }
    96% { opacity: 0.9; }
    97% { opacity: 1; }
  }
  @keyframes grain {
    0%, 100% { transform: translate(0, 0); }
    10% { transform: translate(-2%, -3%); }
    30% { transform: translate(3%, 2%); }
    50% { transform: translate(-1%, 4%); }
    70% { transform: translate(2%, -1%); }
    90% { transform: translate(-3%, 1%); }
  }

  .events-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .events-root {
    font-family: 'DM Mono', monospace;
    background: #000000;
    color: #ffffff;
    animation: flicker 8s infinite;
  }

  /* Noise overlay */
  .events-root::before {
    content: '';
    position: fixed;
    inset: -50%;
    width: 200%;
    height: 200%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    animation: grain 0.5s steps(1) infinite;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.15;
  }

  .label-mono {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.42em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.2);
  }

  .rule-h { height: 1px; background: rgba(255,255,255,0.08); width: 100%; }
  .rule-v { width: 1px; background: rgba(255,255,255,0.08); }

  /* Diagonal grid background */
  .diagonal-grid {
    position: absolute;
    inset: 0;
    background-image:
      repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 40px,
        rgba(255,255,255,0.015) 40px,
        rgba(255,255,255,0.015) 41px
      );
    pointer-events: none;
  }
`;

export function Events() {
  const nextEvent = events.find((event) => event.type === 'Exhibition') ?? events[0];

  return (
    <section className="events-root" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="diagonal-grid" />

      {/* ── HERO ─────────────────────────────────────── */}
      <div style={{ position: 'relative', padding: '8rem 4rem 6rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>

        {/* Corner mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute', top: 40, right: 60,
            width: 48, height: 48,
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: 9, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)' }}>EXH</span>
        </motion.div>

        {/* Label — slides from left */}
        <motion.p
          className="label-mono"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3rem' }}
        >
          Current Exhibition
        </motion.p>

        {/* Giant title — slides from bottom-right diagonal */}
        <div style={{ maxWidth: 900 }}>
          <motion.h1
            initial={{ opacity: 0, x: 80, y: 40 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(4rem, 10vw, 9rem)',
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              marginBottom: '2rem',
            }}
          >
            {nextEvent?.title ?? 'Untitled Event'}
          </motion.h1>

          {nextEvent?.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.9)',
                marginBottom: '1.5rem',
                lineHeight: 1.35,
              }}
            >
              {nextEvent.subtitle}
            </motion.p>
          )}

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{
              fontSize: 13,
              lineHeight: 1.9,
              fontWeight: 300,
              color: 'rgba(255,255,255,0.72)',
              maxWidth: 560,
            }}
          >
            {nextEvent?.summary ?? 'Join us to experience the latest chapter in our exhibition journey.'}
          </motion.p>
        </div>
      </div>

      {/* ── META PILLS ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{
          display: 'flex',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {[
          { label: 'Location', value: nextEvent?.location },
          { label: 'Date', value: nextEvent?.date },
          { label: 'Type', value: nextEvent?.type },
        ]
          .filter((m) => m.value)
          .map((meta, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: '2.5rem 3rem',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              }}
            >
              <p className="label-mono" style={{ marginBottom: 10 }}>{meta.label}</p>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1rem, 1.8vw, 1.4rem)',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.7)',
              }}>
                {meta.value}
              </p>
            </div>
          ))}
      </motion.div>

      {/* ── KEY HIGHLIGHTS ───────────────────────────── */}
      {nextEvent?.keyHighlights?.length > 0 && (
        <div style={{ padding: '6rem 4rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <motion.p
            className="label-mono"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '3rem' }}
          >
            Highlights
          </motion.p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 1,
            background: 'rgba(255,255,255,0.05)',
          }}>
            {nextEvent.keyHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: index % 2 === 0 ? 60 : -60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ background: 'rgba(255,255,255,0.04)' }}
                style={{
                  background: '#000000',
                  padding: '2.5rem',
                  minHeight: index % 3 === 0 ? 240 : index % 3 === 1 ? 180 : 210,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                  color: 'rgba(255,255,255,0.06)',
                  lineHeight: 1,
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                }}>
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p style={{
                  fontSize: 12,
                  lineHeight: 1.8,
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.5)',
                }}>
                  {highlight}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ── PERFORMANCES ─────────────────────────────── */}
      {nextEvent?.performances?.length > 0 && (
        <div style={{ padding: '6rem 4rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '3rem' }}>
            <motion.p
              className="label-mono"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Performances
            </motion.p>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: '4rem', color: 'rgba(255,255,255,0.1)', fontWeight: 900 }}
            >
              {nextEvent.performances.length}
            </motion.span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'rgba(255,255,255,0.05)' }}>
            {nextEvent.performances.map((perf, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ paddingLeft: i % 2 === 0 ? '4.5rem' : '3rem' }}
                style={{
                  background: '#000',
                  padding: '3rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr',
                  gap: '3rem',
                  alignItems: 'center',
                  transition: 'padding 0.3s ease',
                  minHeight: i % 2 === 0 ? 140 : 120,
                }}
              >
                <div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.2,
                    marginBottom: '0.75rem',
                  }}>
                    {perf.title}
                  </h3>
                  <p style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.8)',
                    marginBottom: '0.6rem',
                  }}>
                    {perf.artist}
                  </p>
                </div>
                <p style={{
                  fontSize: 14,
                  lineHeight: 1.8,
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.85)',
                }}>
                  {perf.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      )}

      {/* ── CURATOR'S NOTE ───────────────────────────── */}
      {nextEvent?.curatorNote && (
        <div style={{ padding: '6rem 4rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <motion.p
            className="label-mono"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '3rem' }}
          >
            Curator's Note
          </motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem', alignItems: 'start' }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              {/* Pull-quote */}
              <div style={{
                borderLeft: '2px solid rgba(255,255,255,0.15)',
                paddingLeft: '2.5rem',
                marginBottom: '3rem',
              }}>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                  lineHeight: 1.65,
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.8)',
                }}>
                  {nextEvent.curatorNote}
                </p>
              </div>

              {/* Video preview */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  gap: '1.25rem',
                  alignItems: 'center',
                  maxWidth: 380,
                }}
              >
                <div style={{
                  width: 80, height: 80, flexShrink: 0,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)' }}>▶</span>
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: '#ffffff', marginBottom: 4 }}>Curator's Message</p>
                  <p style={{ fontSize: 11, fontWeight: 300, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em' }}>2:34 · Personal reflection</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Curator card — slides from right */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '2.5rem',
                textAlign: 'center',
              }}
            >
              <div style={{
                width: 72, height: 72,
                border: '1px solid rgba(255,255,255,0.15)',
                margin: '0 auto 1.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.05em',
                }}>P&N</span>
              </div>
              <h4 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 18,
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '0.4rem',
              }}>
                Pratik & Nandini
              </h4>
              <p className="label-mono" style={{ marginBottom: '1.25rem' }}>Curators</p>
              <p style={{
                fontSize: 12,
                lineHeight: 1.6,
                fontWeight: 300,
                color: 'rgba(255,255,255,0.4)',
              }}>
                Collaborative curators exploring urban narratives through community-driven art practices.
              </p>
            </motion.div>
          </div>
        </div>
      )}

      {/* ── EVENT BITES & CHIEF GUESTS ───────────────── */}
      {(nextEvent?.eventBites?.length || nextEvent?.chiefGuests?.length) && (
        <div style={{ padding: '6rem 4rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <motion.p
            className="label-mono"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '3rem' }}
          >
            Event Stories
          </motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 1, background: 'rgba(255,255,255,0.05)' }}>

            {nextEvent?.eventBites?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                style={{ background: '#000', padding: '3rem' }}
              >
                <h4 className="label-mono" style={{ color: 'rgba(255,255,255,0.2)', marginBottom: '2rem' }}>In Bite-Sized Stories</h4>
                <ul style={{ listStyle: 'none' }}>
                  {nextEvent.eventBites.map((bite, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                      style={{
                        fontSize: 13, lineHeight: 1.7, fontWeight: 300,
                        color: 'rgba(255,255,255,0.5)',
                        marginBottom: '1rem',
                        paddingLeft: '1.5rem',
                        position: 'relative',
                        borderLeft: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      {bite}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {nextEvent?.chiefGuests?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                style={{ background: '#000', padding: '3rem' }}
              >
                <h4 className="label-mono" style={{ color: 'rgba(255,255,255,0.2)', marginBottom: '2rem' }}>Chief Guests & Contributors</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {nextEvent.chiefGuests.map((guest, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      style={{ paddingBottom: '2rem', borderBottom: i < nextEvent.chiefGuests.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                    >
                      <h5 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 17, fontWeight: 700,
                        color: '#ffffff', marginBottom: '0.3rem',
                      }}>{guest.name}</h5>
                      <p className="label-mono" style={{ marginBottom: '0.75rem' }}>{guest.role}</p>
                      {guest.details && (
                        <p style={{ fontSize: 12, lineHeight: 1.6, fontWeight: 300, color: 'rgba(255,255,255,0.4)' }}>
                          {guest.details}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* ── AUDIENCE VOICES ──────────────────────────── */}
      <div style={{ padding: '6rem 4rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <motion.p
          className="label-mono"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem' }}
        >
          Voices from the Audience
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(255,255,255,0.05)' }}>

          {/* Video Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ background: '#000', padding: '3rem' }}
          >
            <h4 className="label-mono" style={{ color: 'rgba(255,255,255,0.2)', marginBottom: '2rem' }}>Video Testimonials</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'rgba(255,255,255,0.04)' }}>
              {[
                { name: 'Priya Sharma', role: 'Art Enthusiast', quote: 'This exhibition transformed how I see urban spaces...' },
                { name: 'Rajesh Kumar', role: 'Community Member', quote: 'The performances brought our stories to life...' },
                { name: 'Maya Patel', role: 'Curator', quote: 'A groundbreaking approach to community art...' },
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  whileHover={{ background: 'rgba(255,255,255,0.03)' }}
                  style={{
                    background: '#000',
                    padding: '1.5rem',
                    display: 'flex',
                    gap: '1.25rem',
                    alignItems: 'flex-start',
                    cursor: 'pointer',
                    minHeight: i === 1 ? 100 : 88,
                  }}
                >
                  <div style={{
                    width: 50, height: 50, flexShrink: 0,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>▶</span>
                  </div>
                  <div>
                    <h5 style={{ fontSize: 13, fontWeight: 500, color: '#ffffff', marginBottom: 3 }}>{t.name}</h5>
                    <p style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: 6 }}>{t.role}</p>
                    <p style={{ fontSize: 12, lineHeight: 1.5, fontWeight: 300, color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>"{t.quote}"</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Written Reviews */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ background: '#000', padding: '3rem' }}
          >
            <h4 className="label-mono" style={{ color: 'rgba(255,255,255,0.2)', marginBottom: '2rem' }}>Written Reviews</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {[
                { name: 'The Art Review', rating: 5, text: 'A profound exploration of urban narratives that challenges conventional exhibition formats.' },
                { name: 'Cultural Times', rating: 4, text: 'Innovative community engagement sets a new standard for participatory art.' },
                { name: 'Delhi Arts Weekly', rating: 5, text: 'The performances alone make this exhibition unforgettable.' },
              ].map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: i % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  style={{
                    paddingBottom: '2.5rem',
                    borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    minHeight: i === 0 ? 120 : i === 1 ? 100 : 90,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h5 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 16, fontWeight: 700, color: '#ffffff',
                    }}>{r.name}</h5>
                    <div style={{ display: 'flex', gap: 3 }}>
                      {[...Array(5)].map((_, s) => (
                        <span key={s} style={{ color: s < r.rating ? '#ffffff' : 'rgba(255,255,255,0.12)', fontSize: 11 }}>★</span>
                      ))}
                    </div>
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.6, fontWeight: 300, color: 'rgba(255,255,255,0.45)', fontStyle: 'italic' }}>
                    "{r.text}"
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── CONNECT THE DOTS ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ padding: '6rem 4rem', textAlign: 'center' }}
      >
        <p className="label-mono" style={{ marginBottom: '1.5rem' }}>Connect the Dots</p>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
          lineHeight: 1.6,
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.4)',
          marginBottom: '3rem',
          maxWidth: 480,
          marginLeft: 'auto', marginRight: 'auto',
        }}>
          Explore other sections where this event and project are documented.
        </p>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, background: 'rgba(255,255,255,0.05)' }}>
          {(nextEvent?.relatedPages ?? []).map((page) => (
            <Link key={page.path} to={page.path} style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ background: 'rgba(255,255,255,0.06)' }}
                transition={{ duration: 0.2 }}
                style={{
                  background: '#000000',
                  padding: '18px 40px',
                  cursor: 'pointer',
                  borderRight: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <span style={{
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                }}>
                  {page.label}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}