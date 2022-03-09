import React from 'react'
// import sdgLogo from '../images/SDGLogo.png'
import { sdgData } from './SDGdata'
import "../styles/SDGlist.css";

// temp solution use URL instead of png
const sdgLogoTemp = 'https://www.un.org/sustainabledevelopment/wp-content/uploads/2020/05/SDG_website_E_v3_200px.png'

const SDG = () => {
  return (
    <div className='sdg-div'>
      <img className='sdg-logo' src={sdgLogoTemp} alt='united nations sustainable development goals' />
      <div className='sdg-list'>
        {sdgData.map(sdg => (
          <img src={sdg.imgSrc} alt={sdg.goal} className='sdg-icon'/>
        ))}
      </div>
    </div>
  )
}

export default SDG