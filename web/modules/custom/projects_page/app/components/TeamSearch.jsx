import React from 'react';

const TeamSearch = ({ setTeamSearch, teamSearch }) => {

  const onChange = (e) => {
    const search = e.target.value
    setTeamSearch(search)
  }

  return (
    <input 
    type='text' 
    name='team-search' 
    placeholder="Enter a Pier Number" 
    value={teamSearch}
    className='project-search-input'
    onChange={onChange}
    autoComplete='off'
    />
  )
}

export default TeamSearch