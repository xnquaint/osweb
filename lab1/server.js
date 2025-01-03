const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const users = {};

io.on('connection', (socket) => {
    console.log('Користувач підключився');

    socket.on('set nickname', (nickname) => {
        users[socket.id] = nickname;
        io.emit('user connected', `${nickname} приєднався до чату`);
    });

    socket.on('chat message', (msg) => {
        const nickname = users[socket.id] || 'Анонім';
        io.emit('chat message', { nickname, msg });
    });

    socket.on('disconnect', () => {
        const nickname = users[socket.id] || 'Користувач';
        io.emit('user disconnected', `${nickname} залишив чат`);
        delete users[socket.id];
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер працює на порту ${PORT}`);
});
