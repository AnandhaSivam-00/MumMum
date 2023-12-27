import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesUp } from "@fortawesome/free-solid-svg-icons"



const ScrollBack = () => {

  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if(window.pageYOffset > 300) {
        setVisible(true);
      }
      else {
        setVisible(false);
      }
    });
  }, []);

  // const listenToScroll = () => {
  //   const scrollBtnHide = 50;
  //   let scroll = document.documentElement.scrollTop;

  //   console.log(scroll);
  //   if(scroll > scrollBtnHide) {
  //     setVisible(true);
  //   }
  //   else {
  //     setVisible(false);
  //   }
  // }

  const scrollTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  };



  return (
    <>
    {isVisible && (
      <div className="scroll-up">
        <button className="scroll-up-button" onClick={scrollTop}>
          <FontAwesomeIcon icon={faAnglesUp} size="xss" inverse={true}/>
        </button>
      </div>
    )}
    </>
  )
}

export default ScrollBack
