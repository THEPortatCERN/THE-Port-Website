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
    <>
      <label for="project-title-search">Project name:</label>
      <input 
      type='text' 
      name='project-title-search' 
      value={titleSearch}
      className='project-search-input'
      onChange={onChange}
      autoComplete='off'
      />
    </>
  )
}

export default TitleSearch