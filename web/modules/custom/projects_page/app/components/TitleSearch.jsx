import React from 'react';

const TitleSearch = ({ setTitleSearch, titleSearch }) => {

  const onChange = (e) => {
    const search = e.target.value.toLowerCase()
    setTitleSearch(search)
  }

  return (
    <input 
    type='text' 
    name='project-title-search' 
    placeholder="Enter a Project Name" 
    value={titleSearch}
    className='project-search-input'
    onChange={onChange}
    autoComplete='off'
    />
  )
}

export default TitleSearch