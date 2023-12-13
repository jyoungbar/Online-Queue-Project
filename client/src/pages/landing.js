//Landing Page
import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';
import {socket} from '../socket';
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

 
const Landing = () => {
  const navigate = useNavigate();

  const createMeeting = (event) => {
    event.preventDefault();
    var meetingid = Math.floor(Math.random() * 100000000);
    Cookies.set('admin', meetingid, {expires: 7});
    // Cookies.set('meetingid', meetingid, {expires: 2});
    sessionStorage.setItem('meeetingid', meetingid);
    // socket.emit('name form', "", "", meetingid);
    console.log(meetingid);
    // fetch('http://192.168.1.40:3000/meetingids', {
    fetch(/*'http://localhost:3000/meetingids'*/'https://meeting-tool.onrender.com/meetingids', {
      "method": "PUT",
      "headers": { 'Content-Type': 'application/json' },
      "body": JSON.stringify({MeetingID: meetingid})
    })
    .then(function() {
      navigate('/meeting/'+meetingid);
    });
    
  }

  // socket.on('connect', () => {
  //   console.log("landing connect");
  //   Cookies.set('admin', "");
  //   Cookies.set('meetingid', "");
  // });
  // useEffect(() => {
  //   Cookies.delete('admin');
  //   Cookies.delete('meetingid');
  //   // socket.emit('name form', "", "", "");
  // }, []);

  return (
    <>
      <h1>GBM Meeting Assistant</h1>
      <Button onClick={createMeeting}>Create New Meeting</Button> 
    </>
  );
};
 
export default Landing;