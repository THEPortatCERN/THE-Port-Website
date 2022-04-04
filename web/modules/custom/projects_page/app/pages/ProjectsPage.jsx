import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
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
  const [searchObj, setSearchObj] = useState({});
  const [searchParams, setSearchParams] = useSearchParams(searchObj);

  //------------- storing filters individually in state ------------//
  const [tags, setTags] = useState([])
  const [chosenSDG, setChosenSDG] = useState('')
  const [teamSearch, setTeamSearch] = useState('')
  const [titleSearch, setTitleSearch] = useState('')
  const [eventSearch, setEventSearch] = useState('')

  // ON PAGE LOAD ONLY : READ URL -> set searchObj -> sets url //
  useEffect(() => {
    let initialSearchObj = {}

    const tagsSearchParam = searchParams.getAll('tags_filter')
    const sdgSearchParam = searchParams.get('sdg_filter')
    const teamSearchParam = searchParams.get('team_filter')
    const titleSearchParam = searchParams.get('title_filter')
    const eventSearchParam = searchParams.get('event_filter')

    if(tagsSearchParam.length > 0){
      initialSearchObj = {...initialSearchObj, tags_filter: [...tagsSearchParam]}
    }
    if(sdgSearchParam !== null){
      initialSearchObj = {...initialSearchObj, sdg_filter: sdgSearchParam}
    }
    if(teamSearchParam !== null){
      initialSearchObj = {...initialSearchObj, team_filter: teamSearchParam}
    }
    if(titleSearchParam !== null){
      initialSearchObj = {...initialSearchObj, title_filter: titleSearchParam}
    }
    if(eventSearchParam !== null){
      initialSearchObj = {...initialSearchObj, event_filter: eventSearchParam}
    }
    setSearchObj(initialSearchObj)
  }, [])

  // ON PAGE LOAD AND WHEN SEARCH OBJ CHANGES -> SET SEARCH PARAMS (QUERY STRING)
  useEffect(() => {
    Object.keys(searchObj).length > 0 ?
    setSearchParams(searchObj)
    : setSearchParams({})
  }, [searchObj])

 // WHEN SEARCH PARAMS (QUERY STRING) UPDATES -> SET INDIVIDUAL FILTERS 
  useEffect(() => {
    const tagsSearch = searchParams.getAll('tags_filter')
    const sdg = searchParams.get('sdg_filter')
    const team = searchParams.get('team_filter')
    const title = searchParams.get('title_filter')
    const event = searchParams.get('event_filter')

    if(tagsSearch.length !== 0){
      const objectsArrayFromTagsSearchParam = 
      tagsSearch.map((tag, index) => {
        return {
        id: index,
        name: tag
      }
    })
      setTags(objectsArrayFromTagsSearchParam)
    } else {
      setTags([])
    }
    if(sdg !== null){
      setChosenSDG(searchObj.sdg_filter)
    } else {
      setChosenSDG('')
    }
    if(team !== null){
      setTeamSearch(team)
    } else {
      setTeamSearch('')
    }
    if(title !== null){
      setTitleSearch(title)
    } else {
      setTitleSearch('')
    }
    if(event !== null){
      setEventSearch(event)
    } else {
      setEventSearch('')
    }
  }, [searchParams])

  // ON PAGE LOAD ONLY -> FETCH FULL PROJECT LIST
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
    setSearchObj({})
  }

  return (
    <div className="projects-and-filters">
      <div className="limit-search">
        <TeamSearch setSearchObj={setSearchObj} searchObj={searchObj} setTeamSearch={setTeamSearch} teamSearch={teamSearch}/>
        <TitleSearch setSearchObj={setSearchObj} searchObj={searchObj} setTitleSearch={setTitleSearch} titleSearch={titleSearch}/>
        <EventSearch setSearchObj={setSearchObj} searchObj={searchObj} setEventSearch={setEventSearch} eventSearch={eventSearch}/>
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
          <TagInput setSearchObj={setSearchObj} searchObj={searchObj} tags={tags} setTags={setTags} className='single-filter-system'/>
          <SDGlist setSearchObj={setSearchObj} searchObj={searchObj} chosenSDG={chosenSDG} setChosenSDG={setChosenSDG} className='single-filter-system'/>
        </div>
      </div>
      {/* --------------------------------------- filter section big screen view ------------------------------------------- */}
      <div className="filters-section big-screen-filters">
        <TagInput setSearchObj={setSearchObj} searchObj={searchObj} tags={tags} setTags={setTags} className='single-filter-system'/>
        <SDGlist setSearchObj={setSearchObj} searchObj={searchObj} chosenSDG={chosenSDG} setChosenSDG={setChosenSDG} className='single-filter-system'/>
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