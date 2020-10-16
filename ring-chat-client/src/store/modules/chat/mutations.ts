import { MutationTree } from 'vuex';
import { ChatState } from './state';
import {
    ADD_MESSAGE_TO_LIST,    
} from './mutation-types';

const mutations: MutationTree<ChatState> = {
    [ADD_MESSAGE_TO_LIST](state, payload: any) {
        state.messages.push(payload);
    },
}

export default mutations;