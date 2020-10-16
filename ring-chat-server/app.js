const express = require('express');
const path = require('path');
const IO = require('socket.io');
const app = express();
const server = require('http').Server(app);
const socketIO = IO(server);

app.use(express.static(path.join(__dirname, 'public')));

const nickNameLibrary = [
    { name: '曹操', status: 0 },
    { name: '孙权', status: 0 },
    { name: '刘备', status: 0 },
    { name: '赵云', status: 0 },
    { name: '虚竹', status: 0 },
    { name: '段誉', status: 0 },
    { name: '萧峰', status: 0 },
    { name: '赵云', status: 0 },
    { name: '张飞', status: 0 },
    { name: '黄忠', status: 0 },
    { name: '夏侯惇', status: 0 },
    { name: '吕布', status: 0 },
    { name: '玄难', status: 0 },
    { name: '枯荣大师', status: 0 },
    { name: '安岛主', status: 0 },
];

const allowCrossDomain = function (req, res, next) {
    console.log(req);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};
app.use(allowCrossDomain);

app.get('/api/login', (req, res) => {
    console.log(req);
    res.send({
        code: 0,
        message: 'login action success',
        data: {},
    });
});

socketIO.on('connection', function (socket) {
    socket.on('join', () => {
        let nickname = '';
        nickNameLibrary.forEach((_item) => {
            if (!_item.status) {
                _item.status = 1;
                nickname = _item.name;
            }
        });
        socket.emit('joinSuccess', { nickname });
    });
    socket.on('disconnect', function (nickname) {
        nickNameLibrary.forEach((_item) => {
            if ((_item.name = nickname)) {
                _item.status = 0;
            }
        });
    });
    socket.on('message', function (message) {
        console.log('Receive And Forward Message');
        socket.emit('message', message);
    });
});

server.listen(4000, function () {
    console.log('server listening on port 4000');
});
