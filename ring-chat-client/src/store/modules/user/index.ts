import { Module } from 'vuex';
import state, { UserState } from './state';
import actions from './actions';
import mutations from './mutations';
import { RootState } from '../../index';

const user: Module<UserState,RootState> = {
    namespaced: true,
    state,
    actions,
    mutations
}

export default user;