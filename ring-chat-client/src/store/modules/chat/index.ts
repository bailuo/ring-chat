import { Module } from 'vuex';
import state, { ChatState } from './state';
import { RootState } from '../../index';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const chat: Module<ChatState,RootState> = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}

export default chat;
