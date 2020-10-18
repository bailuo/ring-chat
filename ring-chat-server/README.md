# ring-chat-server

A simple server based on Express and Socket.io

## How To Run

```js
npm i
npm run serve
```

## API 设计

登录，拉人进群，等使用 ajax 和前端页面做数据交互。目的是求稳，而且这些操作都是低频率的一对一操作。系统消息，用户消息采用 socket 通信，比较容易做推送和广播

## Project Structure

```
├── README.md
├── app.js  // 主要逻辑代码
├── node_modules
├── package-lock.json
├── package.json
└── public
```

## Possible Improvements：

如果有时间的话，会更清楚的分出 MVC 层来。一个是结构更清晰更稳固，另一个是代码也更好维护
