// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useParams} from 'react-router-dom';
import React, { useEffect, useState, useRunOnce } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Main from './pages/main';
import Admin from './pages/admin';
import NotFound from './pages/404';
import {socket} from './socket';
import Landing from './pages/landing';
import Cookies from 'js-cookie';

// var meetingids = new Map();
// socket.emit('getMeetingIds');
// socket.on('returnMeetingIds', (map) => {
//   meetingids = map;
//   console.log(meetingids);
// });

function MeetingFinder() {
  const {meetingid} = useParams();
  const [hasID, setHasID] = useState(false);
  // var meetingids = new Map();
  // var hasID = meetingids.has(meetingid);
  function gethasID() {
    fetch('http://192.168.1.40:3000/meetingids', {
      "method": "GET"
    })
      .then(response => response.json())
      .then(data => {
        // console.log(meetingid);
        console.log(data);
        // console.log(data[0]);
        // var meetingids = data[0];
        var meetingids = data;
        for(var i = 0; i < meetingids.length; i++) {
          if(meetingids[i].includes(parseInt(meetingid))) {
            setHasID(true);
          }
        }
        // console.log(meetingid, meetingids[0]);
        // setHasID(meetingids.includes(parseInt(meetingid)));
        console.log(hasID);
      });
  }

  useEffect(() => {
    // Cookies.set('meetingid', meetingid, {expires: 2});
    // console.log(meetingid);
    // socket.emit('name form', '', '', meetingid);
    sessionStorage.setItem('meetingid', meetingid);
    gethasID();
    // console.log("using effect");
  }, []);
  
  // console.log(gethasID());
  return (
    <div>
    {hasID && (
      <Main />
    )}
    {!hasID && (
      <NotFound />
    )}
    </div>
  );

  // if(meetingids.has(meetingid)) {
  //   return (<Main />);
  // }
  // return (<NotFound />);
}


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Landing/>}></Route>
        {/* <Route exact path='/' element={<Main />} /> */}
        <Route exact path='/admin' element={<Admin/>} />
        <Route path='/meeting/:meetingid' element={<MeetingFinder/>} />
      </Routes>
    </Router>
  );
}

export default App;
