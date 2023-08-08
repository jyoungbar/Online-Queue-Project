//Connected Users Component
import React, { useEffect, useState } from 'react';
import {socket} from '../socket';
 
const ConnectedUsers = () => {
  if(sessionStorage.getItem("numUsers") === null) {
    sessionStorage.setItem("numUsers", 0);
  }
  // if(sessionStorage.getItem("numVoting") === null) {
  //   sessionStorage.setItem("numVoting", 0);
  // }
  // if(sessionStorage.getItem("numActive") === null) {
  //   sessionStorage.setItem("numActive", 0);
  // }
  // if(sessionStorage.getItem("numAssoc") === null) {
  //   sessionStorage.setItem("numAssoc", 0);
  // }
  // if(sessionStorage.getItem("numNone") === null) {
  //   sessionStorage.setItem("numNone", 0);
  // }

  const [numUsers, setNumUsers] = useState(sessionStorage.getItem("numUsers"));
  // const [numVoting, setNumVoting] = useState(sessionStorage.getItem("numVoting"));
  // const [numActive, setNumActive] = useState(sessionStorage.getItem("numActive"));
  // const [numAssoc, setNumAssoc] = useState(sessionStorage.getItem("numAssoc"));
  // const [numNone, setNumNone] = useState(sessionStorage.getItem("numNone"));

  // socket.on('count', (total, voting, active, assoc, none) => {
  //   setNumUsers(total);
  //   setNumVoting(voting);
  //   setNumActive(active);
  //   setNumAssoc(assoc);
  //   setNumNone(none);
  //   sessionStorage.setItem("numUsers", total);
  //   sessionStorage.setItem("numVoting", voting);
  //   sessionStorage.setItem("numActive", active);
  //   sessionStorage.setItem("numAssoc", assoc);
  //   sessionStorage.setItem("numNone", none);
  // });

  //arrays containing the names of everyone in each status
  // const [users, setUsers] = useState([]);
  const [voting, setVoting] = useState([]);
  const [active, setActive] = useState([]);
  const [assoc, setAssoc] = useState([]);
  const [none, setNone] = useState([]);

  // socket.on('name request', () => {
  //   // socket.emit('name return', sessionStorage.getItem('name'));
  //   socket.emit('name and status', sessionStorage.getItem('name'), sessionStorage.getItem('status'));
  // });

  socket.on('name arrays', (votingNames, activeNames, assocNames, noneNames) => {
    setVoting(votingNames);
    setActive(activeNames);
    setAssoc(assocNames);
    setNone(noneNames);
    setNumUsers(votingNames.length + activeNames.length + assocNames.length + noneNames.length);
  });

  // const [showVoting, setShowVoting] = useState(false);
  // const [showActive, setShowActive] = useState(false);
  // const [showAssoc, setShowAssoc] = useState(false);
  // const [showNone, setShowNone] = useState(false);
  // const handleCollapse = (status) => {
  //   console.log(status);
  //   const showArr = [showVoting, showActive, showAssoc, showNone];
  //   const hooksArr = [setShowVoting, setShowActive, setShowAssoc, setShowNone];
  //   hooksArr[status](!showArr[status]);
  // }

  return (
    <div>
      <h4>Users Connected: {numUsers}</h4>
      <ul>
        <li>
          <a className="btn" data-bs-toggle="collapse" href="#votingMem" role="button" aria-expanded="false">Voting: <span className="badge bg-secondary">{voting.length}</span></a>
          {/*<ul className={`collapse ${showVoting ? "show" : ""}`} id="votingMem">*/}
          <ul className="collapse" id="votingMem">
            {/*<li className="card card-body">kdkd</li>*/}
            {voting.map((name, index) => (
              <li key={index}>
                {name}
              </li>
            ))}
          </ul>
        </li>
        <li>
          <a className="btn" data-bs-toggle="collapse" href="#activeMem" role="button" aria-expanded="false">Active: <span className="badge bg-secondary">{active.length}</span></a>
          <ul className="collapse" id="activeMem">
            {active.map((name, index) => (
              <li key={index}>
                {name}
              </li>
            ))}
          </ul>
        </li>
        <li>
          <a className="btn" data-bs-toggle="collapse" href="#assocMem" role="button" aria-expanded="false">Associate: <span className="badge bg-secondary">{assoc.length}</span></a>
          <ul className="collapse" id="assocMem">
            {assoc.map((name, index) => (
              <li key={index}>
                {name}
              </li>
            ))}
          </ul>
        </li>
        <li>
          <a className="btn" data-bs-toggle="collapse" href="#noneMem" role="button" aria-expanded="false">None: <span className="badge bg-secondary">{none.length}</span></a>
          <ul className="collapse" id="noneMem">
            {none.map((name, index) => (
              <li key={index}>
                {name}
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};
 
export default ConnectedUsers;