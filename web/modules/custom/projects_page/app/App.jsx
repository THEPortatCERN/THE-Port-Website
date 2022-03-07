import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => fetchProjects(), []);

  const fetchProjects = async () => {
    const done = (data) => {
      setProjects(data);
      setIsLoading(false);
    };
    const fail = (error) => console.error(error);

    try {
      const request = new Request(window.drupalSettings.projects_page.endpoint);

      const response = await fetch(request);
      if (!response.ok) throw new Error(response.statusText);

      const data = await response.json();
      done(data);
    } catch (error) {
      fail(error);
    }
  };

  if (isLoading) return <p>Loading…</p>;

  return (
    <div className="projects">
      <div className="view-content">
        {projects.map((project, index) => (
          <div className="views-row" key={index}>
            <article className="card">
              <div className="card-image-container">
                {project.image_src ? (
                  <img className="img-fluid" loading="lazy" alt={project.image_alt} src={project.image_src} />
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
                <p className="card-text">{project.teams.pop(", ")}</p>
                <h3 className="card-title">{project.title}</h3>
                <p className="card-text">{project.summary}</p>
                <a href={project.page_url} className="card-link">
                  View project
                </a>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(React.createElement(App), document.getElementById("app"));
