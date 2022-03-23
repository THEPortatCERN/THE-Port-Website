import React from 'react';
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
  events
}) => {

  const sdgNums = sdgs.map(sdg => sdg.slice(5,7))

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
        <p className="card-text">{teams.join(', ')}</p>
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{summary}</p>
        <a href={page_url} className="card-link">
          View project
        </a>
        <ul>
          {attributes.map((attribute, index) => (
            <li className="badge" key={index} >{attribute}</li>
          ))}
        </ul>
        <ul>
          {sdgNums.map((num, index) => (
            <li key={index}>
              <img src={`https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-${num}-1024x1024.png`}/>
            </li>
          ))}
        </ul>
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              {event}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default ProjectCard;
