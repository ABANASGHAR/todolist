import { useState, useEffect, useRef, useCallback } from "react";

// ─── Theme tokens ─────────────────────────────────────────────────────────────
const THEMES = {
  dark: {
    pageBg:          "#05060d",
    sidebarBg:       "rgba(8,9,20,0.9)",
    sidebarBorder:   "rgba(255,255,255,0.07)",
    topbarBg:        "rgba(5,6,13,0.6)",
    topbarBorder:    "rgba(255,255,255,0.06)",
    addBarBg:        "rgba(255,255,255,0.03)",
    addBarBorder:    "rgba(255,255,255,0.08)",
    rowBg:           "rgba(255,255,255,0.025)",
    rowBgHover:      "rgba(255,255,255,0.055)",
    rowBorder:       "rgba(255,255,255,0.06)",
    rowBorderHover:  "rgba(255,255,255,0.13)",
    inputBg:         "rgba(255,255,255,0.06)",
    inputBorder:     "rgba(255,255,255,0.10)",
    searchBg:        "rgba(255,255,255,0.05)",
    searchBorder:    "rgba(255,255,255,0.09)",
    textPrimary:     "rgba(255,255,255,0.9)",
    textDim:         "rgba(255,255,255,0.22)",
    textMuted:       "rgba(255,255,255,0.28)",
    textLabel:       "rgba(255,255,255,0.22)",
    textPlaceholder: "rgba(255,255,255,0.2)",
    textTime:        "rgba(255,255,255,0.25)",
    logoTitle:       "#fff",
    logoSub:         "rgba(255,255,255,0.3)",
    navDate:         "rgba(255,255,255,0.3)",
    navIconDefault:  "rgba(255,255,255,0.4)",
    navText:         "rgba(255,255,255,0.5)",
    navCount:        "rgba(255,255,255,0.2)",
    navActiveBg:     "rgba(99,102,241,0.15)",
    navActiveBorder: "rgba(99,102,241,0.4)",
    navActiveText:   "#fff",
    navHoverBg:      "rgba(255,255,255,0.04)",
    navHoverBorder:  "rgba(255,255,255,0.06)",
    divider:         "rgba(255,255,255,0.06)",
    progressTrack:   "rgba(255,255,255,0.06)",
    progressText:    "#fff",
    progressSub:     "rgba(255,255,255,0.3)",
    statLabel:       "rgba(255,255,255,0.25)",
    footer:          "rgba(255,255,255,0.2)",
    footerBorder:    "rgba(255,255,255,0.06)",
    actionBg:        "rgba(255,255,255,0.05)",
    actionBorder:    "rgba(255,255,255,0.09)",
    actionColor:     "rgba(255,255,255,0.4)",
    checkBorder:     "rgba(255,255,255,0.18)",
    catPillBorder:   "rgba(255,255,255,0.1)",
    catPillColor:    "rgba(255,255,255,0.3)",
    modalBg:         "rgba(10,12,25,0.97)",
    modalBorder:     "rgba(255,255,255,0.1)",
    modalShadow:     "0 40px 100px rgba(0,0,0,0.6)",
    modalInput:      "rgba(255,255,255,0.06)",
    modalInputBdr:   "rgba(255,255,255,0.1)",
    modalInputClr:   "#fff",
    labelXsColor:    "rgba(255,255,255,0.35)",
    iconBtnBg:       "rgba(255,255,255,0.06)",
    iconBtnBorder:   "rgba(255,255,255,0.1)",
    iconBtnColor:    "rgba(255,255,255,0.5)",
    toggleOff:       "rgba(255,255,255,0.12)",
    priBorderOff:    "rgba(255,255,255,0.1)",
    priBgOff:        "rgba(255,255,255,0.03)",
    btnSecBg:        "rgba(255,255,255,0.05)",
    btnSecBorder:    "rgba(255,255,255,0.1)",
    btnSecColor:     "rgba(255,255,255,0.5)",
    toastBg:         "rgba(10,12,22,0.96)",
    toastBorder:     "rgba(255,255,255,0.12)",
    toastColor:      "#fff",
    toastShadow:     "0 8px 40px rgba(0,0,0,0.5)",
    hamBg:           "rgba(255,255,255,0.06)",
    hamBorder:       "rgba(255,255,255,0.1)",
    hamColor:        "#fff",
    searchIcon:      "rgba(255,255,255,0.3)",
    searchClear:     "rgba(255,255,255,0.3)",
    emptyText:       "rgba(255,255,255,0.25)",
    emptyHint:       "rgba(255,255,255,0.15)",
    scrollThumb:     "rgba(255,255,255,0.1)",
    orb1:  "rgba(99,102,241,0.18)",
    orb2:  "rgba(236,72,153,0.14)",
    orb3:  "rgba(20,184,166,0.10)",
    particleDot:  "rgba(148,163,184,0.4)",
    particleLine: "rgba(148,163,184,",
    toggleBtnBg:     "rgba(255,255,255,0.07)",
    toggleBtnBorder: "rgba(255,255,255,0.13)",
    toggleBtnColor:  "#fff",
    toggleBtnHoverBg:"rgba(255,255,255,0.14)",
  },
  light: {
    pageBg:          "#eef2ff",
    sidebarBg:       "rgba(255,255,255,0.93)",
    sidebarBorder:   "rgba(99,102,241,0.14)",
    topbarBg:        "rgba(255,255,255,0.78)",
    topbarBorder:    "rgba(99,102,241,0.1)",
    addBarBg:        "rgba(255,255,255,0.88)",
    addBarBorder:    "rgba(99,102,241,0.13)",
    rowBg:           "rgba(255,255,255,0.72)",
    rowBgHover:      "rgba(255,255,255,1)",
    rowBorder:       "rgba(99,102,241,0.1)",
    rowBorderHover:  "rgba(99,102,241,0.32)",
    inputBg:         "rgba(255,255,255,0.9)",
    inputBorder:     "rgba(99,102,241,0.2)",
    searchBg:        "rgba(255,255,255,0.85)",
    searchBorder:    "rgba(99,102,241,0.15)",
    textPrimary:     "#1e1b4b",
    textDim:         "rgba(30,27,75,0.35)",
    textMuted:       "rgba(30,27,75,0.5)",
    textLabel:       "rgba(30,27,75,0.38)",
    textPlaceholder: "rgba(30,27,75,0.3)",
    textTime:        "rgba(30,27,75,0.4)",
    logoTitle:       "#1e1b4b",
    logoSub:         "rgba(30,27,75,0.45)",
    navDate:         "rgba(30,27,75,0.42)",
    navIconDefault:  "rgba(30,27,75,0.42)",
    navText:         "rgba(30,27,75,0.62)",
    navCount:        "rgba(30,27,75,0.35)",
    navActiveBg:     "rgba(99,102,241,0.1)",
    navActiveBorder: "rgba(99,102,241,0.35)",
    navActiveText:   "#4338ca",
    navHoverBg:      "rgba(99,102,241,0.06)",
    navHoverBorder:  "rgba(99,102,241,0.14)",
    divider:         "rgba(99,102,241,0.1)",
    progressTrack:   "rgba(99,102,241,0.1)",
    progressText:    "#1e1b4b",
    progressSub:     "rgba(30,27,75,0.42)",
    statLabel:       "rgba(30,27,75,0.38)",
    footer:          "rgba(30,27,75,0.32)",
    footerBorder:    "rgba(99,102,241,0.1)",
    actionBg:        "rgba(99,102,241,0.06)",
    actionBorder:    "rgba(99,102,241,0.14)",
    actionColor:     "rgba(30,27,75,0.45)",
    checkBorder:     "rgba(30,27,75,0.22)",
    catPillBorder:   "rgba(30,27,75,0.14)",
    catPillColor:    "rgba(30,27,75,0.42)",
    modalBg:         "rgba(255,255,255,0.99)",
    modalBorder:     "rgba(99,102,241,0.16)",
    modalShadow:     "0 40px 100px rgba(99,102,241,0.16)",
    modalInput:      "rgba(255,255,255,0.9)",
    modalInputBdr:   "rgba(99,102,241,0.2)",
    modalInputClr:   "#1e1b4b",
    labelXsColor:    "rgba(30,27,75,0.45)",
    iconBtnBg:       "rgba(99,102,241,0.07)",
    iconBtnBorder:   "rgba(99,102,241,0.16)",
    iconBtnColor:    "rgba(30,27,75,0.5)",
    toggleOff:       "rgba(30,27,75,0.15)",
    priBorderOff:    "rgba(30,27,75,0.13)",
    priBgOff:        "rgba(30,27,75,0.03)",
    btnSecBg:        "rgba(99,102,241,0.06)",
    btnSecBorder:    "rgba(99,102,241,0.16)",
    btnSecColor:     "rgba(30,27,75,0.52)",
    toastBg:         "rgba(255,255,255,0.97)",
    toastBorder:     "rgba(99,102,241,0.18)",
    toastColor:      "#1e1b4b",
    toastShadow:     "0 8px 40px rgba(99,102,241,0.18)",
    hamBg:           "rgba(99,102,241,0.07)",
    hamBorder:       "rgba(99,102,241,0.16)",
    hamColor:        "#1e1b4b",
    searchIcon:      "rgba(30,27,75,0.38)",
    searchClear:     "rgba(30,27,75,0.38)",
    emptyText:       "rgba(30,27,75,0.3)",
    emptyHint:       "rgba(30,27,75,0.2)",
    scrollThumb:     "rgba(99,102,241,0.2)",
    orb1:  "rgba(99,102,241,0.13)",
    orb2:  "rgba(139,92,246,0.10)",
    orb3:  "rgba(236,72,153,0.08)",
    particleDot:  "rgba(99,102,241,0.22)",
    particleLine: "rgba(99,102,241,",
    toggleBtnBg:     "rgba(99,102,241,0.09)",
    toggleBtnBorder: "rgba(99,102,241,0.22)",
    toggleBtnColor:  "#4338ca",
    toggleBtnHoverBg:"rgba(99,102,241,0.16)",
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATS = {
  work:     { label:"Work",     color:"#60a5fa", glow:"rgba(96,165,250,0.5)"  },
  personal: { label:"Personal", color:"#f472b6", glow:"rgba(244,114,182,0.5)" },
  health:   { label:"Health",   color:"#34d399", glow:"rgba(52,211,153,0.5)"  },
  learning: { label:"Learn",    color:"#fbbf24", glow:"rgba(251,191,36,0.5)"  },
};

const INITIAL = [
  { id:1, text:"Finalize the product roadmap",  cat:"work",     done:false, priority:true,  note:"Q2 launch window" },
  { id:2, text:"30-min meditation session",     cat:"health",   done:true,  priority:false, note:"" },
  { id:3, text:"Review pull requests",          cat:"work",     done:false, priority:false, note:"Auth module" },
  { id:4, text:"Read — Atomic Habits ch.7",    cat:"learning", done:false, priority:false, note:"" },
  { id:5, text:"Book flights for conference",   cat:"personal", done:false, priority:true,  note:"Before March 10" },
  { id:6, text:"Evening run — 5k",              cat:"health",   done:true,  priority:false, note:"" },
  { id:7, text:"Update portfolio website",      cat:"work",     done:false, priority:false, note:"" },
  { id:8, text:"Call dentist for appointment",  cat:"personal", done:false, priority:false, note:"" },
];

function usePersist(key, init) {
  const [v, setV] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; } catch { return init; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)); } catch {} }, [key, v]);
  return [v, setV];
}

