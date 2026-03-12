import{a as i,j as e}from"./motion-CKsoAACD.js";import{L as b}from"./index-YUqLO4We.js";import{I as w,a as v,b as C,c as j,d as N,e as k,T as E,D as S}from"./_MG_7065-Dpgkqbls.js";import"./radix-ui-BRya32WC.js";const F=[{id:1,src:w,alt:"Exhibition View 1",category:"Exhibition"},{id:2,src:v,alt:"Exhibition View 2",category:"Exhibition"},{id:3,src:C,alt:"Exhibition View 3",category:"Exhibition"},{id:4,src:j,alt:"Exhibition View 4",category:"Exhibition"},{id:5,src:N,alt:"Exhibition View 5",category:"Exhibition"},{id:6,src:k,alt:"Exhibition View 6",category:"Exhibition"},{id:7,src:E,alt:"Tremors Film Poster",category:"Films"},{id:8,src:S,alt:"Dushor Film Poster",category:"Films"}],A=[{label:"Press Mentions",value:"8+",icon:"📰"},{label:"Featured In",value:"6",icon:"⭐"},{label:"Coverage Reach",value:"1M+",icon:"👥"}],l=[{id:1,source:"Mint / Hindustan Times",sourceShort:"MINT",title:"5 Events You Dont Want to Miss This Week",url:"https://www.livemint.com/mint-lounge/art-and-culture/event-planner-art-culture-comedy-womens-day-ramadan-iftar-feast-11772799990027.html",excerpt:"A Voyage to Permanence featured among the top cultural events not to be missed this week.",type:"feature"},{id:2,source:"Elle India",sourceShort:"ELLE",title:"The Exhibitions Everyones Talking About This Month",url:"https://elle.in/life-culture/the-exhibitions-everyones-talking-about-this-month-11180232",excerpt:"Curated picks of the most compelling art exhibitions making waves across India right now.",type:"feature"},{id:3,source:"Hindustan Times",sourceShort:"HT",title:"Art In March 2026: The Exhibition Hotlist",url:"https://share.google/VWlhQvTlmz7gGYsHj",excerpt:"A round-up of the must-see exhibitions this March — and A Voyage to Permanence leads the list.",type:"feature"},{id:4,source:"Press Trust of India",sourceShort:"PTI",title:"A Voyage to Permanence Opens in Delhi",url:"https://www.instagram.com/p/DVlCv7hjbQ_/?img_index=2&igsh=MXBwZG9wOTk1MTk2dQ==",excerpt:"An immersive dialogue between cinema and art, the exhibition draws audiences into a world suspended between memory and permanence.",type:"mention"},{id:5,source:"News Drum",sourceShort:"ND",title:"Delhis Art Scene Comes Alive This March",url:"https://www.instagram.com/p/DVlCv7hjbQ_/?img_index=2&igsh=MXBwZG9wOTk1MTk2dQ==",type:"mention"},{id:6,source:"Esquire India",sourceShort:"ESQ",title:"Culture Guide: What to See in March 2026",url:"https://elle.in/life-culture/the-exhibitions-everyones-talking-about-this-month-11180232",excerpt:"Esquires definitive guide to the galleries and exhibitions worth your time this month.",type:"feature"},{id:7,source:"Abirpothi",sourceShort:"ABP",title:"A Voyage to Permanence — An Immersive Dialogue Between Cinema and Art",url:"https://www.abirpothi.com/a-voyage-to-permanence-an-immersive-dialogue-between-cinema-and-art-set-to-open-in-delhi/",excerpt:"Set to open in Delhi, this exhibition invites visitors on a contemplative journey through layers of time, image, and material.",type:"review"}],n={MINT:"#00A550",ELLE:"#C8102E",HT:"#1A1A2E",PTI:"#003087",ND:"#FF6B00",ESQ:"#2C2C2C",ABP:"#8B5E3C"};function P(){const[t,m]=i.useState(!1),[T,s]=i.useState(null),a=i.useRef(null),[h,g]=i.useState(!1),[x,u]=i.useState(!0);i.useEffect(()=>{document.title="Media – A Voyage to Permanence";const r=setTimeout(()=>m(!0),80);return()=>clearTimeout(r)},[]);const c=()=>{if(a.current){const{scrollLeft:r,scrollWidth:o,clientWidth:y}=a.current;g(r>0),u(r<o-y-10)}},d=r=>{a.current&&(a.current.scrollBy({left:r==="right"?400:-400,behavior:"smooth"}),setTimeout(c,50))},p=l.filter(r=>r.type==="feature"),f=l.filter(r=>r.type==="mention"||r.type==="review");return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .media-root {
          min-height: 100vh;
          background: #F7F4EF;
          color: #1C1C1C;
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
        }

        /* ===== HERO SECTION ===== */
        .media-hero {
          padding: 80px 40px 40px;
          max-width: 1200px;
          margin: 0 auto;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s cubic-bezier(.22,1,.36,1), transform 0.8s cubic-bezier(.22,1,.36,1);
        }
        .media-hero.in { opacity: 1; transform: none; }

        .eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #8A7F72;
          margin-bottom: 16px;
          font-weight: 500;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 7vw, 4.8rem);
          font-weight: 700;
          line-height: 1.1;
          color: #1C1C1C;
          margin: 0 0 24px;
          letter-spacing: -0.02em;
        }

        .hero-rule {
          width: 72px;
          height: 3px;
          background: #1C1C1C;
          border: none;
          margin: 0;
        }

        /* ===== STATS SECTION ===== */
        .media-stats {
          max-width: 1200px;
          margin: 60px auto 80px;
          padding: 0 40px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.75s 0.2s ease, transform 0.75s 0.2s ease;
        }
        .media-stats.in { opacity: 1; transform: none; }

        .stat-item {
          text-align: center;
          padding: 20px;
          border: 2px solid #E8E0D5;
          border-radius: 12px;
          background: white;
          transition: all 0.3s cubic-bezier(.22,1,.36,1);
        }
        .stat-item:hover {
          border-color: #1C1C1C;
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.08);
        }

        .stat-icon {
          font-size: 2.4rem;
          margin-bottom: 12px;
          display: inline-block;
        }

        .stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 2.8rem;
          font-weight: 700;
          color: #1C1C1C;
          margin: 8px 0;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.85rem;
          color: #8A7F72;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 500;
        }

        /* ===== GALLERY SECTION ===== */
        .gallery-section {
          margin: 100px 0;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.75s 0.35s ease, transform 0.75s 0.35s ease;
        }
        .gallery-section.in { opacity: 1; transform: none; }

        .gallery-header {
          max-width: 1200px;
          margin: 0 auto 40px;
          padding: 0 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .gallery-title {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
          color: #1C1C1C;
        }

        .gallery-controls {
          display: flex;
          gap: 12px;
        }

        .scroll-btn {
          width: 44px;
          height: 44px;
          border: 1.5px solid #1C1C1C;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          font-weight: 600;
          color: #1C1C1C;
        }
        .scroll-btn:hover:not(:disabled) {
          background: #1C1C1C;
          color: white;
          transform: scale(1.1);
        }
        .scroll-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .gallery-container {
          overflow-x: auto;
          overflow-y: hidden;
          scroll-behavior: smooth;
          padding: 0 40px;
          max-width: 100vw;
        }
        .gallery-container::-webkit-scrollbar { display: none; }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          padding-right: 40px;
          min-width: min-content;
        }

        .gallery-image-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          aspect-ratio: 3/4;
          background: #E8E0D5;
          cursor: pointer;
          group: 'gallery-item';
        }

        .gallery-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s cubic-bezier(.22,1,.36,1);
          display: block;
        }

        .gallery-image-wrapper:hover img {
          transform: scale(1.08);
        }

        .gallery-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: flex-end;
          padding: 20px;
        }
        .gallery-image-wrapper:hover .gallery-image-overlay {
          opacity: 1;
        }

        .gallery-image-label {
          color: white;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* ===== SOURCE BAR ===== */
        .source-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          padding: 32px 40px;
          max-width: 1200px;
          margin: 0 auto 40px;
          opacity: 0;
          transition: opacity 0.7s 0.25s ease;
        }
        .source-bar.in { opacity: 1; }

        .source-pill {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 8px 16px;
          border-radius: 100px;
          border: 1.5px solid currentColor;
          opacity: 0.7;
          transition: all 0.2s;
          cursor: pointer;
        }
        .source-pill:hover { opacity: 1; transform: translateY(-2px); }

        /* ===== SECTION BLOCKS ===== */
        .section-block {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px 80px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }
        .section-block.in { opacity: 1; transform: none; }

        .section-label {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: #1C1C1C;
          margin: 0 0 36px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .section-label::after {
          content: '';
          flex: 1;
          height: 2px;
          background: #D9D3C9;
        }

        .press-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
        }
        @media (max-width: 768px) {
          .press-grid { grid-template-columns: 1fr; }
          .press-card.large { grid-column: 1; }
          .media-hero, .source-bar, .section-block, .gallery-header { padding-left: 20px; padding-right: 20px; }
          .gallery-container { padding: 0 20px; }
          .gallery-grid { padding-right: 20px; }
        }

        .press-card {
          background: #FFFFFF;
          padding: 32px 28px;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          display: block;
          position: relative;
          overflow: hidden;
          transition: background 0.25s ease, transform 0.25s cubic-bezier(.22,1,.36,1);
          border: 1px solid #E8E0D5;
        }
        .press-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #1C1C1C;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(.22,1,.36,1);
          z-index: 0;
        }
        .press-card:hover::before { transform: scaleX(1); }
        .press-card:hover { color: #F7F4EF; transform: translateY(-2px); }

        .press-card > * { position: relative; z-index: 1; }

        .press-card.large {
          grid-column: span 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: start;
          padding: 40px 36px;
        }
        @media (max-width: 768px) {
          .press-card.large { grid-template-columns: 1fr; }
        }

        .card-source-tag {
          display: inline-block;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 6px 12px;
          border-radius: 4px;
          margin-bottom: 16px;
          color: white;
          transition: opacity 0.25s;
        }
        .press-card:hover .card-source-tag { opacity: 0.8; }

        .card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.35;
          margin: 0 0 12px;
          color: inherit;
        }
        .press-card.large .card-title { font-size: 1.6rem; }

        .card-excerpt {
          font-size: 0.95rem;
          line-height: 1.7;
          color: #6B6358;
          margin: 0;
          transition: color 0.25s;
          font-weight: 400;
        }
        .press-card:hover .card-excerpt { color: #C8BFB0; }

        .card-arrow {
          margin-top: 24px;
          font-size: 0.8rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.25s, transform 0.25s;
        }
        .press-card:hover .card-arrow { opacity: 1; transform: none; }

        /* ===== MENTIONS LIST ===== */
        .mentions-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .mention-row {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 24px 28px;
          background: #FFFFFF;
          text-decoration: none;
          color: inherit;
          transition: all 0.25s cubic-bezier(.22,1,.36,1);
          border: 1px solid #E8E0D5;
          border-left: 4px solid transparent;
        }
        .mention-row:hover {
          background: #1C1C1C;
          color: #F7F4EF;
          padding-left: 36px;
          border-left-color: #F7F4EF;
          transform: translateX(4px);
        }

        .mention-source {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          min-width: 50px;
          opacity: 0.6;
          transition: opacity 0.2s;
        }
        .mention-row:hover .mention-source { opacity: 0.7; }

        .mention-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 600;
          flex: 1;
          line-height: 1.4;
        }

        .mention-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #8A7F72;
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .mention-row:hover .mention-dot { background: #F7F4EF; }

        .mention-arrow {
          font-size: 1.2rem;
          opacity: 0.5;
          transition: all 0.2s;
        }
        .mention-row:hover .mention-arrow { opacity: 1; }

        /* ===== BACK LINK ===== */
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #8A7F72;
          text-decoration: none;
          padding: 0 40px 80px;
          max-width: 1200px;
          margin: 0 auto;
          display: block;
          transition: color 0.2s;
          font-weight: 600;
        }
        .back-link:hover { color: #1C1C1C; }

        /* ===== ANIMATIONS ===== */
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }

        @media (max-width: 640px) {
          .gallery-title { font-size: 1.5rem; }
          .stat-value { font-size: 2rem; }
          .hero-title { font-size: 2rem; }
        }
      `}),e.jsxs("div",{className:"media-root",children:[e.jsxs("div",{className:`media-hero ${t?"in":""}`,children:[e.jsx("p",{className:"eyebrow",children:"Press & Media Coverage"}),e.jsxs("h1",{className:"hero-title",children:["A Voyage to",e.jsx("br",{}),e.jsx("em",{children:"Permanence"})]}),e.jsx("hr",{className:"hero-rule"})]}),e.jsx("div",{className:`media-stats ${t?"in":""}`,children:A.map((r,o)=>e.jsxs("div",{className:"stat-item",children:[e.jsx("div",{className:"stat-icon",children:r.icon}),e.jsx("div",{className:"stat-value",children:r.value}),e.jsx("div",{className:"stat-label",children:r.label})]},o))}),e.jsxs("div",{className:`gallery-section ${t?"in":""}`,children:[e.jsxs("div",{className:"gallery-header",children:[e.jsx("h2",{className:"gallery-title",children:"Exhibition & Media Gallery"}),e.jsxs("div",{className:"gallery-controls",children:[e.jsx("button",{className:"scroll-btn",onClick:()=>d("left"),disabled:!h,"aria-label":"Scroll left",children:"←"}),e.jsx("button",{className:"scroll-btn",onClick:()=>d("right"),disabled:!x,"aria-label":"Scroll right",children:"→"})]})]}),e.jsx("div",{className:"gallery-container",ref:a,onScroll:c,children:e.jsx("div",{className:"gallery-grid",children:F.map(r=>e.jsxs("div",{className:"gallery-image-wrapper",children:[e.jsx("img",{src:r.src,alt:r.alt}),e.jsx("div",{className:"gallery-image-overlay",children:e.jsx("span",{className:"gallery-image-label",children:r.category})})]},r.id))})})]}),e.jsx("div",{className:`source-bar ${t?"in":""}`,children:l.map(r=>e.jsx("span",{className:"source-pill",style:{color:n[r.sourceShort]??"#1C1C1C",borderColor:n[r.sourceShort]??"#1C1C1C"},children:r.sourceShort},r.id))}),e.jsxs("div",{className:`section-block ${t?"in":""}`,style:{transitionDelay:"0.32s"},children:[e.jsx("p",{className:"section-label",children:"Featured Coverage"}),e.jsxs("div",{className:"press-grid",children:[p.slice(0,1).map(r=>e.jsxs("a",{href:r.url,target:"_blank",rel:"noopener noreferrer",className:"press-card large",onMouseEnter:()=>s(r.id),onMouseLeave:()=>s(null),children:[e.jsxs("div",{children:[e.jsx("span",{className:"card-source-tag",style:{background:n[r.sourceShort]??"#1C1C1C"},children:r.source}),e.jsx("h3",{className:"card-title",children:r.title}),e.jsx("span",{className:"card-arrow",children:"Read Article →"})]}),e.jsx("div",{children:r.excerpt&&e.jsx("p",{className:"card-excerpt",children:r.excerpt})})]},r.id)),p.slice(1).map(r=>e.jsxs("a",{href:r.url,target:"_blank",rel:"noopener noreferrer",className:"press-card",onMouseEnter:()=>s(r.id),onMouseLeave:()=>s(null),children:[e.jsx("span",{className:"card-source-tag",style:{background:n[r.sourceShort]??"#1C1C1C"},children:r.source}),e.jsx("h3",{className:"card-title",children:r.title}),r.excerpt&&e.jsx("p",{className:"card-excerpt",children:r.excerpt}),e.jsx("span",{className:"card-arrow",children:"Read Article →"})]},r.id))]})]}),e.jsxs("div",{className:`section-block ${t?"in":""}`,style:{transitionDelay:"0.45s"},children:[e.jsx("p",{className:"section-label",children:"Mentions & Reviews"}),e.jsx("div",{className:"mentions-list",children:f.map(r=>e.jsxs("a",{href:r.url,target:"_blank",rel:"noopener noreferrer",className:"mention-row",children:[e.jsx("span",{className:"mention-source",children:r.sourceShort}),e.jsx("span",{className:"mention-dot"}),e.jsx("span",{className:"mention-title",children:r.title}),e.jsx("span",{className:"mention-arrow",children:"→"})]},r.id))})]}),e.jsx("div",{style:{maxWidth:1200,margin:"0 auto",padding:"0 40px 80px"},children:e.jsx(b,{to:"/",className:"back-link",children:"← Back to Home"})})]})]})}export{P as Media};
