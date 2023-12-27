import React from 'react'

function Footer() {
  return (
    <>
      <footer className="shadow-lg" style={{}}>
        <div className="text-center links" id="bottom">
          <div className="link"  id="link_1">
            <a href="https://github.com/AnandhaSivam-00" target="_blank" ><img src="/Icons/github.svg" alt="GitHub"/></a>
          </div>
          <div className="link" id="link_2">
            <a href="https://www.linkedin.com/in/anandhasivam-sambathkumar-052629224" target="_blank"><img src="/Icons/linkedin.svg" alt="linkedIn"/></a>
          </div>
          <div className="link" id="link_3">
            <a href="https://twitter.com/Anand_Sivam_00_" target="_blank"><img src="/Icons/twitter-x.svg" alt="Twitter-X" /></a>
          </div>
        </div>
        <div className="text-center" id="bottom">
        <hr />
          <div className="declaration">
            <p>Crafted with &#9829;</p>
            <p>&copy; <strong>Mum Mum</strong> Food Ordering Website - 2023</p>
            <p>All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
