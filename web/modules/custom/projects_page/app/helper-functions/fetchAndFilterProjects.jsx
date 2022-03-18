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

const matchesTeamSearch = (project, teamSearch) => {
  return project.teams.reduce((prevTeam, team) => prevTeam && team.includes(teamSearch), true) 
}


//------------------------- functionality for filtering projects by title using TitleSearch component ----------------------------------//
const matchesTitleSearch = (project, titleSearch) => project.title.toLowerCase().includes(titleSearch)

//------------------------------ & for for filtering projects by attributes using tag input component ---------------------------------//
 //checks if one project matches one tag
const matchesTag = (project, tag) => project.attributes.includes(tag.name)
 //checks if one project matches multiple tags
const matchesTags = (project, tags) => tags.reduce((previousTag, currentTag) => previousTag && matchesTag(project, currentTag), true)

//-------------------------------------- & for filtering projects by SDGs using SDG component -----------------------------------------//
//checks if one project matches one sdg
const matchesSDG = (project, sdg) => project.sdgs.includes(sdg)
//checks if one project matches multiple sdgs
const matchesSDGs = (project, chosenSDGs) => chosenSDGs.reduce((previousSDG, currentSDG) => previousSDG && matchesSDG(project, currentSDG), true)
 
//middle-man -- checks for all filters
export const doesProjectMatch = (project, tags, chosenSDGs, titleSearch, teamSearch) => {
  const projectMatchesTags = matchesTags(project, tags)
  const projectMatchesSDGs = matchesSDGs(project, chosenSDGs)
  const projectMatchesTitleSearch = matchesTitleSearch(project, titleSearch)
  const projectMatchesTeamSearch = matchesTeamSearch(project, teamSearch)
  return projectMatchesTags && projectMatchesSDGs && projectMatchesTitleSearch && projectMatchesTeamSearch
}