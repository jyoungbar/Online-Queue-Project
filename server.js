//Socket.io server
const express = require('express')
const PORT = process.env.PORT || 3000
const app = express()
var server = require('http').Server(app);
const PriorityQueue = require('./priority_queue.js').PriorityQueue;
// const { Server } = require("socket.io");
// const io = new Server(server);

// const io = new Server({
//   cors: {
//     origin: "http://localhost:3001"
//   }
// });
// io.listen(4000);
const cookie = require('cookie');

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  },
  // cookie: true
  cookie: {
    sameSite: 'none'
  }
});

app.set('views', './views');
app.set('view engine', 'ejs');

const cors = require('cors');
app.use(cors(
    // origin: 'http://localhost:3000'
));
// io.use(cors(
//   origin: 'http://localhost:3001'
// ));
app.use(express.json());


app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/index.html');
  // console.log(__dirname);
  res.sendFile(__dirname + '/client/build/index.html');
});

app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html');
});

//map containing all meeting ids for meetings in progress and their open queues
//key: meeting id
//value: map of priority queue objects (key: queue name, value: priority queue objects)
var meetingids = new Map();
// meetingids[100] = [];
meetingids.set(100, new Map());
app.get('/meetingids', (req, res)=> {
  // console.log(JSON.stringify(meetingids));
  // console.log(Array.from(meetingids));
  console.log([...meetingids]);
  res.send([...meetingids]);
  // res.send(meetingids);
});

//creating a new meeting
app.put('/meetingids', (req, res) => {
  console.log(req.body.MeetingID);
  meetingids.set(req.body.MeetingID, new Map());
  console.log([...meetingids]);
  res.send("done");
});

//endpoint for different meeting addresses
app.get('/meeting/:meetingid', (req, res) => {
  //check if meeting is happenning
  // if()
  res.sendFile(__dirname + '/client/build/index.html');
});


// function countUsers() {
//   var votingRoom = io.sockets.adapter.rooms.get("voting");
//   var votingNum = 0;
//   if(votingRoom !== undefined) {
//     votingNum = votingRoom.size;
//   }
//   var activeRoom = io.sockets.adapter.rooms.get("active");
//   var activeNum = 0;
//   if(activeRoom !== undefined) {
//     activeNum = activeRoom.size;
//   }
//   var associateRoom = io.sockets.adapter.rooms.get("associate");
//   var associateNum = 0;
//   if(associateRoom !== undefined) {
//     associateNum = associateRoom.size;
//   }
//   var noneRoom = io.sockets.adapter.rooms.get("none");
//   var noneNum = 0;
//   if(noneRoom !== undefined) {
//     noneNum = noneRoom.size;
//   }
//   var total = votingNum + activeNum + associateNum + noneNum;
//   console.log(`${total} user(s) connected`);

//   io.emit('count', total, votingNum, activeNum, associateNum, noneNum);
//   return total;
// }

