import React from "react";
import settings from "../helper-functions/settings";

const ProjectCard = ({
  image_src,
  image_alt,
  teams,
  title,
  summary,
  page_url,
  attributes,
  sdgs,
  events,
}) => (
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
          src={`${settings.routes.assets}images/empty.svg`}
        />
      )}
    </div>
    <div className="card-body">
      <p className="card-text">
        {teams.map((team) => (
          <span key={team.id}>{team.name}</span>
        ))}
      </p>
      <h3 className="card-title">{title}</h3>
      <p className="card-text">{summary}</p>
      <a href={page_url} className="card-link">
        View project
      </a>
      <ul>
        {attributes.map((attribute) => (
          <li className="badge" key={attribute.id}>
            {attribute.name}
          </li>
        ))}
        {sdgs.map((sdg) => (
          <li className="badge" key={sdg.id}>{sdg.name}</li>
        ))}
        {events.map((event) => (
          <li className="badge" key={event.id}>{event.name}</li>
        ))}
      </ul>
    </div>
  </article>
);

export default ProjectCard;
