var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);  //Creates a new Server


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('join', function(data){
    socket.join(data[0]);
    datum=[data[0],data[1],data[1]+" joined"]
    io.to(data[0]).emit('chat-message',datum);
    console.log(data[1]+" joined");
  });
});

io.on('connection', function(socket){
  	socket.on('chat-message', function(data_mess){
        console.log("Server :" + data_mess[0]+"     "+data_mess[1]+"   "+data_mess[2]);
        io.to(data_mess[0]).emit('chat-message',data_mess);
      });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});