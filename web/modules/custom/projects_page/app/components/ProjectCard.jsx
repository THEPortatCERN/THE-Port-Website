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
  sdgs
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
        <p className="card-text">{teams.pop(", ")}</p>
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{summary}</p>
        <a href={page_url} className="card-link">
          View project
        </a>
        <ul>
          {attributes.map((attribute, index) => (
            <span className="badge bg-secondary" key={index} >{attribute} hello</span>
          ))}
        </ul>
        <ul className='sdg-nums'>
          {sdgNums.map((num, index) => (
            <li key={index}>
              <img src={`https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-${num}-1024x1024.png`}/>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default ProjectCard;
