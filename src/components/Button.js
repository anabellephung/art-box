import React from 'react';

function Button (props) {
  return (
    <>
      <div className="ticket">
        <div className="ticketBreak breakOne"></div>
        <div className="ticketBreak breakTwo"></div>
        <button className="enterButton" onClick={props.handleChange}>Enter</button>
      </div>
    </>
  )
}

export default Button;