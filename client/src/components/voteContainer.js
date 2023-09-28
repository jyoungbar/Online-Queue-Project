import React, { useEffect, useState } from 'react';
import {socket} from '../socket';
import CheckBox from './checkBox';

const VoteContainer = ({isRanked, queueName, voteOptionNames}) => {
  // if(sessionStorage.getItem("hasVoted"+queueName) === null) {
  //   sessionStorage.setItem("hasVoted"+queueName, false);
  // }

  const [voteOptions, setVoteOptions] = useState([]);
  const [voteSelected, setVoteSelected] = useState(null);

  // const [yesVote, setYesVote] = useState(false);
  // const [noVote, setNoVote] = useState(false);
  // const [abstainVote, setAbstainVote] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(sessionStorage.getItem("hasVoted"+queueName) === 'true');
  const [rankedVoteNames, setRankedVoteNames] = useState(Array.apply(null, Array(voteOptionNames.length)).map(function () {return "";}));//[]);


  useEffect(() => {
    var newVoteOptions = []
    for(var i = 0; i < voteOptionNames.length; i++) {
      newVoteOptions.push([voteOptionNames[i], false])
      console.log(voteOptionNames[i]);
    }
    console.log(voteOptionNames);
    setVoteOptions(newVoteOptions);
    // if(!isRanked) {
    //   setVoteOptions([["Yes", false], ["No", false], ["Abstain", false]]);
    //   console.log(voteOptions);
    // }// else {
    //   setVoteOptions([["Josh", false], ["Other Josh", false]]);
    //   console.log(voteOptions);
    // }
    socket.emit('submit vote', queueName, Array.apply(null, Array(voteOptionNames.length)).map(function () {return "";}));
  }, []);

  const handleVote = (name /*box*/) => {
    var newVoteOptions = []
    for(var i = 0; i < voteOptions.length; i++) {
      newVoteOptions.push([]);
      if(voteOptions[i][0] == name) {
        newVoteOptions[i].push(name);// = true;
        newVoteOptions[i].push(true);
      } else {
        // newVoteOptions[i][1] = false;
        newVoteOptions[i].push(voteOptions[i][0]);
        newVoteOptions[i].push(false);
      }
    }
    setVoteOptions(newVoteOptions);
    // setVoteSelected(true);
    setVoteSelected(name);

    // const hooksArr = [setYesVote, setNoVote, setAbstainVote];
    // for(var i = 0; i < 3; i++) {
    //   if(box == i) {
    //     hooksArr[i](true);
    //   } else {
    //     hooksArr[i](false);
    //   }
    // }
  }

  const handleVoteChange = (val, index) => {
    var allFull = true;
    const names = rankedVoteNames.map((c, i) => {
      console.log(i, index);
      if(c == "" || val == "") {
        allFull = false;
      }
      if (i === index) {
        // Change the specific form value
        console.log(index, val);
        return val;
      } else {
        if(val.toUpperCase() == c.toUpperCase()) {
          allFull = false;
        }
        // The rest haven't changed
        return c;
      }
    });
    console.log(names);
    setRankedVoteNames(names);
    setVoteSelected(allFull);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setHasVoted(true);
    sessionStorage.setItem("hasVoted"+queueName, true);
    if(isRanked) {
      socket.emit('submit ranked vote', queueName, rankedVoteNames);
    } else {
      socket.emit('submit vote', queueName, voteSelected); //yesVote, noVote, abstainVote);
    }
  }
  socket.on('update total vote count'+queueName, (total) => {
    setTotalVotes(total);
  });
  
  return (
    <>
      {!hasVoted && (
        "Please Vote:\n"
      )}
      {!hasVoted && isRanked && (
        <>
          {/*voteOptions.map((vote) => (
            <>
              <CheckBox 
                label={vote[0]}
                value={vote[1]}
                onChange={() => handleVote(vote[0])}
              />
            </>
          ))*/}
          <form action="" id="" onSubmit={handleSubmit}>
            {voteOptionNames.map((val, index) => (
              <>
                {val}.<input type="text" value={rankedVoteNames[index]} onChange={(e) => handleVoteChange(e.target.value, index)}/>
              </>
            ))}
            {voteSelected && (
              <input type="submit" />
            )}
          </form>
        </>
      ) || !hasVoted && (
        <>
          <form action="" id="name-form" onSubmit={handleSubmit}>
            {/* <label>
              

            </label> */}
            {/* <CheckBox 
              label="Yes"
              value={yesVote}
              onChange={() => handleVote(0)}
            />
            <CheckBox 
              label="No"
              value={noVote}
              onChange={() => handleVote(1)}
            />
            <CheckBox 
              label="Abstain"
              value={abstainVote}
              onChange={() => handleVote(2)}
            /> */}

            {voteOptions.map((vote) => (
              <>
                <CheckBox 
                  label={vote[0]}
                  value={vote[1]}
                  onChange={() => handleVote(vote[0])}
                />
              </>
            ))}
            {voteSelected && (
              <input type="submit" />
            )}
          </form>
        </>
      ) || hasVoted && (
        <>
          Thank you for voting.
        </>
      )}
      <br/>
      Votes Recieved: {totalVotes}
    </>
  );
};
 
export default VoteContainer;