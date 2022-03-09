import React from "react";

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