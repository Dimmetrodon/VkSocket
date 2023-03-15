const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//Server starts with
server.listen(3000, () => {
    console.log('listening on *:3000');
});
//Message output to the server
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
});

io.on('connection', (socket) => 
{
    socket.on('chat message', (msg) => 
    {
        if (msg.slice(0, 5) == "/room")
        {
            var room_num = msg.slice(5,6);
            console.log(socket.id + ' enters room ' + room_num);
            io.in(socket.id).socketsJoin(room_num);
            io.to(room_num).emit('chat message', msg.slice(6, ));
        }
        else
        {
            io.emit('chat message', msg);
        }
    });
});
