import io from 'socket.io-client';
import { ActionTree } from 'vuex';
import { ChatState } from './state';
import { RootState } from '../../index';
import { ServerRes } from './types';

const actions: ActionTree<ChatState, RootState> = {
    async connectSocket({ commit, rootState }) {
        const user = rootState.user;
        const socket: SocketIOClient.Socket = io.connect(
            `/?userId=${user.userId}`,
            { reconnection: true }
        );

        socket.on('connect', async () => {
            console.log('连接成功');
            // 获取聊天室所需所有信息
            socket.emit('chatData', user);

            // 先保存好socket对象
            commit('SET_SOCKET', socket);
        });
        socket.on('chatDatga', async (res: ServerRes) => {
            console.log(res)
        })
    },
};

export default actions;
