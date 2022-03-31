import React from 'react';

const EventSearch = ({searchObj, setSearchObj, setEventSearch, eventSearch}) => {

  const onChange = (e) => {
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
    <input 
    type='text' 
    name='event-search' 
    placeholder="Enter a year" 
    value={eventSearch}
    className='project-search-input'
    onChange={onChange}
    autoComplete='off'
    />
  )
}

export default EventSearch;