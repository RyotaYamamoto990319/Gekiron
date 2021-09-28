// var socketio = require('socket.io');

function webSocket(server) {
    var io = require('socket.io')(server);

    var rooms = {};

    io.on('connection', (socket) => {
        console.log(socket.id);
        socket.on('create', (data) => {
            console.log(data);

            io.to(socket.id).emit('getInfo', {roomid: socket.id});
            rooms[socket.id] = [{ id: socket.id, name: data.name, answer: "" }];
        });

        socket.on('join', (data) => {
            rooms[data.roomid].push({ id: socket.id, name: data.name, answer: "" });
            
            rooms[data.roomid].map((player) => {
                io.to(player.id).emit('getPlayers', { players: rooms[data.roomid] });
            });
        });

        socket.on('setStart', (data) => {
            console.log(data);
            for (let i=0; i<rooms[data.roomid].length; i++) {
                rooms[data.roomid][i].answer = "";
            }
            rooms[data.roomid].map((player) => {
                io.to(player.id).emit('startGame', {　players: rooms[data.roomid], theme: data.theme });
            });
        });

        socket.on('answer', (data) => {
            for (let i=0; i<rooms[data.roomid].length; i++) {
                if (rooms[data.roomid][i].id == socket.id) {
                    rooms[data.roomid][i].answer = data.answer;
                }
            }
        });

        socket.on('getAns', (data) => {
            console.log(rooms[data.roomid]);
            const got_player = rooms[data.roomid].find((player) => {return player.id == data.id});
            rooms[data.roomid].map((player) => {
                io.to(player.id).emit('sendAns', { 
                    playerid: data.id,
                    answer: got_player.answer
                });
            });
        });
    });
}

module.exports = webSocket;