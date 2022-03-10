import React, { useState, useCallback } from 'react'
import sdgLogo from '../images/SDGLogo.png'
import { sdgData } from './SDGdata'
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
      <img className='sdg-logo' src={sdgLogo} alt='united nations sustainable development goals' />
      <div className='sdg-list'>
        {sdgData.map(sdg => (
          !chosenSDGs.includes(sdg.goal) ?
          (<img 
            src={sdg.imgSrc} 
            alt={sdg.goal} 
            onClick={onAddition} 
            key={sdg.id} 
            className='sdg-icon'
            id='grey-sdg'
          />) :
          (<img 
            src={sdg.imgSrc} 
            alt={sdg.goal} 
            onClick={onDelete} 
            key={sdg.id} 
            className='sdg-icon'
            id='color-sdg'
          />)
        ))}
      </div>
    </div>
  )
}

export default SDG