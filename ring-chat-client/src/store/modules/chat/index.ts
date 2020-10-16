import { Module } from 'vuex';
import state, { ChatState } from './state';
import { RootState } from '../../index';

const chat: Module<ChatState,RootState> = {
    namespaced: true,
    state
}

export default chat;