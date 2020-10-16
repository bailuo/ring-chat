import { Module } from 'vuex';
import state, { ChatState } from './state';
import { RootState } from '../../index';
import mutations from './mutations';
import actions from './actions';

const chat: Module<ChatState,RootState> = {
    namespaced: true,
    state,
    actions,
    mutations
}

export default chat;
