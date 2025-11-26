// components/ProjectCard.js
import React from "react";
import Link from "next/link";

const ProjectCard = ({ project }) => {
  return (
    <article className="project-card fade-up">
      <div
        className="media"
        style={{
          backgroundImage: `url(${project.preview})`
        }}
      />

      <div className="content">
        <div className="kicker">{project.type?.toUpperCase()}</div>

        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <div className="project-actions">
          <Link href={`/projects/${project.id}`} className="btn btn-primary">
            View Project
          </Link>
          <a href="#contact" className="btn btn-ghost">
            Enquire
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
