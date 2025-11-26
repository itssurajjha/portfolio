// pages/projects/[id].js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import ProjectCard from "../../components/ProjectCard";
import TableDisplay from "../../components/TableDisplay";
import ChartDisplay from "../../components/ChartDisplay";

const ProjectDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        const res = await fetch("/api/projects");
        const projects = await res.json();
        const matched = projects.find((p) => p.id === parseInt(id));
        setProject(matched || null);
      } catch (err) {
        console.error("Error loading project:", err);
      }
    };

    fetchProject();
  }, [id]);

  if (!project)
    return (
      <div className="container section fade-up">
        <p className="muted">Loading project...</p>
      </div>
    );

  return (
    <>
      <Head>
        <title>{`${project.title} | Suraj Jha Portfolio`}</title>
        <meta name="description" content={project.description} />
      </Head>

      <section className="section container fade-up">
        {/* Back Button */}
        <Link href="/" className="btn btn-ghost" style={{ marginBottom: 20 }}>
          ← Back to Home
        </Link>

        {/* Title */}
        <div className="section-header">
          <h2>{project.title}</h2>
        </div>

        <p className="lead" style={{ maxWidth: "800px", margin: "0 auto" }}>
          {project.description}
        </p>

        <br />

        {/* Rendering Based on Project Type */}
        {project.type === "sql_table" && (
          <TableDisplay table={project.table} />
        )}

        {(project.type === "powerbi" ||
          project.type === "python_plot" ||
          project.type === "image") && (
          <ProjectCard project={project} />
        )}

        {project.type === "interactive_chart" && (
          <ChartDisplay chart={project} />
        )}

        {/* Additional Sections Placeholder */}
        {project.details && (
          <div className="fade-up" style={{ marginTop: 30 }}>
            <h3>More Details</h3>
            <p className="muted">{project.details}</p>
          </div>
        )}

        {/* Back Button (Bottom) */}
        <div style={{ marginTop: 40 }}>
          <Link href="/" className="btn btn-primary">
            ← Back to Portfolio
          </Link>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;