function useWindowSize() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const h = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return size;
}

const fmt  = d => d.toLocaleDateString("en-US", { weekday:"short", month:"short", day:"numeric" });
const nowStr = () => new Date().toLocaleTimeString("en-US", { hour:"numeric", minute:"2-digit" });

// ─── Particles ────────────────────────────────────────────────────────────────
function Particles({ th }) {
  const canvasRef = useRef(null);
  const thRef = useRef(th);
  useEffect(() => { thRef.current = th; }, [th]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const N = Math.min(80, Math.floor(window.innerWidth / 20));
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,  vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = thRef.current;
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;  if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = t.particleDot; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i+1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `${t.particleLine}${0.15*(1-dist/120)})`; ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none" }}/>;
}

// ─── Orbs ─────────────────────────────────────────────────────────────────────
function Orbs({ th }) {
  const orbs = [
    { w:"50vw", mw:600, pos:{ top:"-15%", left:"-10%" },  anim:"orbFloat1 18s ease-in-out infinite alternate", c: th.orb1 },
    { w:"40vw", mw:500, pos:{ bottom:"-10%", right:"-5%" }, anim:"orbFloat2 22s ease-in-out infinite alternate", c: th.orb2 },
    { w:"30vw", mw:400, pos:{ top:"40%", left:"40%" },    anim:"orbFloat3 16s ease-in-out infinite alternate", c: th.orb3 },
  ];
  return (
    <div style={{ position:"fixed", inset:0, zIndex:0, overflow:"hidden", pointerEvents:"none" }}>
      {orbs.map((o, i) => (
        <div key={i} style={{
          position:"absolute", borderRadius:"50%", filter:"blur(80px)", pointerEvents:"none",
          width:o.w, height:o.w, maxWidth:o.mw, maxHeight:o.mw,
          ...o.pos,
          background:`radial-gradient(circle, ${o.c} 0%, transparent 70%)`,
          animation:o.anim,
        }}/>
      ))}
    </div>
  );
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────
function Check({ done, cat, onClick, th }) {
  const c = CATS[cat]?.color || "#6366f1";
  return (
    <button onClick={onClick} style={{
      width:22, height:22, borderRadius:7, flexShrink:0, cursor:"pointer",
      border:`1.5px solid ${done ? c : th.checkBorder}`,
      background: done ? c : "transparent",
      display:"flex", alignItems:"center", justifyContent:"center",
      transition:"all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
      boxShadow: done ? `0 0 14px ${CATS[cat]?.glow}` : "none",
    }}>
      {done && <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
        <path d="M1 4.5L4 7.5L10 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>}
    </button>
  );
}

// ─── Edit Modal ───────────────────────────────────────────────────────────────
function EditModal({ todo, onSave, onClose, th }) {
  const [text, setText]       = useState(todo.text);
  const [cat, setCat]         = useState(todo.cat);
  const [priority, setPriority] = useState(todo.priority);
  const [note, setNote]       = useState(todo.note || "");
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.focus();
    const h = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const inp = {
    display:"block", width:"100%", boxSizing:"border-box", outline:"none",
    background:th.modalInput, border:`1px solid ${th.modalInputBdr}`,
    borderRadius:11, padding:"11px 14px",
    color:th.modalInputClr, fontSize:14,
    fontFamily:"'DM Sans',sans-serif", transition:"border-color 0.2s",
  };

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.6)", backdropFilter:"blur(14px)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:th.modalBg, border:`1px solid ${th.modalBorder}`, borderRadius:22, width:"100%", maxWidth:460, padding:28, boxShadow:th.modalShadow, animation:"modalIn 0.25s cubic-bezier(0.23,1,0.32,1)", maxHeight:"90vh", overflowY:"auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <span style={{ fontFamily:"monospace", fontSize:10, textTransform:"uppercase", letterSpacing:"0.2em", color:th.labelXsColor }}>Edit Task</span>
          <button onClick={onClose} style={{ background:th.iconBtnBg, border:`1px solid ${th.iconBtnBorder}`, borderRadius:8, width:30, height:30, display:"flex", alignItems:"center", justifyContent:"center", color:th.iconBtnColor, fontSize:18, cursor:"pointer" }}>×</button>
        </div>

        <textarea ref={ref} value={text} onChange={e=>setText(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),onSave({...todo,text:text.trim()||todo.text,cat,priority,note}),onClose())}
          rows={2} placeholder="Task name..."
          style={{ ...inp, resize:"none", fontSize:16, fontWeight:600, lineHeight:1.5, marginBottom:16 }}
          onFocus={e=>e.target.style.borderColor="rgba(99,102,241,0.6)"} onBlur={e=>e.target.style.borderColor=th.modalInputBdr}/>

        <div style={{ fontFamily:"monospace", fontSize:10, textTransform:"uppercase", letterSpacing:"0.2em", color:th.labelXsColor, marginBottom:8 }}>Category</div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:16 }}>
          {Object.entries(CATS).map(([k,v]) => (
            <button key={k} onClick={()=>setCat(k)} style={{
              fontFamily:"monospace", fontSize:10, textTransform:"uppercase", letterSpacing:"0.1em",
              padding:"6px 16px", borderRadius:99, cursor:"pointer", transition:"all 0.2s",
              border:`1px solid ${cat===k ? v.color : th.catPillBorder}`,
              color: cat===k ? v.color : th.catPillColor,
              background: cat===k ? `${v.color}18` : "transparent",
              boxShadow: cat===k ? `0 0 10px ${v.glow}` : "none",
            }}>{v.label}</button>
          ))}
        </div>

        <div style={{ fontFamily:"monospace", fontSize:10, textTransform:"uppercase", letterSpacing:"0.2em", color:th.labelXsColor, marginBottom:8 }}>Note</div>
        <input value={note} onChange={e=>setNote(e.target.value)} placeholder="Optional note…"
          style={{ ...inp, marginBottom:16 }}
          onFocus={e=>e.target.style.borderColor="rgba(99,102,241,0.6)"} onBlur={e=>e.target.style.borderColor=th.modalInputBdr}/>

        <button onClick={()=>setPriority(p=>!p)} style={{
          display:"flex", alignItems:"center", gap:10, cursor:"pointer", width:"100%", marginBottom:22,
          border:`1px solid ${priority?"rgba(251,191,36,0.5)":th.priBorderOff}`,
          background: priority ? "rgba(251,191,36,0.08)" : th.priBgOff,
          borderRadius:11, padding:"11px 14px", transition:"all 0.2s",
        }}>
          <div style={{ width:38, height:22, borderRadius:99, position:"relative", flexShrink:0, transition:"background 0.2s", background:priority?"#fbbf24":th.toggleOff }}>
            <div style={{ position:"absolute", top:3, left:priority?18:3, width:16, height:16, borderRadius:"50%", background:"#fff", transition:"left 0.2s" }}/>
          </div>
          <span style={{ fontFamily:"monospace", fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", color:priority?"#fbbf24":th.labelXsColor }}>
            {priority ? "⭐ Priority" : "Priority Off"}
          </span>
        </button>

        <div style={{ display:"flex", gap:10 }}>
          <button onClick={onClose} style={{ flex:1, background:th.btnSecBg, border:`1px solid ${th.btnSecBorder}`, borderRadius:12, padding:12, color:th.btnSecColor, fontFamily:"'DM Sans',sans-serif", fontSize:14, cursor:"pointer" }}>Cancel</button>
          <button onClick={()=>{ onSave({...todo,text:text.trim()||todo.text,cat,priority,note}); onClose(); }} style={{ flex:2, background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:12, padding:12, color:"#fff", fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:700, boxShadow:"0 4px 20px rgba(99,102,241,0.4)", cursor:"pointer" }}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

// ─── Todo Row ─────────────────────────────────────────────────────────────────
function TodoRow({ todo, onToggle, onDelete, onEdit, idx, isMobile, th }) {
  const [hovered, setHovered] = useState(false);
  const c = CATS[todo.cat];

  return (
    <div
      onMouseEnter={()=>!isMobile&&setHovered(true)}
      onMouseLeave={()=>!isMobile&&setHovered(false)}
      style={{
        display:"flex", alignItems:"center", gap:14, padding:"13px 16px",
        borderRadius:14, border:"1px solid", width:"100%",
        transition:"all 0.2s", animation:"rowIn 0.35s both", backdropFilter:"blur(8px)",
        animationDelay:`${idx*0.045}s`,
        background:    hovered ? th.rowBgHover    : th.rowBg,
        borderColor:   hovered ? th.rowBorderHover : th.rowBorder,
        borderLeft:`3px solid ${todo.done ? th.rowBorder : todo.priority ? c.color : "transparent"}`,
        boxShadow: hovered && !todo.done ? `inset 0 0 0 1px ${c.color}20, 0 4px 24px rgba(0,0,0,0.1)` : "none",
      }}
    >
      <Check done={todo.done} cat={todo.cat} onClick={()=>onToggle(todo.id)} th={th}/>

      <div style={{ flex:1, minWidth:0 }}>
        <div style={{
          fontFamily:"'DM Sans',sans-serif", fontSize:isMobile?14:15, fontWeight:500,
          color: todo.done ? th.textDim : th.textPrimary,
          textDecoration: todo.done ? "line-through" : "none",
          whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", transition:"color 0.2s",
        }}>{todo.text}</div>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:4, flexWrap:"wrap" }}>
          <span style={{ fontFamily:"monospace", fontSize:9, textTransform:"uppercase", letterSpacing:"0.12em", padding:"2px 9px", borderRadius:99, border:"1px solid", whiteSpace:"nowrap", color:c.color, borderColor:`${c.color}35`, background:`${c.color}12` }}>{c.label}</span>
          {todo.priority && !todo.done && <span style={{ fontFamily:"monospace", fontSize:9, color:"#fbbf24", letterSpacing:"0.1em" }}>⭐ PRIORITY</span>}
          {todo.note && <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:th.textMuted, fontStyle:"italic", overflow:"hidden", textOverflow:"ellipsis", maxWidth:isMobile?100:180, whiteSpace:"nowrap" }}>{todo.note}</span>}
        </div>
      </div>

      <div style={{ display:"flex", gap:6, flexShrink:0, opacity: isMobile?1:hovered?1:0, transition:"opacity 0.2s" }}>
        <button onClick={()=>onEdit(todo)} title="Edit" style={{ width:30, height:30, borderRadius:8, border:`1px solid ${th.actionBorder}`, background:th.actionBg, display:"flex", alignItems:"center", justifyContent:"center", color:th.actionColor, cursor:"pointer", transition:"all 0.15s" }}
          onMouseEnter={e=>{ e.currentTarget.style.background="rgba(99,102,241,0.2)"; e.currentTarget.style.borderColor="rgba(99,102,241,0.4)"; e.currentTarget.style.color="#818cf8"; }}
          onMouseLeave={e=>{ e.currentTarget.style.background=th.actionBg; e.currentTarget.style.borderColor=th.actionBorder; e.currentTarget.style.color=th.actionColor; }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <button onClick={()=>onDelete(todo.id)} title="Delete" style={{ width:30, height:30, borderRadius:8, border:`1px solid ${th.actionBorder}`, background:th.actionBg, display:"flex", alignItems:"center", justifyContent:"center", color:th.actionColor, fontSize:18, lineHeight:1, cursor:"pointer", transition:"all 0.15s" }}
          onMouseEnter={e=>{ e.currentTarget.style.background="rgba(239,68,68,0.15)"; e.currentTarget.style.borderColor="rgba(239,68,68,0.3)"; e.currentTarget.style.color="#f87171"; }}
          onMouseLeave={e=>{ e.currentTarget.style.background=th.actionBg; e.currentTarget.style.borderColor=th.actionBorder; e.currentTarget.style.color=th.actionColor; }}>×</button>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [todos, setTodos]     = usePersist("focus_todos_v2", INITIAL);
  const [isDark, setIsDark]   = usePersist("focus_is_dark", true);
  const [input, setInput]     = useState("");
  const [inputCat, setInputCat] = useState("work");
  const [filter, setFilter]   = useState("all");
  const [search, setSearch]   = useState("");
  const [editing, setEditing] = useState(null);
  const [toast, setToast]     = useState(null);
  const [mounted, setMounted] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const { w } = useWindowSize();
  const isMobile = w < 768;
  const inputRef = useRef(null);
  const th = isDark ? THEMES.dark : THEMES.light;

  useEffect(() => { setMounted(true); }, []);

  const showToast = useCallback((msg, undoFn) => {
    const id = Date.now();
    setToast({ id, msg, undoFn });
    setTimeout(() => setToast(t => t?.id===id ? null : t), 4000);
  }, []);

  const filtered = todos.filter(t => {
    if (filter==="done"     && !t.done)              return false;
    if (filter==="active"   && t.done)               return false;
    if (filter==="priority" && (!t.priority||t.done)) return false;
    if (!["all","done","active","priority"].includes(filter) && t.cat!==filter) return false;
    if (search && !t.text.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const active = filtered.filter(t => !t.done);
  const done   = filtered.filter(t => t.done);

  const total     = todos.length;
  const doneCount = todos.filter(t => t.done).length;
  const leftCount = todos.filter(t => !t.done).length;
  const priCount  = todos.filter(t => t.priority && !t.done).length;
  const pct       = total ? Math.round(doneCount / total * 100) : 0;

  const add = () => {
    const text = input.trim();
    if (!text) return;
    setTodos(prev => [{ id:Date.now(), text, cat:inputCat, done:false, priority:false, note:"" }, ...prev]);
    setInput(""); showToast("Task added ✦");
  };
  const toggle = id => setTodos(prev => prev.map(t => t.id===id ? {...t,done:!t.done} : t));
  const del = id => {
    const d = todos.find(t=>t.id===id);
    setTodos(prev => prev.filter(t=>t.id!==id));
    showToast("Task deleted", ()=>setTodos(prev=>[d,...prev]));
  };
  const save = u => setTodos(prev => prev.map(t=>t.id===u.id?u:t));

  const navItems = [
    { id:"all",      icon:"◈", label:"All",      count:total     },
    { id:"active",   icon:"◉", label:"Active",   count:leftCount },
    { id:"done",     icon:"✦", label:"Done",     count:doneCount },
    { id:"priority", icon:"⭐", label:"Priority", count:priCount  },
    { id:"divider" },
    ...Object.entries(CATS).map(([k,v])=>({ id:k, icon:"●", label:v.label, count:todos.filter(t=>t.cat===k&&!t.done).length, color:v.color })),
  ];

  // ── Sidebar ──
  const sidebar = (
    <aside style={{
      width:240, height:"100%", display:"flex", flexDirection:"column", flexShrink:0, overflowY:"auto",
      background:th.sidebarBg, backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)",
      borderRight:`1px solid ${th.sidebarBorder}`,
      transition:"transform 0.3s cubic-bezier(0.23,1,0.32,1), background 0.35s, border-color 0.35s",
      transform: isMobile ? (sideOpen?"translateX(0)":"translateX(-100%)") : "translateX(0)",
      position: isMobile ? "fixed" : "relative",
      top:0, left:0, bottom:0, zIndex:50,
    }}>
      {/* Logo */}
      <div style={{ display:"flex", alignItems:"center", gap:12, padding:"24px 20px 12px" }}>
        <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)", flexShrink:0, boxShadow:"0 0 20px rgba(99,102,241,0.5)", animation:"logoOrb 3s ease-in-out infinite alternate" }}/>
        <div>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:18, color:th.logoTitle, letterSpacing:-0.5, transition:"color 0.35s" }}>Focus</div>
          <div style={{ fontFamily:"monospace", fontSize:9, color:th.logoSub, letterSpacing:"0.15em", textTransform:"uppercase", transition:"color 0.35s" }}>Task Manager</div>
        </div>
      </div>

      {/* Date */}
      <div style={{ padding:"0 20px 16px", fontFamily:"monospace", fontSize:10, color:th.navDate, letterSpacing:"0.1em", transition:"color 0.35s" }}>{fmt(new Date())}</div>

      {/* Progress ring */}
      <div style={{ padding:"16px 20px 20px", borderBottom:`1px solid ${th.divider}`, transition:"border-color 0.35s" }}>
        <svg width={100} height={100} style={{ display:"block", margin:"0 auto" }}>
          <defs>
            <linearGradient id="arc" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#6366f1"/>
              <stop offset="50%"  stopColor="#8b5cf6"/>
              <stop offset="100%" stopColor="#ec4899"/>
            </linearGradient>
          </defs>
          <circle cx={50} cy={50} r={40} fill="none" stroke={th.progressTrack} strokeWidth={7}/>
          <circle cx={50} cy={50} r={40} fill="none" stroke="url(#arc)" strokeWidth={7}
            strokeDasharray={2*Math.PI*40} strokeDashoffset={2*Math.PI*40*(1-pct/100)}
            strokeLinecap="round" style={{ transition:"stroke-dashoffset 0.8s ease", transform:"rotate(-90deg)", transformOrigin:"center" }}/>
          <text x={50} y={46} textAnchor="middle" fill={th.progressText} fontSize={20} fontWeight={800} fontFamily="DM Sans, sans-serif">{pct}%</text>
          <text x={50} y={62} textAnchor="middle" fill={th.progressSub} fontSize={9} fontFamily="monospace" letterSpacing={1}>COMPLETE</text>
        </svg>
        <div style={{ display:"flex", justifyContent:"space-around", marginTop:14 }}>
          {[{v:leftCount,l:"Left",c:"#60a5fa"},{v:doneCount,l:"Done",c:"#34d399"},{v:priCount,l:"Priority",c:"#fbbf24"}].map(s=>(
            <div key={s.l} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:18, color:s.c, lineHeight:1 }}>{s.v}</div>
              <div style={{ fontFamily:"monospace", fontSize:8, color:th.statLabel, textTransform:"uppercase", letterSpacing:"0.1em", marginTop:2, transition:"color 0.35s" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding:"0 12px", flex:1, overflowY:"auto" }}>
        {navItems.map((item,i) => item.id==="divider" ? (
          <div key={i} style={{ height:1, background:th.divider, margin:"8px 8px", transition:"background 0.35s" }}/>
        ) : (
          <button key={item.id}
            onClick={()=>{ setFilter(item.id); if(isMobile) setSideOpen(false); }}
            style={{
              display:"flex", alignItems:"center", gap:10, width:"100%", padding:"9px 12px",
              borderRadius:10, border:"1px solid", textAlign:"left", marginBottom:2, cursor:"pointer",
              fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s",
              background:  filter===item.id ? th.navActiveBg     : "transparent",
              borderColor: filter===item.id ? th.navActiveBorder  : "transparent",
            }}
            onMouseEnter={e=>{ if(filter!==item.id){ e.currentTarget.style.background=th.navHoverBg; e.currentTarget.style.borderColor=th.navHoverBorder; }}}
            onMouseLeave={e=>{ if(filter!==item.id){ e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="transparent"; }}}
          >
            <span style={{ fontSize:13, color:item.color||th.navIconDefault, flexShrink:0 }}>{item.icon}</span>
            <span style={{ fontSize:13, color:filter===item.id?th.navActiveText:th.navText, fontWeight:filter===item.id?600:400, flex:1, transition:"color 0.2s" }}>{item.label}</span>
            <span style={{ fontFamily:"monospace", fontSize:11, color:th.navCount }}>{item.count}</span>
          </button>
        ))}
      </nav>

      <div style={{ padding:"16px 20px", borderTop:`1px solid ${th.footerBorder}`, fontFamily:"monospace", fontSize:9, color:th.footer, letterSpacing:"0.1em", textTransform:"uppercase", transition:"all 0.35s" }}>
        Focus App · {new Date().getFullYear()}
      </div>
    </aside>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html, body { width:100vw; height:100vh; max-width:100%; overflow:hidden; }
        input, textarea { outline:none; font-family:'DM Sans',sans-serif; }
        button { cursor:pointer; border:none; font-family:'DM Sans',sans-serif; -webkit-tap-highlight-color:transparent; }
        ::-webkit-scrollbar { width:4px; height:4px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:${th.scrollThumb}; border-radius:99px; }
        ::placeholder { color:${th.textPlaceholder}; }
        @keyframes orbFloat1 { from{transform:translate(0,0) scale(1)} to{transform:translate(4%,6%) scale(1.1)} }
        @keyframes orbFloat2 { from{transform:translate(0,0) scale(1)} to{transform:translate(-5%,-4%) scale(1.08)} }
        @keyframes orbFloat3 { from{transform:translate(0,0) scale(1)} to{transform:translate(6%,-6%) scale(0.92)} }
        @keyframes logoOrb   { from{box-shadow:0 0 20px rgba(99,102,241,0.5)} to{box-shadow:0 0 30px rgba(236,72,153,0.6)} }
        @keyframes rowIn     { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }
        @keyframes modalIn   { from{opacity:0;transform:scale(0.93) translateY(12px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes toastIn   { from{opacity:0;transform:translateX(-50%) translateY(12px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
        .app-shell           { position:fixed; top:0; left:0; right:0; bottom:0; width:100vw; height:100vh; display:flex; z-index:1; opacity:0; transition:opacity 0.5s; overflow:hidden; }
        .app-shell.ready     { opacity:1; }
        .todo-grid           { display:grid; grid-template-columns:1fr; gap:8px; }
        @media (min-width:1100px) { .todo-grid { grid-template-columns:1fr 1fr; gap:10px; } }
      `}</style>

      {/* Fixed bg */}
      <div style={{ position:"fixed", inset:0, background:th.pageBg, zIndex:0, transition:"background 0.35s" }}/>
      <Orbs th={th}/>
      <Particles th={th}/>

      {/* Toast */}
      {toast && (
        <div style={{ position:"fixed", bottom:28, left:"50%", transform:"translateX(-50%)", zIndex:300, background:th.toastBg, backdropFilter:"blur(20px)", border:`1px solid ${th.toastBorder}`, borderRadius:14, padding:"12px 20px", display:"flex", alignItems:"center", gap:14, color:th.toastColor, fontSize:13, fontWeight:500, fontFamily:"'DM Sans',sans-serif", boxShadow:th.toastShadow, animation:"toastIn 0.3s cubic-bezier(0.23,1,0.32,1)", whiteSpace:"nowrap" }}>
          {toast.msg}
          {toast.undoFn && <button onClick={()=>{ toast.undoFn(); setToast(null); }} style={{ background:"rgba(99,102,241,0.2)", border:"1px solid rgba(99,102,241,0.45)", borderRadius:8, padding:"3px 12px", color:"#818cf8", fontFamily:"monospace", fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer" }}>Undo</button>}
        </div>
      )}

      {editing && <EditModal todo={editing} onSave={save} onClose={()=>setEditing(null)} th={th}/>}

      {/* Mobile overlay */}
      {isMobile && sideOpen && <div onClick={()=>setSideOpen(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:40 }}/>}

      <div className={`app-shell ${mounted?"ready":""}`}>
        {sidebar}

        {/* ── Main panel ── */}
        <div style={{ flex:1, minWidth:0, width:"100%", display:"flex", flexDirection:"column", overflow:"hidden" }}>

          {/* Topbar */}
          <div style={{ display:"flex", alignItems:"center", gap:12, padding:isMobile?"12px 16px":"14px 28px", background:th.topbarBg, backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", borderBottom:`1px solid ${th.topbarBorder}`, flexShrink:0, width:"100%", transition:"background 0.35s, border-color 0.35s" }}>

            {/* Hamburger */}
            <button onClick={()=>setSideOpen(o=>!o)} style={{ display:isMobile?"flex":"none", background:th.hamBg, border:`1px solid ${th.hamBorder}`, borderRadius:8, width:36, height:36, alignItems:"center", justifyContent:"center", color:th.hamColor, fontSize:16, flexShrink:0 }}>☰</button>

            {/* Search */}
            <div style={{ flex:1, position:"relative" }}>
              <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:th.searchIcon, fontSize:15, pointerEvents:"none" }}>⌕</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search tasks…" style={{ width:"100%", background:th.searchBg, border:`1px solid ${th.searchBorder}`, borderRadius:12, padding:"10px 14px 10px 38px", color:th.textPrimary, fontSize:14, transition:"border-color 0.2s, background 0.35s" }}
                onFocus={e=>e.target.style.borderColor="rgba(99,102,241,0.5)"} onBlur={e=>e.target.style.borderColor=th.searchBorder}/>
              {search && <button onClick={()=>setSearch("")} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", color:th.searchClear, fontSize:18, lineHeight:1 }}>×</button>}
            </div>

            {/* Clock */}
            {!isMobile && <div style={{ fontFamily:"monospace", fontSize:11, color:th.textTime, whiteSpace:"nowrap", transition:"color 0.35s" }}>{nowStr()}</div>}

            {/* ── THEME TOGGLE BUTTON ── */}
            <button
              onClick={()=>setIsDark(d=>!d)}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              style={{
                display:"flex", alignItems:"center", gap:7, flexShrink:0,
                background:th.toggleBtnBg, border:`1px solid ${th.toggleBtnBorder}`,
                borderRadius:10, padding:isMobile?"8px":"7px 14px",
                color:th.toggleBtnColor, fontFamily:"'DM Sans',sans-serif",
                fontSize:13, fontWeight:600, cursor:"pointer", transition:"all 0.25s",
              }}
              onMouseEnter={e=>{ e.currentTarget.style.background=th.toggleBtnHoverBg; }}
              onMouseLeave={e=>{ e.currentTarget.style.background=th.toggleBtnBg; }}
            >
              <span style={{ fontSize:17, lineHeight:1 }}>{isDark ? "☀️" : "🌙"}</span>
              {!isMobile && <span>{isDark ? "Light" : "Dark"}</span>}
            </button>
          </div>

          {/* Content */}
          <div style={{ flex:1, overflowY:"auto", padding:isMobile?"16px":"28px 32px", width:"100%", transition:"background 0.35s" }}>

            {/* Add bar */}
            <div style={{ background:th.addBarBg, border:`1px solid ${th.addBarBorder}`, borderRadius:18, padding:"18px 20px", marginBottom:24, backdropFilter:"blur(12px)", width:"100%", transition:"background 0.35s, border-color 0.35s" }}>
              <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder="What needs to get done today?" style={{ width:"100%", background:th.inputBg, border:`1px solid ${th.inputBorder}`, borderRadius:12, padding:"13px 16px", color:th.textPrimary, fontSize:15, fontWeight:500, marginBottom:14, transition:"border-color 0.25s, box-shadow 0.25s, background 0.35s" }}
                onFocus={e=>{e.target.style.borderColor="rgba(99,102,241,0.6)";e.target.style.boxShadow="0 0 0 3px rgba(99,102,241,0.1)";}}
                onBlur={e=>{e.target.style.borderColor=th.inputBorder;e.target.style.boxShadow="none";}}/>
              <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                {Object.entries(CATS).map(([k,v]) => (
                  <button key={k} onClick={()=>setInputCat(k)} style={{ fontFamily:"monospace", fontSize:10, textTransform:"uppercase", letterSpacing:"0.12em", padding:"5px 14px", borderRadius:99, cursor:"pointer", transition:"all 0.2s", border:`1px solid ${inputCat===k?v.color:th.catPillBorder}`, color:inputCat===k?v.color:th.catPillColor, background:inputCat===k?`${v.color}14`:"transparent", boxShadow:inputCat===k?`0 0 10px ${v.glow}`:"none" }}>{v.label}</button>
                ))}
                <button onClick={add} style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:12, width:46, height:46, color:"#fff", fontSize:22, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginLeft:"auto", boxShadow:"0 4px 20px rgba(99,102,241,0.45)", transition:"transform 0.15s, box-shadow 0.15s", cursor:"pointer" }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.08)";e.currentTarget.style.boxShadow="0 6px 28px rgba(99,102,241,0.65)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 4px 20px rgba(99,102,241,0.45)";}}>+</button>
              </div>
            </div>

            {/* Active tasks */}
            {active.length > 0 && (
              <>
                <div style={{ fontFamily:"monospace", fontSize:9, textTransform:"uppercase", letterSpacing:"0.25em", color:th.textLabel, margin:"6px 0 10px", transition:"color 0.35s" }}>Active — {active.length}</div>
                <div className="todo-grid">
                  {active.map((t,i) => <TodoRow key={t.id} todo={t} onToggle={toggle} onDelete={del} onEdit={setEditing} idx={i} isMobile={isMobile} th={th}/>)}
                </div>
              </>
            )}

            {/* Done tasks */}
            {done.length > 0 && (
              <>
                <div style={{ fontFamily:"monospace", fontSize:9, textTransform:"uppercase", letterSpacing:"0.25em", color:th.textLabel, margin:"24px 0 10px", transition:"color 0.35s" }}>Completed — {done.length}</div>
                <div className="todo-grid">
                  {done.map((t,i) => <TodoRow key={t.id} todo={t} onToggle={toggle} onDelete={del} onEdit={setEditing} idx={i} isMobile={isMobile} th={th}/>)}
                </div>
              </>
            )}

            {/* Empty state */}
            {filtered.length === 0 && (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"80px 20px", gap:12 }}>
                <div style={{ fontSize:48, color:th.emptyText }}>✦</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:18, fontWeight:600, color:th.emptyText, transition:"color 0.35s" }}>{search?`No results for "${search}"`:"All clear!"}</div>
                <div style={{ fontFamily:"monospace", fontSize:11, color:th.emptyHint, letterSpacing:"0.1em", transition:"color 0.35s" }}>{search?"Try different keywords":"Add a task above to get started"}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
