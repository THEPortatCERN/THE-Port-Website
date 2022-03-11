import React from 'react'

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

  // const sdgNums = sdgs.map(sdg => sdg.charAt(5) === '0' ? sdg.slice(6, 7) : sdg.slice(5,7)) -- if you want just the numer instead of sdg icon.
  const sdgNums = sdgs.map(sdg => sdg.slice(5,7))

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
        <ul>
          {attributes.map(attribute => (
            <li>{attribute}</li>
          ))}
        </ul>
        <ul className='sdg-nums'>
          {sdgNums.map(num => (
            <li>
              <img src={`https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/E-Goal-${num}-1024x1024.png`}/>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default ProjectCard