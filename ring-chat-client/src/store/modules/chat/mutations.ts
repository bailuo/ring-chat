import { MutationTree } from 'vuex';
import { ChatState } from './state';
import {
    ADD_MESSAGE_TO_LIST,    
    ADD_USER_TO_PARTICIPANTS,
    SET_CHAT_SOCKET,
    CANCEL_ONE_CHAT_ITEM
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
    },
    // 撤销一条
    [CANCEL_ONE_CHAT_ITEM](state, payload: any) {
      const remains = state.messages.filter(_m => {
          return _m.messageId !== payload;
      })
      state.messages = remains;
    }
}

export default mutations;