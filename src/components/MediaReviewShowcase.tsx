import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import type { MediaReview } from '../types/content';

function useAutoRotate(count: number, enabled: boolean, intervalMs: number) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!enabled || count <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % count);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [count, enabled, intervalMs]);

  return { index, setIndex };
}

export function MediaReviewSpotlight({
  items,
  eyebrow = 'Media Review',
  heading = 'Media Review',
  description,
  dark = true,
  intervalMs = 4600,
}: {
  items: MediaReview[];
  eyebrow?: string;
  heading?: string;
  description?: string;
  dark?: boolean;
  intervalMs?: number;
}) {
  const { index, setIndex } = useAutoRotate(items.length, true, intervalMs);
  const activeItem = items[index];

  if (!activeItem) return null;

  const palette = dark
    ? {
        background: 'linear-gradient(145deg, rgba(10,10,10,0.74) 0%, rgba(24,24,24,0.55) 100%)',
        border: '1px solid rgba(255,255,255,0.14)',
        text: '#ffffff',
        subtext: 'rgba(255,255,255,0.7)',
        faint: 'rgba(255,255,255,0.42)',
        dot: 'rgba(255,255,255,0.22)',
      }
    : {
        background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(247,244,239,0.92) 100%)',
        border: '1px solid rgba(0,0,0,0.08)',
        text: '#111111',
        subtext: 'rgba(0,0,0,0.64)',
        faint: 'rgba(0,0,0,0.36)',
        dot: 'rgba(0,0,0,0.14)',
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: 'min(100%, 980px)',
        margin: '0 auto',
        padding: 'clamp(1rem, 2vw, 1.2rem)',
        background: 'rgba(255,255,255,0.02)',
        border: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
        borderRadius: 30,
        boxShadow: dark ? '0 32px 100px rgba(0,0,0,0.32)' : '0 26px 80px rgba(0,0,0,0.12)',
        backdropFilter: 'blur(18px)',
      }}
    >
      <div
        style={{
          background: palette.background,
          border: palette.border,
          borderRadius: 24,
          padding: 'clamp(1.3rem, 3vw, 2.4rem)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 'auto -10% -35% auto',
            width: 240,
            height: 240,
            borderRadius: '50%',
            background: `${activeItem.accentColor}22`,
            filter: 'blur(28px)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.8rem 1rem',
            alignItems: 'center',
            marginBottom: '1.4rem',
          }}
        >
          <span
            style={{
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: palette.faint,
            }}
          >
            {eyebrow}
          </span>
          <span
            style={{
              padding: '0.4rem 0.8rem',
              borderRadius: 999,
              fontSize: 10,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: palette.text,
              background: `${activeItem.accentColor}20`,
              border: `1px solid ${activeItem.accentColor}55`,
            }}
          >
            {activeItem.tag ?? 'Featured Coverage'}
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            alignItems: 'end',
          }}
        >
          <div style={{ minWidth: 0 }}>
            <p
              style={{
                fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: palette.faint,
                marginBottom: '0.7rem',
              }}
            >
              {heading}
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35 }}
              >
                <p
                  style={{
                    fontSize: 'clamp(3rem, 10vw, 5.4rem)',
                    lineHeight: 0.9,
                    fontFamily: "'Poppins', sans-serif",
                    color: palette.text,
                    letterSpacing: '-0.04em',
                    marginBottom: '0.9rem',
                    fontWeight: 600,
                  }}
                >
                  {activeItem.sourceShort}
                </p>
                <h3
                  style={{
                    fontSize: 'clamp(1.35rem, 2.8vw, 2.45rem)',
                    lineHeight: 1.08,
                    color: palette.text,
                    margin: 0,
                    fontFamily: "'Poppins', sans-serif",
                    maxWidth: '16ch',
                  }}
                >
                  {activeItem.title}
                </h3>
              </motion.div>
            </AnimatePresence>
          </div>

          <div style={{ minWidth: 0 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`excerpt-${activeItem.id}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35 }}
                style={{ display: 'grid', gap: '1rem' }}
              >
                <p
                  style={{
                    fontSize: 'clamp(0.98rem, 1.8vw, 1.2rem)',
                    lineHeight: 1.8,
                    color: palette.subtext,
                    margin: 0,
                    fontStyle: 'italic',
                  }}
                >
                  "{activeItem.excerpt}"
                </p>
                {description && (
                  <p
                    style={{
                      fontSize: '0.9rem',
                      lineHeight: 1.7,
                      color: palette.faint,
                      margin: 0,
                    }}
                  >
                    {description}
                  </p>
                )}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.85rem 1rem',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: palette.faint,
                    }}
                  >
                    {activeItem.source}
                  </span>
                  {activeItem.stat && (
                    <span
                      style={{
                        fontSize: 11,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: palette.faint,
                      }}
                    >
                      {activeItem.stat}
                    </span>
                  )}
                  <a
                    href={activeItem.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      marginLeft: 'auto',
                      color: palette.text,
                      fontSize: 12,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)'}`,
                      paddingBottom: 6,
                    }}
                  >
                    Read Feature
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.7rem',
            marginTop: '1.5rem',
          }}
        >
          {items.map((item, itemIndex) => (
            <button
              key={item.id}
              onClick={() => setIndex(itemIndex)}
              aria-label={`Show media review ${itemIndex + 1}`}
              style={{
                width: itemIndex === index ? 32 : 10,
                height: 10,
                borderRadius: 999,
                border: 'none',
                background: itemIndex === index ? activeItem.accentColor : palette.dot,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function MediaReviewGrid({
  items,
  eyebrow = 'Press & Media',
  title = 'Media Review',
  description,
  dark = true,
  footerLink,
}: {
  items: MediaReview[];
  eyebrow?: string;
  title?: string;
  description?: string;
  dark?: boolean;
  footerLink?: { label: string; path: string };
}) {
  if (!items.length) return null;

  const featured = items[0];
  const rest = items.slice(1);

  const palette = dark
    ? {
        section: '#141414',
        card: '#1d1d1d',
        border: '1px solid rgba(255,255,255,0.1)',
        text: '#ffffff',
        subtext: 'rgba(255,255,255,0.65)',
        faint: 'rgba(255,255,255,0.36)',
        stat: '#0f0f0f',
      }
    : {
        section: '#f7f3ec',
        card: '#ffffff',
        border: '1px solid rgba(0,0,0,0.08)',
        text: '#101010',
        subtext: 'rgba(0,0,0,0.64)',
        faint: 'rgba(0,0,0,0.36)',
        stat: '#efe8dc',
      };

  return (
    <section style={{ background: palette.section }} className="py-16 md:py-24 lg:py-32">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: palette.faint,
              marginBottom: '0.8rem',
            }}
          >
            {eyebrow}
          </p>
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              lineHeight: 0.94,
              letterSpacing: '-0.04em',
              color: palette.text,
              margin: 0,
            }}
          >
            {title}
          </h2>
          {description && (
            <p
              style={{
                marginTop: '1rem',
                maxWidth: '44ch',
                fontSize: '1rem',
                lineHeight: 1.75,
                color: palette.subtext,
              }}
            >
              {description}
            </p>
          )}
        </motion.div>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <motion.a
            href={featured.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
              padding: 'clamp(1.4rem, 3vw, 2.4rem)',
              background: palette.card,
              border: palette.border,
              textDecoration: 'none',
              color: palette.text,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: featured.accentColor,
                  marginBottom: '1rem',
                }}
              >
                {featured.source}
              </p>
              <div
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'clamp(3rem, 8vw, 5.8rem)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.05em',
                }}
              >
                {featured.sourceShort}
              </div>
            </div>
            <div style={{ display: 'grid', gap: '0.8rem', alignContent: 'end' }}>
              <h3
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                  lineHeight: 1.08,
                  margin: 0,
                }}
              >
                {featured.title}
              </h3>
              <p style={{ margin: 0, color: palette.subtext, lineHeight: 1.8 }}>
                {featured.excerpt}
              </p>
            </div>
          </motion.a>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {rest.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                style={{
                  background: palette.card,
                  border: palette.border,
                  padding: '1.4rem',
                  textDecoration: 'none',
                  color: palette.text,
                  display: 'grid',
                  gap: '0.9rem',
                  minHeight: 210,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: item.accentColor,
                    }}
                  >
                    {item.source}
                  </span>
                  <span style={{ color: palette.faint }}>↗</span>
                </div>
                <h3
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '1.8rem',
                    lineHeight: 1.05,
                    margin: 0,
                  }}
                >
                  {item.sourceShort}
                </h3>
                <p style={{ margin: 0, lineHeight: 1.55, color: palette.subtext }}>
                  {item.title}
                </p>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
            }}
          >
          </motion.div>

          {footerLink && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ display: 'flex', justifyContent: 'center', marginTop: '0.25rem' }}
            >
              <Link
                to={footerLink.path}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.7rem',
                  textDecoration: 'none',
                  color: palette.text,
                  fontSize: 12,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.28)'}`,
                  paddingBottom: 8,
                }}
              >
                {footerLink.label}
                <span>→</span>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
