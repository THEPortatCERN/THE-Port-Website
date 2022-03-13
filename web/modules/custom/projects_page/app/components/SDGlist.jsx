import React, { useState, useCallback } from 'react'
import settings from '../helper-functions/settings';
import "../styles/SDGlist.css";

const SDG = ({ setChosenSDGs, chosenSDGs }) => {
  
  const onDelete = useCallback((e) => {
    setChosenSDGs(chosenSDGs.filter(sdg => sdg !== e.target.alt))
  },  [setChosenSDGs, chosenSDGs])

  const onAddition = useCallback((e) => {
    const newSDG = e.target.alt
    setChosenSDGs([...chosenSDGs, newSDG])
  },  [setChosenSDGs, chosenSDGs])

  console.log('chosen sdgs', chosenSDGs)

  return (
    <div className='sdg-div'>
      <img className='sdg-logo' src={`${settings.baseUrl}images/sdg_logo.png`} alt='united nations sustainable development goals' />
      <div className='sdg-list'>
        {settings.sdgs.map(sdg => (
          !chosenSDGs.includes(sdg.name) ?
          (<img 
            src={sdg.imgSrc} 
            alt={sdg.name} 
            onClick={onAddition} 
            key={sdg.id} 
            className='sdg-icon-grey'
          />) :
          (<img 
            src={sdg.imgSrc} 
            alt={sdg.name} 
            onClick={onDelete} 
            key={sdg.id} 
            className='sdg-icon-colour'
          />)
        ))}
      </div>
    </div>
  )
}

export default SDG