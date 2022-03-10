import React from "react";

// ----------------- fetch all projects ----------------- //
export const fetchProjects = async () => {
  const fail = (error) => console.error(error);
  
  try {
    const request = new Request(window.drupalSettings.projects_page.endpoint);

    const response = await fetch(request);
    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    return data;
  } catch (error) {
    fail(error);
  }
};



//------------------------- functionality for for filtering projects by attributes using tag input component --------------------------//
 //checks if one project matches one tag
const matchesTag = (project, tag) => project.attributes.includes(tag.name)
 //checks if one project matches multiple tags
const matchesTags = (project, tags) => tags.reduce((previousTag, currentTag) => previousTag && matchesTag(project, currentTag), true)

//------------------------- & for filtering projects by SDGs using SDG component --------------------------//
//checks if one project matches one sdg
const matchesSDG = (project, sdg) => project.sdgs.includes(sdg)
//checks if one project matches multiple sdgs
const matchesSDGs = (project, chosenSDGs) => chosenSDGs.reduce((previousSDG, currentSDG) => previousSDG && matchesSDG(project, currentSDG), true)
 
 //middle-man -- it can later be used to also filter projects by other perameters
export const doesProjectMatch = (project, tags, chosenSDGs) => {
   const projectMatchesTags = matchesTags(project, tags)
   const projectMatchesSDGs = matchesSDGs(project, chosenSDGs)
   return projectMatchesTags && projectMatchesSDGs
 }