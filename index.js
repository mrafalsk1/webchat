var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
 
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

 
http.listen(3000, function(){
  console.log('Chat ativo no porto *:3000');
});
io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      console.log('mensagem: ' + msg);
    });
  });
  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });