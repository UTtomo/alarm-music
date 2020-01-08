import React from 'react';
import './PlaylistPage.css';

const TopMenu = (props) => {
  return (
    <div className='TopMenu'>
      <button className='edit'>Edit</button>
      <button className='add'>+</button>
    </div>
  )
}

const PlaylistItem = (props) => {
  return (
    <div className='PlaylistItem'>
      <div className='label'>
        {props.label}
      </div>
      <div className='url'>
        <a target='_blank' href={props.url}>{props.url}</a>
      </div>
    </div>
  )
}

function PlaylistPage(props) {
  return (
    <div className='PlaylistPage'>
      <TopMenu></TopMenu>
      {props.playlists.map((v, i) => (<PlaylistItem key={i} {...v}></PlaylistItem>))}
    </div>
  );
}



export default PlaylistPage;
