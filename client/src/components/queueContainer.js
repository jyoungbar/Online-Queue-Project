//QueueContainer Component
import React, { useEffect, useState } from 'react';
// import {useParams} from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Queue from './queue';
import {socket} from '../socket';

const QueueContainer = () => {
  // if(sessionStorage.getItem("queueNames") === null) {
  //   sessionStorage.setItem("queueNames", JSON.stringify([]));
  // }

  const [queueNames, setQueueNames] = useState([]); //maybe will change to array of arrays listing out names of people in queues
  const [currName, setCurrName] = useState("");

  // const {meetingid} = useParams();
  // const meetingid = 100;
  // console.log(meetingid);

  //make sure all queues are loaded after refresh
  // socket.on('connect', () => {
  useEffect(() => {
    if(sessionStorage.getItem('status') !== null) {
      socket.emit('name form', sessionStorage.getItem('name'), sessionStorage.getItem('status'));
    }
    socket.emit('get all queues');
  },[]);
  //recieve and add all queues
  socket.on('all queues', (newQueueNames) => {
    setQueueNames(newQueueNames);
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // setQueueNames([...queueNames, currName]);
    socket.emit('new queue',/* meetingid,*/ currName);
    setCurrName("");
  }

  const handleDelete = (event) => {
    event.preventDefault();
    // console.log(event.target.name);
    socket.emit('delete queue', event.target.name)
  }

  socket.on('queue added', (queueName) => {
    setQueueNames([...queueNames, queueName]);
  });

  socket.on('queue deleted', (queueName) => {
    // console.log("delete");
    var newNames = [];
    for(var i = 0; i < queueNames; i++) {
      if(queueNames[i] !== queueName) {
        newNames.push(queueNames[i]);
      }
    }
    // console.log("newNames", newNames);
    setQueueNames(newNames);
    socket.emit('get all queues');
  });


  return (
    <div>
      <form action="" id="queueNameForm" onSubmit={handleSubmit}>
        <input type="text" aria-label="Queue Name Input" value={currName} onChange={(e)=> setCurrName(e.target.value)} />
        <input type="submit" value="Add New Queue"/>
      </form>
      
      {/*queueNames.map((name, index) => (
        <div key={index} className="inline">
          <Queue queueName={name} />
        </div>
      ))*/}

      <ListGroup className="perrow3" horizontal>
      {queueNames.map((name, index) => (
        <ListGroup.Item key={index} className="col" variant="light">
          <Button className="delete-btn" variant="danger" name={name} onClick={handleDelete}>X</Button>
          <Queue queueName={name} />
        </ListGroup.Item>
      ))}
      </ListGroup>

      
    </div>
  );
};
 
export default QueueContainer;