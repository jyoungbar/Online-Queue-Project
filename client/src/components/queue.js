//Queue Component
import React, { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import {socket} from '../socket';
import Cookies from 'js-cookie';

const Queue = ({queueName}) => {
  const [speakers, setSpeakers] = useState([]);
  const [inQueue, setInQueue] = useState(false);
  const [closed, setClosed] = useState(false);

  //request names in queue after refresh
  // socket.on('connect', () => {
  useEffect(() => {
    // console.log("connected through queue", queueName);
    socket.emit('get names in queue', queueName);
  }, []);

  socket.on('names in queue'+queueName, (newSpeakers) => {
    setSpeakers(newSpeakers);
    // console.log("speakers:", queueName, speakers);
    // console.log(queueName, newSpeakers);
    setInQueue(false);
    for(const speaker of newSpeakers) {
      // console.log("name:", sessionStorage.getItem('name'));
      // console.log(speaker);
      if(sessionStorage.getItem('name') == speaker.name) {
        setInQueue(true);
      }
    }
  });

  socket.on('open/close queue'+queueName, (isClosed) => {
    setClosed(isClosed);
  });

  const handleNext = (event) => {
    event.preventDefault();
    socket.emit('next in queue', queueName);
  }

  const handleClose = (event, isClosed) => {
    event.preventDefault();
    socket.emit('from admin open/close queue', queueName, isClosed);
  }

  const handleJoin = (event) => {
    event.preventDefault();
    console.log("join activated");
    socket.emit('join queue', queueName);
    setInQueue(true);
  }

  const handleLeave = (event) => {
    event.preventDefault();
    socket.emit('leave queue', queueName);
    setInQueue(false);
  }


  return (
    <div className="queue">
      <h3 className="">{queueName}</h3>
      {!inQueue && !closed && (
        <Button className="join-btn" variant="secondary" onClick={handleJoin}>Join Queue</Button>
      )}
      {inQueue && (
        <Button className="leave-btn" variant="secondary" onClick={handleLeave}>Leave Queue</Button>
      )}
      <ListGroup as="ol" className="queue-list" numbered>
        {speakers.map((speaker, index) => (
          <ListGroup.Item as="li" key={index} className={`${index == 0 ? "active" : ""}`}>
            <ListGroup className="speaker-li" horizontal>
              <ListGroup.Item className="speaker-name" variant="secondary">Name</ListGroup.Item>
              <ListGroup.Item className="times-spoken" variant="secondary">Times Spoken</ListGroup.Item>
              <ListGroup.Item className="times-spoken" variant="secondary">Time on Queue</ListGroup.Item>
            </ListGroup>
            <ListGroup className="speaker-li" horizontal>
              <ListGroup.Item className="speaker-name"><b>{speaker.name}</b></ListGroup.Item>
              <ListGroup.Item className="times-spoken"><b>{speaker.tallies}</b></ListGroup.Item>
              <ListGroup.Item className="times-spoken"><b>INSERT TIMER</b></ListGroup.Item>
            </ListGroup>
          </ListGroup.Item>
        ))}
      </ListGroup>
      
      {Cookies.get('admin') == sessionStorage.getItem('meetingid') && (
        <Button variant="secondary" onClick={handleNext}>Move to next Speaker</Button>
      )}
      {Cookies.get('admin') == sessionStorage.getItem('meetingid') && !closed && (
        <Button className="close-btn" variant="secondary" onClick={(e) => handleClose(e,true)}>Close</Button>
      )}
      {Cookies.get('admin') == sessionStorage.getItem('meetingid') && closed && (
        <Button className="open-btn" variant="secondary" onClick={(e) => handleClose(e,false)}>Open</Button>
      )}
      
    </div>
  );
};
 
export default Queue;