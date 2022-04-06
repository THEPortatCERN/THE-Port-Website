import React from 'react';

const TitleSearch = ({ searchObj, setSearchObj, setTitleSearch, titleSearch }) => {

  const onChange = (e) => {
    const search = e.target.value.toLowerCase();
    setTitleSearch(search);
    
    if(search.length > 0){
      setSearchObj({...searchObj, title_filter: search});
    }
    else {
      const newSearchObj = Object.assign({}, searchObj)
      delete newSearchObj.title_filter;
      setSearchObj(newSearchObj);
    }
  }

  return (
    <div className='project-search-input'>
      <label htmlFor="project-title-search">Project name:</label>
      <input 
      type='text' 
      name='project-title-search' 
      value={titleSearch}
      placeholder="e.g. Refeet"
      className='project-search-input-inner'
      onChange={onChange}
      autoComplete='off'
      />
    </div>
  )
}

export default TitleSearch