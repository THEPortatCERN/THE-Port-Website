import React from 'react'

const ProjectCard = ({
  image_src,
  image_alt,
  teams,
  title,
  summary,
  page_url
}) => {

  return (
    <article className="card">
      <div className="card-image-container">
        {image_src ? (
          <img className="img-fluid" loading="lazy" alt={image_alt} src={image_src} />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewbox="0 0 1600 900"
            xml:space="preserve"
          >
            <linearGradient
              id="a"
              gradientunits="userSpaceOnUse"
              x1="800"
              y1="0"
              x2="800"
              y2="900"
            >
              <stop offset="0" stop-color="#fbfaf7" />
              <stop offset="1" stop-color="#f3f2ef" />
            </linearGradient>
            <path fill="url(#a)" d="M0 0h1600v900H0z" />
          </svg>
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
  )
}

export default ProjectCard