// ----------------- fetch all projects ----------------- //
export const fetchProjects = async () => {
  const fail = (error) => console.error(error);
  
  try {
    const request = new Request(settings.endpoint);

    const response = await fetch(request);
    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    return data;
  } catch (error) {
    fail(error);
  }
};

//------------------------- functionality for filtering projects by team using TeamSearch component ----------------------------------//
const matchesEventSearch = (project, eventSearch) => {
  return project.events.reduce((prevevent, event) => prevevent && event.toLowerCase().includes(eventSearch), true) 
}

//------------------------- functionality for filtering projects by team using TeamSearch component ----------------------------------//
const matchesTeamSearch = (project, teamSearch) => {
  return project.teams.reduce((prevTeam, team) => prevTeam && team.includes(teamSearch), true) 
}

//------------------------- & for filtering projects by title using TitleSearch component ----------------------------------//
export const matchesTitleSearch = (project, titleSearch) => project.title.toLowerCase().includes(titleSearch)

//------------------------------ & for for filtering projects by attributes using tag input component ---------------------------------//
 //checks if one project matches one tag
export const matchesTag = (project, tag) => project.attributes.includes(tag.name)
 //checks if one project matches multiple tags
export const matchesTags = (project, tags) => tags.reduce((previousTag, currentTag) => previousTag && matchesTag(project, currentTag), true)

//-------------------------------------- & for filtering projects by SDGs using SDG component -----------------------------------------//
//checks if one project matches one sdg
export const matchesSDG = (project, sdg) => project.sdgs.includes(sdg)
//checks if one project matches multiple sdgs
export const matchesSDGs = (project, chosenSDGs) => chosenSDGs.reduce((previousSDG, currentSDG) => previousSDG && matchesSDG(project, currentSDG), true)
 
//middle-man -- checks for all filters
export const doesProjectMatch = (project, tags, chosenSDGs, teamSearch, titleSearch, eventSearch) => {
  const projectMatchesTags = matchesTags(project, tags)
  const projectMatchesSDGs = matchesSDGs(project, chosenSDGs)
  const projectMatchesTeamSearch = matchesTeamSearch(project, teamSearch)
  const projectMatchesTitleSearch = matchesTitleSearch(project, titleSearch)
  const projectMatchesEventSearch = matchesEventSearch(project, eventSearch)

  return projectMatchesTags && projectMatchesSDGs && projectMatchesTeamSearch && projectMatchesTitleSearch && projectMatchesEventSearch
}