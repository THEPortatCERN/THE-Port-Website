import React from 'react';

import settings from '../helper-functions/settings';

const EventSearch = ({searchObj, setSearchObj, setEventSearch, eventSearch}) => {

  const onClick = (e) => {
    const search = e.target.value.toLowerCase()
    setEventSearch(search)
    
    if(search.length > 0){
      setSearchObj({...searchObj, event_filter: search})
    }
    else if(search.length === 0){
      const newSearchObj = Object.assign({}, searchObj)
      delete newSearchObj.event_filter;
      setSearchObj(newSearchObj)
    } 
  }

  return (
    <>
    <label for="event-select" className="form-label">Events:</label>
      <select id="event-select" className="form-select project-search-input">
        {settings.events.map(event => (
          <option key={event.id} onClick={onClick}>
            {event.name}
          </option>
        ))}
      </select>
    </>
  )
}

export default EventSearch;