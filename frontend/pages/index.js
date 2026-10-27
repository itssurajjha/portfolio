01M5Z4PFRYCTQD0T9BNMT69XC8-index.js


// pages/index.js — Modern Portfolio v2 — Suraj | Analyst (Analytics + Taxation + EXIM)
// Drop-in replacement. Requires Next.js + React. No extra packages needed.

import Head from "next/head";
import { useEffect, useState } from "react";

const profile = {
  name: "Suraj",
  tagline: "The Analyst",
  role: "Data Analyst • GST / TDS / Income Tax Specialist • EXIM & Customs",
  location: "India • PAN-India Support",
  email: "you@example.com",
  phone: "+91-XXXXXXXXXX",
  linkedin: "#",
  summary:
    "Analyst with hands-on experience across Data Analytics, GST, TDS, ITR and Import-Export compliance. Currently with ALPDORF INDIA — a reputed pan-India importer of Kitchen Hardware products & raw materials — where I handle taxation, customs documentation, and business analytics under one roof.",
  stats: [
    { value: "3+", label: "Years Experience" },
    { value: "500+", label: "Bills of Entry Reviewed" },
    { value: "100%", label: "GSTR-1 / 3B On-time" },
    { value: "15+", label: "Dashboards & Reports" },
  ],
};

const experiences = [
  {
    company: "ALPDORF INDIA",
    subtitle: "Reputed Importer of Kitchen Hardware Products & Raw Materials • Pan-India Sales",
    role: "Sr. Executive – Analytics, Taxation & EXIM Compliance",
    period: "2024 — Present",
    current: true,
    points: [
      "Lead GST compliance for imports + domestic sales: GSTR-1, GSTR-3B, GSTR-9/9C, E-Invoice & E-Way Bill, ITC reconciliation with GSTR-2B/IMS.",
      "Handle TDS end-to-end: sections 194C, 194H, 194I, 194J, 194Q, Form 26Q/24Q filing, Form 16A, 26AS/AIS reconciliation.",
      "Support Income Tax: advance tax working, ITR-1 to ITR-6 assistance, 44AB audit schedules, TDS/TCS credit matching.",
      "Manage import documentation: Bill of Entry (ICEGATE), Commercial Invoice, Packing List, COO, Bill of Lading, CHA coordination, HSN classification & duty working (BCD + SWS + IGST).",
      "Built Power BI + SQL + Excel dashboards: import cost sheet (CIF + duty + CHA + freight), SKU-wise margin, vendor performance, GST ITC tracker.",
      "Customs law work: classification under Customs Tariff Act 1975, valuation under Section 14, drawback & RoDTEP claims, EPCG/Advance Authorisation tracking, FEMA compliance for foreign remittance (Form A1/A2).",
    ],
    tags: ["GST", "TDS", "ITR", "ICEGATE", "Power BI", "SQL", "Customs Act"],
  },
  {
    company: "Previous Experience — Accounts & Analytics",
    subtitle: "Taxation & MIS Reporting",
    role: "Executive – Accounts & Data Analytics",
    period: "2022 — 2024",
    current: false,
    points: [
      "Monthly MIS, sales & purchase analytics in Excel / SQL: pivot automation, variance analysis, ageing reports.",
      "GST returns, ITC matching, vendor follow-ups for GSTR-2B mismatches, E-way bill management.",
      "TDS deduction, challan 281 payments, return filing support and correction statements.",
      "Assisted in ITR filing season: data collation, capital gains working, rent/HRA proofs.",
    ],
    tags: ["Excel", "SQL", "GSTR-1/3B", "TDS", "MIS"],
  },
];

const specialisations = [
  {
    title: "GST Taxation",
    icon: "🧾",
    desc: "Registration, GSTR-1/3B/9/9C, ITC & GSTR-2B reconciliation, refunds (IGST/export/LUT), audits, notices.",
    items: ["GSTR-1 • 3B • 9 • 9C", "E-Invoice • E-Way", "ITC Reconciliation", "Refund & LUT"],
  },
  {
    title: "TDS / TCS",
    icon: "💰",
    desc: "Deduction, deposit (Challan 281), returns 24Q/26Q/27Q, corrections, lower deduction (197), 194Q/206C(1H).",
    items: ["194C • 194J • 194Q", "26Q • 24Q Filing", "Form 16/16A", "26AS • AIS Match"],
  },
  {
    title: "Income Tax (ITR)",
    icon: "📊",
    desc: "ITR-1 to ITR-7, advance tax, capital gains, business & profession, 44AD/44ADA, scrutiny support.",
    items: ["ITR Filing", "Advance Tax", "44AB Audit", "Notice Handling"],
  },
  {
    title: "Import – Export & Customs Law",
    icon: "🌍",
    desc: "EXIM end-to-end for kitchen hardware & raw materials: sourcing to clearance to costing.",
    items: ["Bill of Entry • ICEGATE", "BCD+SWS+IGST Working", "CHA & Freight", "RoDTEP • Drawback"],
  },
];

const eximProcess = [
  { step: "01", title: "Sourcing & Terms", desc: "PI, Incoterms (FOB / CIF / EXW), HSN pre-check, duty estimate." },
  { step: "02", title: "Shipment Docs", desc: "Invoice, Packing List, BL/AWB, COO, Insurance, IEC & AD Code." },
  { step: "03", title: "Customs Clearance", desc: "BOE on ICEGATE, assessment under Sec 17, duty payment, DPD/RMS facilitation via CHA." },
  { step: "04", title: "Costing & Sale", desc: "Landed cost sheet, GST ITC claim, PAN-India stock transfer & margin analytics." },
];

const customsLaw = [
  "Customs Act 1962 — Sec 14 (Valuation), Sec 17 (Assessment), Sec 27 (Refund), Sec 28 (Demand)",
  "Customs Tariff Act 1975 — HSN classification, BCD + SWS (10%) + AIDC + IGST",
  "IGST on imports (Sec 3(7) of Tariff Act) — ITC eligibility under Sec 16-17 CGST",
  "Foreign Trade Policy — IEC, Advance Authorisation, EPCG, RoDTEP, Drawback (Sec 74-75)",
  "FEMA + RBI — outward remittance, Form A1/A2, BRC for exports, LUT for zero-rated supply",
];

const skills = [
  { name: "SQL", level: 88, icon: "🗄️" },
  { name: "Power BI", level: 90, icon: "📈" },
  { name: "Advanced Excel", level: 95, icon: "📗" },
  { name: "GST / Tally + ClearTax", level: 92, icon: "🧾" },
  { name: "TDS / Income Tax", level: 87, icon: "💰" },
  { name: "ICEGATE / EXIM Docs", level: 85, icon: "🌍" },
];

