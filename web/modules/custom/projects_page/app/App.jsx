import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";

import { fetchProjects, doesProjectMatch } from "./helper-functions/fetchAndFilterProjects";
import ProjectCard from "./components/ProjectCard";
import TeamSearch from "./components/TeamSearch";
import TitleSearch from "./components/TitleSearch";
import EventSearch from "./components/EventSearch";
import TagInput from './components/TagInput';
import SDGlist from './components/SDGlist';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [projectList, setProjectList] = useState([]); 
  const [tags, setTags] = useState([])
  const [chosenSDG, setChosenSDG] = useState('')
  const [teamSearch, setTeamSearch] = useState('')
  const [titleSearch, setTitleSearch] = useState('')
  const [eventSearch, setEventSearch] = useState('')

  useEffect(async () => {
    const projects = await fetchProjects()
    setProjectList(projects)
    setIsLoading(false)
  }, []);
  if (isLoading) return <p>Loading…</p>;

  //------------------------ filter projects -------------------------//
  // creates new array of projects when tags are added to tag input
  const filteredList = (tags.length > 0) || (chosenSDG.length > 0) || (teamSearch.length > 0) || (titleSearch.length > 0) || (eventSearch.length > 0)
    ? projectList.filter(project => doesProjectMatch(project, tags, chosenSDG, teamSearch, titleSearch, eventSearch)) 
    : projectList  
  //------------------------------------------------------------------//

  return (
   <div className="projects-and-filters">
     <div className="limit-search">
      <TeamSearch setTeamSearch={setTeamSearch} />
      <TitleSearch setTitleSearch={setTitleSearch}/>
      <EventSearch setEventSearch={setEventSearch}/>
      <button type="button" className="btn filter-button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Filters</button>
     </div>
    {/* --------------------------------------------------- filter section ------------------------------------------------------- */}
    <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div className="offcanvas-header">
        <h5 id="offcanvasRightLabel">Choose Filters</h5>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body filters-section">
        <TagInput tags={tags} setTags={setTags} className='single-filter-system'/>
        <SDGlist chosenSDG={chosenSDG} setChosenSDG={setChosenSDG} className='single-filter-system'/>
      </div>
    </div>
    {/* --------------------------------------------------- project list ----------------------------------------------------------- */}
    <div className="projects">
      <div className="view-content">
        {
          filteredList.length > 0 ?
          filteredList.map((project, index) => (
            <ProjectCard {...project} key={index}/>
          ))
          : (<h2>Currently, no projects match your search.</h2>)
        }
      </div>
    </div>
   </div>
  );
}

ReactDOM.render(React.createElement(App), document.getElementById("app"));
