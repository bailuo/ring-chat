import Ajax from '@/ajax';
import io from 'socket.io-client';
import { ActionTree } from 'vuex';
import { ChatState } from './state';
import { RootState } from '../../index';
import { ServerRes, SeverSystemRes } from './types';
import { SET_CHAT_SOCKET} from './mutation-types';

let socket: SocketIOClient.Socket;

const actions: ActionTree<ChatState, RootState> = {
    async connectSocket({ commit, rootState }) {
        const user = rootState.user;
         socket = io.connect(
            `/?userId=${user.userId || 1984}`,
            { reconnection: true }
        );

        socket.on('connect', async () => {
            // 获取聊天室所需所有信息
            socket.emit('chatData', user);
            // 先保存好socket对象
            commit(SET_CHAT_SOCKET, socket);
        });
        socket.on('chatDatga', async (res: ServerRes) => {
            console.log(res)
        })
        socket.on('sysMessage', async (res: SeverSystemRes) => {
            const { message } = res;
            console.log(message);
        })
    },
    async inviteContactToChat({rootState}, payload) {
        const { user } = rootState;
        const res = await Ajax({url:'/api/inviteToChat', method: 'POST',data: payload })
        res && socket.emit('sysMessage', {message: `${user.nickname}邀请了${res.data.user.nickname}加入聊天`})
    }
};

export default actions;
