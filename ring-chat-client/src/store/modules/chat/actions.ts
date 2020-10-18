import Ajax from '@/ajax';
import io from 'socket.io-client';
import { ActionTree } from 'vuex';
import { ChatState } from './state';
import { RootState } from '../../index';
import { ServerRes, SeverSystemRes } from './types';
import {
    ADD_MESSAGE_TO_LIST,    
    SET_CHAT_SOCKET,
    CANCEL_ONE_CHAT_ITEM
} from './mutation-types';

let socket: SocketIOClient.Socket;

const actions: ActionTree<ChatState, RootState> = {
    async connectSocket({ commit, rootState }) {
       const {  nickname, username } = rootState.user;
         if(!username){
             return;
         }
         socket = io.connect(
            `/?userId=${username}`,
            { reconnection: true }
        );

        socket.on('connect', async () => {
            // 获取聊天室所需所有信息
            socket.emit('sysMessage', nickname);
            // 先保存好socket对象
            commit(SET_CHAT_SOCKET, socket);
        });
        socket.on('userChatMessage', async (res: ServerRes) => {
            const { user, message} = res.data;
            const messageToAdd = {
                ...message,
                isFromClientUser:  username === user.username,
                senderNickname: user.nickname
            }
            commit(ADD_MESSAGE_TO_LIST, messageToAdd);
        })
        socket.on('withdrawUserMessage', async (res: ServerRes) => {
            const { messageId, sysMessage} = res.data;
            sysMessage.isSysMessage = true;
            commit(CANCEL_ONE_CHAT_ITEM, messageId);
            commit(ADD_MESSAGE_TO_LIST, sysMessage);
        })
        socket.on('sysMessage', async (res: SeverSystemRes) => {
            const { message } = res;
            commit(ADD_MESSAGE_TO_LIST, message);
        })
    },
    // 邀请新人加入，触发系统信息
    async inviteContactToChat({rootState}, payload) {
        const { user } = rootState;
        const res = await Ajax({url:'/api/inviteToChat', method: 'POST',data: payload })
        res && socket.emit('sysMessage', {message: `${user.nickname}邀请了${res.data.user.nickname}加入聊天`})
    },
    // 发送消息
    async sendMessage({rootState}, payload) {
        const { user } = rootState;
        const messageEntity = {
            user,
            message: payload
        }
        socket.emit('chatMessage', messageEntity)
    },
    async withdrawUserMessage({rootState}, payload){
        const { user } = rootState;
        const messageEntity = {
            user,
            messageId: payload
        }
        socket.emit('withdrawMessage', messageEntity)
    }
};

export default actions;
