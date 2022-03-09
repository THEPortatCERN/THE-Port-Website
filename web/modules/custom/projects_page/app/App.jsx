import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./styles/App.css";

import { fetchProjects } from "./helper-functions/fetchProjects";
import ProjectCard from "./components/ProjectCard";
import TagInput from './components/TagInput';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [projectList, setProjectList] = useState([]); 
  const [tags, setTags] = useState([])

  useEffect(async () => {
    const projects = await fetchProjects()
    setProjectList(projects)
    setIsLoading(false)
  }, []);
  if (isLoading) return <p>Loading…</p>;

  return (
    <section>
      <TagInput tags={tags} setTags={setTags} />
      <div className="projects">
        <div className="view-content">
          {projectList.map((project, index) => (
            <div className="views-row" key={index}>
              <ProjectCard {...project}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ReactDOM.render(React.createElement(App), document.getElementById("app"));
