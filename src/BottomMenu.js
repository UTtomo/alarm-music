import React from 'react';
import './BottomMenu.css';

function BottomMenu(props) {
  return (
    <div className='BottomMenu'>
      <button className='alarmButton' onClick={props.transitToAlarm}>Alarm</button>
      <button className='historyButton' onClick={props.transitToHistory}>History</button>
      <button className='playlistButton' onClick={props.transitToPlaylist}>Playlist</button>
    </div>
  );
}

export default BottomMenu;
