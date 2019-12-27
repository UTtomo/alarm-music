import React from 'react';
import './App.css';
import BottomMenu from './BottomMenu.js'
import AlarmPage from './AlarmPage.js'
import HistoryPage from './HistoryPage.js'
import PlaylistPage from './PlaylistPage.js'

function App() {
  const [pageNum, setPageNum] = React.useState(0);

  const transit = function (pageNumber) {
    return function () {
      setPageNum(pageNumber)
    }
  }

  let page
  if (pageNum == 0) {
    page = <AlarmPage></AlarmPage>
  } else if (pageNum == 1) {
    page = <HistoryPage></HistoryPage>
  } else if (pageNum == 2) {
    page = <PlaylistPage></PlaylistPage>
  }

  return (
    <div className='AlarMusic'>
      {page}
      <BottomMenu transitToAlarm={transit(0)} transitToHistory={transit(1)} transitToPlaylist={transit(2)}/>
    </div>
  );
}

export default App;