// Demo projects — keep your old data shape. SQL/table projects auto-render as tables.
const projects = [
  {
    id: "p1",
    title: "Import Landed Cost & Margin Dashboard",
    type: "Power BI + SQL",
    description:
      "CIF + BCD + SWS + IGST + CHA + freight + insurance → SKU-wise landed cost and pan-India margin for ALPDORF INDIA kitchen hardware.",
    tags: ["Power BI", "SQL", "EXIM"],
    link: "#",
  },
  {
    id: "p2",
    title: "GST ITC Reconciliation (GSTR-2B vs Books)",
    type: "SQL",
    description: "Automated vendor-wise ITC match/mismatch tracker that cut follow-ups by 60%.",
    table: {
      headers: ["Vendor", "Books ITC", "GSTR-2B", "Difference", "Status"],
      rows: [
        ["Hardware Supplier A", "₹1,20,000", "₹1,18,500", "₹1,500", "Follow-up"],
        ["Raw Material B", "₹85,000", "₹85,000", "₹0", "Matched ✓"],
        ["Logistics C (RCM)", "₹12,400", "—", "₹12,400", "RCM Paid"],
      ],
    },
  },
  {
    id: "p3",
    title: "TDS Compliance Tracker",
    type: "Excel Automation",
    description: "Section-wise deduction, challan, due-date and 26Q filing tracker with alerts.",
    tags: ["TDS", "Excel"],
    link: "#",
  },
  {
    id: "p4",
    title: "Customs Duty Estimator",
    type: "SQL",
    description: "HSN-based BCD+SWS+IGST estimator for kitchen hardware imports.",
    table: {
      headers: ["HSN", "CIF Value", "BCD", "SWS", "IGST (18%)", "Total Duty"],
      rows: [
        ["8302 (Fittings)", "₹5,00,000", "15% = ₹75,000", "₹7,500", "₹1,04,850", "₹1,87,350"],
        ["3920 (Plastic sheets)", "₹3,00,000", "10% = ₹30,000", "₹3,000", "₹59,940", "₹92,940"],
      ],
    },
  },
];

