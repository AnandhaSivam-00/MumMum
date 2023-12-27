import React from 'react'
{/* <span className="loading-text">Loading...</span> */}
const Loader = () => {
  return (
    <div className="loader">
      <img src="/Images/system-update.png" alt="loading..." className="loading-icon" />
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
