import { MutationTree } from 'vuex';
import { ChatState } from './state';
import {
    ADD_MESSAGE_TO_LIST,    
    ADD_USER_TO_PARTICIPANTS,
    SET_CHAT_SOCKET
} from './mutation-types';

const mutations: MutationTree<ChatState> = {
    [ADD_MESSAGE_TO_LIST](state, payload: any) {
        state.messages.push(payload);
    },
    [ADD_USER_TO_PARTICIPANTS](state, payload: any) {
        state.participants.push(payload)
    },
    [SET_CHAT_SOCKET](state, payload: any) {
        state.chatSocket = payload;
    }
}

export default mutations;