//emit arrays containing the names of everyone in each room
function getNamesByRoom(meetingid) {
  var votingRoom = io.sockets.adapter.rooms.get("voting" + meetingid);
  var votingNames = [];
  for(const clientId of votingRoom ? votingRoom : []) {
    const clientSocket = io.sockets.sockets.get(clientId);
    votingNames.push(clientSocket.name);
  //   io.to(clientId).emit('name request');
    // clientSocket.on('name return', (name) => {
    //   // console.log(name);
    //   votingNames.push(name);
    // });
  }
  var activeRoom = io.sockets.adapter.rooms.get("active" + meetingid);
  var activeNames = [];
  for(const clientId of activeRoom ? activeRoom : []) {
    const clientSocket = io.sockets.sockets.get(clientId);
    activeNames.push(clientSocket.name);
  //   io.to(clientId).emit('name request');
    // clientSocket.on('name return', (name) => {
    //   activeNames.push(name);
    // });
  }
  var assocRoom = io.sockets.adapter.rooms.get("associate" + meetingid);
  var assocNames = [];
  for(const clientId of assocRoom ? assocRoom : []) {
    const clientSocket = io.sockets.sockets.get(clientId);
    assocNames.push(clientSocket.name);
  //   io.to(clientId).emit('name request');
    // clientSocket.on('name return', (name) => {
    //   assocNames.push(name);
    // });
  }
  var noneRoom = io.sockets.adapter.rooms.get("none" + meetingid);
  var noneNames = [];
  for(const clientId of noneRoom ? noneRoom : []) {
    const clientSocket = io.sockets.sockets.get(clientId);
    noneNames.push(clientSocket.name);
  //   io.to(clientId).emit('name request');
    // clientSocket.on('name return', (name) => {
    //   noneNames.push(name);
    // });
  }

  
  // io.emit('name request');
  // socket.on('name and status', (name, status) => {

  //   if(status == 0) {
  //     votingNames.push(name);
  //   } else if(status == 1) {
  //     activeNames.push(name);
  //   } else if(status == 2) {
  //     assocNames.push(name);
  //   } else if(status == 3) {
  //     noneNames.push(name);
  //   }
  io.to("voting" + meetingid).to("active" + meetingid).to("associate" + meetingid).to("none" + meetingid).emit('name arrays', votingNames, activeNames, assocNames, noneNames);
  // });
}

// function handleNameForm(name, status) {
//   var votingNames = [];
//   var activeNames = [];
// }

