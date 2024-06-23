import React from 'react'
import loaderImage from '../../Images/system-update.png'
{/* <span className="loading-text">Loading...</span> */}
const Loader = () => {
  return (
    <div className="loader">
      <img src={loaderImage} alt="loading..." className="loading-icon" />
      <div className="loading-text-select">
        <span>L</span>
        <span>o</span>
        <span>a</span>
        <span>d</span>
        <span>i</span>
        <span>n</span>
        <span>g</span>
        <span>.</span>
      </div>
    </div>
  )
}

export default Loader
