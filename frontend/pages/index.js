// pages/index.js
"use client";

import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";


/**
 * pages/index.js
 * Connected to FastAPI backend: http://127.0.0.1:8000/api/projects/
 *
 * Notes:
 * - Backend endpoint used: GET http://127.0.0.1:8000/api/projects/
 * - If you want to change backend address, replace BACKEND_BASE below with env var.
 * - All images referenced from /public should be referenced without /public prefix.
 */

/* ----------------- Backend config ----------------- */
// You can replace this with process.env.NEXT_PUBLIC_BACKEND_URL in production
const BACKEND_BASE = "http://127.0.0.1:8000";

/* ----------------- Skill logos (public/dashboards) ----------------- */
const skillLogos = {
  "Power BI": "/dashboards/Power BI Logo 2.png",
  Python: "/dashboards/Python Logo 2.png",
  SQL: "/dashboards/SQL Logo 2.png",
  "Google Script": "/dashboards/Google App Logo 2.png",
  Dash: "/dashboards/python dash Logo 2.png",
  Reporting: "/dashboards/Reporting Logo.png",
  "Data Reconciliation": "/dashboards/Data Reconsilation Logo.png",
  "Project Tracking": "/dashboards/Project Tracking logo.png",
  PowerPoint: "/dashboards/Powerpoint Logo.png",
  VBA: "/dashboards/Excel VBA Logo 2.png",
};

/* ----------------- Skill experience years ----------------- */
const skillYears = {
  "Power BI": "3 years",
  Python: "2 years",
  SQL: "3 years",
  "Google Script": "5 years",
  Dash: "2 years",
  Reporting: "5 years",
  "Data Reconciliation": "7 years",
  "Project Tracking": "4 years",
  PowerPoint: "6 years",
  VBA: "2 years",
};

/* ----------------- Experience timeline card ----------------- */
const ExperienceItem = ({ role, company, dateRange, bullets, compact }) => (
  <div
    className={`timeline-item slide-in-left ${compact ? "compact-card" : ""}`}
    aria-label={`${role} at ${company}`}
  >
    <div className="timeline-dot" aria-hidden="true" />
    <div className="timeline-card" role="article">
      <div className="timeline-header">
        <h4 style={{ margin: 0 }}>{role}</h4>
        <div className="muted" style={{ marginTop: 6 }}>
          {company} • <span>{dateRange}</span>
        </div>
      </div>
      <ul style={{ marginTop: 10 }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ marginBottom: 6 }}>
            {b}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

