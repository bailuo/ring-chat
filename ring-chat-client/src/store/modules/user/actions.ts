
import Ajax from '@/ajax';
import { ActionTree } from 'vuex';
import {  SET_USER_TOKEN } from './mutation-types';
import { UserState } from './state';
import { RootState } from '../../index';


const actions: ActionTree<UserState, RootState> = {
    async login({ commit }, payload) {
        const res = await Ajax({url:'/api/login', method: 'GET',params: payload })
        res && commit(SET_USER_TOKEN, Math.random()* 1000);
        return res;
    },
    async logout({ commit }) {
        commit(SET_USER_TOKEN, '');
    }
}

export default actions;