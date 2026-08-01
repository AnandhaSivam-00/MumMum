import React from 'react'

const Message = ({varient, children}) => {
  return (
    <div className={`alert alert-${varient}`}>
      {children}
    </div>
  )
}

export default Message
