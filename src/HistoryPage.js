import React from 'react';
import './HistoryPage.css';

const Video = (props) => {
	return (
		<div className='Video'>
			<a target='_blank' href={props.url}>
				{props.url}
			</a>
			<img src={`http://img.youtube.com/vi/${getVideoID(props.url)}/0.jpg`}>
			</img>
		</div>
	)
}

function HistoryPage(props) {
  return (
    <div className='HistoryPage'>
      {props.history.map((item, index) => (
		  <Video {...item}></Video>
      ))}
    </div>
  );
}

function getVideoID(url) {
	return url.split('?')[1].split('=')[1]
}


export default HistoryPage;
