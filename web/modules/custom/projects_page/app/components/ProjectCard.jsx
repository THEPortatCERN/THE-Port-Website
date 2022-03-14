import React from "react";
import settings from "../helper-functions/settings";

const ProjectCard = ({
  image_src,
  image_alt,
  teams,
  title,
  summary,
  page_url,
}) => {
  return (
    <article className="card">
      <div className="card-image-container">
        {image_src ? (
          <img
            className="img-fluid"
            loading="lazy"
            alt={image_alt}
            src={image_src}
          />
        ) : (
          <img
            className="img-fluid"
            loading="lazy"
            alt="Empty"
            src={`${settings.baseUrl}images/empty.svg`}
          />
        )}
      </div>
      <div className="card-body">
        <p className="card-text">{teams.pop(", ")}</p>
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{summary}</p>
        <a href={page_url} className="card-link">
          View project
        </a>
      </div>
    </article>
  );
};

export default ProjectCard;
