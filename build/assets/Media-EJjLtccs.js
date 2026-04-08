import{a as l,j as e}from"./motion-CKsoAACD.js";import{I as h}from"./poster_page-0001-BowyQiQD.js";import{I as m,a as x,b as g,c as f,T as u,D as b}from"./_MG_7065-DWmPN-Ot.js";const d="/assets/20260310_182202-D_pyWZd6.jpg",c=[{id:1,src:d,alt:"Exhibition View 1"},{id:2,src:h,alt:"Exhibition View 2"},{id:3,src:m,alt:"Exhibition View 3"},{id:4,src:x,alt:"Exhibition View 4"},{id:5,src:g,alt:"Exhibition View 5"},{id:6,src:f,alt:"Exhibition View 6"},{id:7,src:u,alt:"Tremors — Film Poster"},{id:8,src:b,alt:"Dushor — Film Poster"}],v=[{id:1,source:"Mint",sourceShort:"MINT",title:"5 Events You Don't Want to Miss This Week",url:"https://www.livemint.com/mint-lounge/art-and-culture/event-planner-art-culture-comedy-womens-day-ramadan-iftar-feast-11772799990027.html",excerpt:"A Voyage to Permanence featured among the top cultural events not to be missed.",accentColor:"#00A550"},{id:2,source:"Elle India",sourceShort:"ELLE",title:"The Exhibitions Everyone's Talking About This Month",url:"https://elle.in/life-culture/the-exhibitions-everyones-talking-about-this-month-11180232",excerpt:"Elle's curated picks of the most compelling art exhibitions across India.",accentColor:"#C8102E"},{id:3,source:"Hindustan Times",sourceShort:"HT",title:"Art In March 2026: The Exhibition Hotlist",url:"https://share.google/VWlhQvTlmz7gGYsHj",excerpt:"A round-up of must-see exhibitions this March — A Voyage to Permanence leads the list.",accentColor:"#D62728"},{id:4,source:"Press Trust of India",sourceShort:"PTI",title:"A Voyage to Permanence Opens in Delhi",url:"https://www.instagram.com/p/DVlCv7hjbQ_/?img_index=2&igsh=MXBwZG9wOTk1MTk2dQ==",excerpt:"An immersive dialogue between cinema and art opens to audiences in Delhi.",accentColor:"#003087"},{id:5,source:"News Drum",sourceShort:"ND",title:"Delhi's Art Scene Comes Alive This March",url:"https://www.instagram.com/p/DVlCv7hjbQ_/?img_index=2&igsh=MXBwZG9wOTk1MTk2dQ==",excerpt:"News Drum spotlights the cultural surge sweeping Delhi this season.",accentColor:"#FF6B00"},{id:6,source:"Abirpothi",sourceShort:"ABP",title:"A Voyage to Permanence — Immersive Dialogue Between Cinema and Art",url:"https://www.abirpothi.com/a-voyage-to-permanence-an-immersive-dialogue-between-cinema-and-art-set-to-open-in-delhi/",excerpt:"A contemplative journey through layers of time, image, and material.",accentColor:"#8B5E3C"},{id:7,source:"Esquire India",sourceShort:"ESQ",title:"Culture Guide: What to See in March 2026",url:"https://elle.in/life-culture/the-exhibitions-everyones-talking-about-this-month-11180232",excerpt:"Esquire's definitive guide to the galleries worth your time this month.",accentColor:"#1A1A1A"}];function w(t=.1){const r=l.useRef(null),[n,s]=l.useState(!1);return l.useEffect(()=>{const i=r.current;if(!i)return;const o=new IntersectionObserver(([a])=>{a.isIntersecting&&(s(!0),o.disconnect())},{threshold:t});return o.observe(i),()=>o.disconnect()},[t]),{ref:r,inView:n}}function y({item:t,index:r}){const{ref:n,inView:s}=w(.08),i=r%2===0;return e.jsx("div",{ref:n,style:{opacity:s?1:0,transform:s?"none":`translateX(${i?"-70px":"70px"})`,transition:`opacity 0.75s cubic-bezier(.22,1,.36,1) ${r*.09}s, transform 0.75s cubic-bezier(.22,1,.36,1) ${r*.09}s`},children:e.jsxs("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",className:"press-tile",children:[e.jsx("div",{className:"tile-bg"}),e.jsxs("div",{className:"tile-top",children:[e.jsx("span",{className:"tile-source",style:{"--ac":t.accentColor},children:t.source}),e.jsx("span",{className:"tile-arrow",children:"↗"})]}),e.jsx("h3",{className:"tile-title",children:t.title}),t.excerpt&&e.jsx("p",{className:"tile-excerpt",children:t.excerpt}),e.jsxs("div",{className:"tile-bottom",children:[e.jsx("span",{className:"tile-code",children:t.sourceShort}),e.jsx("span",{className:"tile-read",children:"Read Article"})]})]})})}function j({images:t,index:r,onClose:n,onNav:s}){return l.useEffect(()=>{const i=o=>{o.key==="Escape"&&n(),o.key==="ArrowRight"&&s((r+1)%t.length),o.key==="ArrowLeft"&&s((r-1+t.length)%t.length)};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[r,t.length,n,s]),e.jsxs("div",{className:"lb-backdrop",onClick:n,children:[e.jsx("button",{className:"lb-close",onClick:n,children:"✕"}),e.jsx("button",{className:"lb-nav lb-prev",onClick:i=>{i.stopPropagation(),s((r-1+t.length)%t.length)},children:"←"}),e.jsxs("div",{className:"lb-frame",onClick:i=>i.stopPropagation(),children:[e.jsx("img",{src:t[r].src,alt:t[r].alt,className:"lb-img"}),e.jsx("p",{className:"lb-caption",children:t[r].alt})]}),e.jsx("button",{className:"lb-nav lb-next",onClick:i=>{i.stopPropagation(),s((r+1)%t.length)},children:"→"}),e.jsx("div",{className:"lb-dots",children:t.map((i,o)=>e.jsx("button",{className:`lb-dot${o===r?" active":""}`,onClick:a=>{a.stopPropagation(),s(o)}},o))})]})}function E(){const[t,r]=l.useState(!1),[n,s]=l.useState(null);l.useEffect(()=>{document.title="Media – A Voyage to Permanence";const a=setTimeout(()=>r(!0),60);return()=>clearTimeout(a)},[]),l.useCallback(a=>s(a),[]);const i=l.useCallback(()=>s(null),[]),o=l.useCallback(a=>s(a),[]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 20; }

        :root {
          --cream: #F4F0E8;
          --ink:   #181818;
          --muted: #7A7268;
          --rule:  #DDD7CC;
        }

        .media-page {
          min-height: 1vh;
          background: var(--cream);
          color: var(--ink);
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
        }

        /* ══════════════════════════════
           HERO
        ══════════════════════════════ */
        .hero {
          position: relative;
          height: 70svh;
          min-height: 400px;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background-image: url(${d});
          background-size: cover;
          background-position: center;
          filter: blur(14px) brightness(0.38) saturate(0.7);
          transform: scale(1.08);
          opacity: 0;
          transition: opacity 1.2s ease;
        }
        .hero-bg.loaded { opacity: 1; }

        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(24,24,24,0.15) 0%, transparent 40%, rgba(24,24,24,0.82) 100%);
        }

        .hero-content {
          position: relative; z-index: 2;
          width: 100%; padding: 0 48px 64px;
          max-width: 1200px; margin: 0 auto;
          opacity: 0; transform: translateY(32px);
          transition: opacity 1s 0.35s cubic-bezier(.22,1,.36,1), transform 1s 0.35s cubic-bezier(.22,1,.36,1);
        }
        .hero-content.loaded { opacity: 1; transform: none; }

        .hero-eyebrow {
          font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase;
          color: rgba(255,255,255,0.5); font-weight: 500; margin-bottom: 14px;
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.2rem, 9vw, 7rem);
          font-weight: 600; color: #fff;
          line-height: 1.0; letter-spacing: -0.02em; margin-bottom: 52px;
        }
        .hero-title em { font-style: italic; font-weight: 400; }

        .hero-stats {
          display: flex; gap: 0;
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(20px);
          background: rgba(255,255,255,0.07);
          width: fit-content; border-radius: 3px; overflow: hidden;
        }
        .hero-stat {
          padding: 22px 38px;
          border-right: 1px solid rgba(255,255,255,0.15);
          text-align: center; min-width: 130px;
        }
        .hero-stat:last-child { border-right: none; }
        .hero-stat-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.8rem; font-weight: 700; color: #fff; line-height: 1; margin-bottom: 6px;
        }
        .hero-stat-lbl {
          font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.48); font-weight: 500;
        }

        .scroll-hint {
          position: absolute; bottom: 28px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          color: rgba(255,255,255,0.32); font-size: 10px;
          letter-spacing: 0.22em; text-transform: uppercase;
          animation: shBounce 2.6s ease-in-out infinite; z-index: 2;
        }
        @keyframes shBounce {
          0%,100% { transform: translateX(-50%) translateY(0); }
          55%      { transform: translateX(-50%) translateY(8px); }
        }

        /* ══════════════════════════════
           SECTION HEADS
        ══════════════════════════════ */
        .sec-head {
          max-width: 1200px; margin: 0 auto;
          padding: 80px 48px 20px;
          display: flex; align-items: center; gap: 18px;
        }
        .sec-eyebrow {
          font-size: 10.5px; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--muted); font-weight: 600; white-space: nowrap;
        }
        .sec-rule { flex: 1; height: 1px; background: var(--rule); }
        .sec-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 600;
          max-width: 1200px; margin: 0 auto; padding: 12px 48px 44px;
          line-height: 1.15; color: var(--ink);
        }

        /* ══════════════════════════════
           PRESS TILES — big full-cover cards
           white bg → black fill on hover, all text flips to white
        ══════════════════════════════ */
        .press-grid {
          max-width: 1200px; margin: 0 auto;
          padding: 0 48px 88px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3px;
        }

        /* First tile spans full width */
        .press-grid > div:first-child { grid-column: 1 / -1; }

        .press-tile {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 260px;
          padding: 36px 40px 32px;
          background: #fff;
          text-decoration: none;
          color: var(--ink);
          position: relative;
          overflow: hidden;
          cursor: pointer;
          gap: 16px;
        }

        /* The black fill that slides up from bottom on hover */
        .tile-bg {
          position: absolute; inset: 0;
          background: #181818;
          transform: translateY(100%);
          transition: transform 0.48s cubic-bezier(.22,1,.36,1);
          z-index: 0;
        }
        .press-tile:hover .tile-bg { transform: translateY(0); }

        /* All content sits above the bg */
        .tile-top, .tile-title, .tile-excerpt, .tile-bottom { position: relative; z-index: 1; }

        .tile-top {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 12px;
        }

        .tile-source {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--ac, var(--ink));
          transition: color 0.35s ease;
        }
        .press-tile:hover .tile-source { color: rgba(255,255,255,0.55); }

        .tile-arrow {
          font-size: 1.5rem; line-height: 1;
          color: var(--muted);
          opacity: 0;
          transform: translate(-6px, 6px);
          transition: opacity 0.3s ease, transform 0.3s ease, color 0.3s ease;
        }
        .press-tile:hover .tile-arrow {
          opacity: 1; transform: none; color: #fff;
        }

        .tile-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.4rem, 2.8vw, 2rem);
          font-weight: 600; line-height: 1.2;
          color: var(--ink);
          transition: color 0.35s ease;
          flex: 1;
        }
        .press-tile:hover .tile-title { color: #fff; }

        /* first tile gets bigger title */
        .press-grid > div:first-child .tile-title {
          font-size: clamp(1.8rem, 4vw, 2.8rem);
        }

        .tile-excerpt {
          font-size: 0.875rem; line-height: 1.7;
          color: var(--muted); max-width: 560px;
          transition: color 0.35s ease;
        }
        .press-tile:hover .tile-excerpt { color: rgba(255,255,255,0.55); }

        .tile-bottom {
          display: flex; align-items: center;
          justify-content: space-between; gap: 12px;
          border-top: 1px solid var(--rule);
          padding-top: 20px;
          transition: border-color 0.35s ease;
        }
        .press-tile:hover .tile-bottom { border-color: rgba(255,255,255,0.15); }

        .tile-code {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--muted);
          transition: color 0.35s ease;
        }
        .press-tile:hover .tile-code { color: rgba(255,255,255,0.4); }

        .tile-read {
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--ink);
          opacity: 0; transform: translateX(-8px);
          transition: opacity 0.3s 0.08s ease, transform 0.3s 0.08s ease, color 0.3s ease;
        }
        .press-tile:hover .tile-read { opacity: 1; transform: none; color: #fff; }

        /* ══════════════════════════════
           GALLERY
        ══════════════════════════════ */
        .gallery-grid {
          max-width: 1200px; margin: 0 auto;
          padding: 0 48px 100px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
          gap: 4px;
        }

        .gallery-thumb {
          position: relative; aspect-ratio: 3/4;
          overflow: hidden; background: #e0d8cd;
          border: none; padding: 0; cursor: pointer;
          display: block; width: 100%;
        }
        .gallery-thumb img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.5s cubic-bezier(.22,1,.36,1), filter 0.4s ease;
        }
        .gallery-thumb:hover img { transform: scale(1.07); filter: brightness(0.65); }

        .thumb-overlay {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.3s ease;
        }
        .gallery-thumb:hover .thumb-overlay { opacity: 1; }

        /* ══════════════════════════════
           LIGHTBOX
        ══════════════════════════════ */
        .lb-backdrop {
          position: fixed; inset: 0;
          background: rgba(16,12,8,0.97); z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          animation: lbIn 0.28s cubic-bezier(.22,1,.36,1);
        }
        @keyframes lbIn { from { opacity: 0; } to { opacity: 1; } }

        .lb-frame {
          max-width: min(88vw, 800px); max-height: 88svh;
          display: flex; flex-direction: column; align-items: center; gap: 16px;
          animation: lbSlide 0.35s cubic-bezier(.22,1,.36,1);
        }
        @keyframes lbSlide {
          from { opacity: 0; transform: scale(0.93) translateY(18px); }
          to   { opacity: 1; transform: none; }
        }

        .lb-img { max-width: 100%; max-height: 78svh; object-fit: contain; display: block; border-radius: 2px; }
        .lb-caption { font-size: 0.78rem; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.38); font-weight: 500; }

        .lb-close {
          position: fixed; top: 24px; right: 28px;
          background: none; border: 1.5px solid rgba(255,255,255,0.22);
          color: rgba(255,255,255,0.65); width: 44px; height: 44px;
          border-radius: 50%; cursor: pointer; font-size: 1rem;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; z-index: 10;
        }
        .lb-close:hover { background: rgba(255,255,255,0.1); color: #fff; }

        .lb-nav {
          position: fixed; top: 50%; transform: translateY(-50%);
          background: none; border: 1.5px solid rgba(255,255,255,0.18);
          color: rgba(255,255,255,0.65); width: 52px; height: 52px;
          border-radius: 50%; cursor: pointer; font-size: 1.3rem;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; z-index: 10;
        }
        .lb-nav:hover { background: rgba(255,255,255,0.1); color: #fff; border-color: rgba(255,255,255,0.5); }
        .lb-prev { left: 24px; }
        .lb-next { right: 24px; }

        .lb-dots { position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; z-index: 10; }
        .lb-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.28); border: none; cursor: pointer; transition: all 0.2s; padding: 0; }
        .lb-dot.active { background: #fff; transform: scale(1.5); }

        /* ══════════════════════════════
           FOOTER
        ══════════════════════════════ */
        .media-footer {
          max-width: 1200px; margin: 0 auto;
          padding: 40px 48px 80px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 20px; border-top: 1px solid var(--rule);
        }
        .back-link {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 0.82rem; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--muted); text-decoration: none; font-weight: 600;
          transition: color 0.2s, gap 0.2s;
        }
        .back-link:hover { color: var(--ink); gap: 14px; }
        .mint-cta {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 0.82rem; letter-spacing: 0.16em; text-transform: uppercase;
          color: #00A550; text-decoration: none; font-weight: 600;
          border: 1.5px solid #00A550; padding: 10px 22px; border-radius: 2px;
          transition: all 0.2s;
        }
        .mint-cta:hover { background: #00A550; color: #fff; }

        /* ══════════════════════════════
           RESPONSIVE
        ══════════════════════════════ */
        @media (max-width: 768px) {
          .hero-content, .press-grid, .gallery-grid,
          .sec-head, .sec-title, .media-footer { padding-left: 20px; padding-right: 20px; }
          .press-grid { grid-template-columns: 1fr; }
          .press-grid > div:first-child { grid-column: 1; }
          .hero-stats { flex-wrap: wrap; }
          .hero-stat { min-width: 100px; padding: 14px 18px; }
          .press-tile { min-height: 200px; padding: 24px 24px 20px; }
          .lb-prev { left: 8px; }
          .lb-next { right: 8px; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}),e.jsxs("div",{className:"media-page",children:[e.jsxs("section",{className:"hero",children:[e.jsx("div",{className:`hero-bg${t?" loaded":""}`}),e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:`hero-content${t?" loaded":""}`,children:[e.jsx("p",{className:"hero-eyebrow",children:"Press & Media Coverage"}),e.jsxs("h1",{className:"hero-title",children:["A Voyage to",e.jsx("br",{}),e.jsx("em",{children:"Permanence"})]}),e.jsxs("div",{className:"hero-stats",children:[e.jsxs("div",{className:"hero-stat",children:[e.jsx("div",{className:"hero-stat-val",children:"7"}),e.jsx("div",{className:"hero-stat-lbl",children:"Media Outlets"})]}),e.jsxs("div",{className:"hero-stat",children:[e.jsx("div",{className:"hero-stat-val",children:"8+"}),e.jsx("div",{className:"hero-stat-lbl",children:"Press Mentions"})]}),e.jsxs("div",{className:"hero-stat",children:[e.jsx("div",{className:"hero-stat-val",children:c.length}),e.jsx("div",{className:"hero-stat-lbl",children:"Media Images"})]}),e.jsxs("div",{className:"hero-stat",children:[e.jsx("div",{className:"hero-stat-val",children:"50M+"}),e.jsx("div",{className:"hero-stat-lbl",children:"Coverage Reach"})]})]})]}),e.jsxs("div",{className:"scroll-hint",children:[e.jsx("span",{children:"Scroll"}),e.jsxs("svg",{width:"14",height:"22",viewBox:"0 0 14 22",fill:"none",children:[e.jsx("rect",{x:"1",y:"1",width:"12",height:"20",rx:"6",stroke:"currentColor",strokeWidth:"1.2"}),e.jsx("rect",{x:"6",y:"5",width:"2",height:"4",rx:"1",fill:"currentColor"})]})]})]}),e.jsxs("div",{className:"sec-head",children:[e.jsx("span",{className:"sec-eyebrow",children:"Press & Media"}),e.jsx("div",{className:"sec-rule"})]}),e.jsx("h2",{className:"sec-title",children:"As Seen In"}),e.jsx("div",{className:"press-grid",children:v.map((a,p)=>e.jsx(y,{item:a,index:p},a.id))})]}),n!==null&&e.jsx(j,{images:c,index:n,onClose:i,onNav:o})]})}export{E as Media};
