import React from 'react';
import './App.css';
import BottomMenu from './BottomMenu.js'
import AlarmPage from './AlarmPage.js'
import HistoryPage from './HistoryPage.js'
import PlaylistPage from './PlaylistPage.js'

function App() {
  /* ページ遷移用 ページ番号 */
  const [pageNum, setPageNum] = React.useState(0);
  /* プレイリストのリスト */
  const [playlists, setPlaylists] = React.useState([
    {
      label: '名曲！',
      url: 'https://www.youtube.com/playlist?list=PLH8SlvExlZpGq298vLHcLxOPtJCMqUh1L',
      uid: 'ユニークなID1',
    },
    {
      label: '邦楽リスト',
      url: 'https://www.youtube.com/playlist?list=PLtnEq1bStvIOgOgvtF2RJZGCLx8XBhNr8',
      uid: 'ユニークなID2',
    },
    {
      label: 'こどもよう',
      url: 'https://www.youtube.com/playlist?list=PLUnXkkQLSVm6k8jV87uzN0riIFCxZcyJS',
      uid: 'ユニークなID3',
    }
  ]);
  /* 再生された動画の履歴 */
  const [history, setHistory] = React.useState([
    {
      url: 'https://www.youtube.com/watch?v=zRKSiN-XuyU'
    },
    {
      url: 'https://www.youtube.com/watch?v=VGdQBwQLOjA'
    },
    {
      url: 'https://www.youtube.com/watch?v=dp5LL7aLoRQ'
    },
    {
      url: 'https://www.youtube.com/watch?v=sse3HJeSnDY'
    },
    {
      url: 'https://www.youtube.com/watch?v=zRKSiN-XuyU'
    },
    {
      url: 'https://www.youtube.com/watch?v=VGdQBwQLOjA'
    },
    {
      url: 'https://www.youtube.com/watch?v=dp5LL7aLoRQ'
    },
    {
      url: 'https://www.youtube.com/watch?v=sse3HJeSnDY'
    },
  ])
  /* アラームのリスト */
  const [alarmList, setAlarmList] = React.useState([
    {
      hour: 0,
      minute: 12,
      playlistUID: 'ユニークなID2',
    },
    {
      hour: 7,
      minute: 0,
      playlistUID: 'ユニークなID1',
    },
    {
      hour: 8,
      minute: 0,
      playlistUID: 'ユニークなID2',
    },
    {
      hour: 9,
      minute: 0,
      playlistUID: 'ユニークなID2',
    },
  ])

  const transit = function (pageNumber) {
    return function () {
      setPageNum(pageNumber)
    }
  }

  let page
  /* アラームページ */
  if (pageNum == 0) {
    /* 新規アラームを追加する関数 */
    const addAlarm = function (hour, minute, playlistUID) {
      setAlarmList([...alarmList, {hour, minute, playlistUID}])
    }

    /* 履歴に新たな動画を追加する関数 */
    const addHistory = function (videoUrl) {
      setHistory([...history, {
        url: videoUrl
      }])
    }

    page = <AlarmPage alarmList={alarmList} playlists={playlists} addAlarm={addAlarm} addHistory={addHistory}></AlarmPage>


  /* 履歴ページ */
  } else if (pageNum == 1) {
    page = <HistoryPage history={history}></HistoryPage>


  /* 再生リストページ */
  } else if (pageNum == 2) {
    /* 新規リストを追加する関数 */
    const addPlaylist = function (label, url) {
      const newlist = {
        label: label,
        url: url,
        uid: getUniqueStr()
      }
      setPlaylists([...playlists, newlist])
    }

    page = <PlaylistPage playlists={playlists} addPlaylist={addPlaylist}></PlaylistPage>
  }

  return (
    <div className='AlarMusic'>
      {page}
      <BottomMenu transitToAlarm={transit(0)} transitToHistory={transit(1)} transitToPlaylist={transit(2)}/>
    </div>
  );
}

function getUniqueStr(myStrong){
  var strong = 1000;
  if (myStrong) strong = myStrong;
  return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
}

export default App;