//socket.io stuff
// let count = 0;
io.on('connection', (socket) => {
  // count++;
  // console.log(`${count} user(s) connected`);

  //send and save cookie here

  //process submitted name form
  socket.on('name form', (name, status, meetingid) => {
    console.log("status: " + status);
    socket.name = name;
    // socket.meetingid = 100; //will change later to inputed meetingid
    socket.meetingid = parseInt(meetingid);
    console.log("name: " + socket.name);
    console.log(socket.request.headers.cookie);
    if(socket.request.headers.cookie) {
      const cookies = cookie.parse(socket.request.headers.cookie);
      console.log(cookies);
      socket.userID = cookies.userID;
      // socket.meetingid = parseInt(cookies.meetingid);
    }
    console.log("meetingid: " + socket.meetingid);
    //will only process brother status, name will be stored on client side
    //send people to their rooms based on status and leave any other rooms they were in
    if(status == 0) {
      // console.log("joined voting");
      socket.join("voting" + socket.meetingid);
      socket.leave("active" + socket.meetingid);
      socket.leave("associate" + socket.meetingid);
      socket.leave("none" + socket.meetingid);
    } else if(status == 1) {
      socket.join("active" + socket.meetingid);
      socket.leave("voting" + socket.meetingid);
      socket.leave("associate" + socket.meetingid);
      socket.leave("none" + socket.meetingid);
    } else if(status == 2) {
      socket.join("associate" + socket.meetingid);
      socket.leave("active" + socket.meetingid);
      socket.leave("voting" + socket.meetingid);
      socket.leave("none" + socket.meetingid);
    } else if(status == 3) {
      socket.join("none" + socket.meetingid);
      socket.leave("active" + socket.meetingid);
      socket.leave("associate" + socket.meetingid);
      socket.leave("voting" + socket.meetingid);
    }    

    // countUsers();
    getNamesByRoom(socket.meetingid);
    // io.emit('count', countUsers());
  });

  socket.on('refreshNumUsers', () => {
    // countUsers();
    getNamesByRoom(socket.meetingid)
    // io.emit('count', countUsers());
  });
  socket.on('disconnect', (reason) => {
    // countUsers();
    getNamesByRoom(socket.meetingid)
    // io.emit('count', countUsers());
  });

  socket.on('getMeetingIds', () => {
    console.log("meetingids", meetingids);
    io.to(socket.id).emit('returnMeetingIds', meetingids);
  });

  socket.on('new queue', (/*meetingid,*/queueName) => {
    //add Priority Queue Object to meetingids
    //send out queue added message
    console.log(meetingids);
    // meetingids.set(socket.meetingid, "blah");
    // console.log(meetingids);
    if(!meetingids.get(socket.meetingid).has(queueName)) {
      var queue = new PriorityQueue(/*queueName*/);
      meetingids.get(socket.meetingid).set(queueName, queue);
      io.to("voting" + socket.meetingid).to("active" + socket.meetingid).to("associate" + socket.meetingid).to("none" + socket.meetingid).emit('queue added', queueName);
    }
  });

  socket.on('delete queue', (queueName) => {
    console.log(queueName, "delete");
    meetingids.get(socket.meetingid).delete(queueName);
    io.to("voting" + socket.meetingid).to("active" + socket.meetingid).to("associate" + socket.meetingid).to("none" + socket.meetingid).emit('queue deleted', queueName);
  });

  socket.on('get all queues', () => {
    var queueNames = [];
    console.log(socket.name);
    if(socket.meetingid) {
      console.log(meetingids);
      // meetingids.set(socket.meetingid, new Map());
      // console.log(meetingids);
      for(const queueName of meetingids.get(socket.meetingid).keys()) {
        queueNames.push(queueName);
      }
    }
    io.to(socket.id).emit('all queues', queueNames);
  });

  socket.on('next in queue', (queueName) => {
    meetingids.get(socket.meetingid).get(queueName).pop();
    var speakers = [];
    if(meetingids.get(socket.meetingid).has(queueName)) {
      speakers = meetingids.get(socket.meetingid).get(queueName).items;
    }
    console.log(queueName);
    console.log("after popping", speakers);
    io.to("voting" + socket.meetingid).to("active" + socket.meetingid).to("associate" + socket.meetingid).to("none" + socket.meetingid).emit('names in queue'+queueName, speakers);
  });

  socket.on('join queue', (queueName) => {
    meetingids.get(socket.meetingid).get(queueName).add(socket.name);
    var speakers = [];
    if(meetingids.get(socket.meetingid).has(queueName)) {
      speakers = meetingids.get(socket.meetingid).get(queueName).items;
    }
    console.log(queueName);
    console.log("after joining", speakers);
    io.to("voting" + socket.meetingid).to("active" + socket.meetingid).to("associate" + socket.meetingid).to("none" + socket.meetingid).emit('names in queue'+queueName, speakers);
  });

  socket.on('leave queue', (queueName) => {
    meetingids.get(socket.meetingid).get(queueName).remove(socket.name);
    var speakers = meetingids.get(socket.meetingid).get(queueName).items;
    console.log(queueName);
    console.log("after leaving:", speakers);
    io.to("voting" + socket.meetingid).to("active" + socket.meetingid).to("associate" + socket.meetingid).to("none" + socket.meetingid).emit('names in queue'+queueName, speakers);
  });

  socket.on('get names in queue', (queueName) => {
    var speakers = [];
    if(meetingids.get(socket.meetingid).has(queueName)) {
      speakers = meetingids.get(socket.meetingid).get(queueName).items;
      io.to("voting" + socket.meetingid).to("active" + socket.meetingid).to("associate" + socket.meetingid).to("none" + socket.meetingid).emit('open/close queue'+queueName, meetingids.get(socket.meetingid).get(queueName).isClosed);
    }
    console.log(queueName);
    // console.log("get names in queue:", speakers);
    io.to(socket.id).emit('names in queue'+queueName, speakers);
  });

  socket.on('from admin open/close queue', (queueName, isClosed) => {
    meetingids.get(socket.meetingid).get(queueName).isClosed = isClosed;
    io.to("voting" + socket.meetingid).to("active" + socket.meetingid).to("associate" + socket.meetingid).to("none" + socket.meetingid).emit('open/close queue'+queueName, isClosed);
  });
});




app.use(express.static(__dirname + '/client/build'));
// app.use(express.static(__dirname + '/client/public'));

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});

