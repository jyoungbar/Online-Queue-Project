import React, { useEffect, useState } from 'react';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
// import Modal from 'react-modal';
import Modal from 'react-bootstrap/Modal';
import Cookies from 'js-cookie';
import { BrowserRouter as useParams} from 'react-router-dom';
import CheckBox from './checkBox';
import {socket} from '../socket';
// import { BrowserRouter as useParams} from 'react-router-dom';


// Modal.setAppElement('#root');

const NameForm = () => {
  if(sessionStorage.getItem("name") === null) {
    sessionStorage.setItem("name", "");
  }
  if(sessionStorage.getItem("status") === null) {
    sessionStorage.setItem("status", 4);
  }
  if(sessionStorage.getItem("show") === null) {
    sessionStorage.setItem("show", true);
  }
  // const {meetingid} = useParams();

  // const [show, setShow] = useState(true);
  const [show, setShow] = useState((sessionStorage.getItem("show") === 'true'));
  // const [status, setStatus] = useState(4);
  // const [name, setName] = useState("");
  const [status, setStatus] = useState(sessionStorage.getItem("status"));
  const [name, setName] = useState(sessionStorage.getItem("name"));

  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const hooksArr = [setChecked1, setChecked2, setChecked3, setChecked4];
  //checks a box and unchecks all other boxes
  const handleCheck = (box) => {
    // const hooksArr = [setChecked1, setChecked2, setChecked3, setChecked4];
    for(var i = 0; i < 4; i++) {
      if(box == i) {
        hooksArr[i](true);
      } else {
        hooksArr[i](false);
      }
    }
    //set status based on box
    setStatus(box);
  }

  // var name = "";
  // if(sessionStorage.getItem("name") !== null) {
  //   // name = sessionStorage.getItem("name");
  //   setName(sessionStorage.getItem("name"));
  // }

  function showModal() {
    setShow(true);
    //make sure that after reloading page correct box is still checked
    hooksArr[status](true);
  }
  // function closeModal() {
  //   setShow(false);
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    // var status = 5;
    // console.log(meetingid);
    console.log(Cookies.get('meetingid'));
    socket.emit('name form', name, status, /*meetingid*/ /*Cookies.get('meetingid')*/ sessionStorage.getItem("meetingid"));
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("status", status);
    sessionStorage.setItem("show", false);
    // alert({name});
    setShow(false);

    //create cookie for userID if one doesn't exist
    // console.log(Cookies.get('userID'));
    if(!Cookies.get('userID') || Cookies.get('userID') == "") {
      var newID = Math.floor(Math.random()*10000000000);
      Cookies.set('userID', newID, {expires: 2});
    }
    // Cookies.set('meetingid', );
  }

  return (
  	<div>
      <button onClick={showModal}>Hello, {sessionStorage.getItem("name")}</button>
      <Modal 
        show={show}
      >
        <Modal.Header>
          <Modal.Title>Hello
          {/*name !== "" && (
            <>
              , {name}
            </>
          )*/
          sessionStorage.getItem("name") !== "" && (
            <>
              , {sessionStorage.getItem("name")}
            </>
          )}!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" id="name-form" onSubmit={handleSubmit}>
            <label>
              Please enter your name: <br/>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </label>

            <label>
              <CheckBox
                label="Voting"
                value={checked1}
                onChange={() => handleCheck(0)}
              />
              <CheckBox
                label="Active"
                value={checked2}
                onChange={() => handleCheck(1)}
              />
              <CheckBox
                label="Associate"
                value={checked3}
                onChange={() => handleCheck(2)}
              />
              <CheckBox
                label="None"
                value={checked4}
                onChange={() => handleCheck(3)}
              />
            </label>

            {name !== "" && status < 4 && (
              <input type="submit" />
            )}
            
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
 
export default NameForm;