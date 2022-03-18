import React from 'react'

const TeamSearch = ({ setTeamSearch }) => {

  const onChange = (e) => {
    const search = e.target.value.toLowerCase()
    setTeamSearch(search)
  }

  return (
    <div>
      <input 
      type='text' 
      name='team-title-search' 
      placeholder="Enter a Pier Number" 
      className='title-search'
      onChange={onChange}
      autoComplete='off'
      />
    </div>
  )
}

export default TeamSearch