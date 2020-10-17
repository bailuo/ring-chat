import Ajax from '@/ajax';
import { ActionTree } from 'vuex';
import { SET_USER_TOKEN, INIT_USER } from './mutation-types';
import { UserState } from './state';
import { RootState } from '../../index';

const actions: ActionTree<UserState, RootState> = {
    async login({ commit }, payload) {
        const res = await Ajax({
            url: '/api/login',
            method: 'POST',
            data: payload,
        });
        if (!res || Number(res.code) !== 0) {
            return false;
        }

        commit(INIT_USER, {
            userId: payload.username || '',
            username: payload.username,
            nickname: '',
            token: '',
        });

        return true;
    },
    async logout({ commit }) {
        commit(SET_USER_TOKEN, '');
    },
};

export default actions;
