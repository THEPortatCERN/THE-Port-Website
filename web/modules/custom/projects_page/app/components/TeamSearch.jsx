import React from 'react'

const TeamSearch = ({ setTeamSearch }) => {

  const onChange = (e) => {
    const search = e.target.value.toLowerCase()
    setTeamSearch(search)
  }

  return (
    <input 
    type='text' 
    name='team-search' 
    placeholder="Enter a Pier Number" 
    className='project-search-input'
    onChange={onChange}
    autoComplete='off'
    />
  )
}

export default TeamSearch