function TableDisplay({ table }) {
  if (!table) return null;
  return (
    <div className="project-card glass">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>{table.headers?.map((h) => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {table.rows?.map((r, i) => (
              <tr key={i}>
                {r.map((c, j) => (
                  <td key={j}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="project-card glass hover-lift">
      <div className="content">
        <div className="kicker">{project.type}</div>
        <h3>{project.title}</h3>
        <p className="muted">{project.description}</p>
        <div className="tag-row">
          {(project.tags || []).map((t) => (
            <span key={t} className="pill">{t}</span>
          ))}
        </div>
        {project.link && (
          <a className="btn btn-ghost" href={project.link}>View →</a>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll(".fade-up, .slide-in-left");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>{profile.name} — The Analyst | Analytics • GST • EXIM</title>
        <meta
          name="description"
          content="Suraj — Data Analyst specialising in GST, TDS, ITR and Import-Export / Customs compliance at ALPDORF INDIA (Kitchen Hardware, Pan-India)."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="page">
        {/* BG DECOR */}
        <div className="bg-orbs" aria-hidden>
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="grid-overlay" />
        </div>

        {/* HEADER */}
        <header className="header">
          <div className="container nav">
            <a href="#top" className="brand">
              <span className="brand-mark">S</span>
              <span>{profile.name} <em>• The Analyst</em></span>
            </a>
            <nav>
              <a href="#experience">Experience</a>
              <a href="#expertise">Tax & EXIM</a>
              <a href="#projects">Work</a>
              <a href="#contact" className="btn btn-primary small">Hire Me</a>
            </nav>
          </div>
        </header>

        {/* HERO */}
        <section className="hero" id="top">
          <div className="container hero-grid">
            <div className="slide-in-left">
              <div className="badge-row">
                <span className="pill glow">● Open to opportunities</span>
                <span className="pill">ALPDORF INDIA • EXIM + Tax + Analytics</span>
              </div>
              <h1 className="title">
                Hi, I&apos;m {profile.name} —<br />
                <span className="gradient-text">Analytics meets Taxation meets Global Trade.</span>
              </h1>
              <p className="muted lead">{profile.summary}</p>
              <p className="muted">{profile.role} • {profile.location}</p>
              <div className="cta-row">
                <a href="#experience" className="btn btn-primary">View Experience ↓</a>
                <a href="#contact" className="btn btn-ghost">Contact Me</a>
                <a href={profile.linkedin} className="btn btn-ghost">LinkedIn ↗</a>
              </div>
              <div className="stats">
                {profile.stats.map((s) => (
                  <div key={s.label} className="stat glass">
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-card fade-up">
              <div className="glass profile-card">
                <div className="avatar">S</div>
                <h3>{profile.name} — {profile.tagline}</h3>
                <p className="muted small">Kitchen Hardware Imports • GST • TDS • ITR • Power BI / SQL</p>
                <div className="skill-bars">
                  {skills.slice(0, 4).map((sk) => (
                    <div key={sk.name}>
                      <div className="bar-label"><span>{sk.icon} {sk.name}</span><span>{sk.level}%</span></div>
                      <div className="bar"><div className="fill" style={{ width: `${sk.level}%` }} /></div>
                    </div>
                  ))}
                </div>
                <div className="hero-tags">
                  <span className="pill">GSTR-1/3B/9</span>
                  <span className="pill">194Q TDS</span>
                  <span className="pill">BOE / ICEGATE</span>
                  <span className="pill">HSN 8302</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="section">
          <div className="container">
            <div className="section-header fade-up">
              <span className="kicker">CAREER</span>
              <h2>Experience</h2>
              <p className="muted">Taxation + Analytics + Import-Export — all in one role at ALPDORF INDIA.</p>
            </div>
            <div className="timeline">
              {experiences.map((e) => (
                <article key={e.company + e.period} className="timeline-card glass fade-up">
                  <div className="timeline-head">
                    <div>
                      <h3>{e.role}</h3>
                      <div className="company">{e.company} {e.current && <span className="pill current">Current</span>}</div>
                      <div className="muted small">{e.subtitle}</div>
                    </div>
                    <span className="period">{e.period}</span>
                  </div>
                  <ul>
                    {e.points.map((pt, i) => <li key={i}>{pt}</li>)}
                  </ul>
                  <div className="tag-row">
                    {e.tags.map((t) => <span key={t} className="pill">{t}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERTISE */}
        <section id="expertise" className="section">
          <div className="container">
            <div className="section-header fade-up">
              <span className="kicker">SPECIALISATION</span>
              <h2>Analytics • GST • TDS • ITR • EXIM</h2>
            </div>
            <div className="card-grid">
              {specialisations.map((s) => (
                <div key={s.title} className="spec-card glass hover-lift fade-up">
                  <div className="spec-icon">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p className="muted small">{s.desc}</p>
                  <div className="tag-row">{s.items.map((it) => <span key={it} className="pill">{it}</span>)}</div>
                </div>
              ))}
            </div>

            {/* EXIM FLOW + CUSTOM LAW */}
            <div className="two-col">
              <div className="glass fade-up" style={{ padding: 20 }}>
                <h3>🔗 Import Workflow — ALPDORF INDIA</h3>
                <p className="muted small">Kitchen hardware & raw materials → cleared → sold pan-India.</p>
                <div className="steps">
                  {eximProcess.map((s) => (
                    <div key={s.step} className="step">
                      <span className="step-no">{s.step}</span>
                      <div><strong>{s.title}</strong><p className="muted small">{s.desc}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass fade-up" style={{ padding: 20 }}>
                <h3>⚖️ Customs & Tax Laws I Work With</h3>
                <ul className="law-list">
                  {customsLaw.map((l) => <li key={l}>{l}</li>)}
                </ul>
                <div className="tag-row" style={{ marginTop: 12 }}>
                  <span className="pill">IEC</span><span className="pill">LUT</span>
                  <span className="pill">EPCG</span><span className="pill">RoDTEP</span>
                  <span className="pill">Drawback</span><span className="pill">FEMA</span>
                </div>
              </div>
            </div>

            {/* SKILLS */}
            <div className="card-grid" style={{ marginTop: 22 }}>
              {skills.map((sk) => (
                <div key={sk.name} className="skill-card glass fade-up">
                  <span className="skill-emoji">{sk.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div className="bar-label"><strong>{sk.name}</strong><span>{sk.level}%</span></div>
                    <div className="bar"><div className="fill" style={{ width: `${sk.level}%` }} /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS — preserved logic: SQL/table → TableDisplay else ProjectCard */}
        <section id="projects" className="section">
          <div className="container">
            <div className="section-header fade-up">
              <span className="kicker">SELECTED WORK</span>
              <h2>Projects & Dashboards</h2>
            </div>
            <div className="card-grid">
              {projects.map((p) =>
                (p.type && p.type.toString().toLowerCase().includes("sql")) || p.table ? (
                  <TableDisplay key={p.id || p.title} table={p.table} />
                ) : (
                  <ProjectCard key={p.id || p.title} project={p} />
                )
              )}
            </div>
          </div>
        </section>

        {/* CONTACT FORM */}
        <section id="contact" className="section" aria-labelledby="contact-header" style={{ paddingTop: 28 }}>
          <div className="container">
            <div className="section-header" id="contact-header">
              <span className="kicker">GET IN TOUCH</span>
              <h2>Contact</h2>
              <p className="muted">For GST / TDS / ITR help, import costing, or analytics dashboards — drop a message.</p>
            </div>
            <div className="contact-grid">
              <div className="glass fade-up" style={{ padding: 22 }}>
                <h3>Direct</h3>
                <p className="muted">📧 {profile.email}<br />📞 {profile.phone}<br />📍 {profile.location}</p>
                <div className="tag-row">
                  <span className="pill">GST</span><span className="pill">TDS</span>
                  <span className="pill">ITR</span><span className="pill">EXIM</span>
                </div>
              </div>
              <div className="contact-card glass fade-up" style={{ padding: 22, borderRadius: 16 }}>
                {sent ? (
                  <div className="success">✅ Message sent (demo). I&apos;ll get back to you shortly!</div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      // For demo — this does not send to backend. You can integrate with a backend contact endpoint later.
                      setSent(true);
                    }}
                  >
                    <div className="form-row" style={{ marginBottom: 12 }}>
                      <label htmlFor="name">Your Name</label>
                      <input id="name" name="name" type="text" placeholder="Jane Doe" required style={{ width: "100%", padding: 12, borderRadius: 10 }} />
                    </div>
                    <div className="form-row" style={{ marginBottom: 12 }}>
                      <label htmlFor="email">Your Email</label>
                      <input id="email" name="email" type="email" placeholder="you@example.com" required style={{ width: "100%", padding: 12, borderRadius: 10 }} />
                    </div>
                    <div className="form-row" style={{ marginBottom: 12 }}>
                      <label htmlFor="message">Message</label>
                      <textarea id="message" name="message" rows="5" placeholder="Hi Suraj — I'd like to discuss..." required style={{ width: "100%", padding: 12, borderRadius: 10 }} />
                    </div>
                    <button className="btn-send btn btn-primary" type="submit" style={{ padding: "12px 18px", borderRadius: 10, fontWeight: 800, width: "100%" }}>Send Message ✈️</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="site-footer" role="contentinfo" style={{ marginTop: 36, padding: "28px 0", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="container" style={{ textAlign: "center" }}>
            © {new Date().getFullYear()} {profile.name} — The Analyst • Built with 💪 and sharpened by struggle and experience.
            <div className="muted small" style={{ marginTop: 6 }}>Analytics • GST • TDS • ITR • Customs & EXIM — ALPDORF INDIA</div>
          </div>
        </footer>
      </div>

      {/* Modern graphics + animations (move to globals.css if you prefer) */}
      <style jsx>{`
        :global(body) { margin: 0; background: #030712; color: #e5e7eb; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
        .page { position: relative; min-height: 100vh; overflow-x: clip; }
        .bg-orbs { position: fixed; inset: 0; z-index: -1; }
        .orb { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.5; animation: float 12s ease-in-out infinite; }
        .orb-1 { width: 480px; height: 480px; background: radial-gradient(circle, #0ea5a4, transparent 70%); top: -120px; left: -120px; }
        .orb-2 { width: 520px; height: 520px; background: radial-gradient(circle, #7c3aed, transparent 70%); top: 20%; right: -180px; animation-delay: -4s; }
        .orb-3 { width: 420px; height: 420px; background: radial-gradient(circle, #f59e0b, transparent 70%); bottom: -140px; left: 30%; opacity: 0.25; animation-delay: -8s; }
        .grid-overlay { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 44px 44px; mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 60%, transparent 100%); }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-24px); } }
        .container { max-width: 1100px; margin: 0 auto; padding: 0 18px; }
        .header { position: sticky; top: 0; z-index: 50; backdrop-filter: blur(12px); background: rgba(3,7,18,0.7); border-bottom: 1px solid rgba(255,255,255,0.07); }
        .nav { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; }
        .brand { display: flex; align-items: center; gap: 10px; color: #fff; text-decoration: none; font-weight: 800; }
        .brand em { color: #5eead4; font-style: normal; font-weight: 600; }
        .brand-mark { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 10px; background: linear-gradient(135deg,#0ea5a4,#7c3aed); font-weight: 900; }
        .nav nav { display: flex; gap: 18px; align-items: center; }
        .nav nav a { color: #cbd5e1; text-decoration: none; font-size: 14px; }
        .hero { padding: 72px 0 30px; }
        .hero-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 28px; align-items: start; }
        .gradient-text { background: linear-gradient(90deg, #5eead4, #a78bfa, #fbbf24); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .title { font-size: clamp(32px, 5vw, 56px); line-height: 1.05; letter-spacing: -0.03em; }
        .lead { font-size: 17px; line-height: 1.6; }
        .badge-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
        .pill { display: inline-block; font-size: 12px; padding: 5px 11px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.06); }
        .pill.glow { border-color: rgba(94,234,212,0.4); box-shadow: 0 0 18px rgba(14,165,164,0.35); }
        .pill.current { background: #0ea5a4; border-color: #0ea5a4; color: #fff; font-weight: 800; margin-left: 8px; }
        .cta-row { display: flex; gap: 10px; flex-wrap: wrap; margin: 18px 0 22px; }
        .btn { display: inline-block; text-decoration: none; padding: 10px 16px; border-radius: 10px; font-weight: 700; border: 1px solid transparent; cursor: pointer; }
        .btn.small { padding: 8px 14px; font-size: 14px; }
        .btn-ghost { border: 1px solid rgba(255,255,255,0.14); background: rgba(255,255,255,0.04); color: inherit; }
        .btn-primary { background: linear-gradient(135deg, #0ea5a4, #0d9488 40%, #7c3aed); color: white; border: none; box-shadow: 0 8px 30px rgba(14,165,164,0.35); }
        .glass { background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)); border: 1px solid rgba(255,255,255,0.09); border-radius: 16px; backdrop-filter: blur(10px); }
        .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .stat { padding: 12px; text-align: center; }
        .stat strong { display: block; font-size: 20px; }
        .stat span { font-size: 12px; color: rgba(255,255,255,0.65); }
        .profile-card { padding: 22px; text-align: center; }
        .avatar { width: 72px; height: 72px; margin: 0 auto 10px; border-radius: 22px; display: grid; place-items: center; font-size: 32px; font-weight: 900; background: linear-gradient(135deg,#0ea5a4,#7c3aed,#f59e0b); }
        .bar-label { display: flex; justify-content: space-between; font-size: 13px; margin: 10px 0 6px; }
        .bar { height: 8px; border-radius: 999px; background: rgba(255,255,255,0.08); overflow: hidden; }
        .fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, #0ea5a4, #7c3aed); }
        .hero-tags { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; margin-top: 14px; }
        .section { padding: 44px 0; }
        .section-header h2 { font-size: clamp(26px, 3.5vw, 36px); margin: 6px 0 8px; letter-spacing: -0.02em; }
        .kicker { font-size: 12px; font-weight: 800; color: #5eead4; letter-spacing: 0.12em; }
        .muted { color: rgba(255,255,255,0.68); }
        .small { font-size: 13px; }
        .timeline { display: grid; gap: 16px; }
        .timeline-card { padding: 22px; }
        .timeline-head { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
        .company { font-weight: 700; color: #5eead4; }
        .period { font-size: 13px; padding: 6px 12px; border-radius: 999px; background: rgba(255,255,255,0.07); height: fit-content; white-space: nowrap; }
        .timeline-card ul { line-height: 1.65; color: rgba(255,255,255,0.82); }
        .tag-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
        .card-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .spec-card, .project-card { padding: 20px; }
        .project-card .content { padding: 6px 4px; }
        .project-card h3 { margin: 8px 0; }
        .spec-icon { font-size: 28px; }
        .hover-lift { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 18px 50px rgba(0,0,0,0.4); }
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px; }
        .step { display: flex; gap: 12px; padding: 10px 0; border-top: 1px solid rgba(255,255,255,0.07); }
        .step-no { font-weight: 900; color: #5eead4; }
        .law-list { line-height: 1.7; color: rgba(255,255,255,0.82); font-size: 14px; padding-left: 18px; }
        .skill-card { display: flex; gap: 12px; align-items: center; padding: 14px 16px; }
        .skill-card img { background: #fff; }
        .skill-emoji { font-size: 26px; }
        .table-wrap { overflow-x: auto; padding: 14px; }
        table { width: 100%; border-collapse: collapse; font-size: 14px; }
        th, td { text-align: left; padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.08); white-space: nowrap; }
        th { color: #5eead4; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; }
        .contact-grid { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 16px; }
        .form-row label { display: block; font-size: 13px; font-weight: 700; margin-bottom: 6px; }
        .form-row input, .form-row textarea { background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.12); color: #fff; outline: none; }
        .form-row input:focus, .form-row textarea:focus { border-color: #0ea5a4; box-shadow: 0 0 0 3px rgba(14,165,164,0.2); }
        .success { padding: 30px; text-align: center; font-weight: 700; }
        .fade-up { transform: translateY(14px); opacity: 0; transition: all 650ms cubic-bezier(.2,.9,.2,1); }
        .slide-in-left { transform: translateX(-14px); opacity: 0; transition: all 750ms cubic-bezier(.2,.9,.2,1); }
        .in-view.fade-up { transform: translateY(0); opacity: 1; }
        .in-view.slide-in-left { transform: translateX(0); opacity: 1; }
        @media (max-width: 880px) {
          .hero-grid, .two-col, .card-grid, .contact-grid { grid-template-columns: 1fr; }
          .stats { grid-template-columns: repeat(2, 1fr); }
          .hero { padding: 46px 0 10px; }
          .nav nav a:not(.btn) { display: none; }
        }
      `}</style>
    </>
  );
}
Chat

New Conversation

🤓 Explain a complex thing

Explain Artificial Intelligence so that I can explain it to my six-year-old child.


🧠 Get suggestions and create new ideas

Please give me the best 10 travel ideas around the world


💭 Translate, summarize, fix grammar and more…

Translate "I love you" French



AITOPIA
Hello, how can I help you today?



i want to replace heart with experiences symbol




AITOPIA
Sure—which heart do you mean, and what should the “experiences” symbol look like? If you share the image, text, or code, I can help replace it.



❤️ this heart replace with experiences or struggle sybol




AITOPIA
You could replace ❤️ with:

🛤️ for life experiences

⚔️ for struggle

🌱 for growth through hardship


For both experiences and struggle, 🌱 works well.



The Analyst • Built with ❤️




AITOPIA
Guests can send one AI request per minute. Log in for higher limits. Please try again in 3 seconds.



The Analyst • Built with 💪 and sharpened by struggle and experience.




AITOPIA
The Analyst — Built with strength. Sharpened by struggle and experience.




AITOPIA

7
Upgrade




// pages/index.js — Modern Portfolio v2 — Suraj | Analyst (Analytics + Taxation + EXIM)
// Drop-in replacement. Requires Next.js + React. No extra packages needed.

import Head from "next/head";
import { useEffect, useState } from "react";

const profile = {
  name: "Suraj",
  tagline: "The Analyst",
  role: "Data Analyst • GST / TDS / Income Tax Specialist • EXIM & Customs",
  location: "India • PAN-India Support",
  email: "you@example.com",
  phone: "+91-XXXXXXXXXX",
  linkedin: "#",
  summary:
    "Analyst with hands-on experience across Data Analytics, GST, TDS, ITR and Import-Export compliance. Currently with ALPDORF INDIA — a reputed pan-India importer of Kitchen Hardware products & raw materials — where I handle taxation, customs documentation, and business analytics under one roof.",
  stats: [
    { value: "3+", label: "Years Experience" },
    { value: "500+", label: "Bills of Entry Reviewed" },
    { value: "100%", label: "GSTR-1 / 3B On-time" },
    { value: "15+", label: "Dashboards & Reports" },
  ],
};

const experiences = [
  {
    company: "ALPDORF INDIA",
    subtitle: "Reputed Importer of Kitchen Hardware Products & Raw Materials • Pan-India Sales",
    role: "Sr. Executive – Analytics, Taxation & EXIM Compliance",
    period: "2024 — Present",
    current: true,
    points: [
      "Lead GST compliance for imports + domestic sales: GSTR-1, GSTR-3B, GSTR-9/9C, E-Invoice & E-Way Bill, ITC reconciliation with GSTR-2B/IMS.",
      "Handle TDS end-to-end: sections 194C, 194H, 194I, 194J, 194Q, Form 26Q/24Q filing, Form 16A, 26AS/AIS reconciliation.",
      "Support Income Tax: advance tax working, ITR-1 to ITR-6 assistance, 44AB audit schedules, TDS/TCS credit matching.",
      "Manage import documentation: Bill of Entry (ICEGATE), Commercial Invoice, Packing List, COO, Bill of Lading, CHA coordination, HSN classification & duty working (BCD + SWS + IGST).",
      "Built Power BI + SQL + Excel dashboards: import cost sheet (CIF + duty + CHA + freight), SKU-wise margin, vendor performance, GST ITC tracker.",
      "Customs law work: classification under Customs Tariff Act 1975, valuation under Section 14, drawback & RoDTEP claims, EPCG/Advance Authorisation tracking, FEMA compliance for foreign remittance (Form A1/A2).",
    ],
    tags: ["GST", "TDS", "ITR", "ICEGATE", "Power BI", "SQL", "Customs Act"],
  },
  {
    company: "Previous Experience — Accounts & Analytics",
    subtitle: "Taxation & MIS Reporting",
    role: "Executive – Accounts & Data Analytics",
    period: "2022 — 2024",
    current: false,
    points: [
      "Monthly MIS, sales & purchase analytics in Excel / SQL: pivot automation, variance analysis, ageing reports.",
      "GST returns, ITC matching, vendor follow-ups for GSTR-2B mismatches, E-way bill management.",
      "TDS deduction, challan 281 payments, return filing support and correction statements.",
      "Assisted in ITR filing season: data collation, capital gains working, rent/HRA proofs.",
    ],
    tags: ["Excel", "SQL", "GSTR-1/3B", "TDS", "MIS"],
  },
];

const specialisations = [
  {
    title: "GST Taxation",
    icon: "🧾",
    desc: "Registration, GSTR-1/3B/9/9C, ITC & GSTR-2B reconciliation, refunds (IGST/export/LUT), audits, notices.",
    items: ["GSTR-1 • 3B • 9 • 9C", "E-Invoice • E-Way", "ITC Reconciliation", "Refund & LUT"],
  },
  {
    title: "TDS / TCS",
    icon: "💰",
    desc: "Deduction, deposit (Challan 281), returns 24Q/26Q/27Q, corrections, lower deduction (197), 194Q/206C(1H).",
    items: ["194C • 194J • 194Q", "26Q • 24Q Filing", "Form 16/16A", "26AS • AIS Match"],
  },
  {
    title: "Income Tax (ITR)",
    icon: "📊",
    desc: "ITR-1 to ITR-7, advance tax, capital gains, business & profession, 44AD/44ADA, scrutiny support.",
    items: ["ITR Filing", "Advance Tax", "44AB Audit", "Notice Handling"],
  },
  {
    title: "Import – Export & Customs Law",
    icon: "🌍",
    desc: "EXIM end-to-end for kitchen hardware & raw materials: sourcing to clearance to costing.",
    items: ["Bill of Entry • ICEGATE", "BCD+SWS+IGST Working", "CHA & Freight", "RoDTEP • Drawback"],
  },
];

const eximProcess = [
  { step: "01", title: "Sourcing & Terms", desc: "PI, Incoterms (FOB / CIF / EXW), HSN pre-check, duty estimate." },
  { step: "02", title: "Shipment Docs", desc: "Invoice, Packing List, BL/AWB, COO, Insurance, IEC & AD Code." },
  { step: "03", title: "Customs Clearance", desc: "BOE on ICEGATE, assessment under Sec 17, duty payment, DPD/RMS facilitation via CHA." },
  { step: "04", title: "Costing & Sale", desc: "Landed cost sheet, GST ITC claim, PAN-India stock transfer & margin analytics." },
];

const customsLaw = [
  "Customs Act 1962 — Sec 14 (Valuation), Sec 17 (Assessment), Sec 27 (Refund), Sec 28 (Demand)",
  "Customs Tariff Act 1975 — HSN classification, BCD + SWS (10%) + AIDC + IGST",
  "IGST on imports (Sec 3(7) of Tariff Act) — ITC eligibility under Sec 16-17 CGST",
  "Foreign Trade Policy — IEC, Advance Authorisation, EPCG, RoDTEP, Drawback (Sec 74-75)",
  "FEMA + RBI — outward remittance, Form A1/A2, BRC for exports, LUT for zero-rated supply",
];

const skills = [
  { name: "SQL", level: 88, icon: "🗄️" },
  { name: "Power BI", level: 90, icon: "📈" },
  { name: "Advanced Excel", level: 95, icon: "📗" },
  { name: "GST / Tally + ClearTax", level: 92, icon: "🧾" },
  { name: "TDS / Income Tax", level: 87, icon: "💰" },
  { name: "ICEGATE / EXIM Docs", level: 85, icon: "🌍" },
];

// Demo projects — keep your old data shape. SQL/table projects auto-render as tables.
const projects = [
  {
    id: "p1",
    title: "Import Landed Cost & Margin Dashboard",
    type: "Power BI + SQL",
    description:
      "CIF + BCD + SWS + IGST + CHA + freight + insurance → SKU-wise landed cost and pan-India margin for ALPDORF INDIA kitchen hardware.",
    tags: ["Power BI", "SQL", "EXIM"],
    link: "#",
  },
  {
    id: "p2",
    title: "GST ITC Reconciliation (GSTR-2B vs Books)",
    type: "SQL",
    description: "Automated vendor-wise ITC match/mismatch tracker that cut follow-ups by 60%.",
    table: {
      headers: ["Vendor", "Books ITC", "GSTR-2B", "Difference", "Status"],
      rows: [
        ["Hardware Supplier A", "₹1,20,000", "₹1,18,500", "₹1,500", "Follow-up"],
        ["Raw Material B", "₹85,000", "₹85,000", "₹0", "Matched ✓"],
        ["Logistics C (RCM)", "₹12,400", "—", "₹12,400", "RCM Paid"],
      ],
    },
  },
  {
    id: "p3",
    title: "TDS Compliance Tracker",
    type: "Excel Automation",
    description: "Section-wise deduction, challan, due-date and 26Q filing tracker with alerts.",
    tags: ["TDS", "Excel"],
    link: "#",
  },
  {
    id: "p4",
    title: "Customs Duty Estimator",
    type: "SQL",
    description: "HSN-based BCD+SWS+IGST estimator for kitchen hardware imports.",
    table: {
      headers: ["HSN", "CIF Value", "BCD", "SWS", "IGST (18%)", "Total Duty"],
      rows: [
        ["8302 (Fittings)", "₹5,00,000", "15% = ₹75,000", "₹7,500", "₹1,04,850", "₹1,87,350"],
        ["3920 (Plastic sheets)", "₹3,00,000", "10% = ₹30,000", "₹3,000", "₹59,940", "₹92,940"],
      ],
    },
  },
];

function TableDisplay({ table }) {
  if (!table) return null;
  return (
    <div className="project-card glass">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>{table.headers?.map((h) => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {table.rows?.map((r, i) => (
              <tr key={i}>
                {r.map((c, j) => (
                  <td key={j}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="project-card glass hover-lift">
      <div className="content">
        <div className="kicker">{project.type}</div>
        <h3>{project.title}</h3>
        <p className="muted">{project.description}</p>
        <div className="tag-row">
          {(project.tags || []).map((t) => (
            <span key={t} className="pill">{t}</span>
          ))}
        </div>
        {project.link && (
          <a className="btn btn-ghost" href={project.link}>View →</a>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll(".fade-up, .slide-in-left");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>{profile.name} — The Analyst | Analytics • GST • EXIM</title>
        <meta
          name="description"
          content="Suraj — Data Analyst specialising in GST, TDS, ITR and Import-Export / Customs compliance at ALPDORF INDIA (Kitchen Hardware, Pan-India)."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="page">
        {/* BG DECOR */}
        <div className="bg-orbs" aria-hidden>
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="grid-overlay" />
        </div>

        {/* HEADER */}
        <header className="header">
          <div className="container nav">
            <a href="#top" className="brand">
              <span className="brand-mark">S</span>
              <span>{profile.name} <em>• The Analyst</em></span>
            </a>
            <nav>
              <a href="#experience">Experience</a>
              <a href="#expertise">Tax & EXIM</a>
              <a href="#projects">Work</a>
              <a href="#contact" className="btn btn-primary small">Hire Me</a>
            </nav>
          </div>
        </header>

        {/* HERO */}
        <section className="hero" id="top">
          <div className="container hero-grid">
            <div className="slide-in-left">
              <div className="badge-row">
                <span className="pill glow">● Open to opportunities</span>
                <span className="pill">ALPDORF INDIA • EXIM + Tax + Analytics</span>
              </div>
              <h1 className="title">
                Hi, I&apos;m {profile.name} —<br />
                <span className="gradient-text">Analytics meets Taxation meets Global Trade.</span>
              </h1>
              <p className="muted lead">{profile.summary}</p>
              <p className="muted">{profile.role} • {profile.location}</p>
              <div className="cta-row">
                <a href="#experience" className="btn btn-primary">View Experience ↓</a>
                <a href="#contact" className="btn btn-ghost">Contact Me</a>
                <a href={profile.linkedin} className="btn btn-ghost">LinkedIn ↗</a>
              </div>
              <div className="stats">
                {profile.stats.map((s) => (
                  <div key={s.label} className="stat glass">
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-card fade-up">
              <div className="glass profile-card">
                <div className="avatar">S</div>
                <h3>{profile.name} — {profile.tagline}</h3>
                <p className="muted small">Kitchen Hardware Imports • GST • TDS • ITR • Power BI / SQL</p>
                <div className="skill-bars">
                  {skills.slice(0, 4).map((sk) => (
                    <div key={sk.name}>
                      <div className="bar-label"><span>{sk.icon} {sk.name}</span><span>{sk.level}%</span></div>
                      <div className="bar"><div className="fill" style={{ width: `${sk.level}%` }} /></div>
                    </div>
                  ))}
                </div>
                <div className="hero-tags">
                  <span className="pill">GSTR-1/3B/9</span>
                  <span className="pill">194Q TDS</span>
                  <span className="pill">BOE / ICEGATE</span>
                  <span className="pill">HSN 8302</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="section">
          <div className="container">
            <div className="section-header fade-up">
              <span className="kicker">CAREER</span>
              <h2>Experience</h2>
              <p className="muted">Taxation + Analytics + Import-Export — all in one role at ALPDORF INDIA.</p>
            </div>
            <div className="timeline">
              {experiences.map((e) => (
                <article key={e.company + e.period} className="timeline-card glass fade-up">
                  <div className="timeline-head">
                    <div>
                      <h3>{e.role}</h3>
                      <div className="company">{e.company} {e.current && <span className="pill current">Current</span>}</div>
                      <div className="muted small">{e.subtitle}</div>
                    </div>
                    <span className="period">{e.period}</span>
                  </div>
                  <ul>
                    {e.points.map((pt, i) => <li key={i}>{pt}</li>)}
                  </ul>
                  <div className="tag-row">
                    {e.tags.map((t) => <span key={t} className="pill">{t}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERTISE */}
        <section id="expertise" className="section">
          <div className="container">
            <div className="section-header fade-up">
              <span className="kicker">SPECIALISATION</span>
              <h2>Analytics • GST • TDS • ITR • EXIM</h2>
            </div>
            <div className="card-grid">
              {specialisations.map((s) => (
                <div key={s.title} className="spec-card glass hover-lift fade-up">
                  <div className="spec-icon">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p className="muted small">{s.desc}</p>
                  <div className="tag-row">{s.items.map((it) => <span key={it} className="pill">{it}</span>)}</div>
                </div>
              ))}
            </div>

            {/* EXIM FLOW + CUSTOM LAW */}
            <div className="two-col">
              <div className="glass fade-up" style={{ padding: 20 }}>
                <h3>🔗 Import Workflow — ALPDORF INDIA</h3>
                <p className="muted small">Kitchen hardware & raw materials → cleared → sold pan-India.</p>
                <div className="steps">
                  {eximProcess.map((s) => (
                    <div key={s.step} className="step">
                      <span className="step-no">{s.step}</span>
                      <div><strong>{s.title}</strong><p className="muted small">{s.desc}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass fade-up" style={{ padding: 20 }}>
                <h3>⚖️ Customs & Tax Laws I Work With</h3>
                <ul className="law-list">
                  {customsLaw.map((l) => <li key={l}>{l}</li>)}
                </ul>
                <div className="tag-row" style={{ marginTop: 12 }}>
                  <span className="pill">IEC</span><span className="pill">LUT</span>
                  <span className="pill">EPCG</span><span className="pill">RoDTEP</span>
                  <span className="pill">Drawback</span><span className="pill">FEMA</span>
                </div>
              </div>
            </div>

            {/* SKILLS */}
            <div className="card-grid" style={{ marginTop: 22 }}>
              {skills.map((sk) => (
                <div key={sk.name} className="skill-card glass fade-up">
                  <span className="skill-emoji">{sk.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div className="bar-label"><strong>{sk.name}</strong><span>{sk.level}%</span></div>
                    <div className="bar"><div className="fill" style={{ width: `${sk.level}%` }} /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS — preserved logic: SQL/table → TableDisplay else ProjectCard */}
        <section id="projects" className="section">
          <div className="container">
            <div className="section-header fade-up">
              <span className="kicker">SELECTED WORK</span>
              <h2>Projects & Dashboards</h2>
            </div>
            <div className="card-grid">
              {projects.map((p) =>
                (p.type && p.type.toString().toLowerCase().includes("sql")) || p.table ? (
                  <TableDisplay key={p.id || p.title} table={p.table} />
                ) : (
                  <ProjectCard key={p.id || p.title} project={p} />
                )
              )}
            </div>
          </div>
        </section>

        {/* CONTACT FORM */}
        <section id="contact" className="section" aria-labelledby="contact-header" style={{ paddingTop: 28 }}>
          <div className="container">
            <div className="section-header" id="contact-header">
              <span className="kicker">GET IN TOUCH</span>
              <h2>Contact</h2>
              <p className="muted">For GST / TDS / ITR help, import costing, or analytics dashboards — drop a message.</p>
            </div>
            <div className="contact-grid">
              <div className="glass fade-up" style={{ padding: 22 }}>
                <h3>Direct</h3>
                <p className="muted">📧 {profile.email}<br />📞 {profile.phone}<br />📍 {profile.location}</p>
                <div className="tag-row">
                  <span className="pill">GST</span><span className="pill">TDS</span>
                  <span className="pill">ITR</span><span className="pill">EXIM</span>
                </div>
              </div>
              <div className="contact-card glass fade-up" style={{ padding: 22, borderRadius: 16 }}>
                {sent ? (
                  <div className="success">✅ Message sent (demo). I&apos;ll get back to you shortly!</div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      // For demo — this does not send to backend. You can integrate with a backend contact endpoint later.
                      setSent(true);
                    }}
                  >
                    <div className="form-row" style={{ marginBottom: 12 }}>
                      <label htmlFor="name">Your Name</label>
                      <input id="name" name="name" type="text" placeholder="Jane Doe" required style={{ width: "100%", padding: 12, borderRadius: 10 }} />
                    </div>
                    <div className="form-row" style={{ marginBottom: 12 }}>
                      <label htmlFor="email">Your Email</label>
                      <input id="email" name="email" type="email" placeholder="you@example.com" required style={{ width: "100%", padding: 12, borderRadius: 10 }} />
                    </div>
                    <div className="form-row" style={{ marginBottom: 12 }}>
                      <label htmlFor="message">Message</label>
                      <textarea id="message" name="message" rows="5" placeholder="Hi Suraj — I'd like to discuss..." required style={{ width: "100%", padding: 12, borderRadius: 10 }} />
                    </div>
                    <button className="btn-send btn btn-primary" type="submit" style={{ padding: "12px 18px", borderRadius: 10, fontWeight: 800, width: "100%" }}>Send Message ✈️</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="site-footer" role="contentinfo" style={{ marginTop: 36, padding: "28px 0", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="container" style={{ textAlign: "center" }}>
            © {new Date().getFullYear()} {profile.name} — The Analyst • Built with 💪 and sharpened by struggle and experience.
            <div className="muted small" style={{ marginTop: 6 }}>Analytics • GST • TDS • ITR • Customs & EXIM — ALPDORF INDIA</div>
          </div>
        </footer>
      </div>

      {/* Modern graphics + animations (move to globals.css if you prefer) */}
      <style jsx>{`
        :global(body) { margin: 0; background: #030712; color: #e5e7eb; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
        .page { position: relative; min-height: 100vh; overflow-x: clip; }
        .bg-orbs { position: fixed; inset: 0; z-index: -1; }
        .orb { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.5; animation: float 12s ease-in-out infinite; }
        .orb-1 { width: 480px; height: 480px; background: radial-gradient(circle, #0ea5a4, transparent 70%); top: -120px; left: -120px; }
        .orb-2 { width: 520px; height: 520px; background: radial-gradient(circle, #7c3aed, transparent 70%); top: 20%; right: -180px; animation-delay: -4s; }
        .orb-3 { width: 420px; height: 420px; background: radial-gradient(circle, #f59e0b, transparent 70%); bottom: -140px; left: 30%; opacity: 0.25; animation-delay: -8s; }
        .grid-overlay { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 44px 44px; mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 60%, transparent 100%); }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-24px); } }
        .container { max-width: 1100px; margin: 0 auto; padding: 0 18px; }
        .header { position: sticky; top: 0; z-index: 50; backdrop-filter: blur(12px); background: rgba(3,7,18,0.7); border-bottom: 1px solid rgba(255,255,255,0.07); }
        .nav { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; }
        .brand { display: flex; align-items: center; gap: 10px; color: #fff; text-decoration: none; font-weight: 800; }
        .brand em { color: #5eead4; font-style: normal; font-weight: 600; }
        .brand-mark { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 10px; background: linear-gradient(135deg,#0ea5a4,#7c3aed); font-weight: 900; }
        .nav nav { display: flex; gap: 18px; align-items: center; }
        .nav nav a { color: #cbd5e1; text-decoration: none; font-size: 14px; }
        .hero { padding: 72px 0 30px; }
        .hero-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 28px; align-items: start; }
        .gradient-text { background: linear-gradient(90deg, #5eead4, #a78bfa, #fbbf24); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .title { font-size: clamp(32px, 5vw, 56px); line-height: 1.05; letter-spacing: -0.03em; }
        .lead { font-size: 17px; line-height: 1.6; }
        .badge-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
        .pill { display: inline-block; font-size: 12px; padding: 5px 11px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.06); }
        .pill.glow { border-color: rgba(94,234,212,0.4); box-shadow: 0 0 18px rgba(14,165,164,0.35); }
        .pill.current { background: #0ea5a4; border-color: #0ea5a4; color: #fff; font-weight: 800; margin-left: 8px; }
        .cta-row { display: flex; gap: 10px; flex-wrap: wrap; margin: 18px 0 22px; }
        .btn { display: inline-block; text-decoration: none; padding: 10px 16px; border-radius: 10px; font-weight: 700; border: 1px solid transparent; cursor: pointer; }
        .btn.small { padding: 8px 14px; font-size: 14px; }
        .btn-ghost { border: 1px solid rgba(255,255,255,0.14); background: rgba(255,255,255,0.04); color: inherit; }
        .btn-primary { background: linear-gradient(135deg, #0ea5a4, #0d9488 40%, #7c3aed); color: white; border: none; box-shadow: 0 8px 30px rgba(14,165,164,0.35); }
        .glass { background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)); border: 1px solid rgba(255,255,255,0.09); border-radius: 16px; backdrop-filter: blur(10px); }
        .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .stat { padding: 12px; text-align: center; }
        .stat strong { display: block; font-size: 20px; }
        .stat span { font-size: 12px; color: rgba(255,255,255,0.65); }
        .profile-card { padding: 22px; text-align: center; }
        .avatar { width: 72px; height: 72px; margin: 0 auto 10px; border-radius: 22px; display: grid; place-items: center; font-size: 32px; font-weight: 900; background: linear-gradient(135deg,#0ea5a4,#7c3aed,#f59e0b); }
        .bar-label { display: flex; justify-content: space-between; font-size: 13px; margin: 10px 0 6px; }
        .bar { height: 8px; border-radius: 999px; background: rgba(255,255,255,0.08); overflow: hidden; }
        .fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, #0ea5a4, #7c3aed); }
        .hero-tags { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; margin-top: 14px; }
        .section { padding: 44px 0; }
        .section-header h2 { font-size: clamp(26px, 3.5vw, 36px); margin: 6px 0 8px; letter-spacing: -0.02em; }
        .kicker { font-size: 12px; font-weight: 800; color: #5eead4; letter-spacing: 0.12em; }
        .muted { color: rgba(255,255,255,0.68); }
        .small { font-size: 13px; }
        .timeline { display: grid; gap: 16px; }
        .timeline-card { padding: 22px; }
        .timeline-head { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
        .company { font-weight: 700; color: #5eead4; }
        .period { font-size: 13px; padding: 6px 12px; border-radius: 999px; background: rgba(255,255,255,0.07); height: fit-content; white-space: nowrap; }
        .timeline-card ul { line-height: 1.65; color: rgba(255,255,255,0.82); }
        .tag-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
        .card-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .spec-card, .project-card { padding: 20px; }
        .project-card .content { padding: 6px 4px; }
        .project-card h3 { margin: 8px 0; }
        .spec-icon { font-size: 28px; }
        .hover-lift { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 18px 50px rgba(0,0,0,0.4); }
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px; }
        .step { display: flex; gap: 12px; padding: 10px 0; border-top: 1px solid rgba(255,255,255,0.07); }
        .step-no { font-weight: 900; color: #5eead4; }
        .law-list { line-height: 1.7; color: rgba(255,255,255,0.82); font-size: 14px; padding-left: 18px; }
        .skill-card { display: flex; gap: 12px; align-items: center; padding: 14px 16px; }
        .skill-card img { background: #fff; }
        .skill-emoji { font-size: 26px; }
        .table-wrap { overflow-x: auto; padding: 14px; }
        table { width: 100%; border-collapse: collapse; font-size: 14px; }
        th, td { text-align: left; padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.08); white-space: nowrap; }
        th { color: #5eead4; font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; }
        .contact-grid { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 16px; }
        .form-row label { display: block; font-size: 13px; font-weight: 700; margin-bottom: 6px; }
        .form-row input, .form-row textarea { background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.12); color: #fff; outline: none; }
        .form-row input:focus, .form-row textarea:focus { border-color: #0ea5a4; box-shadow: 0 0 0 3px rgba(14,165,164,0.2); }
        .success { padding: 30px; text-align: center; font-weight: 700; }
        .fade-up { transform: translateY(14px); opacity: 0; transition: all 650ms cubic-bezier(.2,.9,.2,1); }
        .slide-in-left { transform: translateX(-14px); opacity: 0; transition: all 750ms cubic-bezier(.2,.9,.2,1); }
        .in-view.fade-up { transform: translateY(0); opacity: 1; }
        .in-view.slide-in-left { transform: translateX(0); opacity: 1; }
        @media (max-width: 880px) {
          .hero-grid, .two-col, .card-grid, .contact-grid { grid-template-columns: 1fr; }
          .stats { grid-template-columns: repeat(2, 1fr); }
          .hero { padding: 46px 0 10px; }
          .nav nav a:not(.btn) { display: none; }
        }
      `}</style>
    </>
  );
}




Powered by AITOPIA 
Chat
Ask
Search
Write
Image
ChatFile
Vision
Store
Full Page

