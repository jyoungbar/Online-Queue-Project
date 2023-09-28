import React, { useEffect, useState } from 'react';
import {socket} from '../socket';

const VoteResults = ({queueName}) => {
  const [results, setResult] = useState(/*new Map()*/[]);

  useEffect(() => {
    socket.emit('refresh open/close voting', queueName);
  }, []);
  socket.on('open/close voting'+queueName, (isVoting, isRanked, votes) => {
    setResult(votes);
    console.log("votes: ", votes);
  });

  return (
    <>
      {results.length != 0 && (
        <>
          {console.log(results)}
          <h3>Results of Vote:</h3>
          <ul>
            {results.map((voteOption) => (
              <li><b>{voteOption[0]}:</b> {voteOption[1]}</li>
            ))}
          </ul>
        </>
      ) || (
        <>
          no results yet
          {console.log(results.length)}
        </>
      )}
    </>
  );
};

export default VoteResults;