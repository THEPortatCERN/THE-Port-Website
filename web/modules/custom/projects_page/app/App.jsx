import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./styles/App.css";

import { fetchProjects } from "./helper-functions/fetchProjects";
import ProjectCard from "./components/ProjectCard";
import TagInput from './components/TagInput';
import SDGlist from './components/SDGlist';

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

  //-------------------------functionality for filtering projects by attributes using tag input component --------------------------//
  //checks if one project matches one tag
  const matchesTag = (project, tag) => project.attributes.includes(tag.name)
  //checks if one project matches multiple tags
  const matchesTags = (project, tags) => tags.reduce((previousTag, currentTag) => previousTag && matchesTag(project, currentTag), true)
  
  //middle-man -- it can later be used to also filter projects by SDGs or other perameters
  const doesProjectMatch = (project, tags) => {
    const projectMatchesTags = matchesTags(project, tags)
    return projectMatchesTags
  }
  // creates new array of projects when tags are added to tag input
  const filteredList = tags.length > 0 
    ? projectList.filter(project => doesProjectMatch(project, tags)) 
    : projectList  
  //---------------------------------------------------------------------------------------------------------------------------------//

  return (
   <div className="projects-and-filters">
    <SDGlist />
    <section className="projects-and-taginput">
      <TagInput tags={tags} setTags={setTags} />
      <div className="projects">
        <div className="view-content">
          {filteredList.map((project, index) => (
            <div className="views-row" key={index}>
              <ProjectCard {...project}/>
            </div>
          ))}
        </div>
      </div>
    </section>
   </div>
  );
}

ReactDOM.render(React.createElement(App), document.getElementById("app"));
