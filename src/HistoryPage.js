import React from 'react';
import './HistoryPage.css';

function HistoryPage(props) {
  return (
    <div className='HistoryPage'>
      {props.history.map((item, index) => (
        <div key={index}>
          {item.url}
        </div>
      ))}
    </div>
  );
}



export default HistoryPage;
