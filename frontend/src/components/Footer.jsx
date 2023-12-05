import React from 'react'
import fb from "../images/fblogo.png"
import ig from "../images/iglogo.png"
import siteLogo from "../images/siteLogo.png"

function Footer() {
  return (
    <div className='footerContainer'>
    
        <div className='firstColumn'> 
            <div className='followUsTitle'> Follow Us </div>
            <div className='logoContain'> 
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img src={fb} alt="Facebook logo" className="miniSocialLogo" />
            </a>

            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img src={ig} alt="Instagram logo" className="miniSocialLogo" />
            </a>
            </div>
        </div>
        <div className='thirdColumn'> 
            <img src={siteLogo} alt='burger bliss logo'className='companyLogoFooter'/>
        </div>

       
    </div>
  )
}

export default Footer