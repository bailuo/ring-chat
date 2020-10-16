import { MutationTree } from 'vuex';
import { UserState } from './state';
import {
    SET_USERNAME,
    SET_USER_TOKEN
} from './mutation-types';

const mutations: MutationTree<UserState> = {
    [SET_USERNAME](state, payload: string) {
        state.username = payload;
    },
    [SET_USER_TOKEN](state, payload: string) {
        state.token = payload;
    }
}

export default mutations;