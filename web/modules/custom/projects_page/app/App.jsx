import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";

import { fetchProjects, doesProjectMatch } from "./helper-functions/fetchAndFilterProjects";
import ProjectCard from "./components/ProjectCard";
import TagInput from './components/TagInput';
import SDGlist from './components/SDGlist';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [projectList, setProjectList] = useState([]); 
  const [tags, setTags] = useState([])
  const [chosenSDGs, setChosenSDGs] = useState([])

  useEffect(async () => {
    const projects = await fetchProjects()
    setProjectList(projects)
    setIsLoading(false)
  }, []);
  if (isLoading) return <p>Loading…</p>;

  //------------------------ filter projects -------------------------//
  // creates new array of projects when tags are added to tag input
  const filteredList = tags.length > 0 || chosenSDGs.length > 0
    ? projectList.filter(project => doesProjectMatch(project, tags, chosenSDGs)) 
    : projectList  
  //------------------------------------------------------------------//

  return (
   <div className="projects-and-filters">
    <section className="filters-section">
      <TagInput tags={tags} setTags={setTags} />
      <SDGlist chosenSDGs={chosenSDGs} setChosenSDGs={setChosenSDGs}/>
    </section>
    <div className="projects">
      <div className="view-content">
        {
          filteredList.length > 0 ?
          filteredList.map((project, index) => (
            <div className="views-row" key={index}>
              <ProjectCard {...project}/>
            </div>
          ))
          : (<h2>Currently, no projects match your search.</h2>)
        }
      </div>
    </div>
   </div>
  );
}

ReactDOM.render(React.createElement(App), document.getElementById("app"));
