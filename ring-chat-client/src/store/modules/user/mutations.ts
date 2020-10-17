import { MutationTree } from 'vuex';
import { UserState } from './state';
import dayjs from 'dayjs'
import {
    SET_USERNAME,
    SET_USER_TOKEN,
    INIT_USER
} from './mutation-types';

const mutations: MutationTree<UserState> = {
    [SET_USERNAME](state, payload: string) {
        state.username = payload;
    },
    [SET_USER_TOKEN](state, payload: string) {
        state.token = payload;
    },
    [INIT_USER](state, payload: any) {
        state.userId  = payload.userId;
        state.username = payload.username;
        state.nickname = payload.nickname;
        state.createdTime = dayjs().format('YYYYMMDDHHssSSS');
        state.token = payload.token || 'wjwisjsksd';
    }
}

export default mutations;