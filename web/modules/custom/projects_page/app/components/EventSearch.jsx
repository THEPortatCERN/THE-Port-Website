import React from 'react';

const EventSearch = ({setEventSearch, eventSearch}) => {

  const onChange = (e) => {
    const search = e.target.value.toLowerCase()
    setEventSearch(search)
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