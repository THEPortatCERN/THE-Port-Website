import React from 'react';

const EventSearch = ({setEventSearch}) => {

  const onChange = (e) => {
    const search = e.target.value.toLowerCase()
    setEventSearch(search)
  }

  return (
    <input 
    type='text' 
    name='event-search' 
    placeholder="Enter a year" 
    className='project-search-input'
    onChange={onChange}
    autoComplete='off'
    />
  )
}

export default EventSearch;