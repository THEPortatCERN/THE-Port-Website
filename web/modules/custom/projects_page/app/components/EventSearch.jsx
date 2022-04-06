import React, {useState} from 'react';

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

  const options = settings.events;

  const names = options.map(event => event.name)
  const nameLowerCase = names.map(name => name.toLowerCase())

  const selected = eventSearch.length > 0 ? names[nameLowerCase.indexOf(eventSearch)] : 'e.g. Hackathon…'

  const notSelected = options.filter(event => event.name !== selected)

  return (
    <div className='project-search-input'>
    <label htmlFor="event-select" className="form-label">Events:</label>
      <select id="event-select" className="form-select project-search-input-inner">
        <option selected>{selected}</option>
        {notSelected.map(event => (
          <option key={event.id} onClick={onClick}>
            {event.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default EventSearch;