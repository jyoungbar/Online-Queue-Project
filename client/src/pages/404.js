//404 not found page
// import {useParams} from 'react-router-dom';

const NotFound = () => {
  // const {meetingid} = useParams();
  // console.log(meetingid);
  
  return (
    <div>
      <h1>404: Invalid Meeting ID</h1>
      <p>The meeting you are looking for does not exist. Please try a different ID.</p>
    </div>
  );
};

export default NotFound;