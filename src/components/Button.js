import React from 'react';

 export default function Button (props) {
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