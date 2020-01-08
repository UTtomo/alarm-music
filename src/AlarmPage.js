import React from 'react';
import './AlarmPage.css';

const TopMenu = (props) => {
  return (
    <div className='TopMenu'>
      <button className='edit'>Edit</button>
      <button className='add'>+</button>
    </div>
  )
}

function AlarmPage(props) {
  return (
    <div className='AlarmPage'>
      <TopMenu></TopMenu>
    </div>
  );
}



export default AlarmPage;
