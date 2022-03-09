import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./App.css";

import { fetchProjects } from "./helper-functions/fetchProjects";
import ProjectCard from "./components/ProjectCard";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => fetchProjects(setIsLoading, setProjects), []);
  if (isLoading) return <p>Loading…</p>;

  return (
    <div className="projects">
      <div className="view-content">
        {projects.map((project, index) => (
          <div className="views-row" key={index}>
            <ProjectCard {...project}/>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(React.createElement(App), document.getElementById("app"));
