import React from 'react'

const TitleSearch = ({ setTitleSearch }) => {

  const onChange = (e) => {
    const search = e.target.value.toLowerCase()
    setTitleSearch(search)
  }

  return (
    <div>
      <form onChange={onChange}>
        <input type='text' name='project-title-search' placeholder="Enter a Project Name" />
        <input type='submit' value='Search' />
      </form> 
    </div>
  )
}

export default TitleSearch