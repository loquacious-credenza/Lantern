var express = require('express');
var app = express();
var fs = require('fs');
var options = {
  key: fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt'),
  passphrase: 'lantern'
};
var serverPort = 4443;
var https = require('https');
var server = https.createServer(options, app);
var io = require('socket.io')(server);

var roomList = {};

app.get('/', function(req, res){
  console.log('get /');
  console.log('Got to route');
  res.sendFile(__dirname + '/index.html');
});
server.listen(serverPort, function(){
  console.log('server up and running at %s on port %s', 'full speed', serverPort);
});

function socketIdsInRoom(name) {
  var socketIds = io.nsps['/'].adapter.rooms[name];
  if (socketIds) {
    var collection = [];
    for (var key in socketIds) {
      collection.push(key);
    }
    return collection;
  } else {
    return [];
  }
}

io.on('connection', function(socket){
  console.log('connection');
  socket.on('disconnect', function(){
    console.log('disconnect');
    if (socket.room) {
      var room = socket.room;
      io.to(room).emit('leave', socket.id);
      socket.leave(room);
    }
  });

  socket.on('join', function(name, callback){
    console.log('join', name);
    var socketIds = socketIdsInRoom(name);
    callback(socketIds);
    socket.join(name);
    socket.room = name;
  });


  socket.on('exchange', function(data){
    console.log('exchange', data);
    data.from = socket.id;
    var to = io.sockets.connected[data.to];
    to.emit('exchange', data);
  });
});
