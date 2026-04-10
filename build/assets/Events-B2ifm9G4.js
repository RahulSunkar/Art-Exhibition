import{a as d,u as O,b as B,j as e,m as r,A}from"./motion-CKsoAACD.js";import{L as X}from"./index-Bv-gCUDr.js";import{e as F}from"./store-41zKczGv.js";import"./radix-ui-BRya32WC.js";import"./poster_page-0001-BowyQiQD.js";import"./_MG_7065-DWmPN-Ot.js";import"./Bangalore_FrontCOver_Mockup-CDoAPjks.js";const M=768;function E(){const[t,i]=d.useState(void 0);return d.useEffect(()=>{const s=window.matchMedia(`(max-width: ${M-1}px)`),n=()=>{i(window.innerWidth<M)};return s.addEventListener("change",n),i(window.innerWidth<M),()=>s.removeEventListener("change",n)},[]),!!t}const g={serif:"'Poppins', sans-serif",mono:"'DM Mono', monospace",white:"#ffffff",dim2:"rgba(255,255,255,0.45)",dim3:"rgba(255,255,255,0.18)",border:"1px solid rgba(255,255,255,0.09)"};function z(t){let i="";const s=t.match(/embed\/([^?&\s]+)/),n=t.match(/shorts\/([^?&\s]+)/),l=t.match(/[?&]v=([^&\s]+)/);return s?i=s[1]:n?i=n[1]:l&&(i=l[1]),i?`https://img.youtube.com/vi/${i}/maxresdefault.jpg`:""}const Y=`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

  @keyframes scanGrain {
    0%,100% { transform: translate(0,0); }
    10%      { transform: translate(-2%,-3%); }
    30%      { transform: translate(3%,2%); }
    50%      { transform: translate(-1%,4%); }
    70%      { transform: translate(2%,-1%); }
    90%      { transform: translate(-3%,1%); }
  }
  @keyframes softFlicker {
    0%,94%,100% { opacity:1; }
    95% { opacity:.93; }
    97% { opacity:.96; }
  }
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes lineGrow {
    from { transform:scaleX(0); }
    to   { transform:scaleX(1); }
  }

  .ev-root {
    font-family: 'DM Mono', monospace;
    background: #050505;
    color: #fff;
    animation: softFlicker 12s infinite;
    position: relative;
    overflow-x: hidden;
  }
  .ev-root::before {
    content:'';
    position:fixed;
    inset:-50%;
    width:200%;height:200%;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
    animation:scanGrain .5s steps(1) infinite;
    pointer-events:none;
    z-index:9999;
    opacity:.12;
  }

  .label { font-family:'DM Mono',monospace; font-size:9px; font-weight:500; letter-spacing:.42em; text-transform:uppercase; color:rgba(255,255,255,.22); }
  .label-bright { font-family:'DM Mono',monospace; font-size:9px; font-weight:500; letter-spacing:.42em; text-transform:uppercase; color:rgba(255,255,255,.5); }

  .section { padding:7rem 5rem; border-bottom:1px solid rgba(255,255,255,.07); position:relative; }
  @media(max-width:900px){ .section{ padding:4rem 2rem; } }

  .diag-grid {
    position:absolute; inset:0; pointer-events:none;
    background-image: repeating-linear-gradient(-45deg,transparent,transparent 48px,rgba(255,255,255,.012) 48px,rgba(255,255,255,.012) 49px);
  }

  .gallery-img { transition:transform .6s cubic-bezier(.16,1,.3,1), filter .4s; }
  .gallery-img:hover { transform:scale(1.05); filter:brightness(1.08); }

  .pill {
    display:inline-flex; align-items:center; gap:6px;
    border:1px solid rgba(255,255,255,.12); padding:5px 14px;
    font-size:10px; letter-spacing:.18em; text-transform:uppercase;
    color:rgba(255,255,255,.5); font-family:'DM Mono',monospace;
  }

  .pdf-nav-btn {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.6);
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, opacity 0.2s;
  }
  .pdf-nav-btn:not(:disabled):hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.25);
  }
  .pdf-nav-btn:disabled {
    opacity: 0.25;
    cursor: default;
  }

  .video-card:hover .video-play-btn {
    transform: scale(1.12);
    background: rgba(255,255,255,0.18);
    border-color: rgba(255,255,255,0.5);
  }
  .video-play-btn {
    transition: transform 0.3s cubic-bezier(.16,1,.3,1), background 0.25s, border-color 0.25s;
  }

  .catalog-stage {
    position: relative;
    min-height: clamp(420px, 72vh, 860px);
    perspective: 2200px;
  }

  .catalog-stage::before {
    content: '';
    position: absolute;
    inset: 8% 10%;
    border-radius: 28px;
    background: radial-gradient(circle at center, rgba(255,255,255,0.07), transparent 72%);
    filter: blur(24px);
    pointer-events: none;
  }

  .catalog-book {
    position: relative;
    min-height: inherit;
    background: linear-gradient(145deg, rgba(18,18,18,0.98) 0%, rgba(8,8,8,0.94) 100%);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 32px 120px rgba(0,0,0,0.42);
  }

  .catalog-book::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(255,255,255,0.03), transparent 12%, transparent 88%, rgba(255,255,255,0.03));
    pointer-events: none;
  }

  .catalog-page-shell {
    position: absolute;
    inset: clamp(14px, 2vw, 22px);
    border-radius: 20px;
    overflow: hidden;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    box-shadow: 0 26px 60px rgba(0,0,0,0.45);
  }

  .catalog-page-shell img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    background: #f5f0e8;
  }

  .catalog-page-shell::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(0,0,0,0.22), transparent 12%, transparent 88%, rgba(0,0,0,0.18));
    pointer-events: none;
  }

  .catalog-spine {
    position: absolute;
    left: 50%;
    top: 6%;
    bottom: 6%;
    width: 1px;
    transform: translateX(-50%);
    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.14), transparent);
    box-shadow: 0 0 22px rgba(255,255,255,0.08);
    pointer-events: none;
  }

  .catalog-meta-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
  }

  @media (max-width: 900px) {
    .catalog-stage {
      min-height: 420px;
    }
  }
`,x=({children:t})=>e.jsx(r.h2,{initial:{opacity:0,y:24},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.7},style:{fontFamily:g.serif,fontSize:"clamp(2.4rem, 5vw, 4.8rem)",lineHeight:.95,letterSpacing:"-0.04em",color:"#ffffff",margin:"0 0 2rem"},children:t});function U({catalog:t}){const[i,s]=d.useState(1),[n,l]=d.useState(1),[o,a]=d.useState(!0),[h,p]=d.useState(!1),[m,v]=d.useState(null),[c,b]=d.useState(1),k=d.useRef(null),S=d.useRef(null),I=d.useRef(null),w=d.useRef(1);d.useEffect(()=>{w.current=i},[i]),d.useEffect(()=>{if(!t.pdfUrl){a(!1);return}const u=()=>{const f=window["pdfjs-dist/build/pdf"];if(!f){p(!0),a(!1);return}f.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js",f.getDocument(t.pdfUrl).promise.then(y=>{S.current=y,l(y.numPages),C(1,y)}).catch(()=>{p(!0),a(!1)})};if(window["pdfjs-dist/build/pdf"])u();else{const f=document.createElement("script");f.src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",f.onload=u,f.onerror=()=>{p(!0),a(!1)},document.head.appendChild(f)}return()=>{I.current?.cancel?.()}},[t.pdfUrl]);const C=(u,f)=>{const y=f??S.current;!y||!k.current||(I.current?.cancel?.(),a(!0),y.getPage(u).then(V=>{const P=V.getViewport({scale:1}),$=Math.max(k.current.clientWidth-48,280),W=Math.min(window.innerHeight*.7,880),D=Math.min($/P.width,W/P.height),T=V.getViewport({scale:Math.max(D,.85)}),j=document.createElement("canvas"),N=j.getContext("2d");if(!N){p(!0),a(!1);return}j.height=T.height,j.width=T.width;const L=V.render({canvasContext:N,viewport:T});I.current=L,L.promise.then(()=>{v(j.toDataURL("image/jpeg",.96)),s(u),a(!1)}).catch(H=>{H?.name!=="RenderingCancelledException"&&p(!0),a(!1)})}))},R=u=>{const f=Math.max(1,Math.min(n,w.current+u));f===w.current||o||(b(u>0?1:-1),C(f))};return d.useEffect(()=>{if(!S.current)return;const u=()=>C(w.current);return window.addEventListener("resize",u),()=>window.removeEventListener("resize",u)},[m]),!t.pdfUrl&&t.image?e.jsx("div",{style:{background:"#111",border:g.border,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60vh",overflow:"hidden"},children:e.jsx("img",{src:t.image,alt:"Catalog",style:{maxWidth:"100%",display:"block"}})}):e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",marginBottom:"1.4rem"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"1rem"},children:[e.jsx("button",{className:"pdf-nav-btn",onClick:()=>R(-1),disabled:i===1||o,"aria-label":"Previous page",children:e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M15 19l-7-7 7-7"})})}),e.jsx("span",{className:"label",style:{margin:0,letterSpacing:".3em"},children:o?"Turning page…":`Page ${i} / ${n}`}),e.jsx("button",{className:"pdf-nav-btn",onClick:()=>R(1),disabled:i===n||o,"aria-label":"Next page",children:e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M9 19l7-7-7-7"})})})]}),t.pdfUrl&&e.jsx("a",{href:t.pdfUrl,download:!0,style:{fontSize:9,color:"rgba(255,255,255,0.3)",letterSpacing:".25em",textTransform:"uppercase",textDecoration:"none",transition:"color .2s"},onMouseEnter:u=>u.currentTarget.style.color="rgba(255,255,255,0.6)",onMouseLeave:u=>u.currentTarget.style.color="rgba(255,255,255,0.3)",children:"Download PDF ↓"})]}),e.jsx("div",{ref:k,className:"catalog-stage",children:e.jsxs("div",{className:"catalog-book",children:[e.jsx("div",{className:"catalog-spine"}),h?e.jsxs("div",{style:{textAlign:"center",color:"rgba(255,255,255,0.2)",padding:"4rem"},children:[e.jsx("div",{style:{fontSize:40,marginBottom:"1rem"},children:"⊞"}),e.jsx("p",{className:"label",children:"Unable to load PDF"})]}):e.jsxs(e.Fragment,{children:[e.jsx(A,{initial:!1,mode:"wait",custom:c,children:m&&e.jsxs(r.div,{className:"catalog-page-shell",custom:c,initial:u=>({rotateY:u>0?-88:88,x:u>0?40:-40,opacity:.24}),animate:{rotateY:0,x:0,opacity:1,transition:{duration:.78,ease:[.22,1,.36,1]}},exit:u=>({rotateY:u>0?88:-88,x:u>0?-36:36,opacity:.18,transition:{duration:.52,ease:[.55,0,.2,1]}}),style:{transformOrigin:c>0?"left center":"right center"},children:[e.jsx("img",{src:m,alt:`Catalog page ${i}`}),e.jsxs("div",{style:{position:"absolute",right:18,bottom:16,padding:"0.45rem 0.8rem",borderRadius:999,background:"rgba(5,5,5,0.56)",color:"#ffffff",fontSize:10,letterSpacing:"0.16em",textTransform:"uppercase",border:"1px solid rgba(255,255,255,0.1)"},children:["Page ",i]})]},i)}),o&&e.jsx("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:3},children:e.jsx("span",{className:"label",style:{color:"rgba(255,255,255,0.3)"},children:"Turning page…"})})]})]})}),e.jsx("div",{style:{display:"flex",justifyContent:"center",marginTop:"1rem",gap:"1.5rem"},children:e.jsx("span",{className:"label",style:{color:"rgba(255,255,255,0.12)"},children:"← → to navigate pages"})})]})}function G({videoUrl:t,activaVideoId:i,onVideoPlay:s}){const[n,l]=d.useState(!1),o=z(t),a=E(),h=a?60:80,p=a?28:40,m=`curator-${t.slice(0,10)}`,v=()=>{i&&i!==m||(l(!0),s?.())};return e.jsx(r.div,{initial:{opacity:0,scale:.95},whileInView:{opacity:1,scale:1},viewport:{once:!0},transition:{duration:.6},style:{position:"relative",width:"100%",aspectRatio:"16 / 9",background:"#000",borderRadius:"0.5rem",overflow:"hidden",border:g.border},children:n?e.jsx(r.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.3},style:{position:"absolute",inset:0,zIndex:3},children:e.jsx("iframe",{src:`${t}?autoplay=1&controls=1&rel=0&modestbranding=1`,style:{position:"absolute",inset:0,width:"100%",height:"100%",border:"none",borderRadius:"0.5rem"},allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowFullScreen:!0,title:"Curator testimonial"})}):e.jsxs(e.Fragment,{children:[o&&e.jsx("img",{src:o,alt:"Curator video",style:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",display:"block"}}),e.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%)",zIndex:1}}),e.jsx(r.button,{whileHover:{scale:1.15},whileTap:{scale:.9},onClick:v,style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"transparent",border:"none",cursor:"pointer",zIndex:2},children:e.jsx(r.div,{animate:{scale:[1,1.1,1]},transition:{duration:2,repeat:1/0},children:e.jsx("div",{style:{width:h,height:h,background:"rgba(255, 0, 0, 0.8)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 30px rgba(255, 0, 0, 0.4)"},children:e.jsx("svg",{width:p,height:p,viewBox:"0 0 40 40",fill:"white",style:{marginLeft:6},children:e.jsx("path",{d:"M12 8l20 12-20 12V8z"})})})})})]})})}function q({v:t,i,activaVideoId:s,onVideoPlay:n}){const[l,o]=d.useState(!1),a=z(t.videoUrl),h=`perf-${i}-${t.videoUrl.slice(0,10)}`,p=()=>{s&&s!==h||(o(!0),n?.())};return e.jsxs(r.div,{initial:{opacity:0,y:40},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.7,delay:i*.12},children:[e.jsx("div",{className:"video-card",style:{position:"relative",width:"100%",aspectRatio:"16 / 9",overflow:"hidden",border:g.border,background:"#111",cursor:l?"default":"pointer",transition:"border-color 0.3s"},onClick:()=>!l&&p(),onMouseEnter:m=>{l||(m.currentTarget.style.borderColor="rgba(255,255,255,0.28)")},onMouseLeave:m=>{m.currentTarget.style.borderColor="rgba(255,255,255,0.09)"},children:l?e.jsx(r.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.4},style:{position:"absolute",inset:0},children:e.jsx("iframe",{src:`${t.videoUrl}?autoplay=1&controls=1&rel=0&modestbranding=1`,style:{position:"absolute",inset:0,width:"100%",height:"100%",border:"none"},allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowFullScreen:!0,title:t.title})},"iframe"):e.jsxs(r.div,{initial:{opacity:0},animate:{opacity:1},style:{position:"absolute",inset:0},children:[(a||t.poster)&&e.jsx("img",{src:a||t.poster,alt:t.title,style:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",display:"block"}}),e.jsx("div",{style:{position:"absolute",inset:0,background:t.poster?"linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.1) 100%)":"rgba(0,0,0,0.4)"}}),e.jsx("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("div",{className:"video-play-btn",style:{width:80,height:80,background:"rgba(255,255,255,0.1)",border:"2px solid rgba(255,255,255,0.35)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("svg",{width:"34",height:"34",viewBox:"0 0 40 40",fill:"white",style:{marginLeft:4},children:e.jsx("path",{d:"M12 8l20 12-20 12V8z"})})})})]},"poster")}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"baseline",padding:"1.25rem 0 0"},children:[e.jsx("h4",{style:{fontFamily:g.serif,fontSize:18,fontWeight:700,color:g.white,margin:0},children:t.title}),t.artist&&e.jsx("span",{className:"label",style:{color:g.dim2},children:t.artist})]})]})}function _({videos:t,activaVideoId:i,onVideoPlay:s}){const[n,l]=d.useState(!1),o=n?t.length:4,a=t.slice(0,o),h=t.length>4;return e.jsxs("div",{children:[e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"2rem",marginBottom:"3rem"},children:a.map((p,m)=>e.jsx(K,{videoUrl:p.videoUrl,i:m,activaVideoId:i,onVideoPlay:s},m))}),h&&e.jsx(r.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},style:{display:"flex",justifyContent:"center"},children:e.jsx("button",{onClick:()=>l(!n),style:{padding:"14px 32px",background:"rgba(255,255,255,0.08)",border:g.border,color:"rgba(255,255,255,0.7)",fontFamily:g.mono,fontSize:11,fontWeight:500,letterSpacing:".2em",textTransform:"uppercase",cursor:"pointer",transition:"all 0.3s"},onMouseEnter:p=>{p.currentTarget.style.background="rgba(255,255,255,0.12)",p.currentTarget.style.borderColor="rgba(255,255,255,0.22)"},onMouseLeave:p=>{p.currentTarget.style.background="rgba(255,255,255,0.08)",p.currentTarget.style.borderColor="rgba(255,255,255,0.09)"},children:n?"Show Less −":"Show More +"})})]})}function K({videoUrl:t,i,activaVideoId:s,onVideoPlay:n}){const[l,o]=d.useState(!1),a=z(t),h=`audience-${i}-${t.slice(0,10)}`,p=()=>{s&&s!==h||(o(!0),n?.(i))};return e.jsx(r.div,{initial:{opacity:0,y:40},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.7,delay:i*.12},children:e.jsx("div",{className:"video-card",style:{position:"relative",width:"100%",aspectRatio:"9 / 16",overflow:"hidden",border:g.border,background:"#111",cursor:l?"default":"pointer",transition:"border-color 0.3s"},onClick:()=>!l&&p(),onMouseEnter:m=>{l||(m.currentTarget.style.borderColor="rgba(255,255,255,0.28)")},onMouseLeave:m=>{m.currentTarget.style.borderColor="rgba(255,255,255,0.09)"},children:l?e.jsx(r.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.4},style:{position:"absolute",inset:0},children:e.jsx("iframe",{src:`${t}?autoplay=1&rel=0&modestbranding=1&controls=1`,style:{position:"absolute",inset:0,width:"100%",height:"100%",border:"none"},allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowFullScreen:!0,title:"Audience testimonial"})},"iframe"):e.jsxs(r.div,{initial:{opacity:0},animate:{opacity:1},style:{position:"absolute",inset:0},children:[a&&e.jsx("img",{src:a,alt:"Video thumbnail",style:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",display:"block"}}),e.jsx("div",{style:{position:"absolute",inset:0,background:a?"linear-gradient(135deg, rgba(10,10,10,0.4) 0%, rgba(30,30,30,0.3) 100%)":"linear-gradient(135deg, rgba(10,10,10,0.8) 0%, rgba(30,30,30,0.6) 100%)"}}),e.jsx("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("div",{className:"video-play-btn",style:{width:68,height:68,background:"rgba(255,255,255,0.12)",border:"2px solid rgba(255,255,255,0.35)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("svg",{width:"28",height:"28",viewBox:"0 0 40 40",fill:"white",style:{marginLeft:3},children:e.jsx("path",{d:"M12 8l20 12-20 12V8z"})})})})]},"poster")})})}function J({curatorNote:t,curatorVideos:i,curatorByline:s,activaVideoId:n,onVideoPlay:l}){const o=E(),a=(i??[]).filter(Boolean);return e.jsxs("div",{className:"section",style:{padding:o?"3rem 1.5rem 0":"5rem 5rem 0"},children:[e.jsx(r.div,{initial:{scaleX:0},whileInView:{scaleX:1},viewport:{once:!0},transition:{duration:1,ease:[.16,1,.3,1]},style:{height:1,background:"linear-gradient(90deg,rgba(255,255,255,.35),transparent)",transformOrigin:"left",marginBottom:"3.5rem"}}),e.jsxs(r.div,{initial:{opacity:0,y:40},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.8},style:{marginBottom:a.length>0?"2.4rem":0},children:[e.jsx(x,{children:"Curator's Note"}),e.jsx("div",{style:{fontFamily:g.serif,fontSize:"clamp(3rem,6vw,5rem)",lineHeight:.8,color:"rgba(255,255,255,.06)",fontWeight:900,marginBottom:"1rem",userSelect:"none"},children:'"'}),e.jsx("blockquote",{style:{fontFamily:g.serif,fontSize:"clamp(1.2rem,2vw,1.65rem)",lineHeight:1.7,fontWeight:400,fontStyle:"italic",color:"rgba(255,255,255,.85)",borderLeft:"2px solid rgba(255,255,255,.18)",paddingLeft:"2rem",margin:0,maxWidth:980},children:t}),s&&e.jsxs("p",{style:{margin:"1.2rem 0 0",fontSize:11,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,0.5)"},children:["— ",s]})]}),a.length>0&&e.jsx("div",{style:{display:"grid",gridTemplateColumns:o?"1fr":"1fr 1fr",gap:"1.4rem",alignItems:"start"},children:a.map((h,p)=>e.jsx("div",{children:e.jsx(G,{videoUrl:h,activaVideoId:n,onVideoPlay:()=>l?.(h)})},`${h}-${p}`))})]})}function Q({reviews:t}){const[i,s]=d.useState(0);d.useEffect(()=>{if(t.length<=1)return;const l=window.setInterval(()=>{s(o=>(o+1)%t.length)},5e3);return()=>window.clearInterval(l)},[t.length]);const n=t[i];return n?e.jsx(r.div,{initial:{opacity:0,y:36,scale:.97},animate:{opacity:1,y:0,scale:1},transition:{duration:.75,ease:[.22,1,.36,1]},style:{width:"min(100%, 900px)",margin:"0 auto",padding:"clamp(1rem, 2vw, 1.25rem)",borderRadius:30},children:e.jsxs("div",{style:{position:"relative",borderRadius:24,padding:"clamp(1.35rem, 3vw, 2.4rem)",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",inset:"auto -8% -35% auto",width:220,height:220,borderRadius:"50%",background:"rgba(255,255,255,0.08)",filter:"blur(34px)",pointerEvents:"none"}}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:"0.9rem 1rem",marginBottom:"1.2rem"},children:e.jsx("span",{style:{padding:"0.42rem 0.85rem",borderRadius:999,fontSize:10,letterSpacing:"0.16em",textTransform:"uppercase",color:"#ffffff",border:"1px solid rgba(255,255,255,0.18)",background:"rgba(255,255,255,0.07)"},children:"Voice of the Audience"})}),e.jsx(A,{mode:"wait",children:e.jsxs(r.div,{initial:{opacity:0,y:16},animate:{opacity:1,y:0},exit:{opacity:0,y:-16},transition:{duration:.5},children:[e.jsxs("p",{style:{fontFamily:g.serif,fontSize:"clamp(1.4rem, 2.6vw, 2.3rem)",lineHeight:1.5,color:"rgba(255,255,255,0.86)",fontStyle:"italic",margin:0},children:['"',n.review,'"']}),e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:"0.85rem 1rem",marginTop:"1.4rem"},children:[e.jsxs("span",{style:{fontSize:11,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,0.46)"},children:["— ",n.author]}),e.jsx("span",{style:{fontSize:11,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)"},children:n.title})]})]},i)}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.7rem",marginTop:"1.5rem"},children:t.map((l,o)=>e.jsx("button",{onClick:()=>s(o),"aria-label":`Show visitor review ${o+1}`,style:{width:o===i?30:10,height:10,borderRadius:999,border:"none",background:o===i?"rgba(255,255,255,0.88)":"rgba(255,255,255,0.22)",cursor:"pointer",transition:"all 0.25s ease"}},`${l.author}-${o}`))})]})}):null}function ae(){const t=F.find(c=>c.type==="Exhibition")??F[0],i=E(),s=d.useRef(null),{scrollYProgress:n}=O({target:s,offset:["start start","end start"]}),l=B(n,[0,1],["0%","18%"]);B(n,[0,.7],[1,0]);const[o,a]=d.useState(null),[h,p]=d.useState(!1);[t?.type,t?.location,t?.date].filter(Boolean);const m=t?.reviewsAndPics??[],v=h?m:m.slice(0,4);return d.useEffect(()=>{const c=b=>{b.key==="ArrowLeft"?document.querySelector(".pdf-nav-btn:first-of-type")?.click():b.key==="ArrowRight"&&document.querySelector(".pdf-nav-btn:last-of-type")?.click()};return window.addEventListener("keydown",c),()=>window.removeEventListener("keydown",c)},[]),e.jsxs("article",{className:"ev-root",children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:Y}}),e.jsx("div",{className:"diag-grid"}),e.jsxs("div",{ref:s,style:{position:"relative",height:i?"100svh":"95vh",display:"flex",alignItems:"flex-end",overflow:"hidden",borderBottom:g.border},children:[t?.bgVideo&&e.jsxs(r.div,{style:{position:"absolute",inset:"-10%",y:l},children:[e.jsx("video",{src:t.bgVideo,autoPlay:!0,muted:!0,loop:!0,playsInline:!0,style:{width:"100%",height:"100%",objectFit:"cover"}}),e.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(5,5,5,.95) 0%, rgba(5,5,5,.4) 50%, rgba(5,5,5,.25) 100%)"}})]}),e.jsx("div",{style:{position:"absolute",top:i?"30%":"80%",left:"50%",transform:"translate(-50%, -50%)",width:"min(92vw, 980px)",zIndex:2,pointerEvents:"auto"},children:e.jsx(Q,{reviews:m})}),e.jsxs(r.div,{initial:{opacity:0},animate:{opacity:1},transition:{delay:1.5,duration:1},style:{position:"absolute",bottom:i?"1.25rem":"2.5rem",right:i?"1.5rem":"5rem",display:"flex",alignItems:"center",gap:10,zIndex:1},children:[e.jsx("span",{className:"label",style:{color:g.dim3},children:"Scroll to explore"}),e.jsx("div",{style:{width:1,height:48,background:"linear-gradient(to bottom, rgba(255,255,255,.3), transparent)"}})]})]}),t?.curatorNote&&e.jsx(J,{curatorNote:t.curatorNote,curatorVideos:t.curatorVideos??(t.curatorVideo?[t.curatorVideo]:[]),curatorByline:t.curatorByline,activaVideoId:o,onVideoPlay:c=>a(`curator-${c.slice(0,10)}`)}),t?.catalog&&e.jsxs(r.div,{className:"section",initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0},transition:{duration:.8},children:[e.jsx(r.div,{initial:{scaleX:0},whileInView:{scaleX:1},viewport:{once:!0},transition:{duration:1,ease:[.16,1,.3,1]},style:{height:1,background:"linear-gradient(90deg,rgba(255,255,255,.35),transparent)",transformOrigin:"left",marginBottom:"3.5rem"}}),e.jsx(x,{children:"Catalog & Publications"}),e.jsx(r.div,{initial:{opacity:0,y:32},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.8},children:e.jsx(U,{catalog:t.catalog})})]}),(t?.performanceVideos??[]).length>0&&e.jsxs(r.div,{className:"section",initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0},transition:{duration:.8},children:[e.jsx(r.div,{initial:{scaleX:0},whileInView:{scaleX:1},viewport:{once:!0},transition:{duration:1,ease:[.16,1,.3,1]},style:{height:1,background:"linear-gradient(90deg,rgba(255,255,255,.35),transparent)",transformOrigin:"left",marginBottom:"3.5rem"}}),e.jsx(x,{children:"Performance Videos"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"2.5rem"},children:t.performanceVideos.map((c,b)=>e.jsx(q,{v:c,i:b,activaVideoId:o,onVideoPlay:()=>a(`perf-${b}-${c.videoUrl.slice(0,10)}`)},b))})]}),(t?.voiceOfAudience??[]).length>0&&e.jsxs(r.div,{className:"section",initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0},transition:{duration:.8},children:[e.jsx(r.div,{initial:{scaleX:0},whileInView:{scaleX:1},viewport:{once:!0},transition:{duration:1,ease:[.16,1,.3,1]},style:{height:1,background:"linear-gradient(90deg,rgba(255,255,255,.35),transparent)",transformOrigin:"left",marginBottom:"3.5rem"}}),e.jsx(x,{children:"Voice of Audience"}),e.jsx(_,{videos:t.voiceOfAudience,activaVideoId:o,onVideoPlay:c=>a(`audience-${c}-${t.voiceOfAudience[c].videoUrl.slice(0,10)}`)})]}),(t?.reviewsAndPics??[]).length>0&&e.jsxs(r.div,{className:"section",initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0},transition:{duration:.8},children:[e.jsx(r.div,{initial:{scaleX:0},whileInView:{scaleX:1},viewport:{once:!0},transition:{duration:1,ease:[.16,1,.3,1]},style:{height:1,background:"linear-gradient(90deg,rgba(255,255,255,.35),transparent)",transformOrigin:"left",marginBottom:"3.5rem"}}),e.jsx(x,{children:"Visitor Reviews & Testimonials"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))",gap:"1.5rem"},children:v.map((c,b)=>e.jsxs(r.div,{initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6,delay:b*.1},style:{padding:"1.75rem 0 0",background:"transparent",borderTop:"1px solid rgba(255,255,255,0.1)",display:"flex",flexDirection:"column",gap:"0.9rem"},children:[e.jsxs("p",{style:{fontFamily:g.serif,fontSize:"clamp(1.1rem, 1.8vw, 1.45rem)",lineHeight:1.75,color:"rgba(255,255,255,0.78)",margin:0,flex:1,fontStyle:"italic"},children:['"',c.review,'"']}),e.jsxs("p",{style:{fontSize:11,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,0.45)",margin:0},children:["— ",c.author]})]},b))}),m.length>4&&e.jsx(r.div,{initial:{opacity:0,y:18},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5},style:{display:"flex",justifyContent:"center",marginTop:"2rem"},children:e.jsx("button",{onClick:()=>p(c=>!c),style:{padding:"14px 28px",background:"rgba(255,255,255,0.05)",border:g.border,color:"rgba(255,255,255,0.78)",fontFamily:g.mono,fontSize:11,letterSpacing:".18em",textTransform:"uppercase",cursor:"pointer",transition:"all 0.25s ease"},children:h?"Show Less":"Show More"})})]}),e.jsxs(r.div,{initial:{opacity:0,y:40},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.8},style:{padding:"7rem 5rem",textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:g.serif,fontSize:"clamp(5rem,14vw,13rem)",fontWeight:900,color:"rgba(255,255,255,.03)",lineHeight:1,letterSpacing:"-.03em",marginBottom:"-2rem",userSelect:"none",pointerEvents:"none"},children:"Explore"}),e.jsx("div",{style:{maxWidth:720,margin:"0 auto 1.5rem"},children:e.jsx(x,{children:"Explore"})}),e.jsx("p",{style:{fontFamily:g.serif,fontSize:"clamp(1rem,1.8vw,1.35rem)",lineHeight:1.65,fontWeight:400,fontStyle:"italic",color:g.dim2,marginBottom:"3.5rem",maxWidth:460,marginLeft:"auto",marginRight:"auto"},children:"Explore other sections where this event and project are documented."}),e.jsx("div",{style:{display:"inline-flex",flexWrap:"wrap",justifyContent:"center",gap:1},children:(t?.relatedPages??[]).map(c=>e.jsx(X,{to:c.path,style:{textDecoration:"none"},children:e.jsx(r.div,{whileHover:{background:"rgba(255,255,255,.06)",borderColor:"rgba(255,255,255,.22)"},transition:{duration:.2},style:{border:g.border,padding:"16px 40px",cursor:"pointer",transition:"background .2s, border-color .2s"},children:e.jsx("span",{style:{fontSize:10,fontWeight:500,letterSpacing:".25em",textTransform:"uppercase",color:g.dim2},children:c.label})})},c.path))})]})]})}export{ae as Events};
