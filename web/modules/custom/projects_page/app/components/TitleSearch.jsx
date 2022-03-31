import React from 'react';

const TitleSearch = ({ searchObj, setSearchObj, setTitleSearch, titleSearch }) => {

  const onChange = (e) => {
    const search = e.target.value.toLowerCase()
    setTitleSearch(search)
    
    if(search.length > 0){
      setSearchObj({...searchObj, title_filter: search})
    }
    else {
      const newSearchObj = Object.assign({}, searchObj)
      delete newSearchObj.title_filter;
      setSearchObj(newSearchObj)
    }
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