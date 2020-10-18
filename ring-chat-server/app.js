const express = require('express');
const path = require('path');
const IO = require('socket.io');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const socketIO = IO(server);
const dayjs = require('dayjs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// status 0 暂时无人使用 1被占用， 在用户登录后随机分配一个昵称
const nickNameLibrary = [
    { nickname: '曹操', status: 0 },
    { nickname: '孙权', status: 0 },
    { nickname: '刘备', status: 0 },
    { nickname: '赵云', status: 0 },
    { nickname: '姜维', status: 0 },
    { nickname: '曹冲', status: 0 },
    { nickname: '诸葛瑾', status: 0 },
    { nickname: '祝融夫人', status: 0 },
    { nickname: '孙尚香', status: 0 },
    { nickname: '虚竹', status: 0 },
    { nickname: '段誉', status: 0 },
    { nickname: '钟灵', status: 0 },
    { nickname: '扁鹊', status: 0 },
    { nickname: '萧峰', status: 0 },
    { nickname: '赵云', status: 0 },
    { nickname: '李元霸', status: 0 },
    { nickname: '张飞', status: 0 },
    { nickname: '黄忠', status: 0 },
    { nickname: '夏侯惇', status: 0 },
    { nickname: '吕布', status: 0 },
    { nickname: '玄难', status: 0 },
    { nickname: '枯荣大师', status: 0 },
    { nickname: '安岛主', status: 0 },
];

String.prototype.hash = function () {
    var self = this,
        range = Array(this.length);
    for (var i = 0; i < this.length; i++) {
        range[i] = i;
    }
    return Array.prototype.map
        .call(range, function (i) {
            return self.charCodeAt(i).toString(16);
        })
        .join('');
};

const userMap = new Map();

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};
app.use(allowCrossDomain);

// 登录，计算uuid，并且给一个nickname
app.post('/api/login', (req, res) => {
    const form = req.body;
    const date = new Date();
    const dateInTime = date.getTime().toString();
    const userHash = (form.username + form.password + dateInTime).hash();
    userMap[form.username] = userHash;
    let nickname = '';
    nickNameLibrary.some((_item) => {
        if (!_item.status) {
            _item.status = 1;
            nickname = _item.nickname;
            return true;
        }
    });
    res.send({
        code: 0,
        message: `${form.username} login action succeeded`,
        data: {
            ...form,
            nickname,
            uuid: userHash,
        },
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
    // 这个方法暂时用不到 后期做多窗口的时候会用到
    socket.on('quit', function (user) {
        nickNameLibrary.some((_item) => {
            if ((_item.nickname = user.nickname)) {
                _item.status = 0;
                return true;
            }
        });
        delete userMap[user.username];
    });
    // 为了能够排序，我们为每条用户发送的信息做一个uuid，这个uuid目前最实际的一个场景是撤回信息的时候使用
    socket.on('chatMessage', function (messageRequest) {
        const { message } = messageRequest;
        const dateInTime = dayjs().format('YYYYMMMMDDHHmmssSSS').toString();
        let messageUUID;
        if (message.type === 'text') {
            messageUUID = (message.conent + dateInTime).hash();
        } else {
            console.log({ ...message });
            messageUUID = dateInTime.hash();
        }
        const emitMessage = {
            ...message,
            timestamp: dayjs().format('YYYY-MM-DD hh:mm'),
            messageId: messageUUID,
        };
        socket.broadcast.emit('userChatMessage', {
            data: {
                ...messageRequest,
                message: emitMessage,
            },
        });
        socket.emit('userChatMessage', {
            code: 0,
            data: {
                ...messageRequest,
                message: emitMessage,
            },
        });
    });
    socket.on('withdrawMessage', function (withdrawRequest) {
        const { user, messageId } = withdrawRequest;
        const dateInTime = dayjs().format('YYYYMMMMDDHHmmssSSS').toString();
        const sysMessageUUID = dateInTime.hash();
        const withdrawData = {
            messageId,
            sysMessage: {
                content: `"${user.nickname}"撤回了一条消息`,
                messageId: sysMessageUUID,
            },
        };
        socket.broadcast.emit('withdrawUserMessage', {
            code: 0,
            data: withdrawData,
        });
        socket.emit('withdrawUserMessage', {
            code: 0,
            data: withdrawData,
        });
    });
});

server.listen(4000, function () {
    console.log('server listening on port 4000');
});
