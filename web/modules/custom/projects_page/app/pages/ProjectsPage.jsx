import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import "../styles/main.scss";

import { fetchProjects, doesProjectMatch } from "../helper-functions/fetchAndFilterProjects";
import ProjectCard from "../components/ProjectCard";
import TeamSearch from "../components/TeamSearch";
import TitleSearch from "../components/TitleSearch";
import EventSearch from "../components/EventSearch";
import TagInput from "../components/TagInput";
import SDGlist from "../components/SDGlist";

const ProjectsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projectList, setProjectList] = useState([]); 
  const [searchParams, setSearchParams] = useSearchParams({})

  //------------- storing filters individually in state ------------//
  const [tags, setTags] = useState([])
  const [chosenSDG, setChosenSDG] = useState('')
  const [teamSearch, setTeamSearch] = useState('')
  const [titleSearch, setTitleSearch] = useState('')
  const [eventSearch, setEventSearch] = useState('')

  // ----- listen for change in filters and update search params -----//
  useEffect(() => {
    let searchObj = {}
    if(tags.length > 0){
      const tagNames = tags.map(tag => tag.name)
      searchObj = {...searchObj, tags_filter: [...tagNames]}
    }
    if(chosenSDG.length > 0){
      searchObj = {...searchObj, sdg_filter: chosenSDG}
    }
    if(teamSearch.length > 1){
      searchObj = {...searchObj, team_filter: teamSearch}
    }
    if(titleSearch.length > 3){
      searchObj = {...searchObj, title_filter: titleSearch}
    }
    if(eventSearch.length > 1){
      searchObj = {...searchObj, event_filter: eventSearch}
    }
    console.log('search obj', searchObj)
    // setSearchObj(searchObj)
    Object.keys(searchObj).length > 0 ?
    setSearchParams(searchObj)
    : setSearchParams({})
  }, [tags, chosenSDG, teamSearch, titleSearch, eventSearch])

  // -------- fetch and set project list on page first load --------//
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

  const onClearFitlers = () => {
    setTags([])
    setChosenSDG('')
    setTeamSearch('')
    setTitleSearch('')
    setEventSearch('')
  }

  return (
    <div className="projects-and-filters">
      <div className="limit-search">
        <TeamSearch setTeamSearch={setTeamSearch} teamSearch={teamSearch}/>
        <TitleSearch setTitleSearch={setTitleSearch} titleSearch={titleSearch}/>
        <EventSearch setEventSearch={setEventSearch} eventSearch={eventSearch}/>
        <button type="button" className="btn filter-button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
           More filters
        </button>
        {
          filteredList !== projectList ?
          <button type="button" className="clear-filters-button" onClick={onClearFitlers}>
            Clear Filters
          </button>
          : <></>
        }
      </div>
      {/* ----------------------------------------- filter section small screens ------------------------------------------ */}
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
      {/* --------------------------------------- filter section big screen view ------------------------------------------- */}
      <div className="filters-section big-screen-filters">
        <TagInput tags={tags} setTags={setTags} className='single-filter-system'/>
        <SDGlist chosenSDG={chosenSDG} setChosenSDG={setChosenSDG} className='single-filter-system'/>
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
  )
}

export default ProjectsPage