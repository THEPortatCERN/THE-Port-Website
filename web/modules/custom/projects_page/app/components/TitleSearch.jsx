import React from 'react'

const TitleSearch = ({ setTitleSearch }) => {

  const onChange = (e) => {
    const search = e.target.value.toLowerCase()
    setTitleSearch(search)
  }

  return (
    <form onChange={onChange}>
      <input type='text' name='project-title-search' placeholder="Enter a Project Name" className='title-search'/>
      <input type='submit' value='Search' className='title-search-submit'/>
    </form> 
  )
}

export default TitleSearch