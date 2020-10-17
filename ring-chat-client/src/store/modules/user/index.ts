import { Module } from 'vuex';
import state, { UserState } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { RootState } from '../../index';

const user: Module<UserState,RootState> = {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}

export default user;