/* ----------------- Project card ----------------- */
const ProjectCard = ({ project }) => {
  // Accept a variety of preview path shapes: if backend returns absolute URL, use it.
  const preview = project.preview
    ? project.preview.startsWith("http")
      ? project.preview
      : project.preview.startsWith("/")
      ? project.preview
      : `/${project.preview}`
    : "/dashboards/placeholder.png";

  return (
    <article className="project-card fade-up" aria-labelledby={`project-${project.id}`}>
      <div
        className="media"
        style={{
          backgroundImage: `url(${preview})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: 160,
        }}
        role="img"
        aria-label={project.title}
      />
      <div className="content">
        <div className="kicker">{(project.type || "PROJECT").toString().toUpperCase()}</div>
        <h3 id={`project-${project.id}`}>{project.title}</h3>
        <p style={{ marginTop: 6 }}>{project.description || "—"}</p>
        <div className="project-actions" style={{ marginTop: 12 }}>
          <a
            className="btn btn-primary"
            href={project.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            View
          </a>
          <a className="btn btn-ghost" href="#contact">
            Enquire
          </a>
        </div>
      </div>
    </article>
  );
};

/* ----------------- Table display ----------------- */
const TableDisplay = ({ table }) => {
  if (!table || !table.columns || !table.data) return null;
  return (
    <div className="project-card fade-up" role="region" aria-label={table.title}>
      <div className="content">
        <div className="kicker">TABLE</div>
        <h3>{table.title}</h3>
        <div style={{ overflowX: "auto", marginTop: 8 }}>
          <table className="sql-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {table.columns.map((c, idx) => (
                  <th
                    key={idx}
                    style={{
                      padding: "10px 12px",
                      textAlign: "left",
                      borderBottom: "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.data.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, idx) => (
                    <td
                      key={idx}
                      style={{
                        padding: "10px 12px",
                        borderBottom: "1px solid rgba(0,0,0,0.04)",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="project-actions" style={{ marginTop: 12 }}>
          <a className="btn btn-primary" href="#contact">
            Request CSV
          </a>
        </div>
      </div>
    </div>
  );
};

/* ----------------- Utility: sample fallback data ----------------- */
const SAMPLE_PROJECTS = [
  {
    id: "sample-1",
    title: "Power BI Sales Dashboard (Sample)",
    type: "Power BI",
    preview: "/public/dashboards/Powerbi dashboard.png",
    description: "Sample Power BI dashboard demonstrating KPIs and trends.",
    link: "#",
  },
  {
    id: "sample-2",
    title: "Python Stock Trend (Sample)",
    type: "Python Plot",
    preview: "/public/dashboards/Stock Plot.png",
    description: "Sample Python-generated stock trend visualization.",
    link: "#",
  },
  {
    id: "sample-3",
    title: "Excel VBA Automated Report (Sample)",
    type: "Excel Sheets",
    preview: "/public/dashboards/Excel Dashboard.png",
    description: "Sample Python-generated stock trend visualization.",
    link: "#",
  },  
  {
    id: "sample-3",
    title: "Monthly Sales Data (Sample Table)",
    type: "SQL Table",
    table: {
      title: "Monthly Sales Data",
      columns: ["Month", "Revenue", "Profit"],
      data: [
        ["Jan", "₹10,000", "₹2,000"],
        ["Feb", "₹12,000", "₹2,500"],
        ["Mar", "₹9,000", "₹1,800"],
      ],
    },
  },
];

/* ----------------- Main page ----------------- */
export default function Home() {
  const rootRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectsError, setProjectsError] = useState(null);
  const [filter, setFilter] = useState("all");

  /* -------- Load projects from FastAPI backend -------- */
  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function fetchProjects() {
      try {
        setLoadingProjects(true);
        setProjectsError(null);

        // Attempt to fetch from backend. Use full URL to FastAPI, adjust if you use proxy or env var.
        const res = await fetch(`${BACKEND_BASE}/api/projects/`, {
          method: "GET",
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Backend responded with ${res.status}`);
        }

        const data = await res.json();

        // If backend returns an object with projects key, normalize it
        let normalized = [];
        if (!data) normalized = [];
        else if (Array.isArray(data)) normalized = data;
        else if (data.projects && Array.isArray(data.projects)) normalized = data.projects;
        else normalized = [];

        if (!cancelled) {
          // If backend returned empty list, use sample fallback
          if (!normalized.length) {
            setProjects(SAMPLE_PROJECTS);
          } else {
            setProjects(normalized);
          }
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Error fetching projects:", err);
          setProjectsError(err.message || "Error fetching projects");
          // fallback to sample data on error
          setProjects(SAMPLE_PROJECTS);
        }
      } finally {
        if (!cancelled) setLoadingProjects(false);
      }
    }

    fetchProjects();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  /* -------- IntersectionObserver for animations -------- */
  useEffect(() => {
    if (!rootRef.current) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in-view");
        }),
      { threshold: 0.12 }
    );
    const els = rootRef.current.querySelectorAll(".fade-up, .slide-in-left, .skill-card");
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* -------- Filtered projects -------- */
  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    // normalize types to allow mismatch of capitalization
    const t = (project.type || "").toString().toLowerCase();
    return t.includes(filter.toLowerCase());
  });

  /* -------- Profile & skills -------- */
  const profile = {
    name: "SURAJ JHA",
    title: "DATA ANALYST / BUSINESS ANALYST",
    profileText:
      "Senior Data Analyst & Operations Strategist. Accomplished Data Analyst with 7+ years translating complex datasets into actionable business intelligence. Spearheaded process automation, designed high-impact BI dashboards and optimized project operations to drive efficiency.",
    contact: {
      phone: "+91 8468959796",
      email: "surajjha8468@gmail.com",
      altEmail: "surajjha8468959796@gmail.com",
      address: "B-249, Bhagya Vihar, Mundka, Delhi - 110081",
    },
    skills: [
      "Power BI",
      "Python",
      "SQL",
      "Google Script",
      "Dash",
      "Reporting",
      "Data Reconciliation",
      "Project Tracking",
      "PowerPoint",
      "VBA",
    ],
    languages: ["English", "Hindi", "Maithili"],
    hobbies: ["Gaming", "Book Reading", "Music", "Cricket"],
    experience: [
      {
        role: "Sr. Associate",
        company: "Physics Wallah Pvt Ltd",
        dateRange: "May 2025 – Present",
        bullets: [
          "Managed key operational reporting and dashboarding.",
          "Automated processes with Google Apps Script.",
          "Project & resource coordination to maintain delivery SLAs.",
        ],
        compact: false,
      },
      {
        role: "Project Head",
        company: "Innovative Engineering Company",
        dateRange: "2023 – Jan 2025",
        bullets: [
          "Led project tracking, reporting and dashboard rollouts.",
          "Improved reporting efficiency by 40% through consolidation and automation.",
          "Coordinated cross-functional stakeholders and delivery timelines.",
        ],
        compact: false,
      },
      {
        role: "MIS Executive",
        company: "MatrixGeo Solution Pvt Ltd",
        dateRange: "2020 – 2023",
        bullets: [
          "Developed vendor dashboards to streamline daily operations.",
          "Built VBA automation reducing manual effort by 50%.",
          "Prepared daily/weekly MIS reports for leadership.",
        ],
        compact: false,
      },
      {
        role: "Client Account Manager",
        company: "JustDial Pvt Ltd",
        dateRange: "Mar 2019 – 2020",
        bullets: [
          "Handled accounts of onboarded clients and ensured retention.",
          "Met monthly sales targets and onboarded B2B portal clients.",
          "Managed daily calling targets and appointment scheduling.",
        ],
        compact: true,
      },
      {
        role: "Sr. Executive – Finance & MIS",
        company: "Krishna Panels",
        dateRange: "Nov 2016 – Feb 2019",
        bullets: [
          "Constructed and published weekly/monthly MIS reports.",
          "Developed analytics dashboards and AR/Debtors aging reports.",
          "Implemented CRM 'Pooraa' and cloud reporting for MIS.",
        ],
        compact: true,
      },
      {
        role: "Trainee (Banking Operations)",
        company: "Delhi State Co-operative Bank",
        dateRange: "2013 – 2014",
        bullets: [
          "Cash counter duties and basic account administration.",
          "Customer interactions, document routing and follow-ups.",
        ],
        compact: true,
      },
    ],
  };

  /* ----------------- RENDER ----------------- */
  return (
    <>
      <Head>
        <title>{`${profile.name} — Analytics Portfolio`}</title>
        <meta name="description" content="Suraj Jha — Data Analyst / Business Analyst portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div ref={rootRef}>
        {/* HEADER */}
        <header className="header" role="banner" style={{ position: "sticky", top: 0, zIndex: 40 }}>
          <div className="container header-inner" style={{ alignItems: "center", display: "flex", justifyContent: "space-between", gap: 16 }}>
            <div className="brand" style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div className="logo-badge" aria-hidden="true" style={{ width: 48, height: 48, borderRadius: 12, background: "#0ea5a4", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800 }}>
                SJ
              </div>
              <div>
                <div style={{ fontWeight: 800 }}>{profile.name}</div>
                <div className="muted" style={{ fontSize: 12 }}>{profile.title}</div>
              </div>
            </div>
            <nav className="nav" aria-label="Main navigation" style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <a href="#projects">Work</a>
              <a href="#skills">Skills</a>
              <a href="#experience">Experience</a>
              <a href="#contact" className="cta">Contact</a>
              <a className="btn btn-ghost" href="/SURAJ_CV.pdf" target="_blank" rel="noopener noreferrer">
                Download CV
              </a>
            </nav>
          </div>
        </header>

        {/* HERO */}
        <section
          className="hero"
          style={{
            backgroundImage: 'url("/dashboards/background theme.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            padding: "100px 0",
            position: "relative",
            overflow: "hidden",
          }}
          aria-labelledby="hero-title"
        >
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(3,6,12,0.60), rgba(3,6,12,0.72))",
            zIndex: 0,
          }} />
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <h1 id="hero-title" className="title" style={{ fontSize: "48px", fontWeight: 800, color: "#fff", marginBottom: 8 }}>
              {profile.name}
            </h1>
            <p className="subtitle" style={{ fontSize: "20px", fontWeight: 700, color: "#E3E9FF", marginBottom: 6 }}>
              {profile.title}
            </p>
            <p style={{ fontSize: 18, marginTop: 6, color: "#DCE9FF", maxWidth: 820 }}>
              “Transforming raw data into business clarity.”
            </p>
            <div className="roles" aria-hidden style={{ marginTop: 18 }}>
              {["Power BI", "Excel VBA", "Python", "Dash", "SQL"].map((t, i) => (
                <div
                  key={t}
                  className="pill"
                  style={{
                    transform: `translateY(${i % 2 === 0 ? -3 : 3}px)`,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "inline-block",
                    padding: "8px 12px",
                    marginRight: 8,
                    borderRadius: 999,
                    color: "#F1F5F9",
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT + SKILLS */}
        <section className="section" aria-labelledby="about-header" style={{ paddingTop: 28 }}>
          <div className="container section-row" style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 360px", gap: 28 }}>
            <main>
              <div className="section-header" id="about-header"><h2>About & Profile</h2></div>
              <div className="project-card fade-up" style={{ padding: 22 }}>
                <h3>Professional Profile</h3>
                <p className="lead" style={{ marginTop: 8 }}>{profile.profileText}</p>
                <div style={{ marginTop: 12 }}>
                  <strong>Core Tools:</strong>{" "}
                  <span className="muted">{profile.skills.join(" • ")}</span>
                </div>
              </div>

              {/* Skills */}
              <div style={{ marginTop: 22 }}>
                <div className="section-header"><h2 id="skills">Technical Skills</h2></div>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: 18,
                  marginTop: 8,
                  alignItems: "start",
                }}>
                  {profile.skills.map((s) => (
                    <div
                      key={s}
                      className="skill-card fade-up"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        padding: "18px 20px",
                        background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                        border: "1px solid rgba(255,255,255,0.04)",
                        borderRadius: "14px",
                        width: "100%",
                        boxShadow: "0 8px 28px rgba(2,6,23,0.45)",
                        backdropFilter: "blur(6px)",
                      }}
                      role="article"
                      aria-label={`${s} skill card`}
                    >
                      <img
                        src={skillLogos[s] || "/dashboards/placeholder.png"}
                        alt={`${s} logo`}
                        style={{
                          width: 86,
                          height: 86,
                          padding: 10,
                          borderRadius: 12,
                          objectFit: "contain",
                          background: "rgba(255,255,255,0.96)",
                          boxShadow: "0 6px 18px rgba(2,6,23,0.18)",
                          flex: "0 0 86px",
                        }}
                      />
                      <div style={{ textAlign: "left", minWidth: 0 }}>
                        <h3 style={{ margin: 0, fontWeight: 800 }}>{s}</h3>
                        <div style={{ marginTop: 6, color: "var(--muted)", fontWeight: 700 }}>
                          Experienced • {skillYears[s] || "3 years"}
                        </div>
                        <div style={{
                          height: 8,
                          background: "rgba(255,255,255,0.03)",
                          borderRadius: 6,
                          marginTop: 10,
                          overflow: "hidden"
                        }}>
                          <div style={{
                            width: (() => {
                              const years = parseInt(skillYears[s]) || 3;
                              const pct = Math.min(100, years * 12 + 12);
                              return `${pct}%`;
                            })(),
                            height: "100%",
                            background: "linear-gradient(90deg, var(--accent-purple), var(--accent-blue))"
                          }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </main>

            {/* Contact + Goodlooks */}
            <aside style={{ position: "relative" }}>
              <div className="contact-card fade-up" style={{ marginBottom: 18 }}>
                <h3>Contact</h3>
                <p><strong>Phone:</strong> <a href={`tel:${profile.contact.phone}`}>{profile.contact.phone}</a></p>
                <p><strong>Email:</strong> <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a></p>
                <p><strong>Alternate:</strong> <a href={`mailto:${profile.contact.altEmail}`}>{profile.contact.altEmail}</a></p>
                <p><strong>Address:</strong><br />{profile.contact.address}</p>
                <div style={{ marginTop: 12 }}>
                  <a className="btn btn-primary" href="/SURAJ_CV.pdf" target="_blank" rel="noopener noreferrer">Download Resume</a>
                </div>
              </div>
              <div
                aria-hidden="true"
                style={{
                  position: "relative",
                  right: -20,
                  top: 10,
                  width: 320,
                  maxWidth: "34vw",
                  height: "auto",
                  zIndex: 1,
                  display: "block",
                }}
              >
                <img
                  src="/dashboards/goodlooks.png"
                  alt=""
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    pointerEvents: "none",
                    filter: "drop-shadow(0 40px 80px rgba(0,0,0,1))",
                    borderRadius: 100,
                  }}
                />
              </div>
            </aside>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="section" aria-labelledby="exp-header" style={{ paddingTop: 22 }}>
          <div className="container">
            <div className="section-header" id="exp-header"><h2>Experience</h2></div>
            <div className="timeline" style={{ marginTop: 12 }}>
              {profile.experience.map((exp, i) => (
                <ExperienceItem key={i} {...exp} />
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section" aria-labelledby="projects-header" style={{ paddingTop: 28 }}>
          <div className="container">
            <div className="section-header" id="projects-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2>Selected Work</h2>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <label htmlFor="filter" style={{ fontWeight: 700 }}>Filter:</label>
                <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} style={{ padding: "6px 10px", borderRadius: 8 }}>
                  <option value="all">All</option>
                  <option value="power bi">Power BI</option>
                  <option value="python plot">Python Plot</option>
                  <option value="excel">Excel</option>
                  <option value="sql">SQL Table</option>
                </select>
              </div>
            </div>

            <div className="projects-container" style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
              {loadingProjects ? (
                <div style={{ gridColumn: "1/-1", padding: 28, background: "rgba(255,255,255,0.02)", borderRadius: 12 }}>
                  <strong>Loading projects...</strong>
                  <p style={{ marginTop: 8 }}>Connecting to backend at: {BACKEND_BASE}/api/projects/</p>
                </div>
              ) : projectsError ? (
                <div style={{ gridColumn: "1/-1", padding: 28, background: "rgba(255,0,0,0.03)", borderRadius: 12 }}>
                  <strong>Error loading projects:</strong>
                  <p style={{ marginTop: 8 }}>{projectsError}</p>
                </div>
              ) : filteredProjects.length === 0 ? (
                <div style={{ gridColumn: "1/-1", padding: 28, background: "rgba(255,255,255,0.02)", borderRadius: 12 }}>
                  <strong>No projects found</strong>
                  <p style={{ marginTop: 8 }}>Your backend returned an empty list. Sample projects are shown instead.</p>
                </div>
              ) : (
                filteredProjects.map((p) =>
                  (p.type && p.type.toString().toLowerCase().includes("sql")) || p.table ? (
                    <TableDisplay key={p.id || p.title} table={p.table} />
                  ) : (
                    <ProjectCard key={p.id || p.title} project={p} />
                  )
                )
              )}
            </div>
          </div>
        </section>

        {/* CONTACT FORM */}
        <section id="contact" className="section" aria-labelledby="contact-header" style={{ paddingTop: 28 }}>
          <div className="container">
            <div className="section-header" id="contact-header"><h2>Contact</h2></div>
            <div className="contact-card" style={{ padding: 22, borderRadius: 12, background: "rgba(255,255,255,0.02)" }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // For demo — this does not send to backend. You can integrate with a backend contact endpoint later.
                  alert("Message sent (demo). I'll wire this up to your backend on request.");
                }}
              >
                <div className="form-row" style={{ marginBottom: 12 }}>
                  <label htmlFor="name">Your Name</label>
                  <input id="name" name="name" type="text" placeholder="Jane Doe" required style={{ width: "100%", padding: 10, borderRadius: 8 }} />
                </div>
                <div className="form-row" style={{ marginBottom: 12 }}>
                  <label htmlFor="email">Your Email</label>
                  <input id="email" name="email" type="email" placeholder="you@example.com" required style={{ width: "100%", padding: 10, borderRadius: 8 }} />
                </div>
                <div className="form-row" style={{ marginBottom: 12 }}>
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="5" placeholder="Hi Suraj — I'd like to discuss..." required style={{ width: "100%", padding: 10, borderRadius: 8 }} />
                </div>
                <button className="btn-send" type="submit" style={{ padding: "10px 16px", borderRadius: 10, background: "#0ea5a4", color: "#fff", fontWeight: 700 }}>Send Message</button>
              </form>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="site-footer" role="contentinfo" style={{ marginTop: 36, padding: "28px 0", borderTop: "1px solid rgba(255,255,255,0.02)" }}>
          <div className="container" style={{ textAlign: "center" }}>
            © {new Date().getFullYear()} {profile.name} — MIS & Data Analytics • Built with ❤️
          </div>
        </footer>
      </div>

      {/* Inline styles for minimal animations and layout (you can move these to globals.css) */}
      <style jsx>{`
        .container { max-width: 1100px; margin: 0 auto; padding: 0 18px; }
        .project-card { background: linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.0)); border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.03); }
        .project-card .media { height: 160px; }
        .project-card .content { padding: 14px 16px; }
        .kicker { font-size: 12px; font-weight: 800; color: #64748b; letter-spacing: 0.06em; }
        .btn { display: inline-block; text-decoration: none; padding: 8px 12px; border-radius: 8px; }
        .btn-ghost { border: 1px solid rgba(255,255,255,0.04); background: transparent; color: inherit; }
        .btn-primary { background: #0ea5a4; color: white; font-weight: 700; }
        .muted { color: rgba(255,255,255,0.65); }
        .title { letter-spacing: -0.02em; }
        .fade-up { transform: translateY(12px); opacity: 0; transition: all 600ms cubic-bezier(.2,.9,.2,1); }
        .slide-in-left { transform: translateX(-10px); opacity: 0; transition: all 700ms cubic-bezier(.2,.9,.2,1); }
        .in-view.fade-up { transform: translateY(0); opacity: 1; }
        .in-view.slide-in-left { transform: translateX(0); opacity: 1; }
        .skill-card img { background: #fff; }
        .header { backdrop-filter: blur(6px); background: rgba(3,7,18,0.6); }
        @media (max-width: 880px) {
          .container.section-row { grid-template-columns: 1fr; }
          section.hero { padding: 60px 0; }
        }
      `}</style>
    </>
  );
}
