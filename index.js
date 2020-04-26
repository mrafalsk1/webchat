var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const nsp = io.of('/my-namespace');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/chat:nome', function (req, res) {
    io.of('/'+req.params.nome)
    console.log(io.nsps);
    res.sendFile(__dirname + '/public/chat.html');
});
app.get('/chat', function (req, res) {
    var nome = req.query.fname
    io.of('/'+nome)
    console.log(io.clients());
    res.sendFile(__dirname + '/public/chat.html');
});
var users = [];
//nsp.on('connection', function(socket){
    //console.log('someone connected');
    
  //});

http.listen(3000, function () {
    console.log('Chat ativo no porto *:3000');
    //var clients =  io.of('/chat').clients();
    console.log('o');
    

});
io.on('connection', function (socket) {
    socket.on('name', function (nome) {
        console.log('nome: ' + nome);

    });
    socket.on('chat message', function (msg) {
        console.log('mensagem: ' + msg);

    });
});
var allClients = []
io.on('connection', (socket) => {
    console.log('alo');
    
    socket.on('name', (nome) => {
        io.emit('name', nome);
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('id',(id) => {
        
    });
    socket.on('users', (user) => {
        console.log(user);
        users.push(user);
        console.log(users[0]);
        io.emit('users', users);
    });
    socket.on('disconnect', function(){
        console.log('desconectou')
        
    });
});
