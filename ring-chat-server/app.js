const express = require('express');
const path = require('path');
const IO = require('socket.io');
const app = express();
const server = require('http').Server(app);
const socketIO = IO(server);

app.use(express.static(path.join(__dirname, 'public')));

// status 0 暂时无人使用 1被占用
const nickNameLibrary = [
    { nickname: '曹操', status: 0 },
    { nickname: '孙权', status: 0 },
    { nickname: '刘备', status: 0 },
    { nickname: '赵云', status: 0 },
    { nickname: '姜维', status: 0 },
    { nickname: '祝融夫人', status: 0 },
    { nickname: '虚竹', status: 0 },
    { nickname: '段誉', status: 0 },
    { nickname: '钟灵', status: 0 },
    { nickname: '萧峰', status: 0 },
    { nickname: '赵云', status: 0 },
    { nickname: '张飞', status: 0 },
    { nickname: '黄忠', status: 0 },
    { nickname: '夏侯惇', status: 0 },
    { nickname: '吕布', status: 0 },
    { nickname: '玄难', status: 0 },
    { nickname: '枯荣大师', status: 0 },
    { nickname: '安岛主', status: 0 },
];

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};
app.use(allowCrossDomain);

app.post('/api/login', (req, res) => {
    res.send({
        code: 0,
        message: 'login action success',
        data: {},
    });
});
app.post('/api/inviteToChat', (req, res) => {
    let user = null;
    nickNameLibrary.some((_user) => {
        if (_user.status === 0) {
            _user.status = 1;
            user = _user;
            return true;
        }
    });
    res.send({
        code: user ? 0 : 4001,
        message: user
            ? 'invite user to chat action succeeded'
            : 'Sorry, invite action failed',
        data: {
            user,
        },
    });
});

socketIO.on('connection', function (socket) {
    socket.on('join', () => {
        let nickname = '';
        nickNameLibrary.some((_item) => {
            if (!_item.status) {
                _item.status = 1;
                nickname = _item.nickname;
                return true;
            }
        });
        socket.emit('joinSuccess', { nickname });
    });
    socket.on('disconnect', function (nickname) {
        nickNameLibrary.some((_item) => {
            if ((_item.nickname = nickname)) {
                _item.status = 0;
                return true;
            }
        });
    });
    socket.on('message', function (message) {
        console.log('Receive And Forward Message');
        socket.emit('message', message);
    });
    socket.on('sysMessage', function (message) {
        socket.emit('sysMessage', message);
    });
});

server.listen(4000, function () {
    console.log('server listening on port 4000');
});
