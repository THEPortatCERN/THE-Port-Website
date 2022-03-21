import React, { useState, useCallback } from 'react'
import settings from '../helper-functions/settings';

const SDG = ({ setChosenSDG, chosenSDG }) => {
  
  const onDelete = (e) => {
    setChosenSDG('')
  }

  const onAddition = (e) => {
    const newSDG = e.target.alt
    setChosenSDG(newSDG)
  }

  return (
    <div className='sdg-div'>
      <img className='sdg-logo' src={`${settings.baseUrl}images/sdg_logo.png`} alt='united nations sustainable development goals' />
      <div className='sdg-list'>
        {settings.sdgs.map(sdg => (
          sdg.name !== chosenSDG ?
          (<img 
            src={sdg.image_src}
            alt={sdg.name} 
            onClick={onAddition} 
            key={sdg.id} 
            className='sdg-icon grey'
          />) :
          (<img 
            src={sdg.image_src} 
            alt={sdg.name} 
            onClick={onDelete} 
            key={sdg.id} 
            className='sdg-icon colour'
          />)
        ))}
      </div>
    </div>
  )
}

export default SDG