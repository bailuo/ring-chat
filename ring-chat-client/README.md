# ring-chat-client

RingChat PC 端 Web 版本, 使用 vue 、 vuex、 axios 、socket.io

## How To Run

```
yarn install
yarn serve
```

## Project Structure

```
├── README.md // 项目内readme
├── babel.config.js
├── package.json
├── public
├── src
│   ├── App.vue  // vue主入口
│   ├── ajax  // ajax 请求封装
│   ├── assets // 静态
│   ├── components  // 组件
│   ├── main.ts  // ts入口
│   ├── router // 路由配置
│   ├── store  // 状态管理
│   ├── types  // type声明
│   └── views  // 页面
├── tsconfig.json
├── vue.config.js
└── yarn.lock
```

## Possible Improvements：

1. 消息队列可以采用采用 linked list 这种数据结构， 在消息撤回和复杂场景应用的时候可以降低数据操作的复杂度。而且现在因为采用的是 Vue 具有 virtual dom 的特性，如果是直接操作 dom 的情况下，这种数据结构的优势就更明显了.而且还有一个问题是现在系统信息的展示是按照事件发生的先后顺序展示的。但是实际上应该做一个节点替换。那么，采用 array 存储信息数据就会有性能上的问题

2. 系统消息部分其实可以采用 pubsub 的方式做可能更好。封装一个 mixin，在撤回消息或者邀请其他人加入聊天时自动触发 socket.io 请求服务器返回相应的系统信息。这一点到周日晚上才想到，来不及实现了。可以等后续自己完善这个项目的时候，把这里重构一下。同样的思路也可以在服务端通过 middleware 实现
