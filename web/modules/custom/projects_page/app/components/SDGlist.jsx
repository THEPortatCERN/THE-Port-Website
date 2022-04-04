import React from 'react';
import settings from '../helper-functions/settings';

const SDG = ({ searchObj, setSearchObj, setChosenSDG, chosenSDG }) => {
  
  const onDelete = (e) => {
    setChosenSDG('')
    const newSearchObj = Object.assign({}, searchObj)
    delete newSearchObj.sdg_filter;
    setSearchObj(newSearchObj)
  }

  const onAddition = (e) => {
    const search = e.target.alt
    setChosenSDG(search)
    setSearchObj({...searchObj, sdg_filter: search})
  }

  return (
    <div className='sdg-div'>
      <img className='sdg-logo' src={`${settings.routes.assets}images/sdg_logo.png`} alt='united nations sustainable development goals' />
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